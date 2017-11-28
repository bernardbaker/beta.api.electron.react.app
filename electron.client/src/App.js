import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import './App.css';

class App extends Component {
	
	state = {users: []}
	
	componentDidMount() {
		
		console.dir(window);
		
		fetch('/users')
			.then(res => res.json())
			.then(users => this.setState({ users }));
	}
	
	render() {
		return (
			<div>		
				<div className="App">
					<h1>Fetching user profile data</h1>
					{
						this.state.users.map(user =>
							<div key={user.id}>Profile data requested from /users API endpoint: <span className="User-profile">{user.username}</span> - <span className="User-profile">{user.callsign}</span></div>
						)
					}
				</div>
				<Navigation/>
			</div>
		);
	}
}

class Navigation extends Component {
	
	render() {
		return (
			<Router>
				<div>
					<nav>
						<h3>Simple demo options</h3>
						<ul>
							<li><Link to="/">Welcome</Link></li>
							<li><Link to="/demo01">Dynamic Bar Chart</Link></li>
							<li><Link to="/demo02">Dynamic Line Graph</Link></li>
							<li><Link to="/demo03">Polar Clock</Link></li>
						</ul>
					</nav>
					<hr/>
					<Route exact path="/" component={Welcome}/>
					<Route path="/demo01" component={Demo01}/>
					<Route path="/demo02" component={Demo02}/>
					<Route path="/demo03" component={Demo03}/>				
				</div>
			</Router>
		);	
	}
}

class Welcome extends Component {
	
	constructor() {
		super();
		
		this.state = {
			randomNumber: 0
		}
		
		this.generateRandomNumber = this.generateRandomNumber.bind(this);
		
	}
	
	componentDidMount() {
		this.generateRandomNumber();
	}
	
	generateRandomNumber() {
		fetch('/data/randomNumber')
			.then(res => res.json())
			.then(randomNumber => this.setState( randomNumber ));
	}
	
	render() {
		return (
			<div>
				<h1 className="Title">Welcome to some simple demos.</h1>
				<p>These demos make use of a Node.js API backend coupled with an Electron application to deploy a ReactJs front end.</p>
				<p>This random number was sent from the /data/randomNumber API endpoint: <span className="Random-number">{this.state.randomNumber}</span><button onClick={this.generateRandomNumber}>GET A NEW NUMBER</button></p>
			</div>
		);
	}
}

class Demo01 extends Component {
	
	constructor() {
		super();
		
		this.state = {
			randomChartValues: []
		}
		
		this.getRandomChartValues = this.getRandomChartValues.bind(this);
		this.redrawChart = this.redrawChart.bind(this);
	}
	
	componentDidMount() {
		this.getRandomChartValues();
	}
	
	redrawChart() {
		
		console.dir(this.state);
		
		const window = this.props.window;
		const d3 = this.props.window.d3;
		
		
		if(window.document.getElementById('chart').hasChildNodes()) {
			while(window.document.getElementById('chart').hasChildNodes()) {
				window.document.getElementById('chart').removeChild(
					window.document.getElementById('chart').firstChild	
				)	
			}
		}
		
		var copyOfValues = this.state.randomChartValues.slice();
		var highestValue = copyOfValues.sort(function(a, b){return b-a}).shift();
		
		
		
		d3.select(window.document.getElementById('chart'))
			.selectAll("div")
			.data(this.state.randomChartValues)
			.enter()
			.append("div")
			.style("height", (d) => d + "px")
			.style("bottom", (d) => "-" + (255 - highestValue) + "px")

	}
	
	getRandomChartValues() {
		fetch('/data/chartValues')
			.then(res => res.json())
			.then(randomChartValues => {
				
				this.setState({
					randomChartValues
				});
				this.redrawChart();
			});
	}
	
	render() {
		return (	
			<div>
				<h1 className="Title">Dynamic Bar Chart</h1>
				<p>This bar chart is created using data which has been fetched from the /data/chartValues API endpoint. Pressing the button below will request a new random data set.</p>
				<hr className="Horizontal-rule"/>
				<div className="Chart" id='chart'></div>
				<br/>
				<br/>
				<button className="Chart-get-new-data-button" onClick={this.getRandomChartValues}>REQUEST NEW DATA FROM API ENDPOINT</button>
			</div>
		);
	}
}

Demo01.defaultProps = {
	window: window
}

class Demo02 extends Component {
	
	constructor() {
		super();
		
		this.state = {
			randomChartValues: []
		}
		
		this.getRandomChartLineValues = this.getRandomChartLineValues.bind(this);
		this.redrawChart = this.redrawChart.bind(this);
	}
	
	componentDidMount() {
		this.getRandomChartLineValues();
	}
	
	redrawChart() {
		
		console.dir(this.state);
		
		const window = this.props.window;
		const d3 = this.props.window.d3;
		
		
		if(window.document.getElementById('line-chart').hasChildNodes()) {
			while(window.document.getElementById('line-chart').hasChildNodes()) {
				window.document.getElementById('line-chart').removeChild(
					window.document.getElementById('line-chart').firstChild	
				)	
			}
		}
		
		
		this.data = [];
		
		for( var i  = 0;  i < this.state.randomChartValues.length; i++ ) {
			this.data.push({ x : i * 10, y : this.state.randomChartValues[ i ] });
		}
		
		console.dir(this.data);
	
		console.dir(d3)
		
		var line = d3.line()
			.x((d)=> d.x)
			.y((d)=> 100 - d.y)
		
		d3.select('#line-chart')
			.append("path")
			.attr('transform', 'translate(0,170)')
			.attr('stroke-width', 2)
			.attr('d', line(this.data))

	}
	
	getRandomChartLineValues() {
		fetch('/data/chartLineValues')
			.then(res => res.json())
			.then(randomChartValues => {
				
				this.setState({
					randomChartValues : randomChartValues
				});
				this.redrawChart();
			});
	}
	
	render() {
		return (	
			<div>
				<h1 className="Title">Dynamic Line Graph</h1>
				<p>This line chart has been created using data which has been fetched from the /data/chartLineValues API endpoint. Pressing the button below will request new random data from the API.</p>
				<hr className="Horizontal-rule"/>
				<svg className="Line-chart" id="line-chart" width="1230" height="270"></svg>
				<br/>
				<br/>
				<button className="Chart-get-new-data-button" onClick={this.getRandomChartLineValues}>REQUEST NEW DATA FROM API ENDPOINT</button>
			</div>
		);
	}
}

Demo02.defaultProps = {
	window: window
}

class Demo03 extends Component {
	
	constructor() {
		super();
		
		this.redrawChart = this.redrawChart.bind(this);
	}
	
	componentDidMount() {
		this.redrawChart();
	}
	
	redrawChart() {
		
		const window = this.props.window;
		const d3 = this.props.window.d3;
		
		console.dir(d3);
		
		var width = 480,
		height = 400,
		radius = Math.min(width, height) / 1.9,
		spacing = .09;
	
		var formatSecond = d3.timeFormat("%-S seconds"),
			formatMinute = d3.timeFormat("%-M minutes"),
			formatHour = d3.timeFormat("%-H hours"),
			formatDay = d3.timeFormat("%A"),
			formatDate = function(d) { d = d.getDate(); switch (10 <= d && d <= 19 ? 10 : d % 10) { case 1: d += "st"; break; case 2: d += "nd"; break; case 3: d += "rd"; break; default: d += "th"; break; } return d; },
			formatMonth = d3.timeFormat("%B");
		
		var color = d3.scaleLinear()
			.range(["hsl(-180,60%,50%)", "hsl(180,60%,50%)"])
			.interpolate(function(a, b) { var i = d3.interpolateString(a, b); return function(t) { return d3.hsl(i(t)); }; });
		
		var arcBody = d3.arc()
			.startAngle(0)
			.endAngle(function(d) { return d.value * 2 * Math.PI; })
			.innerRadius(function(d) { return d.index * radius; })
			.outerRadius(function(d) { return (d.index + spacing) * radius; })
			.cornerRadius(6);
		
		var arcCenter = d3.arc()
			.startAngle(0)
			.endAngle(function(d) { return d.value * 2 * Math.PI; })
			.innerRadius(function(d) { return (d.index + spacing / 2) * radius; })
			.outerRadius(function(d) { return (d.index + spacing / 2) * radius; });
		
		var svg = d3.select("#body").append("svg")
			.attr("width", width)
			.attr("height", height)
		  .append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		
		var field = svg.selectAll("g")
			.data(fields)
		  .enter().append("g");
		
		field.append("path")
			.attr("class", "arc-body");
		
		field.append("path")
			.attr("id", function(d, i) { return "arc-center-" + i; })
			.attr("class", "arc-center");
		
		field.append("text")
			.attr("dy", ".35em")
			.attr("dx", ".75em")
			.style("text-anchor", "start")
		  .append("textPath")
			.attr("startOffset", "50%")
			.attr("class", "arc-text")
			.attr("xlink:href", function(d, i) { return "#arc-center-" + i; });
		
		tick();
		
		// changed to body
		d3.select('#body').style("height", height + "px");
		
		function tick() {
		  if (!document.hidden) field
			  .each(function(d) { this._value = d.value; })
			  .data(fields)
			  .each(function(d) { d.previousValue = this._value; })
			.transition()
			  .ease(d3.easeElastic)
			  .duration(500)
			  .each(fieldTransition);
		
		  setTimeout(tick, 1000 - Date.now() % 1000);
		}
		
		function fieldTransition() {
		  var field = d3.select(this).transition();
		
		  field.select(".arc-body")
			  .attrTween("d", arcTween(arcBody))
			  .style("fill", function(d) { return color(d.value); });
		
		  field.select(".arc-center")
			  .attrTween("d", arcTween(arcCenter));
		
		  field.select(".arc-text")
			  .text(function(d) { return d.text; });
		}
		
		function arcTween(arc) {
		  return function(d) {
			var i = d3.interpolateNumber(d.previousValue, d.value);
			return function(t) {
			  d.value = i(t);
			  return arc(d);
			};
		  };
		}
		
		function fields() {
		  var now = new Date;
		  return [
			{index: .7, text: formatSecond(now), value: now.getSeconds() / 60},
			{index: .6, text: formatMinute(now), value: now.getMinutes() / 60},
			{index: .5, text: formatHour(now),   value: now.getHours() / 24},
			{index: .3, text: formatDay(now),    value: now.getDay() / 7},
			{index: .2, text: formatDate(now),   value: (now.getDate() - 1) / (32 - new Date(now.getYear(), now.getMonth(), 32).getDate())},
			{index: .1, text: formatMonth(now),  value: now.getMonth() / 12}
		  ];
		}
	}
	
	render() {
		return (	
			<div>
				<h1 className="Title">Polar Clock</h1>
				<p>This clock orientates it self at a central pole. There is no data being sought from an API endpoint.</p>
				<hr className="Horizontal-rule"/>
				<div id="body" className="Clock"></div>
			</div>
		);
	}
}

Demo03.defaultProps = {
	window: window
}

export default App;
