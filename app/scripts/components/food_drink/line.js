

//https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f


this.getLineChart = function(v) {
  console.log("test")
// set the dimensions and margins of the graph
    var margin = {top: -100, right: 0, bottom: 0, left: -320},
        width = 380 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;





// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#canadaChartLine")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Get the data


        // format the data
        v.forEach(function (d) {
            d.close = +d.close;
            d.open = +d.open;
        });


        // Scale the range of the data
        x.domain(d3.extent(v, function (d) {
            return d.date;
        }));
        y.domain([0, d3.max(v, function (d) {
            return Math.max(d.close, d.open);
        })]);

        // Add the valueline path.
        svg.append("path")
            .data([v])
            .attr("class", "line close")
            .attr("d", valueline);

 //   https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
        // Add the valueline2 path.
        svg.append("path")
            .data([v])
            .attr("id","lineP")
            .attr("class", "line open")
            .style("stroke", "red")
            .style("stroke-dasharray", ("3, 3"))
            .attr("d", valueline2);

        // Add the X Axis
        svg.append("g")
            .attr("class","xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class","yAxis")
            .call(yAxis);



}
