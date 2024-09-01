const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
require('dotenv').config();
const mongo_url=process.env.MONGO_CONN;
//mongodb+srv://shivam:Shivamkvs@cluster0.czaej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const db1Connection=mongoose.createConnection(mongo_url,{
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
});
db1Connection.on('connected',()=>{
    console.log('connected to the first database');
})
db1Connection.on('error',(err)=>{
    console.error('Error connecting to the first database',err);
});
