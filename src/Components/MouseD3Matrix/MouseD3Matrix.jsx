import React, { Component } from 'react';
import * as d3 from "d3";
const pressure = require("pressure");
//import io from 'socket.io-client';
//const socket = io('http://localhost:8080');

class PressureMatrix extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rowLength: 0,
      columnLength: 0,
      values: [  
      ]
    };
    this.createGraph = this.createGraph.bind(this);
    this.setValuesToState = this.setValuesToState.bind(this);
  }

  componentDidMount() {
    this.setValuesToState();
    this.createGraph();
    
  }
  
  componentDidUpdate() {
    this.createGraph();
    
  }

  //Set the state varialbes here
  setValuesToState(msg) {
   
    var width = 100; //This will be a fixed 10x10 demo
    var columnLength = Math.sqrt(width); //Set these as global in future with redux
    var rowLength = Math.sqrt(width);
    let completeArray = [];
    //TODO: Stream values from pressurejs as data
    let data = [];
    for (var i = 0; i < width; i++) {
        data.push(1024);
    }
    let tempData = data; //Obtain values from the back-end
    for (var i = 0; i < tempData.length; i++) {
      completeArray.push({ index:i, data:tempData[i] });
    }
    
    this.setState({ rowLength: rowLength });
    this.setState({ columnLength: columnLength});
    this.setState({ values: completeArray });
  }
  

  createGraph() {

    const node = this.node;
    var w = 40; //Width of cell
    var h = 40; //Height of cell
    var padding = 5; //Space between each cell
    
    
    var columnLength = this.state.columnLength;
    var rowLength = this.state.rowLength;
    var initialLength = columnLength * rowLength; //The number of cells in matrix
    
    var data = this.state.values;
    
    var svgGrid = d3.select(node);
    
    svgGrid
      .selectAll("rect")
      .remove()
    
    svgGrid
      .selectAll("rect")
      .data(data) 
      .enter()
      .append("rect")
      
    
    svgGrid
      .selectAll("rect")
      .data(data)
      .attr("id", function(d, i) {
          return "rect" + i;
      })
      .attr("width", w - padding) //Subtract padding to create space between cells
      .attr("height", h - padding)
      .attr("x", function(d) {
        let currentX = d.index % columnLength;//Move 1 index over per cell
        return (currentX * w);
      })
      .attr("y", function(d) {
        let currentY = Math.floor(d.index / rowLength);//Move 1 unit down per rowLength
        return (currentY * h);
      })
      .style("fill", "rgb(128, 128, 128)") //inital matrix color
      
      .on("mouseover", function(d,i) {
    
        var rx; //x position of rect to be set in next d3.selectAll
        var ry; //y position of rect to be set in next d3.selectAll
        var mx = d3.mouse(this)[0]; //current mouse x position
        var my = d3.mouse(this)[1]; //current mouse y position
        
        //console.log("Attrs:", rx, ry)
        
        d3.selectAll("rect")
        .each(function(d, i){
          //console.log("Attrs:", rx, ry)
          //console.log(i);
          rx = d3.select("#rect" + i).attr("x");
          ry = d3.select("#rect" + i).attr("y");
          d3.select("#rect" + i)
          .transition()
          .duration(250)
          .style("fill", function() {
            
            var dist = Math.sqrt(Math.pow((mx - rx),2) + Math.pow((my - ry),2));
            return "rgb(" +  (128 + Math.floor(Math.pow((1 -(dist/400)),5) * 256)) + ", " + (128 - Math.floor(Math.pow((1 -(dist/400)),5) * 256)) + ", " + (128-Math.floor(Math.pow((1 -(dist/400)),5) * 256)) + ")";
            
          })
        })
      })//.bind(this));
     
     
      .on("mouseleave", function(d,i){

        d3.selectAll("rect")
          .interrupt()
          .transition()
          .duration(250)
          .style("fill", "rgb(128,128,128)")
    })
     
  }
  
  render() {
      return (
        <div>
          <svg ref={node => this.node = node}
           width="400" height="400"> 
            
          </svg>
        </div>
      )
  };
}

export default PressureMatrix;