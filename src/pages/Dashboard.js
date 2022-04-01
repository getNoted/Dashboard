import jwt from 'jsonwebtoken'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'

const Dashboard = () => {
	const history = useHistory()

	async function populateNotes() {
		const req = await fetch('', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
				// notes hata do
			}
		}
	}, [])

	

	

	return (
		<div className="dash-con">
			<h1>From here You will be able to select notes</h1>
			
		</div>
	)
}

export default Dashboard
