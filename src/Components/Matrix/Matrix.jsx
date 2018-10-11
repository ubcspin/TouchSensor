import React, { Component } from 'react';
import Cell from './Cell.jsx';
import './Matrix.css';

class Matrix extends Component {
      state = {
      cells: [
      
      ],
      matrixLength: 10,
      matrixWidth: 10
  }
  componentDidMount() {
    {this.createRandomPress()}
  }

  createRandomNumber = () => {
    let randomNumber = 0;
    randomNumber = Math.random(10);

    return randomNumber;
  }

  createRandomPress = () => {
    
    const length = this.state.matrixLength;
    const width = this.state.matrixWidth;
    const cellsLength = length * width;
    let cells = this.state.cells;
    
    for (var i = 0; i < cellsLength; i++) {
      let randomValue = this.createRandomNumber()
    if (randomValue >= 0.5) {
      cells.push({id: i, element: i, pressed: true});
      
      this.setState({ cells: cells });
    } 
    else {
      cells.push({id: i, element: i, pressed: false});
      
      this.setState({ cells: cells });
      
    }
   
    }
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
    const num_rows = Math.ceil(myCells.length / row_length);
    
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
      
      return (
         <div className="test">
            {this.createDivision()}
          </div>
          )
      }
}

export default Matrix;
