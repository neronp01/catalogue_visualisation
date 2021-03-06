this.multiline_chart_voronoi = function(inputCheck) {
/**
 * Created by pascal on 29/08/17.
 */

  var months,
    monthKeys,
    monthParse = d3.timeParse("%Y-%m");

  var svg = d3.select("#coteDroitCercles"),
    margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 1000,
    height = 500,
    xtran = -500,ytran = -300,

   g1 = svg.append("g").attr("class","chart_line_voronoi").attr("transform", "translate(" +0+ "," + 0+ ")"),


  //   <label id="form" for="show-voronoi">
  //   Show Voronoi
  // <input type="checkbox" id="show-voronoi" disabled>
  // </label>
  //   rect = g1.append("rect")
  //     .attr("id","show-voronoi")
  //     .attr("width",100)
  //     .attr("height",50)
  //     .style("fill","rgb(225,225,225)")
  //     .attr("transform", "translate(" +400+ "," + -410+ ")"),
  //   textRect = g1.append("text")
  //     .attr("transform", "translate(" +414+ "," + -380+ ")"),
  // labelText = textRect
  //   .text("polygones")
  //   .style("fill","#000000"),

    g = g1.append("g").attr("transform", "translate(" +xtran+ "," + ytran+ ")");




  var x = d3.scaleTime()
    .range([0, width]);

  var y = d3.scaleLinear()
    .range([height, 0]);

  var voronoi = d3.voronoi()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.value);
    })
    .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);

  var line = d3.line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.value);
    });

  d3.tsv("./unemployment.tsv", type, function (error, data) {
    if (error) throw error;

    x.domain(d3.extent(months));
    y.domain([0, d3.max(data, function (c) {
      return d3.max(c.values, function (d) {
        return d.value;
      });
    })]).nice();

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("x", 4)
      .attr("y", 0.5)
      .attr("dy", "0.32em")
      .style("text-anchor", "start")
      .style("fill", "#000")
      .style("font-weight", "bold")
      .text("Unemployment Rate");

    g.append("g")
      .attr("class", "cities")
      .selectAll("path")
      .data(data)
      .enter().append("path")
      .attr("d", function (d) {
        d.line = this;
        return line(d.values);
      });

    var focus = g.append("g")
      .attr("transform", "translate(-100,-100)")
      .attr("class", "focus");

    focus.append("circle")
      .attr("r", 3.5);

    focus.append("text")
      .attr("y", -10);

    var voronoiGroup = g.append("g")
      .attr("class", "voronoi");

    voronoiGroup.selectAll("path")
      .data(voronoi.polygons(d3.merge(data.map(function (d) {
        return d.values;
      }))))
      .enter().append("path")
      .attr("d", function (d) {
        return d ? "M" + d.join("L") + "Z" : null;
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

   d3.select(inputCheck)
     .on("click", function() {console.log("click",this.checked);voronoiGroup.classed("voronoi--show", this.checked); });


    function mouseover(d) {
      d3.select(d.data.city.line).classed("city--hover", true);
      d.data.city.line.parentNode.appendChild(d.data.city.line);
      focus.attr("transform", "translate(" + x(d.data.date) + "," + y(d.data.value) + ")");
      focus.select("text").text(d.data.city.name);
    }

    function mouseout(d) {
      d3.select(d.data.city.line).classed("city--hover", false);
      focus.attr("transform", "translate(-100,-100)");
    }
  });

  function type(d, i, columns) {
    if (!months) monthKeys = columns.slice(1), months = monthKeys.map(monthParse);
    var c = {name: d.name.replace(/ (msa|necta div|met necta|met div)$/i, ""), values: null};
    c.values = monthKeys.map(function (k, i) {
      return {city: c, date: months[i], value: d[k] / 100};
    });
    return c;
  }

  return g1;
}
