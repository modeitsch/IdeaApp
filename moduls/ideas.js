const express = require('express')
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const idSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
mongoose.model('ideas', idSchema);
