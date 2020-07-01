module.exports = app =>{
    const express = require('express')
    const AdminUser = require('../../models/AdminUser')
    //使用assert统一抛出错误

    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams:true
    })

    //创捷资源路由
    router.post('/' , async (req ,res)=>{
      
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //资源列表
    router.get('/' ,  async(req , res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Classify'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    //资源删除
    router.delete('/:id' , async(req ,res)=>{
         await req.Model.findByIdAndDelete(req.params.id)
         res.send({
             success:true
         })
    })
    //资源详情
    router.get('/:id' , async(req ,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //资源更新
    router.put('/:id' , async(req, res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id , req.body)
        res.send(model)
    })

    const auth = require('../../middleware/auth')
    const resource = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource' ,auth(),resource(),router)
    //为upload上传单个文件file
    //该包直接将file挂载到req.file
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',auth(),upload.single('file'), async (req , res)=>{
        const file = req.file
        file.url= `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //登录接口
    app.post('/admin/api/login' , async (req ,res)=>{
        
        //根据用户查找用户名
        const { username, password } = req.body
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user , 422 , '用户不存在')
        // if(!user){
        //     res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        //校验密码
        //由于数据库中select为false，则user.password在此处拿不到，需要在findone中拿到password
        const isValid = require('bcrypt').compareSync(password , user.password)
        assert(isValid , 422 , '密码错误')
        // if(!isValid){
        //     res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        //返回token
        /*第一个参数为要散列的token值，第二个参数为密钥，应为全局的环境变量，同时搭配
        jwt.verify，防止客户端的篡改*/
        const token = jwt.sign({ id: user._id }, app.get('secret'))
         res.send({ token })
    })

    
    //统一错误处理
    app.use(async (err, req, res, next) => {
    //     // console.log(err)
         res.status(err.statusCode || 500).send({
             message:err.message
         })
       })
}