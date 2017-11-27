import React, { Component } from 'react';
import { 
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import './App.css';

class App extends Component {
	
	state = {users: []}
	
	componentDidMount() {
		fetch('/data')
			.then(res => res.json())
			.then(users => this.setState({ users }));
	}
	
	render() {
		return (
			<div>		
				<div className="App">
					<h1>Users</h1>
					{
						this.state.users.map(user =>
							<div key={user.id}>{user.username}</div>
						)
					}
				</div>
				<Navigation/>
			</div>
		);
	}
}

const Welcome = () => (
	<div>
		<h1>Welcome</h1>
	</div>
)

const Demo01 = () => (
	<div>
		<h1>Demo 01</h1>
	</div>
)

const Demo02 = () => (
	<div>
		<h1>Demo 02</h1>
	</div>
)

const Demo03 = () => (
	<div>
		<h1>Demo 03</h1>
	</div>
)

const Demo04 = () => (
	<div>
		<h1>Demo 04</h1>
	</div>
)

class Navigation extends Component {
	
	render() {
		return (
			<Router>
				<div>
					<nav>
						<ul>
							<li><Link to="/">Welcome</Link></li>
							<li><Link to="/demo01">Demo 01</Link></li>
							<li><Link to="/demo02">Demo 02</Link></li>
							<li><Link to="/demo03">Demo 03</Link></li>
							<li><Link to="/demo04">Demo 04</Link></li>
						</ul>
					</nav>
					<hr/>
					<Route exact path="/" component={Welcome}/>
					<Route path="/demo01" component={Demo01}/>
					<Route path="/demo02" component={Demo02}/>
					<Route path="/demo03" component={Demo03}/>
					<Route path="/demo04" component={Demo04}/>					
				</div>
			</Router>
		);	
	}
}

export default App;
