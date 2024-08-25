import dotenv from "dotenv"
import connectDB from "./DB/connectDb.js"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})



connectDB()
    .then(() => {
        // app.on 
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is runnig at port :${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("DB connection failed !!", err)
    })