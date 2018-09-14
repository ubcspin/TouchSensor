import React, { Component } from 'react';
import Page from './Layout/Page.jsx';
import Matrix from './Matrix/Matrix.jsx';

class App extends Component {
  state = {
    matrixElements: [
    {size: 100}
    ],
    otherState: 'another value',
    showMatrix: false
  }
  //Will use matrixElements to change the state of the matrix elements

  renderDiv(n) {
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
  }

  switchSensorHandler = (newSize) => {
    //console.log('Was clicked!');
    this.setState( {
      matrixElements: [
      { size: newSize }
      ]
    } )
  }
  
  // Will use set state to change the matrix elements
  
  sensorSizeHandler = (event) => {
    this.setState( {
      matrixElements: [
        { size: event.target .value }
      ]
    } )
  }

  toggleMatrixHandler = () => {
    const doesShow = this.state.showMatrix;
    this.setState({showMatrix: !doesShow});
  }
  	render() {
      const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
      };

      let matrixes = null;

      if (this.state.showMatrix) {
        matrixes = (
            <div>
              <Matrix 
                size={this.state.matrixElements[0].size} />
              <Matrix 
                size={this.state.matrixElements[0].size} 
                click={this.switchSensorHandler.bind(this, '400')}
               changed={this.sensorSizeHandler} />
              </div> 
          );
      }

      	return (
      		<div className="App">
            <Page />
            <button 
              style={style}
              onClick={this.toggleMatrixHandler.bind(this, '300')}>Switch Sensor</button>
              {matrixes}
            
            {this.divFun()}
      		</div>
      
      
    	)
  	};
}

export default App;