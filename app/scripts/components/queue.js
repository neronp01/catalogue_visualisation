/**
 * Created by pascal on 26/07/17.
 */
this.getCodeQueue = function(svg,nodes,x,y) {
    var container = svg.append("g")
        .data(nodes)
        .attr("class","code")
        .attr("x",x)
        .attr("y",y)



    var code = container.selectAll(".codeTextQueue")
        .data(["d3.queue()"])
        .enter()
        .append("text")
        .attr("class","codeTextQueue")
        .attr("x",x)
        .attr("y",y)

        .attr("fill",function (d){

            return "#000000";
        })
        .style("font-size","6px")
        .text(function(d) { return d; });

  // return container;
    }

