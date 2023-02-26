import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 12,
	},

	password: {
		type: String,
		required:true,
		min:5,
	},
})

export default mongoose.model("User",UserSchema)