module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')


    return async (req ,res, next)=>{
        const token = String(req.headers.authorization || '').split(' ').pop()
        //当token不存在
        assert(token , 401 , '请先登录')
        // if(!token){
        //     res.status(401).send({
        //         message:'请先登录'
        //     })
        // }
        //解密id
        const { id } = jwt.verify(token, req.app.get('secret'))

        assert(id , 401 , '请先登录')
        //通过id找到数据库中的用户，查看用户是否真的存在
        req.user = await AdminUser.findById(id)
        assert(req.user , 401 , '请先登录')
        // if(!user){
        //     res.status(401).send({
        //         message:'请先登录'
        //     })
        // }
        //
       next()
    }
}