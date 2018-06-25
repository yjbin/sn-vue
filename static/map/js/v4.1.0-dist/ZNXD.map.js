/**Bym
 * 注册地图命名空间
 */
Namespace.register("ZNXD.map");
ZNXD.map=function(opt_option){
    var options=opt_option!=null?opt_option:{};
    var target = options.target ? options.target : "map";
    var zoom=options.zoom ? options.zoom : ZNXDWEBGIS.zoom;
    var center=options.center ? options.center : ZNXDWEBGIS.center;
    var projection=options.projection ? options.projection : ZNXDWEBGIS.srcProjection;
    var isShow=options.isShow ? options.isShow : "0";

    var layers=[tiandituLayer,tian_di_tu_annotation,drawLayer,ZNXDWEBGIS.wfsPolyonLayer,ZNXDWEBGIS.wfsLineLayer,ZNXDWEBGIS.wfsLayer];
    if(isShow=="1"){
        layers=[tiandituLayer,tian_di_tu_annotation];
    }

    $("#map").html("");

   var map = new ol.Map({
        target: target, //div#id='map'
        layers:layers, //添加两个图层
        view: new ol.View({
            projection: projection,
            center:center,
            zoom: zoom
        }),
       logo:false
    });
    //createLayerManager(map,"绘制图层");
    ZNXDWEBGIS.map=map;
    return map;
}