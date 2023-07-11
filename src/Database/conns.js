
const mongoose = require("mongoose");

// creating a database

mongoose.connect("mongodb://localhost:27017/new",{
  
  useNewUrlParser:true,
  useUnifiedTopology:true,
  family:4,

}).then(()=>{
    console.log("connection successful");
}).catch((error)=>{
 console.log(error);
})