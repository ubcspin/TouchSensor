import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import D3Matrix from './components/D3Matrix/D3Matrix.jsx';
import PressureMatrix from './components/PressureMatrix/PressureMatrix.jsx';
import './App.css';

class App extends Component {
 
    state = {
     showMatrix: false,
     showD3Matrix: false,
     showPressureMatrix: false
    }
  


  handleMatrixClick() {
    this.setState({ showMatrix: true });
  }

  handleD3MatrixClick() {
    this.setState({ showD3Matrix: true });
  }

  handlePressureClick() {
    this.setState({ showPressureMatrix: true });
  }

  	render() {
        const showMatrix = this.state.showMatrix;
        const showD3Matrix = this.state.showD3Matrix;
        const showPressureMatrix = this.state.showPressureMatrix;
        let display;
        
        if (showMatrix) {
          display = <Matrix />;
        } else if (showD3Matrix) {
          display = <D3Matrix />;
        } else if (showPressureMatrix) {
          display = <PressureMatrix />
        }
        else {
          display = <Page />;
        }
      	return (
          
      		<div className="App">
           
           {display}
            <button onClick={() => this.handleMatrixClick()}>
              HTML/CSS Demo
            </button>
            <button onClick={() => this.handleD3MatrixClick()}>
              D3 Demo
            </button>
            <button onClick={() => this.handlePressureClick()}>
              Pressure Demo
            </button>

      		</div>
    	)
  	};
}

export default App;