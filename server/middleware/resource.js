module.exports = options => {
    return async(req ,res , next) => {
        //添加中间件，能够作用于该文件
        //通过infection这个包来讲小写的请求名转换为头字母大写的名称
        const modelName = require('inflection').classify(req.params.resource)
        //由于为中间件，其他路由无法直接引用该Model ，则将Model挂载到req上便能引用
        req.Model = require(`../models/${modelName}`)
        next()
    }
}