const express = require("express");
const app = express();

const mongoose = require('mongoose');
const path = require("path");

const Chat = require("./model/chat.js");

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("connection success");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


app.listen(8080,()=>{
    console.log("Server is listening on port 8080.")
})

app.get("/",(req,res)=>{
    res.send("root is working");
})

app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
   res.render("index.ejs",{chats});
})


app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
 let {from,to,msg} = req.body;
 let chat = new Chat({
    from : `${from}`,
    to: `${to}`,
    msg : `${msg}`,
    created_at: new Date(),
    updated_at: new Date(),
 })
 chat.save().then((res)=>{
    console.log(res);
 }).catch((err)=>{
    console.log(err);
 })
 res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
    let{id} = req.params;
    let data = await Chat.findById(id);
    res.render("edit.ejs",{data});
})

app.patch("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    try{
    let updatedChat =  await Chat.findByIdAndUpdate(id,{msg:msg,updated_at:new Date()},{runValidators:true,new:true});

    }catch(err){
        console.log(err);
        res.send("Internal Errors");
    }
    
    res.redirect("/chats");
})


app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
   let dlt = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})



// let chat1 = new Chat({
//     from: "neha",
//     to:"deepanshu",
//     msg: "hi deepanshu phir miltai h yaar kabhi bhoot time ho gaya?",
//     created_at: new Date(),
// })

// chat1.save().then((res)=>{
// console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })