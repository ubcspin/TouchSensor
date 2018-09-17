import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrixes from './components/Matrixes/Matrixes.jsx';
import './App.css';

class App extends Component {
  state = {
    matrixes: [
    {id: 'abcdef', size: 100},
    {id: 'abcdeg', size: 200}
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
    const matrixIndex = this.state.matrixes.find(m => {
      return m.id === id;
    });

    const matrix = {
      ...this.state.matrixes[matrixIndex]
    };

    matrix.size = event.target.value;

    const matrixes = [...this.state.matrixes];
    matrixes[matrixIndex] = matrix;
    
    this.setState( {matrixes: matrixes} )
  }

  deleteMatrixHandler = (matrixIndex) => {
    const matrixes = this.state.matrixes.slice();
    matrixes.splice(matrixIndex, 1);
    this.setState({matrixes, matrixes})
  }

  toggleMatrixHandler = () => {
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

      let matrixes = null;

      if ( this.state.showMatrix ) {
        matrixes = (
          <div>
          <Matrixes 
            matrixes={this.state.matrixes}
            clicked={this.deleteMatrixHandler}
            changed={this.toggleMatrixHandler} />
         </div> 
        );

        style.backgroundColor = 'red';
      }
      
      const classes = [];
      if (this.state.matrixes.length <= 2) {
        classes.push('red');
      }
      if (this.state.matrixes.length <= 1) {
        classes.push('bold');
      }

      	return (
      		<div className="App">

            <Page />
            <p className={classes.join(' ')}>This is a test</p>
            <button 
              style={style}
              onClick={this.toggleMatrixHandler.bind(this, '300')}>Switch Sensor</button>
              {matrixes}

      		</div>
    	)
  	};
}
//{this.divFun()}

export default App;