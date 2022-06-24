import Statisticservice from "../service/statistic-service.js";
import jwt from "jsonwebtoken";
import config from "config";

class StatisticController {
  async createStat(req, res) {
    const { id } = req.body;
    const data = await Statisticservice.create(id);
  }

  async saveStat(req, res) {
    console.log("saving statistic...");
    const { id, number } = req.body;
    //console.log("id", id);
    await Statisticservice.save(id, number);
  }

  async getStat(req, res) {
    const token = req.headers.authorization.split(" ")[1]; // на фронте нужно передавать токены в headers.
    if (!token) {
      return res.status(401).json({ message: "not authenticated" }); // обычно после if, код выполняется дальше, если нет else. return нужен, чтобы код не выполнялся дальше
    }
    const decoded = jwt.verify(token, config.get("JWT_ACCESS_SECRET"));
    //console.log(decoded);
    //в пакете jwt есть метод verify, который используется, чтобы верифицировать токен.
    //получается, что токен декодируется за счёт секретного ключа и если он не правильный, то он не декодируется.
    const stat = await Statisticservice.get(decoded.id); // в метод verify передаётся токен и секретный ключ, с помощью которого создавался токен.
    return res.json(stat);
  }
}

export default new StatisticController();
