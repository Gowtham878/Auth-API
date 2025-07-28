import express from 'express'
import mongoose from 'mongoose'
import {port,url} from './config/config.js'
import dotenv from 'dotenv'
import route from './routes/route.js'
import cookieParser from 'cookie-parser'

dotenv.config()
mongoose.set('strictQuery', false) 
const app = express(cookieParser())
app.use
app.use(express.json())
app.use('/',route)

mongoose.connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server launched at http://localhost:${port}`) 
    }) 
  })
  .catch((err) => {
    console.error(" DB connection error:", err) 
  }) 