import React from 'react';
import Page from './Layout/Page.jsx';
import Matrix from './Matrix/Matrix.jsx';

class App extends React.Component {
  constructor(props) {
		super(props);
		this.setState({});
		this.state = {
			num: 5,
		}
  }

  	myFunFn() {
    	return ("all of the returns");
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
            <Matrix />
          	<p>{this.myFunFn()}</p>
          	<p>{this.state.num}</p>
            {this.divFun()}
      		</div>
    	)
  	};
}

export default App;