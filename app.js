const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const productsRoutes = require('./api/routes/products')
const orders = require('./api/routes/order')
const users=require('./api/routes/users')
mongoose.connect('mongodb://localhost/nodeShop',{useUnifiedTopology:true,useNewUrlParser:true})


// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
//     if(req.method === "OPTIONS"){
//         res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
//         return res.status(200).json({
//         })
//         next()
//     }
// })



app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())
//اجازه میدهد ک همه ب ان دسترسی داشته باشند و بتوانند ک انرا در مرورگر ببینند برای فهم بیشتر بعد از یو ار ال سایت می اییم و نام یکی از عکس ها را میزنیم
app.use('/uploads',express.static('uploads'))
//routes
app.use('/products',productsRoutes)
app.use('/orders',orders)
app.use('/users',users)


app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status=404
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app