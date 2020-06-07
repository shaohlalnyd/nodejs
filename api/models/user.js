const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    national_id:{type:String,required:true},
    city_id:{type:mongoose.Types.ObjectId,required:true,ref:'city'},
    province_id:{type:mongoose.Types.ObjectId,required:true,ref:'province'},
    province_id:{type:mongoose.Types.ObjectId,required:true,ref:'province'},
    contact:{
        phone:{type:String,required:true},
        telegram:{type:String,required:true},
        instagram:{type:String,required:true},
        whatsApp:{type:String,required:true},
        email:{type:String,required:true},
    },
    address:{type:String,required:true},
    role:{type:String,required:true,enum:['ADMIN','SUPPORTER','CUSTOMER']},
    creator_id:{type:mongoose.Types.ObjectId,ref:'user'},
    supporter_id:{type:mongoose.Types.ObjectId,ref:'user'},
    supporter:{type:String,ref:'user'},
    creation_date:{type:Date,required:true},
    photo:{type:String,ref:'files'},
    credit:{type:String}
})

module.exports = mongoose.model('user',user_schema);