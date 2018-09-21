import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import './App.css';

class App extends Component {
  state = {
    cells: [
    {id: 'abcdef', sensor: 'Cell0'},
    {id: 'abcdeg', sensor: 'Cell1'}
    ],
    otherState: 'another value',
    showMatrix: false
  }
  //Will use matrixElements to change the state of the matrix elements

  /*renderDiv(n) {
    return (<p>{n}</p>)
  }

  divFun() {
    var arr = [];
    for (var i = 0; i < 100; i++) {
      arr.push(i);
    }
    return (
      <div id="hi">
        {
            arr.map((n, i, e) => {return this.renderDiv(i)})
        }
      </div>
      )
  }*/
  
  // Will use set state to change the matrix elements
  
  sensorSizeHandler = ( event, id ) => {
    const cellIndex = this.state.cells.find(m => {
      return m.id === id;
    });

    const cell = {
      ...this.state.cells[cellIndex]
    };

    cell.sensor = event.target.value;

    const cells = [...this.state.cells];
    cells[cellIndex] = cell;
    
    this.setState( {cells: cells} )
  }

  pressCellHandler = (cellIndex) => {
    const cells = this.state.cells;
    cells[1].sensor = 'Cell1';
    this.setState( {cells: cells} )
  }

  toggleCellHandler = () => {
    const doesShow = this.state.showMatrix;
    this.setState({showMatrix: !doesShow});
  }
  	render() {
      const style = {
        backgroundColor: 'blue',
        color: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
      };

      let matrix = null;

      if ( this.state.showMatrix ) {
        matrix = (
          <div>
          <Matrix 
            matrix={this.state.cells}
            clicked={this.pressCellHandler}
            changed={this.toggleCellHandler} />
         </div> 
        );

        style.backgroundColor = 'red';
      }
      
      const classes = [];
      if (this.state.cells.length <= 2) {
        classes.push('red');
      }
      if (this.state.cells.length <= 1) {
        classes.push('bold');
      }

      	return (
      		<div className="App">

            <Page />
            <p className={classes.join(' ')}>This is a test</p>
            <button 
              style={style}
              onClick={this.toggleCellHandler.bind(this, '300')}>Display Matrix</button>
              {matrix}
      		</div>
    	)
  	};
}
//{this.divFun()}

export default App;