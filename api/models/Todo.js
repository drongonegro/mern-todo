import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
	body: {
		type: String,
	},
	user: {
		type: String,
	},
})

export default mongoose.model("Todo",TodoSchema)