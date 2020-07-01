module.exports = app => {
    //连接mongoose
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba' , {
        //mongo>=3.1.0后增加该属性实现连接，
        //如果使用DeprecationWarning会报错不建议使用当前URL字符串解析器
        //使用useNewUrlParser能避免出现该警告
        useNewUrlParser: true
    })
    //讲所有的数据库模板导入到该文件，防止引用不成功的报错
}