/**Bym
 * 注册地图配置命名空间
 * @type {Object}
 */
var Namespace = new Object();
Namespace.register = function (path) {
    var arr = path.split(".");
    var ns = "";
    for (var i = 0; i < arr.length; i++) {
        if (i > 0) ns += ".";
        ns += arr[i];
        eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
    }
};

var map,editWFSFeature,mapId;

var ZNXDWEBGIS = {
    map:null,
    wfsLayer:null,//wfs图层
    drawLayer:null,//绘制图层
    drawGraphics:null,//编辑控件
    baseTool:null,//基础控件
    measureTool:null,//测量控件
    thematicMap:null,//图标控件
    zoom:13, //初始化级别
    ol3d:null,//3D视图实例
    ol3dEnabled:false,//3D视图开关
    /*******/
    selectClick:null,
    dragBox:null,
    container:null,
    content:null,
    title:null,
    overlay:null,
    selectedFeatures:null,
    wfsPolyonLayer:null,
	wfsLineLayers:null,
    addLayer:null,
    // geoserverurl: "http://222.186.144.37:38002/geoserver",//http://222.186.144.37:38002/geoserver http://gis.zjnzjg.cn/geoserver
    geoserverurl: "http://106.3.43.154:17080/geoserver",//http://222.186.144.37:38002/geoserver
    // wfsServerUrl: "http://222.186.144.37:38002/geoserver/geolytix_wfs", //http://localhost:9999/geoserver
    wfsServerUrl: "http://106.3.43.154:17080/geoserver/geolytix_wfs", //http://localhost:9999/geoserver
    wfsFeatureTyp: "gis_sxpoints",//正式库表：GIS_ZJPOINTS 测试库表：GIS_ZJPOINT
    wfsPolyonFeatureTyp: "gis_sxpolygons",//正式库表：GIS_ZJPOLYGON_XG  测试库表：GIS_ZJPOLYGONS
    wfsLineFeatureTyp: "gis_sxpolylines",
    wfsOverlapFeatureTyp: "gis_sxpolygons", //正式库表：GIS_OVERLAPDBS_XG  测试库表：GIS_OVERLAPDBS
    namespace: "geolytix_wfs",
    namespaceuri: "geolytix_wfs",//对应Server中工作空间的统一资源标识符,以此唯一标识工作空间
    extent:[-20037508.342789244,-20037508.342789244,20037508.342789244,20037508.342789244],
    bounds: [-180.0, -90.0, 180.0, 90.0],//地图范围
    center: [119.430336,32.195902],//地图中心点:北京 3857
    formatWKT: new ol.format.WKT(),
    // projection: "EPSG:3857",//默认坐标系
    formatWFS: new ol.format.WFS(),
    formatJSON: new ol.format.GeoJSON(),
    srcProjection: "EPSG:4326",//源坐标系
    toProjection: "EPSG:3857"//目标坐标系
};


var projection = ol.proj.get(ZNXDWEBGIS.srcProjection);
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(21);
var matrixIds = new Array(21);
for (var z = 0; z < 21; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

var tiandituLayer=new ol.layer.Tile({
    title: '天地图',
    type: 'base',
    visible: true,
    matrixSet: ZNXDWEBGIS.srcProjection,
    format: 'image/png',
    source: new ol.source.WMTS({
        url: "http://t0.tianditu.com/vec_c/wmts",
        layer: "vec",
        matrixSet: "c",
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
        }),
        format: "tiles",
        style: "default"
    })
});

var tian_di_tu_annotation = new ol.layer.Tile({
    title: "天地图文字标注",
    source: new ol.source.XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
    })
});

var tempSourceVector = new ol.source.Vector({
    projection:ZNXDWEBGIS.srcProjection
});

var drawSourceVector = new ol.source.Vector({
    projection:ZNXDWEBGIS.srcProjection
});

var drawLayer=new ol.layer.Vector({
    title: 'Draw图层',
    extent:ZNXDWEBGIS.bounds,
    source: drawSourceVector,
    style: function(feature) {
        return getStyle(feature,"");
    }
});
/**
 * 加载本地geoserver WFS面图层
 * @type {ol.source.Vector}
 **/
var sourcePolyonVector = new ol.source.Vector({
    projection:ZNXDWEBGIS.srcProjection,
    loader: function (extent) {
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
        }).done(function (response) {//AREA
            console.log("wfs面加载成功！");
            var features=ZNXDWEBGIS.formatJSON.readFeatures(response);
            var tf=new Array();
            //console.log(mapId);
            if(mapId!=null){
                for(var i=0;i<features.length;i++){
                    var f=features[i];
                    var id= f.getId();
                    if(id==mapId)
                        tf.push(f);
                }
            }
            if(tf.length>0)
                sourcePolyonVector.addFeatures(tf);
            //计算每个图形中心点
            var extents=sourcePolyonVector.getExtent();
            var center=[(extents[0]+extents[2])/2,(extents[1]+extents[3])/2];
            //console.log(isNaN(center[0]));
            if(!isNaN(center[0]))
                ZNXDWEBGIS.map.getView().setCenter(center);//图形展示每次都显示在地图中心位置
        });
    },
    strategy: ol.loadingstrategy.bbox
});

ZNXDWEBGIS.wfsPolyonLayer= new ol.layer.Vector({
    title: 'WFS面图层',
    extent:ZNXDWEBGIS.bounds,
    source: sourcePolyonVector,
    style: function(feature) {
        return getStyle(feature,"");
    }
});

/**
 * 加载本地geoserver WFS图层
 * @type {ol.source.Vector}
 **/
var sourceVector = new ol.source.Vector({
    projection:ZNXDWEBGIS.srcProjection,
    loader: function (extent) {
        $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
            type: 'GET',
            dataType:"json",
            data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: ZNXDWEBGIS.wfsFeatureTyp,
                srsname: ZNXDWEBGIS.srcProjection,
                bbox: extent.join(',') + ',' + ZNXDWEBGIS.srcProjection,
                outputFormat:"application/json"
            }
        }).done(function (response) {//AREA
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
    },
    strategy: ol.loadingstrategy.bbox
});

ZNXDWEBGIS.wfsLayer= new ol.layer.Vector({
    title: 'WFS图层',
    extent:ZNXDWEBGIS.bounds,
    source: sourceVector,
    style: function(feature) {
        return getStyle(feature,"");
    }
});

/**
 * 加载本地geoserver WFS线图层
 * @type {ol.source.Vector}
 **/
var sourceLineVector = new ol.source.Vector({
    projection:ZNXDWEBGIS.srcProjection,
    loader: function (extent) {
        $.ajax(ZNXDWEBGIS.wfsServerUrl + '/ows', {
            type: 'GET',
            dataType:"json",
            data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: ZNXDWEBGIS.wfsLineFeatureTyp,
                srsname: ZNXDWEBGIS.srcProjection,
                bbox: extent.join(',') + ',' + ZNXDWEBGIS.srcProjection,
                outputFormat:"application/json"
            }
        }).done(function (response) {//AREA
            console.log("wfs线加载成功！");
            var features=ZNXDWEBGIS.formatJSON.readFeatures(response);
            sourceLineVector.addFeatures(features);
        });
    },
    strategy: ol.loadingstrategy.bbox
});

ZNXDWEBGIS.wfsLineLayer= new ol.layer.Vector({
    title: 'WFS线图层',
    extent:ZNXDWEBGIS.bounds,
    source: sourceLineVector,
    style: function(feature) {
        return getStyles(feature,"line");
    }
});

function getStyle(feature,flag){

    // hide geoMarker if animation is active
    var white = [255, 255, 255, 1];
    var blue = [0, 153, 255, 1];
    var width = 1;
    var style=[
        new ol.style.Style({
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0.5]
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: white,
                width: 1
            })
        }),
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: blue,
                width: width
            })
        })
    ];

    var srcImag="./images/drawGraph/tool/weizhi.png";
    if(flag=="select")
        srcImag="./images/drawGraph/tool/icon.png";
    else if(flag=="search")
        srcImag="./images/drawGraph/tool/wz.png";

    if (feature.get('geometry') instanceof ol.geom.Point) {
        style=new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src:srcImag
            })
        });
    }

    return style;

}

/**
 * 计算两个图形相交部分
 * @param a
 * @param b
 * @returns {number}
 */
function executeSplit(a, b) {

    var ps='<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">'+
        '<ows:Identifier>geo:intersection</ows:Identifier>'+
        '<wps:DataInputs>'+
        '<wps:Input>'+
        '<ows:Identifier>a</ows:Identifier>'+
        '<wps:Data>'+
        '<wps:ComplexData mimeType="application/wkt"><![CDATA['+ZNXDWEBGIS.formatWKT.writeGeometry(a).toString()+']]></wps:ComplexData>'+
        '</wps:Data>'+
        '</wps:Input>'+
        '<wps:Input>'+
        '<ows:Identifier>b</ows:Identifier>'+
        '<wps:Data>'+
        '<wps:ComplexData mimeType="application/wkt"><![CDATA['+ZNXDWEBGIS.formatWKT.writeGeometry(b).toString()+']]></wps:ComplexData>'+
        '</wps:Data>'+
        '</wps:Input>'+
        '</wps:DataInputs>'+
        '<wps:ResponseForm>'+
        '<wps:RawDataOutput mimeType="application/wkt">'+
        '<ows:Identifier>result</ows:Identifier>'+
        '</wps:RawDataOutput>'+
        '</wps:ResponseForm>'+
        '</wps:Execute>';

    var feature=null;

    //console.log("计算相交图形及面积");
    $.ajax({
        method:"post",
        url:ZNXDWEBGIS.geoserverurl+"/wps",
        async:false,
        contentType: 'text/xml',
        data: ps,
        dataType:"text",
        success: function(response) {
            if(response!="POLYGON EMPTY"){
                var f = ZNXDWEBGIS.formatWKT.readFeature(response);
                var ara=formatArea(f.getGeometry());
                f.set("area",ara)
                feature=f;
            }
        },
        error:function(data){
            //console.log(data);
        }
    });
    return feature;
}

//格式化测量面积
var wgs84Sphere = new ol.Sphere(6378137);
var formatArea = function(polygon) {
    var area;
    var sourceProj = ZNXDWEBGIS.map.getView().getProjection();
    var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(sourceProj, 'EPSG:4326'));
    var coordinates = geom.getLinearRing(0).getCoordinates();
    area = Math.abs(wgs84Sphere.geodesicArea(coordinates));

    var output;
    //if (area > 10000) {
    //    output = (Math.round(area / 1000000 * 100) / 100);
    //} else {
    output = (Math.round(area * 100) / 100);
    //}
    return output;
};

var isLayer=function(layer){

    var layers=ZNXDWEBGIS.map.getLayers().getArray();

    var flag=false;
    for(var i=0;i<layers.length;i++){

        var l=layers[i];

        if(l.get("title")==layer.get("title")){
            flag=true;
            break;
        }

    }

    return flag;
}