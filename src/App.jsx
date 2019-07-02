import React, { Component } from 'react';
import Header from './components/Layout/Header.jsx';
import Matrix from './components/Matrix/Matrix.jsx';
import D3Matrix from './components/D3Matrix/D3Matrix.jsx';
import MouseD3Matrix from './components/MouseD3Matrix/MouseD3Matrix.jsx';
import IntroText from './components/Layout/IntroText.jsx';
import Button from './components/Layout/Button.jsx';
import MatrixText from './components/Layout/MatrixText.jsx';
import D3MatrixText from './components/Layout/D3MatrixText.jsx';
import MouseD3MatrixText from './components/Layout/MouseD3MatrixText.jsx';
import IntroImages from './components/Layout/IntroImages.jsx';
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
      socket.on("noArduino", function(error) {
        console.log("Error in frontend " + error);
      }.bind(this));
    }

  handleMouseClick(event) {
    
    const id = event.target.id;
    console.log(id)
    if(id == "htmlcss") {
      this.setState({ showMatrix: true });
      this.setState({ showD3Matrix: false });
      this.setState({ showMouseD3Matrix: false });
    } else if (id == "d3demo") {
      this.setState({ showD3Matrix: true });
      this.setState({ showMatrix: false });
      this.setState({ showMouseD3Matrix: false });
    } else if (id == "mouse") {
      this.setState({ showMouseD3Matrix: true });
      this.setState({ showMatrix: false });
      this.setState({ showD3Matrix: false });
    }
  }
  
  
  	render() {
        const showMatrix = this.state.showMatrix;
        const showD3Matrix = this.state.showD3Matrix;
        const showMouseD3Matrix = this.state.showMouseD3Matrix;
        let leftDisplay;
        let rightDisplay;
        
        if (showMatrix) {
          leftDisplay = <Matrix />;
          rightDisplay = <MatrixText />
        } else if (showD3Matrix) {
          leftDisplay = <D3Matrix />;
          rightDisplay = <D3MatrixText />
        } else if (showMouseD3Matrix) {
          leftDisplay = <MouseD3Matrix />
          rightDisplay = <MouseD3MatrixText />
        }
        else {
          leftDisplay = <IntroText />;
          rightDisplay = <IntroImages />
        }
      	return (
          
      		<div className="App">
           <Header />
           <Button id="htmlcss" onClick={event => this.handleMouseClick(event)} title="HTML/CSS Demo" />
                    
            <Button id="d3demo" onClick={event => this.handleMouseClick(event)} title="D3 Demo" />
                
            <Button id="mouse" onClick={event => this.handleMouseClick(event)} title="Mouse Demo" />
              <a href="https://github.com/ubcspin/TouchSensor">
                  <button>
                    View on Github
                  </button>
              </a>
           {leftDisplay}
           {rightDisplay}
            

      		</div>
    	)
  	};
}

export default App;