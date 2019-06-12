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
      rowLength: 16,
      columnLength: 16,
      values: [  
      ]
    };
    //this.createGraph = this.createGraph.bind(this);
    //this.setValuesToState = this.setValuesToState.bind(this);
  }

  componentDidMount() {
    
    socket.on("Sensor", function(msg) {
   
    this.setValuesToState(msg); //Set the state in setValuesToState with values from msg
    
    }.bind(this));
    
    this.createGraph();
    //setTimeout(function() {this.createGraph()}.bind(this), 100); //This works because of delay, but no render
    
  }

  //Used to update state as back-end sends data
  //TODO: Call functions that update DOM here (might work)
  componentDidUpdate() {
    //this.updateGraph(); //Update the graph from new data values
    this.createGraph();
    
  }

  //Set the state varialbes here
  setValuesToState(msg) {
    //console.log("setValuesToState was called");
    //var width = msg.width; //The width of the values array from socket
    //var columnLength = Math.sqrt(width); //Set these as global in future with redux
    //var rowLength = Math.sqrt(width);
    let data = [];
    let tempData = msg.valuesArray; //Obtain values from the back-end
    for (var i = 0; i < tempData.length; i++) {
      data.push({ index:i, data:Math.floor(tempData[i]/4)});
    }
    
    //this.setState({ rowLength: rowLength });
    //this.setState({ columnLength: columnLength});
    this.setState({ values: data });
  }

  createGraph() {
    //console.log("createGraph was called");
    //console.log(this.state.values);
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
      ) //just a temporary value for rgb
            //.exit().remove()
      .enter()
      .append("rect")
     

    // svgGrid
    //   .selectAll("rect")
    //   .data(data, function(d) {
    //     return d;
    //   })
    //   .exit()
    //   .remove()
    
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
      .style("fill", function(d) {
        //console.log("data: " + d);
        return "rgb(" + d.data + ", 0, 0)"; //Set level of red in rgb based on data
      });
      //svgGrid.exit().remove(data);
            //this.updateGraph();
            
            

  }

  updateGraph() {
    //console.log("updateGraph was called");
    var w = 40; //Width of cell
    var h = 40; //Height of cell
    var padding = 5; //Space between each cell
    var columnLength = this.state.columnLength;
    
    var rowLength = this.state.rowLength;
    var initialLength = columnLength * rowLength;
   
    var data = this.state.values;
    

    //console.log("Reached this method");
    //TODO: Try removing SVG here
    //d3.exit().remove(this.refs.squareRender);
    var svgGrid = d3.select(node);
    
    //Create cells for each data in sampleData
    svgGrid
            
            .data(data, function(d) {
              return d;
            })
            .enter()
            .append("rect")
            .attr("width", w - padding) //Subtract padding to create space between cells
            .attr("height", h - padding)
            .attr("x", function(d, i) {
              let currentX = Math.floor(i % columnLength);//Move 1 index over per cell
                return (currentX * w);
            })
            .attr("y", function(d, i) {
              let currentY = Math.floor(i / rowLength);//Move 1 unit down per rowLength
              return (currentY * h);
            }) 
            
            
            .style("fill", function(d) {
              return "rgb(" + d + ", 0, 0)"; //Set level of red in rgb based on data
            });
            //svgGrid.exit().remove();
            
          
  }

  render() {
      return (
        <svg ref={node => this.node = node}
          width="800" height="800">  
        </svg>
      )
  };
}

export default Circular;