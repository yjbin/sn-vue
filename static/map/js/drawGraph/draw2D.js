var searchSourceVector=null;
var selectSearchLayer=null;
var fs=null,searchedSourceVector=null,mapId=null;

function renderMap(type,flag){
	var types=type?type:['add_location','signal_cellular_null','pp_edit','delete_forever','save','cancel',"kuangxuan","dianxuan"];
	var flags=flag!=null?flag:"0";
	var map = new ZNXD.map();
	editWFSFeature=new ZNXD.WFS.EditWFSFeature({enabled:flags,projection:ZNXDWEBGIS.srcProjection,types:types});
    if(ZNXDWEBGIS.container==null)
	ZNXDWEBGIS.container = document.getElementById('deBox');
    if(ZNXDWEBGIS.overlay==null)
	ZNXDWEBGIS.overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
		element: ZNXDWEBGIS.container
	}));

	if(ZNXDWEBGIS.selectClick==null)
	ZNXDWEBGIS.selectClick = new ol.interaction.Select({
		condition: ol.events.condition.click,
		style: function(feature) {
			return getStyle(feature,"select");
		}
	});

	searchedSourceVector = new ol.source.Vector({
		projection:ZNXDWEBGIS.srcProjection
	});

	var vectorPoints = new ol.layer.Vector({
		source:searchedSourceVector,
		style: pointStyleFunction
	});

	searchSourceVector = new ol.source.Vector({
		projection:ZNXDWEBGIS.srcProjection
	});

	var searchLayer= new ol.layer.Vector({
		title: '搜索图层',
		extent:ZNXDWEBGIS.bounds,
		source: searchSourceVector,
		style: function(feature) {
			return getStyle(feature,"search");
		}
	});

	var addSourceVector = new ol.source.Vector({
		projection:ZNXDWEBGIS.srcProjection
	});

	ZNXDWEBGIS.addLayer= new ol.layer.Vector({
		title: '添加图层',
		extent:ZNXDWEBGIS.bounds,
		source: addSourceVector,
		style: function(feature) {
			return getStyle(feature,"select");
		}
	});

	ZNXDWEBGIS.map.addLayer(ZNXDWEBGIS.addLayer);
	ZNXDWEBGIS.map.addLayer(vectorPoints);
	ZNXDWEBGIS.map.addLayer(searchLayer);
	ZNXDWEBGIS.map.addOverlay(ZNXDWEBGIS.overlay);

	ZNXDWEBGIS.map.addInteraction(ZNXDWEBGIS.selectClick);
	ZNXDWEBGIS.selectedFeatures = ZNXDWEBGIS.selectClick.getFeatures();
	selectSearchLayer= new ol.interaction.Select({
		condition: ol.events.condition.click,
		layers:[searchLayer],
		style: function(feature) {
			return getStyle(feature,"select");
		}
	});
	sf=selectSearchLayer.getFeatures();
	selectSearchLayer.on("select", function (event) {

		if(ZNXDWEBGIS.container!=null)
		ZNXDWEBGIS.container.style.display="block";
		searchSourceVector.clear();
		searchedSourceVector.clear();
		sf.clear();
		var f = event.selected[0];
		if(!f){
			ZNXDWEBGIS.selectedFeatures.clear();
			ZNXDWEBGIS.overlay.setPosition(undefined);
			return;
		}
		var g = f.getGeometry();
		var e = g.getExtent();
		var c = [(e[0] + e[2]) / 2, (e[1] + e[3]) / 2];

		//console.log(f.getProperties().geographicIdentifier);
		console.log(f.getProperties().name);
		$("#seachCon").val(f.getProperties().name);//根据地址字段进行模糊查询
		if(f.getId()){
			getFeatureInfo(f.getId());
			ZNXDWEBGIS.overlay.setPosition(c);
		}else{
			ZNXDWEBGIS.selectedFeatures.clear();
			ZNXDWEBGIS.overlay.setPosition(undefined);
		}
		searchedSourceVector.addFeature(f);
	});

	var selectPointerMove = new ol.interaction.Select({
		condition: ol.events.condition.pointerMove,
		layers:[searchLayer],
		style: pointStyleFunction
	});

	ZNXDWEBGIS.map.addInteraction(selectPointerMove);

	$("#fInfoWindowClose").click(function(){
		ZNXDWEBGIS.selectedFeatures.clear();
		ZNXDWEBGIS.overlay.setPosition(undefined);
	});

	$("#saveB").click(function(){
		ZNXDWEBGIS.selectedFeatures.clear();
		ZNXDWEBGIS.overlay.setPosition(undefined);
	});
	ZNXDWEBGIS.selectClick.on("select", function (event) {
        if(ZNXDWEBGIS.container!=null)
		   ZNXDWEBGIS.container.style.display="block";
		var f = event.selected[0];
		if(!f){
			ZNXDWEBGIS.selectedFeatures.clear();
			ZNXDWEBGIS.overlay.setPosition(undefined);
			return;
		}
		var g = f.getGeometry();
		var e = g.getExtent();
		var c = [(e[0] + e[2]) / 2, (e[1] + e[3]) / 2];

		if(f.getId()){
			getFeatureInfo(f.getId());
			ZNXDWEBGIS.overlay.setPosition(c);
		}else{
			ZNXDWEBGIS.selectedFeatures.clear();
			ZNXDWEBGIS.overlay.setPosition(undefined);
		}
	});

	ZNXDWEBGIS.dragBox = new ol.interaction.DragBox({
	});

	ZNXDWEBGIS.dragBox.on('boxend', function() {
		// selected features
		var extent = ZNXDWEBGIS.dragBox.getGeometry().getExtent();
		sourceVector.forEachFeatureIntersectingExtent(extent, function(feature) {
			ZNXDWEBGIS.selectedFeatures.push(feature);
		});
	});

	// clear selection when drawing a new box and when clicking on the map
	ZNXDWEBGIS.dragBox.on('boxstart', function() {
		ZNXDWEBGIS.selectedFeatures.clear();
		ZNXDWEBGIS.overlay.setPosition(undefined);
		ZNXDWEBGIS.selectedFeatures.clear();
	});

	document.onkeydown = keyDown;

	return map;
}

/**
 * 模糊查询enter键
 * @param e
 */
function keyDown(e) {
	var keycode = e.which;
	if(keycode==13){
		$("#query").click();
	}
}

/**
 * 模糊查询定位
 */
function local(){

	var id=$("#seachCon").val();

	if(id==""||id==null){
		alert("请输入ID");
		return;
	}
	sourceVector.forEachFeature(function(feature){
		if(id==feature.getId()){
			ZNXDWEBGIS.selectedFeatures.clear();
			ZNXDWEBGIS.selectedFeatures.push(feature);
		}
	});
};

/**
 * 根据mapID获取属性信息
 * @param id
 */
function getFeatureInfo(id){
	var nxmName=$("#nxmName").val();
	var xmjsnr=$("#xmjsnr").val();
	var sbTime=$("#sbTime").val();
	var dre=$("#dre").val();
	$("#detailP1").html("项目名称："+nxmName);
	$("#detailP2").html("建设内容："+xmjsnr);
	$("#detailP3").html("申报时间："+sbTime);
	$("#detailP4").html("详细地址："+dre);
}

/**
 * 关闭框
 */
function closePopup() {
	ZNXDWEBGIS.selectedFeatures.clear();
	ZNXDWEBGIS.overlay.setPosition(undefined);
};

/**
 * 点样式渲染
 * @param feature
 * @param resolution
 * @returns {ol.style.Style}
 */
function pointStyleFunction(feature, resolution) {
	return new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [0.5, 1],
			src:"./images/drawGraph/tool/icon.png"
		}),
		text: createTextStyle(feature, resolution,{
			text: 'normal',
			align: 'center',
			baseline: 'bottom',
			rotation: '0',
			font: '微软雅黑',
			weight: 'bold',
			size: '14px',
			offsetX: '0',
			offsetY: '-28',
			color: '#000000',
			outline: '#ffffff',
			outlineWidth: '3',
			maxreso: ''
		})
	});
}

/**
 * 创建文本样式
 * @param feature
 * @param resolution
 * @param dom
 * @returns {ol.style.Text}
 */
var createTextStyle = function(feature, resolution, dom) {
	var align = dom.align;
	var baseline = dom.baseline;
	var size = dom.size;
	var offsetX = parseInt(dom.offsetX, 10);
	var offsetY = parseInt(dom.offsetY, 10);
	var weight = dom.weight;
	var rotation = parseFloat(dom.rotation);
	var font = weight + ' ' + size + ' ' + dom.font;
	var fillColor = dom.color;
	var outlineColor = dom.outline;
	var outlineWidth = parseInt(dom.outlineWidth, 40);

	return new ol.style.Text({
		textAlign: align,
		textBaseline: baseline,
		font: font,
		text: feature.getProperties().name,
		fill: new ol.style.Fill({color: fillColor}),
		stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
		offsetX: offsetX,
		offsetY: offsetY,
		rotation: rotation
	});
};



/**
 * 模糊查询服务
 * 解析URL返回结果
 * 将结果展示到地图
 */
function query() {
    var keyWord = $("#seachCon").val();
    var url ="http://www.tianditu.com/query.shtml?postStr={keyWord:'" + keyWord + "','level':'11','mapBound':'118.864988,31.72686,120.198792,32.50097','queryType':'1','count':'200','start':'0'}";
    ZNXDWEBGIS.map.addInteraction(selectSearchLayer);
    sf.clear();
    searchedSourceVector.clear();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json", //指定服务器返回的数据类型
        success: function (data) {
            console.log(data);
            if(data==null){
                alert("无此条数据信息");
            	return;
			}
            var pois=data.pois;
            searchSourceVector.clear();
            if(pois==null){
                alert("无此条数据信息");
                return;
			}
            if(pois.length>0){
                var newFeatures=new Array();
            	for(var i=0;i<pois.length;i++){
            		var poi=pois[i];
            		var name=poi.name;
                    var lonlat=poi.lonlat.split(" ");
                    var feature = new ol.Feature({
                        geometry: new ol.geom.Point([lonlat[0], lonlat[1]]),
                        name: name
                    });

                    feature.setProperties("name",name);
                    newFeatures.push(feature);
				}
                searchSourceVector.addFeatures(newFeatures);

                if(newFeatures.length>1)
                    ZNXDWEBGIS.map.getView().fit(searchSourceVector.getExtent());
			}else{
                alert("无此条数据信息");
			}

            console.log(data.pois);

        },
        fail:function (data) {
            console.log("获取失败！！！");
        }
    });
}


/**
 * 模糊查询
 * 将url传入后端做代理请求返回结果
 * 解析结果展示地图
 */
function query11(){
    var keyWord=$("#seachCon").val();
    var url = {url:"http://www.tianditu.com/query.shtml?postStr={keyWord:'"+keyWord+"','level':'11','mapBound':'116.04577,39.70307,116.77361,40.09583','queryType':'1','count':'20','start':'0'}&type=query"};
    url=JSON.stringify(url);
    ZNXDWEBGIS.map.addInteraction(selectSearchLayer);
    sf.clear();
    searchedSourceVector.clear();
    $.ajax({
        url: '/region/sendGet',
        type: 'POST',
        dataType:"xml",
        contentType: "application/json",
        data: url,
        success:function(data){
            //console.log(data.getElementsByTagName('featureMember'));
            if(data.getElementsByTagName('gml:featureMember').length<=0&&data.getElementsByTagName('featureMember').length<=0){//js兼容浏览器判断
                alert("无此条数据信息");
                return;
            }
            searchSourceVector.clear();
            console.log("wfs加载成功！");
            var features=(new ol.format.GML2()).readFeatures(data);
            //console.log("wfs加载成功！"+features.length);

            var newFeatures=new Array();
            for(var i=0;i<features.length;i++){
                var f=features[i];
                var p= f.getProperties();
                var feature = new ol.Feature({
                    geometry: new ol.geom.Point([p.LON, p.LAT]),
                    name: 'point'+(i+1)
                });
                //console.log(p);
                feature.setProperties(p);
                newFeatures.push(feature);
            }
            searchSourceVector.addFeatures(newFeatures);

            if(newFeatures.length>1)
                ZNXDWEBGIS.map.getView().fit(searchSourceVector.getExtent());
        },
        fail:function(error){
            console.log(error);
        }
    })
}

/*
function query(){
	var text=$("#seachCon").val();
	//var filter=getFilter(text);
	var url = {url:"http://58.213.29.194/serviceaccess/service/jspoi",text:text};
	url=JSON.stringify(url);
	ZNXDWEBGIS.map.addInteraction(selectSearchLayer);
	sf.clear();
	searchedSourceVector.clear();
	$.ajax({
		url: '/region/sendGet',
		type: 'POST',
		dataType:"xml",
		contentType: "application/json",
		data: url,
		success:function(data){
			//console.log(data.getElementsByTagName('featureMember'));
			if(data.getElementsByTagName('gml:featureMember').length<=0&&data.getElementsByTagName('featureMember').length<=0){//js兼容浏览器判断
				alert("无此条数据信息");
				return;
			}
			searchSourceVector.clear();
			console.log("wfs加载成功！");
			var features=(new ol.format.GML2()).readFeatures(data);
			//console.log("wfs加载成功！"+features.length);

			var newFeatures=new Array();
			for(var i=0;i<features.length;i++){
				var f=features[i];
				var p= f.getProperties();
				var feature = new ol.Feature({
					geometry: new ol.geom.Point([p.LON, p.LAT]),
					name: 'point'+(i+1)
				});
				//console.log(p);
				feature.setProperties(p);
				newFeatures.push(feature);
			}
			searchSourceVector.addFeatures(newFeatures);

			if(newFeatures.length>1)
				ZNXDWEBGIS.map.getView().fit(searchSourceVector.getExtent());
		},
		fail:function(error){
			console.log(error);
		}
	})
*/


	//模糊查询镇江市POI
	/*var text=$("#seachCon").val();
	 $.ajax('http://221.131.81.174:6080/arcgis/rest/services/ZhenJiang/zjmap/MapServer/0/query', {
	 type: 'GET',
	 dataType:"json",
	 data: {
	 text:text,
	 spatialRel:'esriSpatialRelIntersects',
	 returnGeometry:true,
	 returnIdsOnly:false,
	 returnCountOnly:false,
	 returnZ:false,
	 returnM:false,
	 returnDistinctValues:false,
	 f:'json'
	 },
	 success:function(data){
	 searchSourceVector.clear();
	 console.log("wfs加载成功！");
	 var features=(new ol.format.EsriJSON()).readFeatures(data);
	 searchSourceVector.addFeatures(features);
	 if(features.length>1)
	 ZNXDWEBGIS.map.getView().fit(searchSourceVector.getExtent());
	 },
	 fail:function(error){
	 console.log(error);
	 }
	 })*/


//过滤查询条件
/*function getFilter(text){

	var featureRequest = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
		"<wfs:GetFeature xmlns:wfs=\"http://www.opengis.net/wfs\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" service=\"WFS\" version=\"1.0.0\" maxFeatures=\"25\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd\">"+
		"<wfs:Query typeName=\"iso19112:SI_LocationInstance\">"+
		"<ogc:Filter xmlns:ogc=\"http://www.opengis.net/ogc\">"+
		"<ogc:PropertyIsLike wildCard=\"*\" singleChar=\".\" escape=\"!\">"+
		"<ogc:PropertyName>ADDRESS</ogc:PropertyName>"+
		"<ogc:Literal>*"+text+"*</ogc:Literal>"+
		"</ogc:PropertyIsLike>"+
		"</ogc:Filter>"+
		"</wfs:Query>"+
		"</wfs:GetFeature>";

	return featureRequest;
}*/
/*
 /!**
 * 查询框选几个地块
 * @param spatialQueryGeometry
 *!/
 var spatialQuery = function (spatialQueryGeometry) {
 var queryobj = spatialQueryGeometry;
 var geometry;
 if (queryobj instanceof ol.LonLat) {
 geometry = new ol.Geometry.Point(queryobj.lon, queryobj.lat);
 }
 if (queryobj instanceof ol.Bounds) {
 geometry = queryobj.toGeometry();
 }
 if (queryobj instanceof ol.Geometry) {
 geometry= queryobj;

 if (queryobj instanceof ol.Geometry.Point) {
 geometry = queryobj;
 }

 var GeoJSON = new ol.Format.GeoJSON();
 console.log(GeoJSON.write(geometry));

 var wfs = new ol.Protocol.WFS({
 version: "1.1.0",
 url: main_url + '/wfs?',
 featureType: "nxdk11"
 , srsName: "EPSG:4326"
 , maxFeatures: 1000
 , geometryName: "the_geom"
 });
 var filter = new ol.format.Filter.Spatial({
 type: ol.format.Filter.Spatial.geometry,
 value: geometry
 });
 var result=new Array();
 wfs.read({
 filter: filter,
 callback: function (result) {
 if (result.success()) {
 var geom=null;
 var bxArae=getArea(geometry);
 var dkArae=0.0;
 var dknum=0;

 $.each(result.features, function (index, val) {
 geom=val.geometry;
 dkArae+=executeSplit(geom,geometry);
 dknum++;
 });

 var kbArae=bxArae-dkArae;
 result["bxArae"]=bxArae;
 result["dkArae"]=dkArae;
 result["kbArae"]=kbArae;
 result["dknum"]=dknum;

 $("#showHtml").html("框选面积："+bxArae.toFixed(2)+"㎡<br/>地块面积："+dkArae.toFixed(2)+"㎡<br/>空白面积："+kbArae.toFixed(2)+"㎡<br/><br/>地块数量："+dknum+"个<br/>");

 } else {
 console.log('空间查询失败');
 }
 }
 });

 };

 //格式化测量面积
 function getArea(geometry) {
 var area = geometry.getArea();
 var inPerDisplayUnit = ol.i.INCHES_PER_UNIT["m"];
 if(inPerDisplayUnit) {
 var inPerMapUnit = OpenLayers.INCHES_PER_UNIT[this.map.units];
 area *= Math.pow((inPerMapUnit / inPerDisplayUnit), 2);
 }
 return area;
 }

 var wktFormat = new OpenLayers.Format.WKT();
 var wpsFormat = new OpenLayers.Format.WPSExecute();
 var GeoJSON = new OpenLayers.Format.GeoJSON();
 /!**
 * 计算两个图形相交部分
 * @param a
 * @param b
 * @returns {number}
 *!/
 function executeSplit(a, b) {

 //console.log(GeoJSON.write(a));
 //console.log(GeoJSON.write(b));

 /!**
 * This data structure can be derived from the DescribeProcess request.
 *!/
 var doc = this.wpsFormat.write({
 identifier: "geo:intersection",
 dataInputs: [{
 identifier: "a",
 data: {

 }
 complexData: {
 mimeType: "application/json",
 value: GeoJSON.write(a)
 }
 }
 }, {
 identifier: "b",
 data: {
 complexData: {
 mimeType: "application/json",
 value: GeoJSON.write(b)
 }
 }
 }],
 responseForm: {
 rawDataOutput: {
 mimeType: "application/wkt",
 identifier: "result"
 }
 }
 });

 var ara=0.0;
 /!**
 * Post the request and expect success.  Failure case could be handled.
 *!/
 ol.Request.issue({
 method:"post",
 async:false,
 url: main_url+"/wps",
 data: doc,
 success: function(response) {
 var features = wktFormat.read(response.responseText);
 ara+=getArea(features.geometry);
 handleSuccess(features);
 }
 });
 return ara;
 }

 /!**
 * 展示相交图层
 * @param response
 *!/
 function handleSuccess(features) {
 //if (features) {
 //	multi.addFeatures([features]);
 //}
 }*/
