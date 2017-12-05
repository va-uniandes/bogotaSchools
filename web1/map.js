function drawMap()
{
    var width = 850,
    height = 850,
    active = d3.select(null);
var projection = d3.geo.mercator()
  .scale(130000)
  .rotate([74.11,-4.65])
    .translate([width / 2, height / 2]);
  
var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 25])
    .on("zoom", zoomed);
var path = d3.geo.path()
    .projection(projection)
    .pointRadius(0.7);
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("click", stopped, true)
	.on("mousemove", movido);
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);
var g = svg.append("g");
svg
    .call(zoom) // delete this line to disable free zooming
    .call(zoom.event);

var nEscala = 1.0;
var nEstado = 1;
var screenPos;
var mousePos;
 	
var symbolCrossGen    = d3.symbol().size(0.3).type(d3.symbolCross);
var symbolDiamondGen  = d3.symbol().size(0.15).type(d3.symbolDiamond);
var symbolSquareGen   = d3.symbol().size(0.15).type(d3.symbolSquare);
var symbolCircleGen   = d3.symbol().size(0.15).type(d3.symbolCircle);
var symbolSquareHoGen = d3.symbol().size(0.10).type(d3.symbolSquare);
var symbolTriangleGen = d3.symbol().size(0.10).type(d3.symbolTriangle);


  
d3.json("localidades_lite.topo.json", function(error, us) {
  if (error) throw error;
    
  g.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .on("click", clicked);
  
  
});

  
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

d3.json("localidades_lite.topo.json", function(error, us) {
  if (error) throw error;
  
    g.selectAll(".mesh")
		.data(topojson.feature(us, us.objects.states).features)
    .enter()
		.append("path")
    .attr("class", function(d) { return "mesh"; })
    .attr("d", path)
    ;   
});  
	  
  });




function grupoColocarNodos() {
//Entre más abajo, más prioridad en impresión 
colocarNodos('hurtovehiculos.json','nodohuv'    , symbolTriangleGen(), false);
colocarNodos('hurtopersonas.json','nodohup'    , symbolTriangleGen(), false);
colocarNodos('homicidiostotal.json','nodoho'    , symbolSquareHoGen(), false);  
colocarNodos('cambuches.json'   , 'nodoca'     , symbolSquareGen(), false);
colocarNodos('prostitucion.json', 'nodop'      , symbolDiamondGen(), false);
colocarNodos('bares.json'       , 'nodobar'    , symbolCircleGen(), false);  
}

function grupoRemoverNodos() {
      g.selectAll(".nodohuv").selectAll("path").remove();
      g.selectAll(".nodohuv").selectAll("title").remove();
      g.selectAll(".nodohuv").remove();
      g.selectAll(".nodohup").selectAll("path").remove();
      g.selectAll(".nodohup").selectAll("title").remove();
      g.selectAll(".nodohup").remove();
      g.selectAll(".nodoho").selectAll("path").remove();
      g.selectAll(".nodoho").selectAll("title").remove();
      g.selectAll(".nodoho").remove();
      g.selectAll(".nodoca").selectAll("path").remove();
      g.selectAll(".nodoca").selectAll("title").remove();
      g.selectAll(".nodoca").remove();
      g.selectAll(".nodop").selectAll("path").remove();
      g.selectAll(".nodop").selectAll("title").remove();
      g.selectAll(".nodop").remove();
      g.selectAll(".nodobar").selectAll("path").remove();
      g.selectAll(".nodobar").selectAll("title").remove();
      g.selectAll(".nodobar").remove();
}


colocarNodos('colegios.json'    , 'nodocolegio', symbolCrossGen(), true);

var nConst = 0.0095;

function colocarNodos_ant(jsonfile, nombrenodo, symbGen, bMostrar) {
 d3.json(jsonfile, function(error, mapData) {
  if (error) throw error;
  
    var nodo_inst = g.selectAll("."+nombrenodo)
		.data(mapData.features)
    .enter()
    .append("g")
    .filter(function(d) { 

	var bSal = false;
	  
	  if (mousePos) {
	     var longLatMouse = projection.invert(mousePos);
	     
		 
		 var xabs = d.geometry.coordinates[0] - longLatMouse[0];
		 var yabs = d.geometry.coordinates[1] - longLatMouse[1];
		 var radio = Math.sqrt(xabs*xabs + yabs*yabs);
		 
		 bSal = radio <= nConst && nEscala > 9.0;
	  }
	  
	  bSal = bSal || bMostrar;
      return bSal; 
    })
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

function permitir(d, bMostrar) { 

	var bSal = false;
	  
	  if (mousePos) {
	     var longLatMouse = projection.invert(mousePos);
	     
		 
		 var xabs = d.geometry.coordinates[0] - longLatMouse[0];
		 var yabs = d.geometry.coordinates[1] - longLatMouse[1];
		 var radio = Math.sqrt(xabs*xabs + yabs*yabs);
		 
		 bSal = radio <= nConst && nEscala > 9.0;
	  }
	  
	  bSal = bSal || bMostrar;
      return bSal; 
}

function colocarNodos(jsonfile, nombrenodo, symbGen, bMostrar) {
oboe(jsonfile)
   .node('features.*', function( mapData ){
   
    if (permitir(mapData,bMostrar)) {  
	
    var nodo_inst = g.append("g")
    .attr("class", nombrenodo)
    .attr("transform", "translate(" + projection(mapData.geometry.coordinates)[0] + "," + projection(mapData.geometry.coordinates)[1] + ")");
  
    nodo_inst.append("path")
    .attr("d", symbGen)
    ;
  
    nodo_inst.append("title")
    .text(mapData.properties.title)
    ;
	
	}
	
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
  nEscala = d3.event.scale;
  screenPos = d3.event.translate;

  

  
  if (nEscala >= 9 && nEstado == 1) {
      nEstado = 2;
	  grupoColocarNodos();
  }
  else if (nEscala < 9 && nEstado == 2) {
      nEstado = 1;
	  grupoRemoverNodos();
  }

  g.style("stroke-width", 1.5 / d3.event.scale + "px");
  g.style("point-radius", 1.5 / d3.event.scale + "px");
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}
function movido() {
   if (nEstado == 1) {
      mousePos = d3.mouse(g.node());
      
   }
}
}