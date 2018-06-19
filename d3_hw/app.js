// D3 Scatterplot Assignment


  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) 
  {
    svgArea.remove();
  };
// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = 
  {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;
  var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
 // Append SVG element



//grab data from data.csv
d3.csv('data.csv',function (error,data)
 {
   console.log(data)
  //create chart area
  

  //turn data into numbers 
  data.forEach(function(d) {
    d.MedianAge = +d.MedianAge;
    d["YesExcersize%"] = +d["YesExcersize%"];});

//x-axis 
    var xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.MedianAge)-2 , d3.max(data, d => d.MedianAge)])
    .range([0, width]);

    var xAxis = d3.axisBottom(xScale);
    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);


//y axis
    var yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d["YesExcersize%"])-10, d3.max(data, d => d["YesExcersize%"])+10])
      .range([height, 0]);


    // create axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);


      // append axes
      chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width-500)
      .attr("y", height +100)
      .text("Median(Age) Per State");
    
     

      svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", -220)
      .attr("y",20)
      .attr("transform", "rotate(-90)")
      .text("Median(Age) Per State");
  
    var circleData= chartGroup.selectAll("circle")
      .data(data)
      .enter();
  // append circles
  var circlesGroup = circleData
  .append("circle")
  .attr("cx", d => xScale(d.MedianAge))
  .attr("cy", d => yScale(d["YesExcersize%"]))
  .attr("r", "10")
  .attr("fill", "blue")
  .style("opacity", .9) 
  .attr("stroke-width", "1")
  .attr("stroke", "black")
  ;

  var circleText= circleData
  .append("text")
  .text(d=> d.Abbr)
  .style("opacity", .8)
  .style('font-size',10)
  .style('fill', 'white') 
  .attr("x",d => xScale(d.MedianAge)-8)
  .attr("y",d => yScale(d["YesExcersize%"])+3);
  
  
 // Step 1: Append tooltip div
 var toolTip = d3.select("body")
 .append("div")
 .style('position', 'absolute')
 .classed("tooltip", true);

// Step 2: Create "mouseover" event listener to display tooltip
circlesGroup.on("mouseover", function(data)
 {
    toolTip.html(`State :${data.State}`)
     .style("left", d3.event.pageX + "px")
     .style("top", d3.event.pageY + "px")
     .style("fill", "red")
     .style("display", "block");

     console.log(data.State);
})
     // Step 3: Create "mouseout" event listener to hide tooltip
     .on("mouseout", function()
      {
      toolTip.style("display", "none");
      
    });

});


