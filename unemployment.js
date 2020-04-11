//from search URL paramter, determine what city is being called
function queryStringParser() {
  let results = {};
  let words = window.location.search.substring(1).split('&');
  for (word of words) {
    let [key, value] = word.split("=");
    results[key] = [value];
  }
  return results;
}

let parms = queryStringParser();
// alert (parms.city)
let city = decodeURIComponent(parms.city);
console.log(city);

// Define SVG area dimensions
let svgWidth = 850;
let svgHeight = 600;

// Define the chart's margins as an object
let chartMargin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40
};

// // Bring in toolTip to make it an interactive visual 
// let toolTip = d3.select("body")
//   .append("div")
//   .classed("my-tooltip", true);
// // .style("opacity", 0);

// Define dimensions of the chart area
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
let svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
let chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from CSV
let icity = 0;
d3.csv("final_unemployment.csv").then(function (unemployment) {

  //show the unemployment rate for each metro area 

  // console.log(unemployment)
  for (let i = 0; i < unemployment.length; i++) {
    console.log(unemployment[i].city_state);
    if (city === unemployment[i].city_state) {
      icity = i;
      break;
    }
  }

  //create year (x) and unemployment (y) values
  console.log("unemployment data by city:");
  console.log(unemployment[icity]);
  // let x = Object.values(unemployment[(icity-18)])[3];
  // console.log(x)
  let xarray = [];
  let yarray = [];
  for (var j = 0; j < 18; j++) {
    let x = Object.values(unemployment[(icity) + j])[3];
    console.log(x)
    xarray.push(x);
    let y = Object.values(unemployment[(icity) + j])[1];
    console.log(y)
    yarray.push(y);
  }
  console.log("x:")
  console.log(xarray);
  console.log('y:');
  console.log(yarray);
  // let unemployment_rate = [];
  // for (let i = 0; i < x.length; i++) {
  //  // if (x[i]==="city_state" || x[i]==="")continue;
  //   unemployment_rate.push({ year: x[i], unemployment_rate: +y[i] });
  // }
  console.log(unemployment)
  // return;


  // Create axes 
  let xScale = d3.scaleBand()
    .domain(unemployment.map(d => d.year))
    .range([0, chartWidth])
    .padding(0.4);

  yScale = d3.scaleLinear([0, d3.max(unemployment, row => row.unemployment)], [chartHeight, 0]);

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale).tickValues(yScale.ticks().concat(yScale.domain()));

  // Append axes
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);

  // let barSpacing = 5; // desired space between each bar

  // // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  // let barWidth = (chartWidth - (barSpacing * (unemployment.length - 1))) / unemployment.length;

  svg.append("text")
    .attr("x", 420)
    .attr("y", 30)
    .style("text-anchor", "middle")
    .text("Unemployment Rate over Time");


  let drawLine = d3
    .line()
    .x(function(d, xarray ) { xAxis(xarray)})
    .y(function(d, yarray){yAxis(yarray)});


  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line 
    .attr("d", drawLine(unemployment))
    .classed("line", true);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  // chartGroup.append("g")
  //   .classed("axis", true)
  //   .call(leftAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);
}).catch(function (error) {
  console.log(error);
});

  // Create code to build the bar chart using the data.
  // // chartGroup.selectAll(".bar")
  // //   .data(unemployment)
  // //   .enter()
  // //   .append("rect")
  // //   .classed("bar", true)
  // //   .attr("width", d => barWidth)
  // //   .attr("height", d => chartHeight - yScale(d.unemployment_rate))
  // //   .attr("x", (d, i) => i * (barWidth + barSpacing))
  // //   .attr("y", d => yScale(d.unemployment_rate))
  // //   .style("fill", "#69b3a2")
  // //   .style("opacity", 0.5)
  // .on("mouseover", d => {
  // toolTip.transition()
  //   .duration(200)
  //   .style("opacity" , .9);
  // toolTip.html("Average Housing Price: " + d.unemployment_rate)
  //   .style("left", (d3.event.pageX) + "px")
  //   .style("top", (d3.event.pageY - 28) + "px");

// .on("mouseout", d => {
//   toolTip.transition()
//     .duration(500)
//   // .style("opacity", 0);

// })
;



// }).catch(function (error) {
//   console.log(error);
// });
