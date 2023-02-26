import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

function Register(){
	const [username,setUsername] = useState("")
	const [password,setPassword] = useState("")
	const navigate = useNavigate()

	const register = (e) => {
		e.preventDefault()

		axios.post("/api/auth/register", {
			username,
			password
		}).then(res => res.status == 200 ? navigate("/") : alert("sum went wrong"))
	}

	return (
		<div className="auth-container">
			<h2>Register</h2>
			<form className="auth-form" onSubmit={register}>
				<input
				onChange={e => setUsername(e.target.value)}
				type="text"
				placeholder="username"/>
				
				<input
				onChange={e => setPassword(e.target.value)}
				type="password"
				placeholder="password"/>
				
				<button>register</button>
				<h5>already have account? <Link to="/">LOGIN</Link></h5>
			</form>
		</div>
	)
}

export default Register;