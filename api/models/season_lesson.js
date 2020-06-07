const mongoose = require('mongoose')

const seson_lesson = mongoose.Schema({
    lesson_id:{type:mongoose.Types.ObjectId,ref:'lesson',required:true},
    season_id:{
        type:mongoose.Types.ObjectId,ref:'season',required:true
    },
    lesson_order:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('category',category_schema);