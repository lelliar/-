const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : {type : String},
    parent:{type:mongoose.SchemaTypes.ObjectId , ref:"Classify"}
})

//导出schema
module.exports = mongoose.model('Classify' , schema)