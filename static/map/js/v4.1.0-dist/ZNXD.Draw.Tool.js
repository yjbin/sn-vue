/**Bym
 * 注册地图绘制命名空间
 */
Namespace.register("ZNXD.Draw");
/**bym
 * 地图绘制封装开始**/
var drawGraphics=null;
ZNXD.Draw.drawGraphics=function(opt_options){
    drawGraphics=this;
    ZNXDWEBGIS.drawGraphics=this;
    var options = opt_options ? opt_options : {};
    this.map=options.map?options.map:ZNXDWEBGIS.map;
    this.drawLayer=options.drawLayer?options.drawLayer:ZNXDWEBGIS.drawLayer;

    var tools=["point","line","polygon","circle","diamond","rectangle"];
    var names={"point":"点","line":"线","polygon":"多边形","circle":"圆形","diamond":"菱形","rectangle":"矩形"};

    if(document.getElementById("tool_container")){
        var toolList=document.getElementById("toolList");
        if(!document.getElementById("pLi")) {
            var li = document.createElement("li");
            li.className = "Point";
            li.setAttribute("id", "pLi");
            var a = document.createElement("a");
            a.className = "Pointbg";
            a.setAttribute("href", "javascript:void(0)");
            a.setAttribute("id", "bPoints");
            a.innerHTML = "<span class='marker'></span>标注";
            li.appendChild(a);
            var more = document.createElement("span");
            more.className = "raang_more";
            li.appendChild(more);
            var ul1 = document.createElement("ul");
            ul1.setAttribute("id", "plotDiv");
            ul1.style.display = "none";
            for (var i = 0; i < tools.length; i++) {
                var lli = document.createElement("li");
                lli.setAttribute("id", tools[i]);
                var a = document.createElement("a");
                a.setAttribute("href", "javascript:void(0);");
                a.style.borderBottom = "none";
                a.innerHTML = "<span class=\"bpolylabel\"></span>" + names[tools[i]] + "</a>";
                lli.appendChild(a);
                lli.addEventListener("click", drawGraphics.drawGraphic);
                ul1.appendChild(lli);
            }
            li.appendChild(ul1);
            li.addEventListener("mouseover", function () {
                $("#plotDiv").show();
                event.stopPropagation();
            });
            li.addEventListener("mouseleave", function () {
                $("#plotDiv").hide();
                event.stopPropagation();
            });
            toolList.appendChild(li);
            var line = document.createElement("li");
            line.className = "publine";
            toolList.appendChild(line);
        }
    }else{
        var map=document.getElementById("map");
        var toolContainer=document.createElement("div");
        toolContainer.className="allrttop";
        toolContainer.setAttribute("id","tool_container");
        var alright_top_rt=document.createElement("div");
        alright_top_rt.className="alright_top_rt";
        toolContainer.appendChild(alright_top_rt);
        var ul=document.createElement("ul");
        ul.setAttribute("id","toolList");
        var li = document.createElement("li");
        li.className = "Point";
        li.setAttribute("id", "pLi");
        var a = document.createElement("a");
        a.className = "Pointbg";
        a.setAttribute("href", "javascript:void(0)");
        a.setAttribute("id", "bPoints");
        a.innerHTML = "<span class='marker'></span>标注";
        li.appendChild(a);
        var more = document.createElement("span");
        more.className = "raang_more";
        li.appendChild(more);
        var ul1 = document.createElement("ul");
        ul1.setAttribute("id", "plotDiv");
        ul1.style.display = "none";
        for (var i = 0; i < tools.length; i++) {
            var lli = document.createElement("li");
            lli.setAttribute("id", tools[i]);
            var a = document.createElement("a");
            a.setAttribute("href", "javascript:void(0);");
            a.style.borderBottom = "none";
            a.innerHTML = "<span class=\"bpolylabel\"></span>" + names[tools[i]] + "</a>";
            lli.appendChild(a);
            lli.addEventListener("click", drawGraphics.drawGraphic);
            ul1.appendChild(lli);
        }
        li.appendChild(ul1);
        li.addEventListener("mouseover", function () {
            $("#plotDiv").show();
            event.stopPropagation();
        });
        li.addEventListener("mouseleave", function () {
            $("#plotDiv").hide();
            event.stopPropagation();
        });
        ul.appendChild(li);
        alright_top_rt.appendChild(ul);
        map.parentNode.insertBefore(toolContainer,map);
        var line=document.createElement("li");
        line.className="publine";
        ul.appendChild(line);
    }
}

ZNXD.Draw.drawGraphics.prototype.draw=null;

ZNXD.Draw.drawGraphics.prototype.drawGraphic=function(){
    ZNXDWEBGIS.baseTool.closeAllEvent();
    var geometryFunction, shapeName, maxPoints;
    switch ($(this).text()) {
        case "点":
            shapeName = 'Point';
            break;
        case "线":
            shapeName = 'LineString';
            break;
        case "多边形":
            shapeName = 'Polygon';
            break;
        case "圆形":
            shapeName = 'Circle';
            break;
        case "菱形":
            shapeName = 'Circle';
            geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
            break;
        case "矩形":
            shapeName = 'LineString';
            maxPoints = 2;
            geometryFunction = function(coordinates, geometry) {
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            };
            break;
    }

    drawGraphics.draw = new ol.interaction.Draw({
        source: drawGraphics.drawLayer.getSource(),
        type: /** @type {ol.geom.GeometryType} */ (shapeName),
        geometryFunction: geometryFunction,
        maxPoints: maxPoints
    });
    drawGraphics.map.addInteraction(drawGraphics.draw); //增加的交互
}

ZNXD.Draw.drawGraphics.prototype.closeDrawGraphic=function(){
    drawGraphics.map.removeInteraction(drawGraphics.draw); //点击选择时候  取消绘图交互
}

ZNXD.Draw.drawGraphics.prototype.clearAll=function(){
    drawGraphics.drawLayer.getSource().clear();
}
/**绘制图封装结束**/