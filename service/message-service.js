import Messages from "../models/Messages.js";

class MessageService {
  async addMessage(name, message, color, fontSize, place) {
    try {
      const userMessage = new Messages({
        name,
        message,
        color,
        fontSize,
        place,
      });
      await userMessage.save();
      const messagesData = await Messages.find();
      if (messagesData) {
        console.log("messageData", messagesData);
        return messagesData;
      } else {
        throw new Error("ошибка извлечения из бд");
      }
    } catch (error) {
      console.log("Ошибка сохранения в бд", error);
    }
  }

  async findMessages(req, res) {
    try {
      const messages = await Messages.find(); //получаем все сообщения, чтобы вывести их на сайте.
      if (!messages) {
        throw new Error();
      }
      return messages;
    } catch (error) {
      console.error("ошибка запроса сообщений на сервере", error);
    }
  }

  async deleteMessage(message) {
    try {
      console.log("deleting message...", message);
      const data = await Messages.deleteMany({ message: message });
      return data;
    } catch (error) {
      console.error("ошибка удаления", error);
    }
  }
}

export default new MessageService();
