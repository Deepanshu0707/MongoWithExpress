const mongoose = require('mongoose');


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
    updated_at: {
        type: String,
        required: true,
    }
})

const Chat = mongoose.model("Chat",whatsappSchema);

module.exports = Chat;
