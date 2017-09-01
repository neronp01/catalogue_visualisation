/**
 * Created by pascal on 02/08/17.
 */
this.getTable = function(table,sett,data){

//d3.select(".table").attr("x",10000).attr("y",10000);
    var margin = {top: -400, right: 0, bottom: 0, left: -200},
        width = 380 - margin.left - margin.right,
        height = 750 - margin.top - margin.bottom;


    var backgroundRect = table.append("rect").attr("class","backgroundRect")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");




var titleRec = table.append("rect").attr("class","titleRec")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom-700)
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
    .attr("fill","rgb(132,132,132)")

var titleText = table.selectAll(".titleText")
    .data(["Canada"])
    .enter()
    .append("text")
    .attr("class","titleText")


var titleLibel = titleText
    .attr("x", width + margin.left + margin.right-225)
    .attr("y", height + margin.top + margin.bottom-715)
    .attr("transform", "translate(" +margin.left+ "," + margin.top + ")")
    .text( function (d) {return d; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "#ffffff");

var colRecCoor = margin.top +50;
var colRec = table.append("rect").attr("class","colRec")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom-700)
        .attr("transform",
            "translate(" + margin.left + "," + colRecCoor + ")")
        .attr("fill","rgb(191,191,191)")


var colRecText = table.selectAll(".colRecText")
        .data(["Date","Open","Close"])
        .enter()
        .append("text")
        .attr("class","colRecText")

var colRecLibel = colRecText
        .attr("x", function(d){
            var position = 0;
            if(d==="Date"){position = -130
            }else if(d==="Close"){
                position = 130
            }else{position=0}
            ;return width + margin.left + margin.right-215+position;})
        .attr("y",height + margin.top + margin.bottom-715+50)
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .text( function (d) {return d; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "rgb(132,132,132)");
    var dataRecCoor = margin.top +75;
    var noRec = 0;
sett.valeur.forEach(function (p1) {
    dataRecCoor += 25;
    var dataRec = table.append("rect").attr("class",function(){return"dataRec RecNo"+noRec;})
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom-700-25)
        .attr("transform",
            "translate(" + margin.left + "," + dataRecCoor + ")")
        .attr("fill",function(){
            if(noRec%2===1){
                return "rgb(240,240,240)";
            }else{return "rgb(255,255,255)";}
        });

    noRec++;
});

var noText =0;
var dataTextCoor = margin.top;
    sett.valeur.forEach(function (p1) {
        dataTextCoor +=25;
        var dataDate = [p1.date];
        var dataOpen = [p1.open];
        var dataClose = [p1.close];

        var dataRecTextDate = table.selectAll(".dataRecText textNo"+noText)
            .data(dataDate)
            .enter()
            .append("text")
            .attr("class",function(){return"dataRecText textNo"+noText;})

        var dataRecLibel = dataRecTextDate
            .attr("x", function(d){
                var position = -130;
                noText++;
                ;return width + margin.left + margin.right-215+position;})
            .attr("y",height + margin.top + margin.bottom-715+55)
            .attr("transform",
                "translate(" + margin.left + "," + dataTextCoor + ")")
            .attr("class",function(){return"dataRecText textNo"+noText;})
            .text(dataDate)
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "rgb(132,132,132)");

        var dataRecTextOpen = table.selectAll(".dataRecText textNo"+noText)
            .data(dataOpen)
            .enter()
            .append("text")
            .attr("class",function(){return"dataRecText textNo"+noText;})

        var dataRecLibel = dataRecTextOpen
            .attr("x", function(d){
                var position = 130;
                noText++;
                ;return width + margin.left + margin.right-215+position;})
            .attr("y",height + margin.top + margin.bottom-715+55)
            .attr("transform",
                "translate(" + margin.left + "," + dataTextCoor + ")")
            .attr("class",function(){return"dataRecText textNo"+noText;})
            .text(dataOpen)
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "rgb(132,132,132)");

        var dataRecTextClose = table.selectAll(".dataRecText textNo"+noText)
            .data(dataOpen)
            .enter()
            .append("text")
            .attr("class",function(){return"dataRecText textNo"+noText;})

        var dataRecLibel = dataRecTextClose
            .attr("x", function(d){
                var position = 0;
                noText++;
                ;return width + margin.left + margin.right-215+position;})
            .attr("y",height + margin.top + margin.bottom-715+55)
            .attr("transform",
                "translate(" + margin.left + "," + dataTextCoor + ")")
            .attr("class",function(){return"dataRecText textNo"+noText;})
            .text(dataClose)
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "rgb(132,132,132)");

    });

}
