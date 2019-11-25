const jwt = require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try {
        const decode = jwt.verify(req.body.token,'secret')
        console.log(decode)
        req.userData = decode
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"auth field"
        })
    }
}