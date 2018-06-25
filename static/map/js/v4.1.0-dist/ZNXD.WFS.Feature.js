/**Bym
 * 注册数据编辑命名空间
 */
Namespace.register("ZNXD.WFS");
//全局变量
var editWFSFeature;
/**编辑WFS图层开始**/
ZNXD.WFS.EditWFSFeature = function(opt_options) {
    editWFSFeature=this;
    var options = opt_options ? opt_options : {};
    this.onLineFeatureType=options.onLineFeatureType?options.onLineFeatureType:ZNXDWEBGIS.wfsFeatureTyp;
    this.projection=options.projection?options.projection:ZNXDWEBGIS.toProjection;
    this.onLineUrl=options.onLineUrl?options.onLineUrl:ZNXDWEBGIS.wfsServerUrl;
    this.layer=options.layer?options.layer:ZNXDWEBGIS.wfsLayer;
    this.enabled=options.enabled?options.enabled:"1";
    this.types=options.types?options.types:['add_location','timeline','signal_cellular_null','pp_edit','grid_off','layers','delete_forever','save','cancel',"kuangxuan","dianxuan"];
    this.wfsFeatureTyp="";

    var names={"kuangxuan":"框选","dianxuan":"点选",'add_location':'点','timeline':'线','signal_cellular_null':'面','pp_edit':'编辑','grid_off':'分割','layers':'合并','delete_forever':'删除','save':'提交','cancel':'撤销'};
    this.map=options.map?options.map:ZNXDWEBGIS.map;

    this.formatGML = new ol.format.GML({
        featureNS: this.onLineUrl,
        featureType: this.onLineFeatureType,
        srsName: this.projection
    });

    if(this.enabled=="1") {
        if (document.getElementById("tool_container")) {
            var toolList = document.getElementById("toolList");
            if (!document.getElementById("ysbj")) {
                var li = document.createElement("li");
                li.className = "delete";
                li.setAttribute("id", "ysbj");
                li.style.width = "100px";
                li.style.zIndex = 99999;
                var a = document.createElement("a");
                a.className = "Pointbg";
                a.setAttribute("href", "javascript:void(0)");
                a.innerHTML = "<span class='editFeature'></span>要素编辑";
                li.appendChild(a);
                li.addEventListener("click", function () {
                    if ($("#wfsTool").is(":hidden")) {
                        $("#wfsTool").show();
                    } else {
                        editWFSFeature.closeEditWFS();
                        $("#wfsTool").hide();
                    }
                });
                toolList.appendChild(li);
                var line = document.createElement("li");
                line.className = "publine";
                toolList.appendChild(line);
            }
        } else {
            var map = document.getElementById("map");
            var toolContainer = document.createElement("div");
            toolContainer.className = "allrttop";
            toolContainer.setAttribute("id", "tool_container");

            var alright_top_rt = document.createElement("div");
            alright_top_rt.className = "alright_top_rt";
            toolContainer.appendChild(alright_top_rt);
            var ul = document.createElement("ul");
            ul.setAttribute("id", "toolList");
            var li = document.createElement("li");
            li.className = "delete";
            li.setAttribute("id", "ysbj");
            li.style.width = "100px";
            li.style.zIndex = 99999;
            var a = document.createElement("a");
            a.className = "Pointbg";
            a.setAttribute("href", "javascript:void(0)");
            a.innerHTML = "<span class='editFeature'></span>要素编辑";
            li.appendChild(a);
            li.addEventListener("click", function () {
                if ($("#wfsTool").is(":hidden")) {
                    $("#wfsTool").show();
                } else {
                    editWFSFeature.closeEditWFS();
                    $("#wfsTool").hide();
                }
            });
            ul.appendChild(li);
            alright_top_rt.appendChild(ul);

            var line = document.createElement("li");
            line.className = "publine";

            map.parentNode.insertBefore(toolContainer, map);
            ul.appendChild(line);
        }
    }

    if(document.getElementById("wfsTool")){
        var _parentElement = document.getElementById("wfsTool").parentNode;
        if(_parentElement){
            _parentElement.removeChild(document.getElementById("wfsTool"));
        }
    }

    var element = document.createElement("div");
    // element.style.right="177px";
    element.style.right="95px";//隐藏了selected工具条 那就移动一下wfsTool编辑工具条为右点
    element.style.top="26px";
    element.style.height="36px";
    element.style.position="absolute";
    if(this.enabled=="1"||this.enabled=="2"){
        element.style.display="none";
    }else if(this.enabled=="0"){
        element.style.display="block";
    }
    element.style.backgroundColor="#477db7";
    element.style.zIndex=99999;
    element.style.borderRadius="8px";
    element.setAttribute("id","wfsTool");

    var button=document.createElement("button");
    for(var i=0;i<this.types.length-2;i++){
        var img=document.createElement("img");
        img.src="./images/drawGraph/tool/"+this.types[i]+".png";
        img.className="toolList "+this.types[i];
        img.setAttribute("title",names[this.types[i]]);
        img.setAttribute("id",this.types[i]);
        img.setAttribute("flag",this.types[i]);
        img.addEventListener("click",this.editFunction);
        element.appendChild(img);
    };


    var selement = document.createElement("div");
    selement.style.right="67px";
    selement.style.top="26px";
    selement.style.height="36px";
    selement.style.width="100px";
    selement.style.position="absolute";
    if(this.enabled=="1"||this.enabled=="2"){
        selement.style.display="none";
    }else if(this.enabled=="0"){
        // selement.style.display="block";
        selement.style.display="none";//修改 点选和框选工具条 隐藏为(none) 显示为(block)
    }
    selement.style.backgroundColor="#477db7";
    selement.style.zIndex=99999;
    selement.style.borderRadius="8px";
    selement.setAttribute("id","selected");

    for(var i=this.types.length-2;i<this.types.length;i++){
        var img=document.createElement("img");
        img.src="./images/drawGraph/tool/"+this.types[i]+".png";
        img.className="toolList "+this.types[i];
        img.setAttribute("title",names[this.types[i]]);
        img.setAttribute("flag",this.types[i]);
        img.addEventListener("click",this.editFunction);
        selement.appendChild(img);
    };

    this.interactionSelectPointerMove = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove,
        style: function(feature){
            return getStyle(feature,"select");
        }
    });

    this.interactionSelect = new ol.interaction.Select({
        style: function(feature){
            return getStyle(feature,"select");
        }
    });

    this.interactionSnap = new ol.interaction.Snap({
        source: this.layer.getSource(),
        style: function(feature){
            return getStyle(feature,"select");
        }
    });

    var map=document.getElementById("map");
    map.appendChild(element);
    map.appendChild(selement);

};

/**bym
 *切割要素
 * @param u
 * @param d
 * @returns {Array}
 */
ZNXD.WFS.EditWFSFeature.prototype.injectPolygonSplitWith=function(u,d) {

    var c = new jsts.io.OL3Parser();
    var k = c.read(d.getGeometry());
    var l = k.getBoundary();
    var a = c.read(u.getGeometry());
    if (!l.intersects(a)) {
        return [];
    }
    var r = new jsts.geom.GeometryFactory();
    var b = [];
    for (var o = 0; o < l.getNumGeometries(); o++) {
        b.push(l.getGeometryN(o));
    }
    for (var o = 0; o < a.getNumGeometries(); o++) {
        b.push(a.getGeometryN(o));
    }
    var f = new jsts.geom.MultiLineString(b, r);
    var n = r.createPoint(f.getCoordinate());
    var e = f.union(n);
    var m = new jsts.operation.polygonize.Polygonizer();
    m.add(e);
    var t = m.getPolygons();
    var j = [];
    for (var o = 0, q = t.size(); o < q; o++) {
        var g = t.get(o);
        try {
            intersection = g.intersection(k);
        } catch (s) {
            try {
                intersection = k.intersection(g);
            } catch (h) {
                intersection = g;
            }
        }
        if (intersection instanceof jsts.geom.Polygon && intersection.getArea() > 1e-8) {
            j.push(c.write(intersection));
        }
    }
    return j;
};

/**
 *bym
 * 合并要素
 * @param u
 * @param d
 * @returns {*}
 */
ZNXD.WFS.EditWFSFeature.prototype.injectPolygonMerge=function(u,d) {
    var j=null;
    var c = new jsts.io.OL3Parser();
    var k = c.read(d.getGeometry());
    var l = k.getBoundary();
    var a = c.read(u.getGeometry());
    if (!l.intersects(a)) {
        return j;
    }
    var union = k.union(a);
    j= c.write(union);
    var f=null;

    if(j!=null)
        f=new ol.Feature({
            geometry:j
        });
    return f;
};

/**
 * bym
 * 合并多个相交图层（至少两个）
 * @param features
 * @returns {*}
 */
ZNXD.WFS.EditWFSFeature.prototype.injectMultPolygonMerge=function(features) {

    var d1=features[0];
    var d2=features[1];
    var mf= editWFSFeature.injectPolygonMerge(d1,d2);
    for(var i=2;i<features.length;i++){
        mf= editWFSFeature.injectPolygonMerge(mf,features[i]);
    }

    return mf;
};

/**
 *临时变量
 * @type {{}}
 */
ZNXD.WFS.EditWFSFeature.prototype.dirty = {};
/**
 * 地图
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.map=null;
/**
 *新增加的图层集合
 * @type {Array}
 */
ZNXD.WFS.EditWFSFeature.prototype.addFeatureArray=new Array();
/**
 *修改后的图层集合
 * @type {Array}
 */
ZNXD.WFS.EditWFSFeature.prototype.updateFeatureArray=new Array();
/**
 *要被删除的图层集合
 * @type {Array}
 */
ZNXD.WFS.EditWFSFeature.prototype.deleteFeatureArray=new Array();
/**
 *切割前的图层
 * @type {Array}
 */
ZNXD.WFS.EditWFSFeature.prototype.splitDelFeatures=new Array();
/**
 *切割后新的图层
 * @type {Array}
 */
ZNXD.WFS.EditWFSFeature.prototype.splitAddFeatures=new Array();
/**
 *操作控件
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.interaction=null;
/**
 *选中图层
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.selectFeature=null;
/**
 *绘制控件
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.drawFeature=null;
/**
 *选择控件
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.interactionSelect=null;
/**
 *WFS地址
 * @type {string}
 */
ZNXD.WFS.EditWFSFeature.prototype.onLineUrl=ZNXDWEBGIS.wfsServerUrl;
/**
 *要素类型
 * @type {string}
 */
ZNXD.WFS.EditWFSFeature.prototype.onLineFeatureType=ZNXDWEBGIS.wfsFeatureTyp;
/**
 *
 * @type {string}
 */
ZNXD.WFS.EditWFSFeature.prototype.projection=ZNXDWEBGIS.projection;
/**
 *格式
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.formatGML=null;
/**
 *操作图层
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.layer=null;
/**
 *
 * @type {null}
 */
ZNXD.WFS.EditWFSFeature.prototype.node=null;

ZNXD.WFS.EditWFSFeature.prototype.overLayer=null;

ZNXD.WFS.EditWFSFeature.prototype.addDatas={
    "draw":null,
    "intersect":null
};

/**
 *关闭
 */
ZNXD.WFS.EditWFSFeature.prototype.closeEditWFS=function(){
    var actives=$(".mapActive");
    if(actives.length>0){
        var img=$(actives[0]).attr("src").replace("_active","");
        $(actives[0]).attr("src",img);
        $(".mapActive").removeClass('mapActive');
    }
    editWFSFeature.map.removeInteraction(editWFSFeature.interaction);
    editWFSFeature.map.removeInteraction(editWFSFeature.interactionSelect);
    editWFSFeature.map.removeInteraction(editWFSFeature.interactionSelectPointerMove);
};

/**
 * 点击按钮
 * @param event
 */
ZNXD.WFS.EditWFSFeature.prototype.editFunction=function(event){

    ZNXDWEBGIS.map.removeInteraction(ZNXDWEBGIS.selectClick);
    ZNXDWEBGIS.map.removeInteraction(ZNXDWEBGIS.dragBox);
    var actives=$(".mapActive");
    if(actives.length>0){
        var img=$(actives[0]).attr("src").replace("_active","");
        $(actives[0]).attr("src",img);
        $(".mapActive").removeClass('mapActive');
    }
    editWFSFeature.map.removeInteraction(editWFSFeature.interaction);
    editWFSFeature.interactionSelect.getFeatures().clear();
    editWFSFeature.map.removeInteraction(editWFSFeature.interactionSelect);
    editWFSFeature.map.removeInteraction(editWFSFeature.interactionSelectPointerMove);

    switch ($(event.target).attr("flag")) {
        case 'kuangxuan':
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            ZNXDWEBGIS.selectedFeatures.clear();
            ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.dragBox);
            ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.selectClick);
            break;
        case 'dianxuan':
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            ZNXDWEBGIS.selectedFeatures.clear();
            ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.selectClick);
            break;
        case 'pp_edit':
            editWFSFeature.addFeatureArray=new Array();
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            editWFSFeature.map.addInteraction(editWFSFeature.interactionSelectPointerMove);
            editWFSFeature.map.addInteraction(editWFSFeature.interactionSelect);
            editWFSFeature.interaction = new ol.interaction.Modify({
                features: editWFSFeature.interactionSelect.getFeatures()
            });
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            editWFSFeature.map.addInteraction(editWFSFeature.interactionSnap);
            editWFSFeature.dirty = {};
            editWFSFeature.interactionSelect.getFeatures().on('add', function (e) {
                e.element.on('change', function (e) {
                    editWFSFeature.dirty[e.target.getId()] = true;
                });
            });
            editWFSFeature.interactionSelect.getFeatures().on('remove', function (e) {
                var f = e.element;
                if (editWFSFeature.dirty[f.getId()]) {
                    delete editWFSFeature.dirty[f.getId()];
                    var featureProperties = f.getProperties();
                    delete featureProperties.boundedBy;
                    var clone = new ol.Feature(featureProperties);
                    clone.setId(f.getId());
                    editWFSFeature.updateFeatureArray.push(clone);
                }
            });
            break;
        case 'add_location':
            editWFSFeature.wfsFeatureTyp=ZNXDWEBGIS.wfsFeatureTyp;
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            editWFSFeature.interaction = new ol.interaction.Draw({
                type: 'Point',
                source:drawLayer.getSource(),// ZNXDWEBGIS.addLayer.getSource(),
                style:function(feature) {
                    return getStyle(feature,"select");
                }
            });
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            editWFSFeature.interaction.on('drawend', function (e) {
                //弹出框
                //showPop(e.feature);
                editWFSFeature.addFeatureArray.push(e.feature);
            });
            break;
        case 'timeline'://画线操作
            $(event.target).parent().addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            editWFSFeature.interaction = new ol.interaction.Draw({
                type: 'LineString',
                source: drawLayer.getSource()//editWFSFeature.layer.getSource()
            });
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            editWFSFeature.interaction.on('drawend', function (e) {
                editWFSFeature.addFeatureArray.push(e.feature);
            });
            break;
        case 'signal_cellular_null'://画面操作
            editWFSFeature.wfsFeatureTyp=ZNXDWEBGIS.wfsPolyonFeatureTyp;
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            editWFSFeature.interaction = new ol.interaction.Draw({
                type: 'Polygon',
                source: drawLayer.getSource()
            });
            editWFSFeature.interaction.on('drawend', function (e) {
                //弹出框
                //showPop(e.feature);
                editWFSFeature.addFeatureArray.push(e.feature);
                var extent = e.feature.getGeometry().getExtent();
                $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
                    type: 'GET',
                    dataType:"json",
                    data: {
                        service: 'WFS',
                        version: '1.1.0',
                        request: 'GetFeature',
                        typename: ZNXDWEBGIS.wfsPolyonFeatureTyp,
                        srsname: ZNXDWEBGIS.srcProjection,
                        bbox: extent.join(',') + ',' + ZNXDWEBGIS.srcProjection,
                        outputFormat:"application/json"
                    }
                }).done(function (response) {
                    var features=ZNXDWEBGIS.formatJSON.readFeatures(response);
                    tempSourceVector.addFeatures(features);
                    editWFSFeature.overLayer=new Array();
                    tempSourceVector.forEachFeatureIntersectingExtent(extent, function(feature) {
                        //console.log("有相交的面");
                        var p= feature.getProperties();
                        var status=p["STATUE"];
                        //console.log(p);
                        //console.log(status);
                        if(status=="1"){//1127amei根据图形状态值去保存叠加的图形(status:0不保存，1保存)
                            var feature= executeSplit(e.feature.getGeometry(), feature.getGeometry());
                            if(feature!=null)
                                editWFSFeature.overLayer.push(feature);
                        }

                    });
                    tempSourceVector.clear();
                });
            });
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            break;
        case 'delete_forever'://删除操作
            editWFSFeature.addFeatureArray=new Array();
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");

            editWFSFeature.interaction = new ol.interaction.Select();
            editWFSFeature.interaction.getFeatures().on('add', function (e) {
                editWFSFeature.deleteFeatureArray.push(e.target.item(0));

                if($("#signal_cellular_null").attr("id")!=null)
                    ZNXDWEBGIS.wfsPolyonLayer.getSource().removeFeature(e.target.item(0));
                if($("#add_location").attr("id")!=null)
                    ZNXDWEBGIS.wfsLayer.getSource().removeFeature(e.target.item(0));

                editWFSFeature.interactionSelectPointerMove.getFeatures().clear();
                editWFSFeature.interaction.getFeatures().clear();
            });
            editWFSFeature.map.addInteraction(editWFSFeature.interactionSelectPointerMove);
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            break;
        case 'grid_off': //切割操作
            $(event.target).parent().addClass('btn-active');
            editWFSFeature.interaction = new ol.interaction.Select();
            var adds=function (e) {
                editWFSFeature.selectFeature= e.element;
                editWFSFeature.map.removeInteraction(editWFSFeature.interactionSelectPointerMove);
                editWFSFeature.drawInteraction = new ol.interaction.Draw({
                    type: 'LineString',
                    source: editWFSFeature.layer.getSource()
                });
                editWFSFeature.map.addInteraction(editWFSFeature.drawInteraction);
                editWFSFeature.drawInteraction.on('drawend', function (e) {
                    editWFSFeature.drawFeature= e.feature;
                    var fs=editWFSFeature.injectPolygonSplitWith(e.feature,editWFSFeature.selectFeature);
                    if(fs.length==2) {
                        for (var i = 0; i < fs.length; i++) {
                            var f = new ol.Feature({
                                geometry: fs[i]
                            });
                            f.setStyle(new ol.style.Style({
                                stroke: new ol.style.Stroke({
                                    color: 'rgba(100,150,0,1)',
                                    width: 3
                                }),
                                fill: new ol.style.Fill({
                                    color: 'rgba(255,255,255,0.4)'
                                })
                            }));
                            editWFSFeature.splitAddFeatures.push(f);
                            editWFSFeature.layer.getSource().addFeature(f);
                        };
                        editWFSFeature.splitDelFeatures.push(editWFSFeature.selectFeature);
                        editWFSFeature.map.removeInteraction(editWFSFeature.drawInteraction);
                        editWFSFeature.map.removeInteraction(editWFSFeature.interactionSelectPointerMove);
                    }
                    window.setTimeout(function() {
                        editWFSFeature.layer.getSource().removeFeature(editWFSFeature.drawFeature);
                    }, 100);
                });
                editWFSFeature.interaction.getFeatures().un('add',adds);
            };
            editWFSFeature.interaction.getFeatures().on('add',adds);

            editWFSFeature.map.addInteraction(editWFSFeature.interactionSelectPointerMove);
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            break;
        case 'layers': //合并操作
            editWFSFeature.selectFeatureList=new Array();
            $(event.target).parent().addClass('btn-active');
            editWFSFeature.interaction = new ol.interaction.Select();

            var selectedFeatures = editWFSFeature.interaction.getFeatures();
            var dragBox = new ol.interaction.DragBox({
                //  condition: ol.events.condition.click
            });
            editWFSFeature.map.addInteraction(dragBox);
            dragBox.on('boxend', function() {
                var extent = dragBox.getGeometry().getExtent();
                editWFSFeature.layer.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
                    if(feature.getGeometry().getType()=="Polygon");
                    selectedFeatures.push(feature);

                });
                if(selectedFeatures.getLength()>1){
                    var f=editWFSFeature.injectMultPolygonMerge(selectedFeatures.getArray());

                    if(f!=null){
                        f.setStyle(new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(100,150,0,1)',
                                width: 3
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,255,0.4)'
                            })
                        }));
                        var g= f.getGeometry().getExtent();
                        var c=[(g[0]+g[2])/2,(g[1]+g[3])/2];

                        for(var i=0;i<selectedFeatures.getArray().length;i++){
                            editWFSFeature.deleteFeatureArray.push(selectedFeatures.getArray()[i]);
                        }
                        editWFSFeature.addFeatureArray.push(f);
                        editWFSFeature.layer.getSource().addFeature(f);
                        editWFSFeature.map.removeInteraction(dragBox);
                        editWFSFeature.map.removeInteraction(editWFSFeature.interaction);
                        editWFSFeature.map.addInteraction(editWFSFeature.interactionSelectPointerMove);
                    }
                }
            });

            //注册绘制框选开始事件
            dragBox.on('boxstart', function() {
                selectedFeatures.clear();
            });

            //开启鼠标经过功能
            editWFSFeature.map.addInteraction(editWFSFeature.interactionSelectPointerMove);
            //开启图层选择
            editWFSFeature.map.addInteraction(editWFSFeature.interaction);
            break;
        case 'save'://提交数据
            ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.selectClick);
            //ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.dragBox);
            $(event.target).addClass('mapActive');
            $(event.target).attr("src","./images/drawGraph/tool/"+$(event.target).attr("flag")+"_active.png");
            //合并数组
            if(editWFSFeature.splitDelFeatures.length>0){
                for(var i=0;i<editWFSFeature.splitDelFeatures.length;i++){
                    editWFSFeature.deleteFeatureArray.push(editWFSFeature.splitDelFeatures[i]);
                }
                editWFSFeature.splitDelFeature=new Array();
            }

            //合并数组
            if(editWFSFeature.splitAddFeatures.length>0){
                for(var i=0;i<editWFSFeature.splitAddFeatures.length;i++){
                    editWFSFeature.addFeatureArray.push(editWFSFeature.splitAddFeatures[i]);
                }
                editWFSFeature.splitAddFeatures=new Array();
            }

            if(editWFSFeature.addFeatureArray.length>0)
                editWFSFeature.transactWFS('insert', editWFSFeature.addFeatureArray);
            if(editWFSFeature.updateFeatureArray.length>0)
                editWFSFeature.transactWFS('update', editWFSFeature.updateFeatureArray);
            if(editWFSFeature.deleteFeatureArray.length>0)
                editWFSFeature.transactWFS('delete', editWFSFeature.deleteFeatureArray);
            var rs=new Array();
            if(editWFSFeature.overLayer!=null&&editWFSFeature.overLayer.length>0){
                for(var i=0;i<editWFSFeature.overLayer.length;i++){
                    var id=addOverLayer("insert",editWFSFeature.overLayer[i]);
                    if(id!=""&&id!=null)
                        rs.push(id);
                }
                editWFSFeature.addDatas.intersect=rs;
            }

            if(editWFSFeature.addFeatureArray.length==0&&editWFSFeature.updateFeatureArray.length==0&&editWFSFeature.deleteFeatureArray.length==0){
                var actives=$(".mapActive");
                if(actives.length>0){
                    var img=$(actives[0]).attr("src").replace("_active","");
                    $(actives[0]).attr("src",img);
                    $(".mapActive").removeClass('mapActive');
                }
            }
           if(rs.length>0){
               var kxtxId = rs.join();
               $("#kxtxId").val(kxtxId)
            }

            break;
        default://撤销操作
            ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.selectClick);
            ZNXDWEBGIS.map.removeInteraction(editWFSFeature.interaction);

            //console.log($("#signal_cellular_null").attr("id")!=null);
            //console.log($("#add_location").attr("id")!=null);

            if($("#add_location").attr("id")!=null){
                ZNXDWEBGIS.addLayer.getSource().clear();
                $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
                    type: 'GET',
                    dataType:"json",
                    data: {
                        service: 'WFS',
                        version: '1.1.0',
                        request: 'GetFeature',// GetFeature
                        typename: ZNXDWEBGIS.namespace+":"+ZNXDWEBGIS.wfsFeatureTyp,
                        outputFormat:"application/json"
                    }
                }).done(function (response) {
                    console.log("wfs加载成功！");
                    var features=ZNXDWEBGIS.formatJSON.readFeatures(response);
                    var tf=new Array();
                    if(mapId!=null){
                        for(var i=0;i<features.length;i++){
                            var f=features[i];
                            var id= f.getId();
                            if(id==mapId)
                                tf.push(f);
                        }
                    }
                    sourceVector.addFeatures(tf);
                });
            }

             if($("#signal_cellular_null").attr("id")!=null){
                 drawLayer.getSource().clear();
                $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
                    type: 'GET',
                    dataType:"json",
                    data: {
                        service: 'WFS',
                        version: '1.1.0',
                        request: 'GetFeature',
                        typeName:ZNXDWEBGIS.namespace+":"+ZNXDWEBGIS.wfsPolyonFeatureTyp,
                        outputFormat:"application/json"
                    },
                    success:function(data){

                        console.log("wfs面加载成功！");
                        sourcePolyonVector.clear();
                        var features=ZNXDWEBGIS.formatJSON.readFeatures(data);
                        var tf=new Array();
                        if(mapId!=null){
                            for(var i=0;i<features.length;i++){
                                var f=features[i];
                                var id= f.getId();
                                if(id==mapId)
                                    tf.push(f);
                            }
                        }
                        sourcePolyonVector.addFeatures(tf);

                    },
                    error:function(){
                        console.log("wfs面加载失败！");
                    }
                }).done(function (response) {//AREA

                });
            }

            editWFSFeature.splitAddFeatures=new Array();
            editWFSFeature.addFeatureArray=new Array();
            editWFSFeature.updateFeatureArray=new Array();
            editWFSFeature.deleteFeatureArray=new Array();
            editWFSFeature.overLayer=new Array();
            break;
    }
}

/**
 * 添加相交重叠部分的面图形
 * @param p
 * @param feature
 * @returns {string}
 */
function addOverLayer(p,feature){
    // console.log("添加相交面操作");
    var spanceLayer=ZNXDWEBGIS.namespace+':'+ZNXDWEBGIS.wfsOverlapFeatureTyp;
    switch(p) {
        case 'insert':
            editWFSFeature.node='<wfs:Transaction version="1.1.0" service="WFS" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/1.1.0/WFS-transaction.xsd" xmlns:'+ZNXDWEBGIS.namespace+'="'+ZNXDWEBGIS.wfsServerUrl+'">';
            var g= feature.getGeometry();
            editWFSFeature.node+='<wfs:Insert handle="insert'+(i+1)+'" idgen="GenerateNew">' +
                '<'+spanceLayer+'>'+
                '<'+ZNXDWEBGIS.namespace+':XJAREA>'+
                feature.get("area")+
                '</'+ZNXDWEBGIS.namespace+':XJAREA>'+
                '<'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                '<gml:Surface srsName="'+editWFSFeature.projection+'">'+
                '<gml:patches>'+
                '<gml:PolygonPatch>'+
                '<gml:exterior>'+
                '<gml:LinearRing>'+
                '<gml:posList srsDimension="2" >'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:posList>'+
                '</gml:LinearRing>'+
                '</gml:exterior>'+
                '</gml:PolygonPatch>'+
                '</gml:patches>'+
                '</gml:Surface>'+
                '</'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                '</'+spanceLayer+'>'+
                '</wfs:Insert>';
            editWFSFeature.node+='</wfs:Transaction>';
            break;
        case 'update':
            //editWFSFeature.node = ZNXDWEBGIS.formatWFS.writeTransaction(null,fs,null,editWFSFeature.formatGML);
            //console.log(new XMLSerializer().serializeToString(editWFSFeature.node));
            editWFSFeature.node='<wfs:Transaction version="1.1.0" service="WFS" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/1.1.0/WFS-transaction.xsd" xmlns:'+ZNXDWEBGIS.namespace+'="'+ZNXDWEBGIS.wfsServerUrl+'">';
            var g= feature.getGeometry();
            editWFSFeature.node +='<wfs:Update typeName="'+spanceLayer+'">' +
                '<wfs:Property>' +
                '<wfs:Name>'+ZNXDWEBGIS.namespace+':GEOMETRY</wfs:Name>' +
                '<wfs:Value>' +
                '<gml:Surface srsName="'+editWFSFeature.projection+'">'+
                '<gml:patches>'+
                '<gml:PolygonPatch>'+
                '<gml:exterior>'+
                '<gml:LinearRing>'+
                '<gml:posList srsDimension="2" >'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:posList>'+
                '</gml:LinearRing>'+
                '</gml:exterior>'+
                '</gml:PolygonPatch>'+
                '</gml:patches>'+
                '</gml:Surface>'+
                '</wfs:Value>' +
                '</wfs:Property>' +
                '<wfs:Filter xmlns="http://www.opengis.net/ogc">' +
                '<wfs:FeatureId fid="'+ f.getId()+'"/></wfs:Filter>' +
                '</wfs:Update>';
            editWFSFeature.node +='</wfs:Transaction>';
            break;
        case 'delete':
            editWFSFeature.node = new XMLSerializer().serializeToString(ZNXDWEBGIS.formatWFS.writeTransaction(null,null,fs,editWFSFeature.formatGML));
            break;
    }

    //console.log(editWFSFeature.node);
    var id="";
    //return;
    $.ajax(ZNXDWEBGIS.wfsServerUrl+'/ows',{
        type: 'POST',
        dataType: 'xml',
        async:false,
        processData: false,
        contentType: 'text/xml',
        data: editWFSFeature.node,
        success:function(data){
            console.log("添加成功");
            var tags=data.getElementsByTagName("ogc:FeatureId");
            if(tags.length>0){
                var tag=tags[0];
                id=tag.getAttribute("fid");
            }


        },
        error:function(){
            console.log("修改失败！")
        }
    }).done(function() {

    });
    return id;
}

/**
 * 发送WFS请求
 * @type {{}}
 */
ZNXD.WFS.EditWFSFeature.prototype.transactWFS = function(p,fs) {

    var spanceLayer=ZNXDWEBGIS.namespace+':'+editWFSFeature.wfsFeatureTyp;
    switch(p) {
        case 'insert':
            editWFSFeature.node='<wfs:Transaction version="1.1.0" service="WFS" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/1.1.0/WFS-transaction.xsd" xmlns:'+ZNXDWEBGIS.namespace+'="'+ZNXDWEBGIS.wfsServerUrl+'">';
            for(var i=0;i<fs.length;i++){
                var f=fs[i];
                var g= f.getGeometry();

                if(g instanceof  ol.geom.Point){
                    type="point";
                    editWFSFeature.node+= '<wfs:Insert handle="insert'+(i+1)+'" idgen="GenerateNew">' +
                        '<'+spanceLayer+'>'+
                        '<'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                        '<gml:Point srsName="'+editWFSFeature.projection+'">'+
                        '<gml:pos srsDimension="2">'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:pos>'+
                        '</gml:Point>'+
                        '</'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                        '</'+spanceLayer+'>'+
                        '</wfs:Insert>';
                }else if(g instanceof  ol.geom.Polygon){
                    type="polyon";
                    editWFSFeature.node+='<wfs:Insert handle="insert'+(i+1)+'" idgen="GenerateNew">' +
                        '<'+spanceLayer+'>'+
                        '<'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                        '<gml:Surface srsName="'+editWFSFeature.projection+'">'+
                        '<gml:patches>'+
                        '<gml:PolygonPatch>'+
                        '<gml:exterior>'+
                        '<gml:LinearRing>'+
                        '<gml:posList srsDimension="2" >'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:posList>'+
                        '</gml:LinearRing>'+
                        '</gml:exterior>'+
                        '</gml:PolygonPatch>'+
                        '</gml:patches>'+
                        '</gml:Surface>'+
                        '</'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                        '</'+spanceLayer+'>'+
                        '</wfs:Insert>';
                }else{
                    editWFSFeature.node+='<wfs:Insert handle="insert'+(i+1)+'" idgen="GenerateNew">' +
                        '<'+spanceLayer+'>'+
                        '<'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                        '<gml:Curve srsName="EPSG:4326">'+
                        '<gml:segments>'+
                        '<gml:LineStringSegment><gml:posList>'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:posList>'+
                        '</gml:LineStringSegment>'+
                        '</gml:segments>'+
                        '</gml:Curve>'+
                    '</'+ZNXDWEBGIS.namespace+':GEOMETRY>'+
                        '</'+spanceLayer+'>'+
                        '</wfs:Insert>';
                    //console.log(editWFSFeature.node);
                }
            }
            editWFSFeature.node+='</wfs:Transaction>';
            break;
        case 'update':
            //editWFSFeature.node = ZNXDWEBGIS.formatWFS.writeTransaction(null,fs,null,editWFSFeature.formatGML);
            //console.log(new XMLSerializer().serializeToString(editWFSFeature.node));
            //重新获取图层，根据fid,change by wyx

            editWFSFeature.node='<wfs:Transaction version="1.1.0" service="WFS" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs/1.1.0/WFS-transaction.xsd" xmlns:'+ZNXDWEBGIS.namespace+'="'+ZNXDWEBGIS.wfsServerUrl+'">';
            for(var i=0;i<fs.length;i++) {
                var f=fs[i];
                var g= f.getGeometry();
                if(f.getId()){
                    spanceLayer= f.getId().split(".")[0]?ZNXDWEBGIS.namespace+':'+f.getId().split(".")[0]:spanceLayer;
                }
                if(g instanceof  ol.geom.Point){
                    editWFSFeature.node +='<wfs:Update typeName="'+spanceLayer+'">' +
                        '<wfs:Property>' +
                        '<wfs:Name>'+ZNXDWEBGIS.namespace+':GEOMETRY</wfs:Name>' +
                        '<wfs:Value>' +
                        '<gml:Point srsName="'+editWFSFeature.projection+'">'+
                        '<gml:pos srsDimension="2">'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:pos>'+
                        '</gml:Point>'+
                        '</wfs:Value>' +
                        '</wfs:Property>' +
                        '<wfs:Filter xmlns="http://www.opengis.net/ogc">' +
                        '<wfs:FeatureId fid="'+ f.getId()+'"/></wfs:Filter>' +
                        '</wfs:Update>'
                }else {
                    editWFSFeature.node +='<wfs:Update typeName="'+spanceLayer+'">' +
                        '<wfs:Property>' +
                        '<wfs:Name>'+ZNXDWEBGIS.namespace+':GEOMETRY</wfs:Name>' +
                        '<wfs:Value>' +
                        '<gml:Surface srsName="'+editWFSFeature.projection+'">'+
                        '<gml:patches>'+
                        '<gml:PolygonPatch>'+
                        '<gml:exterior>'+
                        '<gml:LinearRing>'+
                        '<gml:posList srsDimension="2" >'+g.getCoordinates().toString().replace(/,/g," ")+'</gml:posList>'+
                        '</gml:LinearRing>'+
                        '</gml:exterior>'+
                        '</gml:PolygonPatch>'+
                        '</gml:patches>'+
                        '</gml:Surface>'+
                        '</wfs:Value>' +
                        '</wfs:Property>' +
                        '<wfs:Filter xmlns="http://www.opengis.net/ogc">' +
                        '<wfs:FeatureId fid="'+ f.getId()+'"/></wfs:Filter>' +
                        '</wfs:Update>';
                }
            }
            editWFSFeature.node +='</wfs:Transaction>';
            break;
        case 'delete':
            editWFSFeature.node = new XMLSerializer().serializeToString(ZNXDWEBGIS.formatWFS.writeTransaction(null,null,fs, new ol.format.GML({
                featureNS: this.onLineUrl,
                featureType: editWFSFeature.wfsFeatureTyp,
                srsName: this.projection
            })));
            break;
    }

    $.ajax(ZNXDWEBGIS.wfsServerUrl+'/ows',{
        type: 'POST',
        dataType: 'xml',
        processData: false,
        async:false,
        contentType: 'text/xml',
        data: editWFSFeature.node,
        success:function(data){
              //console.log(data);
            //var tags=data.getElementsByTagName("ogc:FeatureId");
            //获取不到数据改写方法
            var tags=data.getElementsByTagName("FeatureId");
            if(tags.length==0){
                tags=data.getElementsByTagName("ogc:FeatureId");
            }

            if(tags.length>0){
                var tag=tags[0];
                var id=tag.getAttribute("fid");
                if(id != "none")
                 $("#oldId").val(id);
                if(p!="delete"){
                    var g=fs[0].getGeometry();
                    var coordinates=g.getCoordinates().toString();

                    //console.log($("#signal_cellular_null").attr("id")!=null);

                    if($("#signal_cellular_null").attr("id")!=null){
                        var g = f.getGeometry();
                        var e = g.getExtent();
                        var c = [(e[0] + e[2]) / 2, (e[1] + e[3]) / 2];
                        coordinates=c;
                    }

                    editWFSFeature.addDatas.draw={
                        "id":id,
                        "coordinates":coordinates
                    };
                    if(id!="none")
                       mapId=id;
                }else{
                    mapId=null;
                    editWFSFeature.addDatas.draw={
                        "id":"",
                        "coordinates":""
                    };
                }

                editWFSFeature.splitAddFeatures=new Array();
                editWFSFeature.addFeatureArray=new Array();
                editWFSFeature.updateFeatureArray=new Array();
                editWFSFeature.deleteFeatureArray=new Array();
                editWFSFeature.overLayer=new Array();
                //调用父类方法，vue组件中的方法
                parent.vueGOSFunction(editWFSFeature.addDatas.draw.id);
                $("#gps").val(editWFSFeature.addDatas.draw.coordinates)
                $("#frgps").val(editWFSFeature.addDatas.draw.coordinates)
                $("#mapId").val(editWFSFeature.addDatas.draw.id)
                window.sessionStorage.setItem("gpsId",editWFSFeature.addDatas.draw.id);
                
                $("#dwmapId").val(editWFSFeature.addDatas.draw.id)
                $("#grmapId").val(editWFSFeature.addDatas.draw.id)
                drawLayer.getSource().clear();
                ZNXDWEBGIS.addLayer.getSource().clear();
            }

            if($("#add_location").attr("id")!=null){
                ZNXDWEBGIS.addLayer.getSource().clear();
                $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
                    type: 'GET',
                    dataType:"json",
                    data: {
                        service: 'WFS',
                        version: '1.1.0',
                        request: 'GetFeature',// GetFeature
                        typename: ZNXDWEBGIS.namespace+":"+ZNXDWEBGIS.wfsFeatureTyp,
                        outputFormat:"application/json"
                    }
                }).done(function (response) {
                    console.log("wfs加载成功！");
                    sourceVector.clear();
                    var features=ZNXDWEBGIS.formatJSON.readFeatures(response);
                    var tf=new Array();
                    if(mapId!=null){
                        for(var i=0;i<features.length;i++){
                            var f=features[i];
                            var id= f.getId();
                            if(id==mapId)
                                tf.push(f);
                        }
                    }
                    sourceVector.addFeatures(tf);
                });
            }
            if($("#signal_cellular_null").attr("id")!=null){
                drawLayer.getSource().clear();
                $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
                    type: 'GET',
                    dataType:"json",
                    data: {
                        service: 'WFS',
                        version: '1.1.0',
                        request: 'GetFeature',
                        typeName:ZNXDWEBGIS.namespace+":"+ZNXDWEBGIS.wfsPolyonFeatureTyp,
                        outputFormat:"application/json"
                    },
                    success:function(data){
                        console.log("wfs面加载成功！");
                        sourcePolyonVector.clear();
                        var features=ZNXDWEBGIS.formatJSON.readFeatures(data);
                        var tf=new Array();
                        if(mapId!=null){
                            for(var i=0;i<features.length;i++){
                                var f=features[i];
                                var id= f.getId();
                                if(id==mapId)
                                    tf.push(f);
                            }
                        }
                        sourcePolyonVector.addFeatures(tf);
                    },
                    error:function(){
                        console.log("wfs面加载失败！");
                    }
                }).done(function (response) {//AREA

                });
            }
            if($("#timeline").attr("id")!=null){
                drawLayer.getSource().clear();
                $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
                    type: 'GET',
                    dataType:"json",
                    data: {
                        service: 'WFS',
                        version: '1.1.0',
                        request: 'GetFeature',
                        typeName:ZNXDWEBGIS.namespace+":"+ZNXDWEBGIS.wfsLineFeatureTyp,
                        outputFormat:"application/json"
                    },
                    success:function(data){
                        console.log("wfs线加载成功！");
                        sourceLineVector.clear();
                        var features=ZNXDWEBGIS.formatJSON.readFeatures(data);
                        var tf=new Array();
                        if(mapId!=null){
                            for(var i=0;i<features.length;i++){
                                var f=features[i];
                                var id= f.getId();
                                if(id==mapId)
                                    tf.push(f);
                            }
                        }
                        sourceLineVector.addFeatures(tf);
                    },
                    error:function(){
                        console.log("wfs线加载失败！");
                    }
                }).done(function (response) {//AREA

                });
            }

        },
        error:function(){
            console.log("修改失败！")
        }
    }).done(function() {
        console.log("操作成功");
        var actives=$(".mapActive");
        if(actives.length>0){
            var img=$(actives[0]).attr("src").replace("_active","");
            $(actives[0]).attr("src",img);
            $(".mapActive").removeClass('mapActive');
        }
        editWFSFeature.addFeatureArray=new Array();
        editWFSFeature.updateFeatureArray=new Array();
        editWFSFeature.deleteFeatureArray=new Array();
        editWFSFeature.selectFeatureList=new Array();

        $('#tcModal').modal('hide');
    });
}
/**编辑WFS图层结束**/