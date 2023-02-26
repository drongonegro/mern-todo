import {useState, useEffect,createContext} from "react"
import { BrowserRouter,Routes, Route } from "react-router-dom";
import axios from "axios"
import "./App.css"	
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Todos from "./pages/Todos.jsx"

export const userContext = createContext({})

function App() {	

	axios.defaults.baseURL = "http://localhost:6969"
	axios.defaults.withCredentials = true

	const [user,setUser] = useState(null)

	useEffect(() => {
		axios.get("/api/auth/profile").then(res => setUser(res.data))
	},[])

	return (
		<div className="App"> 
			<userContext.Provider value={{user,setUser}}>
				
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login/>}/>
						<Route path="/register" element={<Register/>}/>
					</Routes>
				</BrowserRouter>

			</userContext.Provider>
		</div>
	)
}

export default App;