// models/message.js
const mongoose = require('mongoose');

const message = new mongoose.Schema({
  username: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

//export default mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports =  mongoose.models.Message || mongoose.model("Message", message)