import React, { Component } from 'react';
import Cell from './Cell.jsx';
import './Matrix.css';

class Matrix extends Component {

      state = {
      cells: [
      { id: 0, element: 0, pressed: true },
      { id: 1, element: 1, pressed: true },
      { id: 2, element: 2, pressed: false },
      { id: 3, element: 3, pressed: false },
      { id: 4, element: 4, pressed: false },
      { id: 5, element: 5, pressed: false },
      { id: 6, element: 6, pressed: false },
      { id: 7, element: 7, pressed: false },
      { id: 8, element: 8, pressed: false },
      { id: 9, element: 9, pressed: true },

      { id: 10, element: 10, pressed: false },
      { id: 11, element: 11, pressed: false},
      { id: 12, element: 12, pressed: true },
      { id: 13, element: 13, pressed: false },
      { id: 14, element: 14, pressed: false },
      { id: 15, element: 15, pressed: false },
      { id: 16, element: 16, pressed: false },
      { id: 17, element: 17, pressed: false },
      { id: 18, element: 18, pressed: false },
      { id: 19, element: 19, pressed: false },

      { id: 20, element: 20, pressed: false },
      { id: 21, element: 21, pressed: false},
      { id: 22, element: 22, pressed: true },
      { id: 23, element: 23, pressed: true },
      { id: 24, element: 24, pressed: false },
      { id: 25, element: 25, pressed: false },
      { id: 26, element: 26, pressed: false },
      { id: 27, element: 27, pressed: false },
      { id: 28, element: 28, pressed: false },
      { id: 29, element: 29, pressed: false },

      { id: 30, element: 30, pressed: false },
      { id: 31, element: 31, pressed: false},
      { id: 32, element: 32, pressed: true },
      { id: 33, element: 33, pressed: false },
      { id: 34, element: 34, pressed: false },
      { id: 35, element: 35, pressed: false },
      { id: 36, element: 36, pressed: false },
      { id: 37, element: 37, pressed: false },
      { id: 38, element: 38, pressed: false },
      { id: 39, element: 39, pressed: false },

      { id: 40, element: 40, pressed: false },
      { id: 41, element: 41, pressed: false},
      { id: 42, element: 42, pressed: true },
      { id: 43, element: 43, pressed: false },
      { id: 44, element: 44, pressed: false },
      { id: 45, element: 45, pressed: false },
      { id: 46, element: 46, pressed: false },
      { id: 47, element: 47, pressed: false },
      { id: 48, element: 48, pressed: false },
      { id: 49, element: 49, pressed: false },

      { id: 50, element: 50, pressed: false },
      { id: 51, element: 51, pressed: false},
      { id: 52, element: 52, pressed: true },
      { id: 53, element: 53, pressed: false },
      { id: 54, element: 54, pressed: false },
      { id: 55, element: 55, pressed: false },
      { id: 56, element: 56, pressed: false },
      { id: 57, element: 57, pressed: false },
      { id: 58, element: 58, pressed: false },
      { id: 59, element: 59, pressed: false },

      { id: 60, element: 60, pressed: false },
      { id: 61, element: 61, pressed: false},
      { id: 62, element: 62, pressed: true },
      { id: 63, element: 63, pressed: false },
      { id: 64, element: 64, pressed: false },
      { id: 65, element: 65, pressed: false },
      { id: 66, element: 66, pressed: false },
      { id: 67, element: 67, pressed: false },
      { id: 68, element: 68, pressed: false },
      { id: 69, element: 69, pressed: false },

      { id: 70, element: 70, pressed: false },
      { id: 71, element: 71, pressed: false},
      { id: 72, element: 72, pressed: true },
      { id: 73, element: 73, pressed: false },
      { id: 74, element: 74, pressed: false },
      { id: 75, element: 75, pressed: false },
      { id: 76, element: 76, pressed: false },
      { id: 77, element: 77, pressed: false },
      { id: 78, element: 78, pressed: false },
      { id: 79, element: 79, pressed: false },

      { id: 80, element: 80, pressed: false },
      { id: 81, element: 81, pressed: false},
      { id: 82, element: 82, pressed: true },
      { id: 83, element: 83, pressed: false },
      { id: 84, element: 84, pressed: false },
      { id: 85, element: 85, pressed: false },
      { id: 86, element: 86, pressed: false },
      { id: 87, element: 87, pressed: false },
      { id: 88, element: 88, pressed: false },
      { id: 89, element: 89, pressed: true },

      { id: 90, element: 90, pressed: false },
      { id: 91, element: 91, pressed: false},
      { id: 92, element: 92, pressed: false },
      { id: 93, element: 93, pressed: false },
      { id: 94, element: 94, pressed: false },
      { id: 95, element: 95, pressed: false },
      { id: 96, element: 96, pressed: false },
      { id: 97, element: 97, pressed: false },
      { id: 98, element: 98, pressed: false },
      { id: 99, element: 99, pressed: false },
    ]
  }
  
  makeRows = ( rowArray ) => {
    /*let tempArray = [];
    
    tempArray.push(rowArray);
    console.log(tempArray);

    if (peanuts[i] == cell)
    
    return tempArray;*/
    let tempArray = [];
    tempArray = rowArray.map((cell, i, peanuts) => 
                <Cell key={cell.id} element={cell.element} pressed={cell.pressed} />)
    console.log(tempArray);
    return tempArray;
  }

  createDivision = () => {
    let row_length = 10;
    const num_rows = Math.ceil(this.state.cells.length / row_length);
    //console.log(num_rows);
    let cells = this.state.cells;
    let rowArray = [];
    let finishedArray = [];
    for (var i = 0; i < num_rows; i++) {
        rowArray = cells.slice(i*row_length, (i*row_length) + 10);
        //console.log(rowArray);
        finishedArray.push(this.makeRows(rowArray));
        //this.makeRows(rowArray);
        //console.log(finishedArray);
    }
    //console.log("the second call" + finishedArray);
    return finishedArray;
    
  }

    render() {
      let temp = this.createDivision();
      let temp1 = temp.slice(0,1);
      let temp2 = temp.slice(1,2);
      let temp3 = temp.slice(2,3);
      let temp4 = temp.slice(3,4);
      let temp5 = temp.slice(4,5);
      let temp6 = temp.slice(5,6);
      let temp7 = temp.slice(6,7);
      let temp8 = temp.slice(7,8);
      let temp9 = temp.slice(8,9);
      let temp10 = temp.slice(9,10);
      //console.log(temp);
      return(
         <div>
            <div className="Row">
              {temp1}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp2}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp3}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp4}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp5}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp6}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp7}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp8}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp9}
            </div>
            <br />
            <br />
            <div className="Row">
              {temp10}
            </div>

          </div>
          )
      }
}

export default Matrix;
