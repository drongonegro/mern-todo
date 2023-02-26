import {useState,useContext,useEffect} from "react"
import {userContext} from "../App.jsx"
import axios from "axios"
import Todo from "../components/Todo.jsx"
import EditTodo from "../components/EditTodo.jsx"

function Todos(){
	const {user,setUser} = useContext(userContext)

	const [todoBody,setTodoBody] = useState("")
	const [todos,setTodos] = useState([])
	const [editMode,setEditMode] = useState(false)
	const [currentEdit,setCurrentEdit] = useState(null)

	useEffect(() => {
		axios.get(`/api/todos/${user.id}`).then(res => {
			setTodos(...todos,res.data)
		})
	},[])

	const logout = () => {
		axios.post("/api/auth/logout").then(() => {
			window.location.reload(false);
		})	
	}

	const addTodo = (e) => {
		e.preventDefault()

		axios.post("/api/todos/newtodo", {
			userid: user.id,
			body: todoBody,
		}).then(res => {
			setTodos([...todos,res.data])
			setTodoBody("")
		})
	}

	return (
		<div>
			<div className="profile">
				<h2>{user.name || user.username }</h2>
				<button onClick={logout}>Log out</button>
			</div>
			<form className="todo-form" onSubmit={addTodo} >
				<input
				value={todoBody}
				onChange={e => setTodoBody(e.target.value)}
				maxLength="25"
				type="text"
				placeholder="type todo..."/>

				<button>+</button>
			</form>
			<div className="todos-container">
				{editMode && <EditTodo
					setEditMode={setEditMode}
					todos={todos}
					setTodos={setTodos}
					setCurrentEdit={setCurrentEdit}
					currentEdit={currentEdit}/>}

				{todos.map((todo,id) => {
					 return (<Todo
					 	key={id}
					 	setCurrentEdit={setCurrentEdit}
					 	name={todo}
					 	todos={todos}
					 	setTodos={setTodos}
					 	setEditMode={setEditMode}/>)
				})}
			</div>	
		</div>
	)
}

export default Todos;