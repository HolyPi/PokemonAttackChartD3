d3.csv("pokedex.csv").then((data) => {
    const ten = data.filter((data, item) => item < 7)
    ten.forEach(d => {
        d.attack = +d.attack
    })
    console.log(ten)

const width = 1000;
const height = 550;
const margin = { top: 100, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(ten.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0,  120])
  .range([height - margin.bottom, margin.top])

svg
  .append("g")
  .attr("fill", '#add8e6')
  .selectAll("rect")
  .data(ten.sort((a, b) => d3.descending(a.attack, b.attack)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.attack))
    .attr("height", d => y(2) - y(d.attack))
    .attr("width", x.bandwidth());

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, ten.attack))
    .attr("font-size", '22px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => ten[i].name))
    .attr("font-size", '20px')
    
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);

})