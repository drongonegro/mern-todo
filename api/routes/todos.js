import express from "express"
import Todo from "../models/Todo.js"
const router = express.Router()

router.post("/newtodo", async (req,res) => {
	const {userid,body} = req.body
	const createdTodo = await Todo.create({
		body: body,
		user: userid,
	})
	res.status(200).json(createdTodo)
})

router.get("/:id", async (req,res) => {
	const {id} = req.params

	const userTodos = await Todo.find({user:id})
	res.json(userTodos)
})

router.delete("/:todoId", async (req,res) => {
	const {todoId,todoBody} = req.params
	const deletedTodo = await Todo.findByIdAndDelete(todoId)
	res.status(200).json(deletedTodo)
})

router.put("/:todoId/:todoBody", async (req,res) => {
	const {todoId,todoBody} = req.params
	const updatedTodo = await Todo.findByIdAndUpdate(todoId,{body:todoBody})

	res.status(200).json(updatedTodo)
})

export default router;