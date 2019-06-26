import React, { Component } from 'react';
import * as d3 from "d3";
import io from 'socket.io-client';
import NoArduino from '../Layout/NoArduino.jsx';
import ArduinoPage from '../Layout/ArduinoPage.jsx';

const socket = io('http://localhost:8080');

class D3Matrix extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rowLength: 0,
      columnLength: 0,
      hasConnection: false,
      values: [  
      ]
    };
    this.createGraph = this.createGraph.bind(this);
    this.setValuesToState = this.setValuesToState.bind(this);
    this.checkConnection = this.checkConnection.bind(this);
  }

  componentDidMount() {
    //const socket = io('http://localhost:8080');
    socket.on("Sensor", function(msg) {
   
    this.setValuesToState(msg); //Set the state in setValuesToState with values from msg
    
    }.bind(this));
    //console.log("socketIO connection status: " + socket.connected);
    //this.checkConnection();
    if(socket.connected) {
      console.log("socket is connected. creating graph");
      this.checkConnection(true);
      this.createGraph();
    }
    if(!socket.connected) {
      this.checkConnection(false);
    }
  }

  //Used to update state as back-end sends data
  componentDidUpdate() {
    this.createGraph();
    
  }

  //Check the socket.io connection
  checkConnection(status) {
    let hasConnection = this.state.hasConnection;
    hasConnection = status;
    this.setState({ hasConnection: hasConnection });
  }
  //Create a message on screen when there is no socket.io connection
  // createMessage() {
  //   console.log("No socket.io connection");
  // }
  //Set the state varialbes here
  setValuesToState(msg) {
   
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
     
  }

  render() {
    let hasConnection = this.state.hasConnection;
    let svgDisplay;
    let display;
    if(!hasConnection) {
      svgDisplay = "none";
    } else {
      svgDisplay = "render";
    }
    if(!hasConnection) {
      display = <NoArduino />;
    } else {
      display = <ArduinoPage />;
    }
      return (
        <div>
          {display}
         <svg ref={node => this.node = node}
           width="500" height="500" display={svgDisplay}>  
         </svg>
        </div>
      )
  };
}

export default D3Matrix;