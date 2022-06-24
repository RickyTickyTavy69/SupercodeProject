import MessageService from "../service/message-service.js";
import Messages from "../models/Messages.js";

class messagecontroller {
  async writemessage(req, res) {
    const { name, message, color, fontSize, place } = req.body;
    const messageData = await MessageService.addMessage(
      name,
      message,
      color,
      fontSize,
      place
    );
    console.log("message", messageData);
    return res.json(messageData);
  }

  async getMessages(req, res) {
    const messages = await MessageService.findMessages();
    return res.json(messages);
  }

  async deleteMessage(req, res) {
    console.log("controller deleting message...");
    const { message } = req.body;
    console.log("message", message);
    const data = await MessageService.deleteMessage(message);
    return res.json(data);
  }
}

export default new messagecontroller();
