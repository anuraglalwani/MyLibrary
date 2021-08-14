
const express = require ("express");
const ejs=require("ejs");
const expressLayouts=require("express-ejs-layouts");
const bodyParser = require('body-parser');
const methodOverride= require("method-override");
const app=express(); 

//routers
const indexRouter= require("./routes/index");
const authorRouter= require("./routes/authors")
const bookRouter= require("./routes/books")

//settings
app.set("view engine","ejs");
app.set("views",__dirname+"/views");
app.set("layout","layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({limit:"10mb",extended:false}))

//database
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://anurag:atlas30@cluster0.vx63t.mongodb.net/mybrary?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true  });
const db=mongoose.connection
db.on("error",error=>console.log(error));
db.once("open",()=>console.log("Connected to Mongoose"));




//using routers
app.use("/",indexRouter);
app.use("/authors",authorRouter);
app.use("/books",bookRouter);



//server listning
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server started at port 3000")
})
