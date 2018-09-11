import React, {Component} from 'react';
import Page from './Layout/Page.jsx';
import Matrix from './Matrix/Matrix.jsx';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      matrixElements: [{ size: 100 }]
    }
  }

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

  	render() {
      	return (
      		<div className="App">
            <Page />
            <Matrix size={this.state.matrixElements[0].size} />
          	
          	
            {this.divFun()}
      		</div>
    	)
  	};
}

export default App;