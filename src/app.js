 const express = require("express");
const path = require("path");
require("./Database/conns")

const User = require("./models/usermessage")
const hbs = require("hbs");
const {registerPartials} = require("hbs");
const { CLIENT_RENEG_LIMIT } = require("tls");

 const app = express();

 //port configuration
 const port = process.env.PORT || 3000;

//setting the path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

//middleware 
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.use(express.json())

app.set("view engine" , "hbs"); // hum hbs use krre hai toh ise batana padega
app.set("views",templatepath)
hbs.registerPartials(partialpath);





// create a route for the app
 app.get("/",(req,res)=>{
    res.render("index");  // hbs file ko show krne k liye
 })
 



 app.post("/contact",async(req,res)=>{
   const formData = {...req.body}
   console.log(formData)
  try{
      //  res.send(req.body);
      const userData = new User(formData);
      await userData.save();
      res.status(201).render("index");

  } catch(error){
   res.status(500).send(error);
  }


 })
 // server creation (server listening to request)
 app.listen(port,()=>{
    console.log(`server is running at ${port}`);
 })