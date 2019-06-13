import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import Circular from './components/Circular/Circular.jsx';
import './App.css';

class App extends Component {
 
    state = {
     showMatrix: false,
     showCircular: false
    }
  


  handleMatrixClick() {
    this.setState({ showMatrix: true });
  }

  handleCircularClick() {
    this.setState({ showCircular: true });
  }

  	render() {
        const showMatrix = this.state.showMatrix;
        const showCircular = this.state.showCircular;
        let display;
        
        if (showMatrix) {
          display = <Matrix />;
        } else if (showCircular) {
          display = <Circular />;
        } else {
          display = <Page />;
        }
      	return (
          
      		<div className="App">
           
           {display}
            <button onClick={() => this.handleMatrixClick()}>
              HTML/CSS Demo
            </button>
            <button onClick={() => this.handleCircularClick()}>
              D3 Demo
            </button>

      		</div>
    	)
  	};
}

export default App;