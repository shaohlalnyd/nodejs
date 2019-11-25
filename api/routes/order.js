const express = require('express')
const router = express.Router()
const order = require('../models/order')
router.get('/', (req, res, next) => {
    order.find().select('quntity product')
    .populate('product','name')
    .exec()
        .then(data => {
            res.status(200).json({
                message: 'success',
                data: data
            })
        }).catch(err => {
            res.status(500).send(err)
        })
})

router.post("/", (req, res, next) => {
    const newOrder = new order({
        product: req.body.product,
        quantity: req.body.quantity
    })
    newOrder.save().then(data => {
        res.status(200).json({
            message: 'succesfully',
            data: data
        })
    }).catch(err => {
        res.status(500).json({
            message: err
        })
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId
    order.findById(id).select('quantity product')
    .populate('product','name')
    .exec()
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'success',
                    data: data
                })
            }
            else{
                res.status(404).json({
                    message:'not found'
                })
            }

        }).catch(err => {
            res.status(500).send(err)
        })
})
module.exports = router