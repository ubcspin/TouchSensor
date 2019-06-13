import React, { Component } from 'react';
import * as d3 from "d3";
import { Delaunay } from "d3-delaunay";
import './Circular.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class Circular extends Component {
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
    
    socket.on("Sensor", function(msg) {
   
    this.setValuesToState(msg); //Set the state in setValuesToState with values from msg
    
    }.bind(this));
    
    this.createGraph();
    //setTimeout(function() {this.createGraph()}.bind(this), 100); //This works because of delay, but no render
    
  }

  //Used to update state as back-end sends data
  componentDidUpdate() {
    this.createGraph();
    
  }

  //Set the state varialbes here
  setValuesToState(msg) {
    //console.log("setValuesToState was called");
    var width = msg.width; //The width of the values array from socket
    var columnLength = Math.sqrt(width); //Set these as global in future with redux
    var rowLength = Math.sqrt(width);
    let data = [];
    
    let tempData = msg.valuesArray; //Obtain values from the back-end
    for (var i = 0; i < tempData.length; i++) {
      data.push({ index:i, data:tempData[i] });
    }
    
    this.setState({ rowLength: rowLength });
    this.setState({ columnLength: columnLength});
    this.setState({ values: data });
  }
  //TODO:Create a function colorMap that returns the rgb string
  

  createGraph() {
    
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
    // var data = [];
    // for (var i = 0; i < initialLength; i++) {
    //    data.push(0);
    //  }
    //console.log(this.state.values);
    var data = this.state.values;
    // console.log("Initial length is " + initialLength);
    //console.log("The data array is " , data);
    var svgGrid = d3.select(node);
    
    svgGrid
      .selectAll("rect")
      .remove()
    //Create cells for each data in sampleData
    svgGrid
      .selectAll("rect")
      .data(data 
        //console.log(d);
        //return d.value;
      ) 
      .enter()
      .append("rect")
    
    svgGrid
      .selectAll("rect")
      .data(data 
        //console.log(d);
        //return d.data;
      )
      .attr("width", w - padding) //Subtract padding to create space between cells
      .attr("height", h - padding)
      .attr("x", function(d) {
        let currentX = d.index % columnLength;//Move 1 index over per cell
        //console.log(i);
          return (currentX * w);
      })
      .attr("y", function(d) {
        let currentY = Math.floor(d.index / rowLength);//Move 1 unit down per rowLength
        return (currentY * h);
      })
      .style(
        //Call a function here, colorMap, that returns a string of rgb 
        "fill", function(d) {
          return colorMap(d.data); //"rgb(128, " + d.data + ", " + d.data + ")"; //Set level of red in rgb based on data
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

export default Circular;