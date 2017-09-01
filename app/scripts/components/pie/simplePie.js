/**
 * Created by pascal on 28/08/17.
 */

this.simplePie = function(){


  var svg = d3.select("#coteDroitCercles"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("class","simplePie").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

  var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  d3.csv("./simplePie.csv", function(d) {
    d.population = +d.population;
    return d;
  }, function(error, data) {
    if (error) throw error;

    var arc = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); });

    arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.age; });
  });

}
