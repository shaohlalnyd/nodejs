const multer = require('multer')

    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./uploads')
        },
        filename:(res,file,cb)=>{
            cb(null,new Date().getTime()+"-"+file.originalname)
        }
    })

    const filterFile =(req,file,cb)=>{
        if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
            cb(null,true)
        }
        else{
            cb(new Error('این فایل با این پس.ند را نمیتوانید آپلود کنید'),false)
        }
    }

    const upload=multer({
        storage:storage,
        limits:{
            fileSize:1024*1024*5
        },
        fileFilter:filterFile
    })

    module.exports=upload
