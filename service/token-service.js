import jwt from "jsonwebtoken";
import config from "config";
import Token from "../models/Token.js";

class TokenService {
  generateTokens(payload) {
    // Функция, создаёт веб токены. Сначала accessToken, потом refreshtoken.
    const accessToken = jwt.sign(
      // в ней указывается, как долго токен будет жить.
      payload,
      config.get("JWT_ACCESS_SECRET", { expiresIn: "30m" })
    );
    const refreshToken = jwt.sign(
      payload,
      config.get("JWT_REFRESH_SECRET", { expiresIn: "30d" })
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, config.get("JWT_ACCESS_SECRET")); // не знаю точно, что возвращает функция.
      return userData; // т.е. пакет jwt имеет такой встроенный метод verify
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, config.get("JWT_REFRESH_SECRET")); // не знаю точно, что возвращает функция.
      return userData; // т.е. пакет jwt имеет такой встроенный метод verify
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    console.log("saving tokens...");
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save(); // если найти объект и достать из базы, у него так же будет метод save()
    } // значит, его можно перезаписать и снова сохранить.
    // функция для сохранения токена, принимает refreshtoken и добавляет его в бд.
    const token = Token.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken }); // из базы данных удаляется токен при выходе с аккаунта.
    return tokenData; // эти методы, deleteOne, create возвращают созданное или удалённое, так что это можно вернуть.
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken }); // из базы данных удаляется токен при выходе с аккаунта.
    return tokenData; // эти методы, deleteOne, create возвращают созданное или удалённое, так что это можно вернуть.
  }
}

export default new TokenService();
