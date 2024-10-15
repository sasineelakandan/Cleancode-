

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './src/Route/route.js'
import { DATABASE_URL, PORT} from './utils/config.js'
import bodyParser from'body-parser'



dotenv.config()


const app=express()
const Port=PORT||3001;
mongoose.connect(DATABASE_URL)
.then(()=>{
console.log('mongodb connected')
})
.catch((error)=>{
 console.log(error)
})
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({}))
app.use(cookieParser())
app.use(express.json())


app.use(router)


const Server=app.listen(Port,()=>{
    console.log(`Server is Running ${Port}`)
})
