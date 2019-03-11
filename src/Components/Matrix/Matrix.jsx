import React, { Component } from 'react';
import Cell from './Cell.jsx';
import './Matrix.css';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [
      ],
      matrixLength: 0,
      matrixWidth: 0,
      sensorBuffer: [
      ],
      matrixTimeStamp: 0
  };
}

  // handleNewCell = (arr) => {
  //     console.log('receiving element');
  //     let cells = this.state.cells;
      
  //     for (var i = 0; i<arr.length; i++) {
  //       cells[i] = arr[i];
  //     }
  //     this.setState({ cells:cells });
  // }

  componentDidMount() {
    socket.on('Sensor', function(shiftedArray) {
      //console.log(shiftedArray);
      // var y = this.handleBuffer(msg);
      const sensorBuffer = this.state.sensorBuffer;
      var buff = shiftedArray;
      this.setState({ sensorBuffer : buff });
      //console.log(sensorBuffer);
      this.handleSensorBuffer(sensorBuffer);
      //  var z = this.handleCellState(shiftedArray);
      // this.setState({ cells : z })
    }.bind(this));
  }

  handleSensorBuffer = (sensorBuffer) => {
    var buff = sensorBuffer;
    var length = buff[0];
    var timeStamp = buff[1];
    console.log(buff.length);
    this.handleMatrixSize(length);
    this.handleTimeStamp(timeStamp);

    //this.handleCellState(buff)
  }

  handleTimeStamp = (timeStamp) => {
    var stamp = timeStamp;
    const matrixTimeStamp = this.state.matrixTimeStamp;
    //console.log(stamp);
    this.setState({ matrixTimeStamp: stamp })
  }
  //TODO: make the number of iterations in loop dynamic
  // handleBuffer = (msg) => {
  //   let resultValuesArray = [];
  //   for (var i = 8; i < 520; i+=2) {
  //       var result = this.handleShift(msg[i], msg[i+1]);
        
  //       resultValuesArray.push(result);
  //   }
  //   return resultValuesArray;
  // }

  // handleShift = (element1, element2) => {
  //   //TODO: have the bit operations in server
  //   var a = new Uint8Array(element1);
  //   var b = new Uint8Array(element2);
    
  //   var filter = 0xffff;

  //   var c = b << 8;
  //   var a = a | c;
  //   var d = b >> 8;
  //   var a = a | d;
  //   var a = a & filter;
  //   var a = Math.floor(a / 4);
  //   return a;
    
  // }
  //TODO: make the number of iteration in loop dynamic
  handleCellState = (y) => {
    let temp = y;
    let tempResult = [];
    for (var i = 0; i <= 256; i++) {
      tempResult.push({id: i, element: i, pressed: temp[i]});
    }
    return tempResult;
  }

  handleMatrixSize = (length) => {
    const matrixLength = this.state.matrixLength;
    const matrixWidth = this.state.matrixWidth;
    var squareRoot = Math.sqrt(length);
    //console.log(squareRoot);
    //var squareLength = Math.floor(squareRoot);
    

    this.setState({matrixWidth: squareRoot});
    this.setState({matrixLength: squareRoot});
    

  }

  // cell is any html element. Effects: the element is wrapped in a div.
  createRowDivision = ( cell ) => {
    
    return (
      <div className="Outter">
        {cell}
      </div>
      );
  }

  createDivision = () => {

    let row_length = this.state.matrixLength;
    var myCells = this.state.cells;
    const num_rows = this.state.matrixWidth; //Math.ceil(myCells.length / row_length);
    
    // TODO: rewrite to be more functional
    // e.g., remove v these accumulators and replace with "pure" maps, etc.
    // do something, add to array, repeat --> map over something, return product
    let matrix = [];

    for (var i = 0; i < num_rows; i++) {
        var rowArray = myCells.slice(i * row_length, ((i*row_length) + row_length));
        
        let cell = rowArray.map(function(cell, i, arr) { 
          return (<Cell key={cell.id} element={cell.element} pressed={cell.pressed} sensorValue={this.state.sensorValue}/>)
        }.bind(this));
        
        matrix = matrix.concat(this.createRowDivision(cell));
        
      }
      
    return matrix;
  }

    render() {
      
      return (
         <div className="test">
          <h2>Displaying Matrix Demo</h2>
            {this.createDivision()}
            <button 
              onClick={() => this.handleMatrixSize(3,3)}
            >
            3 x 3 Matrix
            </button>
            <button 
              onClick={() => this.handleMatrixSize(16,16)}
            >
            16 x 16 Matrix
            </button>
            <button 
              onClick={() => this.handleMatrixSize(10,10)}
            >
            10 x 10 Matrix
            </button>

           
            
          </div>
          )
      }
}

export default Matrix;
