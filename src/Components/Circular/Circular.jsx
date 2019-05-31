import React, { Component } from 'react';
import * as d3 from "d3";
import { Delaunay } from "d3-delaunay";
import './Circular.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class Circular extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    var w = 40; //Width of the cell
    var h = 40; //Height of the cell
    var padding = 5; //Space between each cell
    var rowLength = 10; //Just setting this as row Length, dervied from server's msg width
    var columnLength = 10; //Same as above
    //Temporary sample data
    var sampleData = [100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200,
                      100, 200, 255, 50, 100, 150, 180, 185, 198, 200];
    var svgGrid = d3.select(this.refs.squareRender)
                   
    //const maxLength = 100; //set this to width from server in the future

    //Create cells for each data in sampleData
    var matrix = svgGrid.selectAll("rect")
            .data(sampleData) //just a temporary value for rgb
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
            .attr("fill", function(d) {
              return "rgb(" + d + ", 0, 0)"; //Set level of red in rgb based on data
            });
  }

  //Used to update state as back-end sends data
  componentDidUpdate() {

  }

  render() {
      return (
        <svg width="500" height="500">
          <g 
            className="matrixRender"
            ref="squareRender"
          >
          </g>
        </svg>
      )
  };
}

export default Circular;