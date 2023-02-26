import {useState,useContext} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import {userContext} from "../App.jsx"
import Todos from "../pages/Todos.jsx"

function Login(){
	const [username,setUsername] = useState("")
	const [password,setPassword] = useState("")

	const {user,setUser} = useContext(userContext)

	if(user?.id){
		return <Todos/>
	}

	const login = (e) => {
		e.preventDefault()

		axios.post("/api/auth/login", {
			username,
			password,
		}).then(res => {
			if(res.status == 200){
				setUser({
					username: username,
					id:res.data
				})
			}
		})
	}

	return (
		<div className="auth-container">
			<h2>Login</h2>
			<form className="auth-form" onSubmit={login}>
				<input 
				onChange={e => setUsername(e.target.value)}
				type="text"
				placeholder="username"/>

				<input
				onChange={e => setPassword(e.target.value)}
				type="password"
				placeholder="password"/>
				
				<button>Login</button>
				<h5>dont have account? <Link to="/register">REGISTER</Link></h5>
			</form>
		</div>
	)
}

export default Login;