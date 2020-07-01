const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    classifies : [{ type:mongoose.SchemaTypes.ObjectId , ref:'Classify'}],
    title:{ type:String },
    body : { type:String }
},{
    timestamps:true
})

module.exports = mongoose.model('Aricle' , schema)