import {useState,useEffect} from "react"
import axios from "axios"

function EditTodo({setEditMode,currentEdit,setTodos}){

	const [edited,setEdited] = useState("")

	const hideEditMode = () => {
		setEditMode(false)
	}

	const update = (e) => {
		e.preventDefault()

		axios.put(`/api/todos/${currentEdit._id}/${edited}`).then((res) => {
			setTodos(prev => {
				const newTasks = [...prev]
				currentEdit.body = edited
				return newTasks
			})	
		})

		setEditMode(false)
	}
	return (
		<div className="edittodo-container">
			<svg onClick={hideEditMode} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>

			<form onSubmit={update}>
				<input
				onChange={e => setEdited(e.target.value)}
				placeholder={currentEdit.body}
				maxLength="25"
				type="text"/>
			</form>
		</div>
	)
}

export default EditTodo;