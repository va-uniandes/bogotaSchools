function drawMap()
{
    var width = 500,
    height = 700,
    active = d3.select(null);
var projection = d3.geo.mercator()
  .scale(75000)
  .rotate([74.0712581087617,-4.61742011111319])
    .translate([width / 2, height / 2]);
  
var zoom = d3.behavior.zoom()
    .translate([-75.22022531844982, -254.6184281050546])
    .scale(1.741101126592249)
    .scaleExtent([1, 25])
    .on("zoom", zoomed);
var path = d3.geo.path()
    .projection(projection)
    .pointRadius(0.7);
//var svg = d3.select("body").append("svg")
  var svg = d3.select("#svgmapa")
    .attr("width", width)
    .attr("height", height)
    .on("click", stopped, true);
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);
var g = svg.append("g");
svg
    .call(zoom) // delete this line to disable free zooming
    .call(zoom.event);
  
var symbolCrossGen    = d3.symbol().size(0.3).type(d3.symbolCross);
var symbolDiamondGen  = d3.symbol().size(0.15).type(d3.symbolDiamond);
var symbolSquareGen   = d3.symbol().size(0.15).type(d3.symbolSquare);
var symbolCircleGen   = d3.symbol().size(0.15).type(d3.symbolCircle);
var symbolSquareHoGen = d3.symbol().size(0.10).type(d3.symbolSquare);
var symbolTriangleGen = d3.symbol().size(0.10).type(d3.symbolTriangle);

/*d3.json("ejesviales.json", function(error4, ejesviales) {
  if (error4) throw error4;  
d3.json("bares.topo.json", function(error3, bares) {
  if (error3) throw error3;
d3.json("colegios.topo.json", function(error2, colegios) {
  if (error2) throw error2;*/
  
d3.json("localidades.topo.json", function(error, us) {
  if (error) throw error;
    
  g.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .on("click", clicked);
  
  /*g.append("path")
      .datum(topojson.mesh(ejesviales, ejesviales.objects.ejesviales))
      .attr("class", "calles")
      .attr("d", path)
      ;  */
 
  /*g.append("path")
      .datum(topojson.mesh(us, us.objects.states))
      .attr("class", "mesh")
      .attr("d", path)
      ; */
  
  /*g.append("path")
      .datum(topojson.feature(bares, bares.objects.bares))
      .attr("class", "points")
      .attr("d", path)
      .style("fill","rgb(255,0,0)");  
  
  g.append("path")
      .datum(topojson.feature(colegios, colegios.objects.colegios))
      .attr("class", "points")
      .attr("d", path)
      //.style("stroke","rgb(0,0,0)")
      //.attr("d", symbolGen())
      ;  */
});
/*});
});
});*/
  
  d3.json('ejesviales.json', function(error, mapData) {
    if (error) throw error;

 
      var eje_inst = g.selectAll(".calles")
		  .data(mapData.features)
      .enter()
		  .append("path")
      .attr("class", function(d) { return "calles"; })
      .attr("d", path)
      ; 
  
      eje_inst.append("title")
      .text(function(d) { return d.properties.title; })
      ;  
  });

d3.json("localidades.topo.json", function(error, us) {
  if (error) throw error;
  
    g.selectAll(".mesh")
		.data(topojson.feature(us, us.objects.states).features)
    .enter()
		.append("path")
    .attr("class", function(d) { return "mesh"; })
    .attr("d", path)
    ;   
});  

/*d3.json('bares.json', function(error, mapData) {
  if (error) throw error;
  
    var bar_inst = g.selectAll(".nodobar")
		.data(mapData.features)
    .enter()
		.append("circle")
    .attr("class", function(d) { return "nodobar"; })
		.attr("cx", function (d) { 
    //console.log("D|"+projection(d.geometry.coordinates)+"|");
  return projection(d.geometry.coordinates)[0]; })
		.attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
		.attr("r", "0.7px")
		.attr("fill", "red")  
    ; 
  
    bar_inst.append("title")
    .text(function(d) { return d.properties.title; })
    ; 
});*/

  
/*d3.json('colegios.json', function(error, mapData) {
  if (error) throw error;*/

  //SUCCESS
    /*g.selectAll("circle")
		.data(mapData.features)
    .enter()
		.append("circle")
		.attr("cx", function (d) { console.log("D|"+projection(d.geometry.coordinates)+"|"); return projection(d.geometry.coordinates)[0]; })
		.attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
		.attr("r", "0.7px")
		.attr("fill", "red")  
    ;*/
  
/*    var node = g.selectAll(".nodocolegio")
    .data(mapData.features)
    .enter().append("g")
    .attr("class", function(d) { 
      return "nodocolegio"; })
    .attr("transform", function(d) { 
      return "translate(" + projection(d.geometry.coordinates)[0] + "," + projection(d.geometry.coordinates)[1] + ")"; });
  
		node.append("path")
    .style("stroke","rgb(0,0,0)")
    .attr("d", symbolCrossGen())
    ;
  
    node.append("title")
    .text(function(d) { return d.properties.title; })
    ;  
});*/

//Entre más abajo, más prioridad en impresión 
//colocarNodos('hurtovehiculos.json','nodohuv'    , symbolTriangleGen());
//colocarNodos('hurtopersonas.json','nodohup'    , symbolTriangleGen());
//colocarNodos('homicidiostotal.json','nodoho'    , symbolSquareHoGen());  
colocarNodos('cambuches.json'   , 'nodoca'     , symbolSquareGen());
colocarNodos('prostitucion.json', 'nodop'      , symbolDiamondGen());
colocarNodos('bares.json'       , 'nodobar'    , symbolCircleGen());  
colocarNodos('colegios.json'    , 'nodocolegio', symbolCrossGen());


function colocarNodos(jsonfile, nombrenodo, symbGen) {
 d3.json(jsonfile, function(error, mapData) {
  if (error) throw error;
  
    var nodo_inst = g.selectAll("."+nombrenodo)
		.data(mapData.features)
    .enter().append("g")
    .attr("class", function(d) { 
      return nombrenodo; })
    .attr("transform", function(d) { 
      return "translate(" + projection(d.geometry.coordinates)[0] + "," + projection(d.geometry.coordinates)[1] + ")"; });
  
		nodo_inst.append("path")
    .attr("d", symbGen)
    ;
  
    nodo_inst.append("title")
    .text(function(d) { return d.properties.title; })
    ;
 }); 
}
  
function clicked(d) {
  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);
  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
      translate = [width / 2 - scale * x, height / 2 - scale * y];
  svg.transition()
      .duration(750)
      .call(zoom.translate(translate).scale(scale).event);
}
function reset() {
  active.classed("active", false);
  active = d3.select(null);
  svg.transition()
      .duration(750)
      .call(zoom.translate([0, 0]).scale(1).event);
}
function zoomed() {
  g.style("stroke-width", 1.5 / d3.event.scale + "px");
  g.style("point-radius", 1.5 / d3.event.scale + "px");
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}
  
}