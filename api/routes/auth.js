import express from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
const router = express.Router()
dotenv.config()

router.post("/register", async (req,res) => {
	try{
		const bSalt = await bcrypt.genSalt(10)
		const {username,password} = req.body

		const createdUser = await User.create({
			name: username,
			password: await bcrypt.hash(password,bSalt)
		})
		res.json("ok")
	}catch(err){
		res.json("cant register")
	}
})

router.post("/login", async (req,res) => {
	const {username,password} = req.body
	const userDoc = await User.findOne({name:username})
	let passOk
	if(userDoc){
		passOk = bcrypt.compareSync(password, userDoc.password)
	}

	if(passOk){
		jwt.sign({ username:userDoc.name, id:userDoc._id }, process.env.JWT_SECRET, {}, (err,token) => {
			if(err) throw err;
			res.cookie("token",token).json(userDoc._id)
		})

	}else{
		res.status(400).json("no")
	}
})

router.get("/profile", (req,res) => {
	const {token} = req.cookies

	if(token){
		jwt.verify(token,process.env.JWT_SECRET,{},(err,user) => {
			if(err) throw err;
			res.json(user)
		})
	}

})

router.post("/logout", (req,res) => {
	res.cookie("token",'').json("ok")
})

export default router;