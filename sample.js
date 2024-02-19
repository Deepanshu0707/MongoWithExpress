const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connection success");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }
  


  const whatsappSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to:{
        type: String,
        required: true,
    },
    msg: {
        type: String,
        maxLength: 200,
    },
    created_at: {
        type: String,
        required:true,
    },
    updated_at:{
      type: String,
      required:true,
    }
})

const Chat = mongoose.model("Chat",whatsappSchema);

  let allChats = [
    {
    from: "neha",
    to:"deepanshu",
    msg: "hi deepanshu phir miltai h yaar kabhi bhoot time ho gaya?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "pratham",
    to:"kartik",
    msg: "can you teach me callback hell?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "kiran",
    to:"sabby",
    msg: "oye ghumnai chalega kya?",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    from: "gaurav",
    to:"neeraj",
    msg: "mere betai kaha hain aj kal....",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    from: "palak",
    to:"anjali",
    msg: "kaam bola kar tu thodha warna pitegi ek din?",
    created_at: new Date(),
    updated_at: new Date(),
  }
]


Chat.insertMany(allChats);