require("dotenv").config()

const mongoose = require("mongoose")

 function connectDb(){
    mongoose.connect(process.env.MONGO_CONN_URL,{useNewUrlParser:true,useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true});
        const connection = mongoose.connection;
    
    
        connection.once('open',()=>{
          console.log("database connected");
        }).catch(()=>{
            console.log("connection failed");
        })
}

module.exports = connectDb