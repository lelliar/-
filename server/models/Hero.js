const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : { type:String },
    avatar : { type:String },
    banner : { type:String },
    title : {type:String},
    //定义为数组，实现多选功能
    //数组中关联能是多个ID
    classifies:[{ type: mongoose.SchemaTypes.ObjectId , ref:'Classify' }],
    scores:{
        difficult : { type:Number },
        skills : { type:Number },
        attack : { type:Number },
        survive: { type:Number }
    },
    skills:[{
        icon : { type:String },
        name : { type:String },
        delay : { type:String },
        const : { type:String },
        description : { type:String },
        tips : { type:String }
    }],
    items1: [{ type:mongoose.SchemaTypes.ObjectId , ref: 'Item'}],
    items2: [{ type:mongoose.SchemaTypes.ObjectId , ref: 'Item'}],
    usageTips : { type:String },
    battleTips: { type:String },
    teamTips : { type:String },
    partners : [{
        hero : {type: mongoose.SchemaTypes.ObjectId , ref: 'Hero'},
        description : { type:String },
    }]
})

module.exports = mongoose.model('Hero' , schema , 'heroes')