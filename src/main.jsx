import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
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
      		<div>
      			<h1>Displaying Matrix</h1>
          	<p>{this.myFunFn()}</p>
          	<p>{this.state.num}</p>
            {this.divFun()}
      		</div>
    	)
  	};
}



ReactDOM.render(<Hello/>, document.getElementById('hello'));
