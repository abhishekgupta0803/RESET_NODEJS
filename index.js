const express = require("express");
const  app = express(); 
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const  methodOverride = require('method-override');
const { render } = require("ejs");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
let  posts = [
    {
        id: uuidv4() ,
        username: "Abhishek",
        content: "Hard Working.",
        
    },
    {
        id: uuidv4(),
        username: "Ashi",
        content: "I love JEE Mains.",
        
    },
    {
        id: uuidv4(),
        username: "Shivam",
        content: "Digital Marketing.",
       
    },
];

//all posts
app.get("/posts",(req,res)=>{
   res.render("index.ejs",{ posts});
  
});

//add posts
 app.get("/posts/new",(req,res)=>{
   res.render("new.ejs");
 });
 
 //post
 app.post("/posts",(req,res)=>{
    
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
    
 });

 app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
    
 });

//patch
 app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post =posts.find((p)=>id === p.id);
    post.content = newContent;
    res.redirect("/posts");
 
 });

 app.get("/posts/:id/edit",(req,res)=>{

    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});

 });

 //delete
 app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
 });

app.listen(port,()=>{
    console.log("app is listening 8080");
});
