import React, { Component } from 'react';
import * as d3 from "d3";
const pressure = require("pressure");
import io from 'socket.io-client';


const socket = io('http://localhost:8080');

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
    //this.colorMap = this.colorMap.bind(this);
  }

  componentDidMount() {
    this.setValuesToState();
    this.createGraph();
    
  }

  //Used to update state as back-end sends data
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
    //Change color from gray to red to white
    //Returns a string of rgb values
    function colorMap(data) {
      
      let firstTierValue = Math.round(((data - 900)/124) * 128);
      let secondTierValue = Math.round(256 - ((data-500)/399) * 128);
      let thirdTierValue = Math.round(256 - (data/499 * 256));
      if (data >= 900) {
        return "rgb(128, " + firstTierValue + ", " + firstTierValue + ")";
      }
      if (data >= 500 && data < 900) {
        return "rgb(" + secondTierValue + ", 0, 0)";
      } 
      if (data < 500) {
        return "rgb(256, " + thirdTierValue + ", " + thirdTierValue + ")";
      } else {
        return "rgb(128, 128, 128)";
      }
    }

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
      .style(
        //Call a function here, colorMap, that returns a string of rgb 
        "fill", function(d) {
          return colorMap(d.data);
      });
     pressure.set("#rect1", {
         start: function(event) {
             console.log("a click");
         }
     });
  }

  render() {
      return (
        <svg ref={node => this.node = node}
          width="500" height="500">  
        </svg>
      )
  };
}

export default PressureMatrix;