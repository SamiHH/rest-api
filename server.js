const express = require('express')

require('dotenv').config({ path : './config/.env'})
require('./config/db')

const routerUser = require('./routes/user.router')

const app = express()

app.use(express.json())

app.use('/api/user', routerUser )


app.get('/' , (req,res)=> {
    res.send('<h1> Hello Express </h1> ')
})

app.listen( process.env.PORT , ()=> {
    console.log(`server are Started on : ${process.env.PORT}`);
})