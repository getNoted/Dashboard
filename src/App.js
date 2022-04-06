/*global chrome*/
/* eslint-disable */
import React, {useEffect,useState} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	const [loggedInStatus,setloggedInStatus] = useState(true)
	
	  const loginFn = ()=>{
		  setloggedInStatus(true)

		const sendTokenToChromeExtension = ({ extensionId, authInfo}) => {
			chrome.runtime.sendMessage(extensionId, { authInfo }, response => {
			  if (!response.success) {
				console.log('error sending message', response);
				return response;
			  }
			  console.log(response)
			});
		  }
		//   calling 
		const authToken = localStorage.getItem('token')
		let authObj =  JSON.stringify({"loggedInStatus":true,authToken})
		console.log(authObj, "from login")
		sendTokenToChromeExtension({ extensionId: 'fkldjphfipjbgmadnppjeebikbhoaelm', authInfo: authObj})
	  }

	  const logoutFn = ()=>{
		setloggedInStatus(false)

		const sendTokenToChromeExtension = ({ extensionId, authInfo}) => {
			chrome.runtime.sendMessage(extensionId, { authInfo }, response => {
			  if (!response.success) {
				console.log('error sending message', response);
				return response;
			  }
			  console.log(response)
			});
		  }
		//   calling
		  let authObj =  JSON.stringify({"loggedInStatus":false,"authToken":null})
		  console.log(authObj)
		sendTokenToChromeExtension({ extensionId: 'fkldjphfipjbgmadnppjeebikbhoaelm', authInfo: authObj})
	  }

	useEffect(() => {	
		// console.log(tokenObj);
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
			<div className="buttons">
				<button className="login" onClick={loginFn}>Login</button>
				<button className="logout" onClick={logoutFn}>Logout</button>
			</div>
		</div>
	)
}

export default App
