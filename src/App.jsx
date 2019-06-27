import React, { Component } from 'react';
import Page from './components/Layout/Page.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import D3Matrix from './components/D3Matrix/D3Matrix.jsx';
import MouseD3Matrix from './components/MouseD3Matrix/MouseD3Matrix.jsx';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

class App extends Component {
 
    state = {
     showMatrix: false,
     showD3Matrix: false,
     showMouseD3Matrix: false
    }
  
    componentDidMount() {
      socket.on("apple", function(error) {
        console.log("Error in frontend " + error);
      }.bind(this));
    }

  handleMatrixClick() {
    this.setState((state) => ({
       showMatrix: !this.state.showMatrix 
      }));
    this.setState({ showD3Matrix: false });
    this.setState({ showMouseD3Matrix: false });
    socket.emit("demo");
  }

  handleD3MatrixClick() {
    this.setState((state) => ({
      showD3Matrix: !this.state.showD3Matrix 
     }));
    this.setState({ showMatrix: false });
    this.setState({ showMouseD3Matrix: false });
    socket.emit("demo");
  }

  handleMouseClick() {
    this.setState((state) => ({
      showMouseD3Matrix: !this.state.showMouseD3Matrix 
     }));
    this.setState({ showD3Matrix: false });
    this.setState({ showMatrix: false });
  }
  handleStopClick() {
    socket.emit("stop");
  }

  	render() {
        const showMatrix = this.state.showMatrix;
        const showD3Matrix = this.state.showD3Matrix;
        const showMouseD3Matrix = this.state.showMouseD3Matrix;
        let display;
        
        if (showMatrix) {
          display = <Matrix />;
        } else if (showD3Matrix) {
          display = <D3Matrix />;
        } else if (showMouseD3Matrix) {
          display = <MouseD3Matrix />
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
            <button onClick={() => this.handleMouseClick()}>
              Mouse Demo
            </button>
            <button onClick={() => this.handleStopClick()}>
              Stop
            </button>

      		</div>
    	)
  	};
}

export default App;