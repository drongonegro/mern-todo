import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import auth from "./routes/auth.js"
import todos from "./routes/todos.js"

dotenv.config()

const app = express()

mongoose.set("strictQuery",false)
mongoose.connect(process.env.MONGO_URL)

app.use(cors({
	credentials:true,
	origin: "http://localhost:5173",
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",auth)
app.use("/api/todos",todos)

app.listen(6969,() => console.log("running"))