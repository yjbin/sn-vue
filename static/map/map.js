var mapId;
var gps;
// $("#oldId").val("gis_sxpolygons.5");
// if(!window.sessionStorage.getItem("gpsId")){
//     changeBegin([1,2,3]); 
// }else{
//     newgpsId = window.sessionStorage.getItem("gpsId");
//     changeBegin([1,2,3],"0",newgpsId,"edit");
// }

function changeBegin(EditType,status,gpsId,flag) {
    
    var oldId = $("#oldId").val()//修改图形传过来的图形Id
    oldId=gpsId?gpsId:oldId;
    var type=EditType?EditType:[1,2,3];
    var layersVector=[];
    var addType=[];
    for(var i=0;i<type.length;i++){
        switch (type[i]){
            case 1:sourceVector.clear();layersVector.push(sourceVector);
                addType.push("add_location"); break;
            case 2:sourceLineVector.clear();layersVector.push(sourceLineVector);
                addType.push("timeline"); break;
            case 3:sourcePolyonVector.clear();layersVector.push(sourcePolyonVector);
                addType.push("signal_cellular_null"); break;
            default:sourcePolyonVector.clear();layersVector.push(sourcePolyonVector);
                addType.push("signal_cellular_null");break;
        }
    }
    if(ZNXDWEBGIS.selectedFeatures!=null)
        ZNXDWEBGIS.selectedFeatures.clear();
    if(ZNXDWEBGIS.overlay!=null)
        ZNXDWEBGIS.overlay.setPosition(undefined);

    if(!flag||flag=="new"){
        ZNXDWEBGIS.map = null;
        status="0";
        mapId=null;
    }
    addType.push('pp_edit', 'delete_forever', 'save', 'cancel', "kuangxuan", "dianxuan")
    if (gpsId != null) {
        mapId = gpsId;
        if (ZNXDWEBGIS.map == null) {
            if (status !== "0" && status !== null) {
                renderMap(addType, "2");
            } else {
                mapId = oldId;
                renderMap(addType);
                if((mapId+"").includes("point")){
                    editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsFeatureTyp;
                }else{
                    editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsPolyonFeatureTyp;
                }
            }
        } else {
            if(editWFSFeature){
                editWFSFeature.addFeatureArray=new Array();
                editWFSFeature.updateFeatureArray=new Array();
                editWFSFeature.deleteFeatureArray=new Array();
                editWFSFeature.selectFeatureList=new Array();
            }
            if (status !== "0" && status !== null) {
                $("#wfsTool").hide();
                $("#selected").hide();
            } else {
                if((mapId+"").includes("point")){
                    editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsFeatureTyp;
                }else{
                    editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsPolyonFeatureTyp;
                }
                // editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsPolyonFeatureTyp;
                $("#wfsTool").show();
                $("#selected").show();
            }
        }
    } else {
        if (ZNXDWEBGIS.map == null) {
            if(editWFSFeature){
                editWFSFeature.addFeatureArray=new Array();
                editWFSFeature.updateFeatureArray=new Array();
                editWFSFeature.deleteFeatureArray=new Array();
                editWFSFeature.selectFeatureList=new Array();
            }
            mapId = oldId;
            renderMap(addType);
            if((mapId+"").includes("point")){
                editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsFeatureTyp;
            }else{
                editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsPolyonFeatureTyp;
            }
            // editWFSFeature.wfsFeatureTyp = ZNXDWEBGIS.wfsPolyonFeatureTyp;
        }
    }

};
$("#oldId").on("input propertychange change", function(e) {
    if(editWFSFeature.wfsFeatureTyp){
        ZNXDWEBGIS.wfsLayer.setVisible(false);
        ZNXDWEBGIS.wfsPolyonLayer.setVisible(false);
        ZNXDWEBGIS.wfsLineLayers.setVisible(false)
        if(editWFSFeature.wfsFeatureTyp.includes("polygon")){
            ZNXDWEBGIS.wfsPolyonLayer.setVisible(true);
        }else  if(editWFSFeature.wfsFeatureTyp.includes("point")){
            ZNXDWEBGIS.wfsLayer.setVisible(true);
        }else  if(editWFSFeature.wfsFeatureTyp.includes("polyline")){
            ZNXDWEBGIS.wfsLineLayers.setVisible(true);
        }
    }
});