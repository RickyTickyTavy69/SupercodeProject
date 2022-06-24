import Statistic from "../models/Statistic.js";

class Statisticservice {
  async create(id) {
    // функция создаёт статистику для пользователя при регистрации.
    const statistic = new Statistic({
      User: id,
      PrizesWon: 0,
      MessagesWritten: 0,
      MessagesDeleted: 0,
      WonTesla: 0,
    });
    statistic.save();
  }

  async save(id, num) {
    console.log("id", id, typeof id);
    const stat = await Statistic.findOne({ User: id }); /// функция находит нужную статистику и обновляет, при получении пользователем выигрыша.
    stat.PrizesWon = stat.PrizesWon + 1;
    if (num === 3) {
      stat.MessagesWritten = stat.MessagesWritten + 1;
    }
    if (num === 5) {
      stat.MessagesDeleted = stat.MessagesDeleted + 1;
    }
    if (num === 10) {
      stat.WonTesla = stat.WonTesla + 1;
    }
    await stat.save();
  }

  async get(id) {
    const stat = await Statistic.findOne({ User: id });
    return stat;
  }
}

export default new Statisticservice();
