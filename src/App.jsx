import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import D3Matrix from './components/D3Matrix/D3Matrix.jsx';
import './App.css';

class App extends Component {
 
    state = {
     showMatrix: false,
     showD3Matrix: false
    }
  


  handleMatrixClick() {
    this.setState({ showMatrix: true });
  }

  handleD3MatrixClick() {
    this.setState({ showD3Matrix: true });
  }

  	render() {
        const showMatrix = this.state.showMatrix;
        const showD3Matrix = this.state.showD3Matrix;
        let display;
        
        if (showMatrix) {
          display = <Matrix />;
        } else if (showD3Matrix) {
          display = <D3Matrix />;
        } else {
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

      		</div>
    	)
  	};
}

export default App;