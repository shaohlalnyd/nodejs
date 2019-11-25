const express = require('express')

const router = express.Router()
const product = require('../models/product')
const multer = require('multer')
const uploader = require('../uploader/upload')
const checkAuth = require('../middleware/checkAuth')
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./uploads/')
//     },filename:function(req,file,cb){
//         cb(null,new Date().getTime()+'-'+file.originalname)
//     },
// })
//برخی از فایل هارا ک اینجا گذاشتیم را اجازه ذخیره شدن نمیدهد
// const fileFilter =(res,file,cb)=>{
//     //reject a file
//     if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
//         cb(null,true)
//     }
//     else{
//         cb(new Error('این فایل با این پس.ند را نمیتوانید آپلود کنید'),false)
//     }

// }
// const upload = multer({
//     storage:storage,
//     limits:{
//         fileSize:1024*1024*5
//     },
//     //فایل فیلتر ب برخی از فایل ها اجازه ذخیره شدن میدهد و ب ببرخی  اجازه نمیدهد
//     fileFilter:fileFilter
// })
router.get('/', (req, res, next) => {
    product.find().select("name price productImage").exec()
        .then(data => {
            const response = {
                count: data.length,
                data: data
            }
            if (data.length > 0) {
                res.status(200).send(response)
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }).catch(err => {
            res.status(400).send(err)
        })
})
router.post('/',checkAuth, uploader.single('productImage'),(req, res, next) => {
    const newProduct = new product({
        name: req.body.name,
        price: req.body.price,
        productImage:req.file.path
    })
    newProduct.save().then(data => {
        res.status(200).send(data)
    }).catch(err => res.status(400).send(err))
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    product.findById(id).exec()
        .then(data => {
            if (data) {
                res.status(200).send(data)
            }
            else {
                res.status(404).json({
                    message: "not found"
                })
            }
        }).catch(err => {
            res.status(400).send(err)
        })
})
router.delete('/:productId', (req, res, next) => {
    id = req.params.productId
    product.deleteOne({ _id: id }).exec()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(404).json({
                message: 'not found'
            })
        })
})
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    product.update({ _id: id }, { $set: updateOps }, { strict: false }).exec()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err)
        })
})
module.exports = router