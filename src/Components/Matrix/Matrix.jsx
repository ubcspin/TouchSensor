import React, { Component } from 'react';
import Cell from './Cell.jsx';

class Matrix extends Component {

      state = {
      cells: [
      { id: 0, pressed: false },
      { id: 1, pressed: false },
      { id: 2, pressed: false },
      { id: 3, pressed: false },
      { id: 4, pressed: false },
      { id: 5, pressed: false },
      { id: 6, pressed: false },
      { id: 7, pressed: false },
      { id: 8, pressed: false },
      { id: 9, pressed: false },

      { id: 10, pressed: false },
      { id: 11, pressed: false},
      { id: 12, pressed: false },
      { id: 13, pressed: false },
      { id: 14, pressed: false },
      { id: 15, pressed: false },
      { id: 16, pressed: false },
      { id: 17, pressed: false },
      { id: 18, pressed: false },
      { id: 19, pressed: false },

      { id: 20, pressed: false },
      { id: 21, pressed: false },
      { id: 22, pressed: false }
    ]
  }

  


    render() {
      return(
         <div>
            { this.state.cells.map(cell => 
              <Cell key={cell.id} pressed={cell.pressed} />)}

          </div>
          )
      }
}

export default Matrix;
