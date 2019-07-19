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
      matrixWidth: 0
  };
}

  componentDidMount() {
    socket.on('Sensor', function(msg) {
      
      const matrixValues = this.state.matrixValues;
     
      let values = msg.valuesArray;
      
      let width = msg.width;
      this.handleMatrixSize(width);
      
        let cellValues = this.handleCellState(values);
      
      
        this.setState({ cells : cellValues });
      
    }.bind(this));
  }

  //TODO: make the number of iteration in loop dynamic
  handleCellState = (values) => {
    let temp = values;
    let tempResult = [];
    let width = this.state.matrixWidth;
    let length = this.state.matrixLength;
    let lengthOfCells = length * width;
    
    for (var i = 0; i <= lengthOfCells; i++) {
      tempResult.push({ id: i, element: i, pressed: Math.floor(temp[i]/4) });
    }
    return tempResult;
  }

  handleMatrixSize = (width) => {
    const matrixLength = this.state.matrixLength;
    const matrixWidth = this.state.matrixWidth;
    var squareRoot = Math.sqrt(width);

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
    const num_rows = this.state.matrixWidth; 
    
    // TODO: rewrite to be more functional
    // e.g., remove v these accumulators and replace with "pure" maps, etc.
    // do something, add to array, repeat --> map over something, return product
    let matrix = [];

    for (var i = 0; i < num_rows; i++) {
        var rowArray = myCells.slice(i * row_length, ((i*row_length) + row_length));
        
        let cell = rowArray.map(function(cell, i, arr) { 
          return (<Cell key={cell.id} element={cell.element} pressed={cell.pressed} />)
        }.bind(this));
        
        matrix = matrix.concat(this.createRowDivision(cell));
        
      }
      
    return matrix;
  }

    render() {
      let row = this.state.matrixLength;
      let column = this.state.matrixWidth;
      return (
        <div className="display-wrap">
         <div className="visualization">
       
            {this.createDivision()}

          </div>
          <div className="demo-text">
            <h3>A visualization of your {row} x {column} Touch Sensor with pressure values</h3>
          
          </div>
        </div>
      )
    }
}

export default Matrix;
