/*global chrome*/

import React, {useEffect} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	const sendTokenToChromeExtension = ({ extensionId, token}) => {
		chrome.runtime.sendMessage(extensionId, { token }, response => {
		  if (!response.success) {
			console.log('error sending message', response);
			return response;
		  }
		  console.log('Sucesss ::: ', response.message)
		});
	  }
	
	useEffect(() => {
		const token = localStorage.getItem('token')
		sendTokenToChromeExtension({ extensionId: 'fkldjphfipjbgmadnppjeebikbhoaelm', token: token})
	}, [])
	
	return (
		<div className="container">
			<nav className="navigation">
				<ul>
					<li><a href="http://localhost:3001/">Home</a></li>
					<li><a href="http://localhost:3001/register">Register</a></li>
					<li><a href="http://localhost:3001/login">Login</a></li>
					{/* <li><a href="#about">About</a></li> */}
				</ul>
			</nav>
			<BrowserRouter>
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/dashboard" exact component={Dashboard} />
			</BrowserRouter>
		</div>
	)
}

export default App
