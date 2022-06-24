import userService from "../service/user-service.js";
import config from "config";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";

class Usercontroller {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array()) // незнаю, что за метод, это метод express-validator
        ); // похоже, делает массив из errors, так как изначально это не массив;
      }
      const { email, password } = req.body; // данные, отправленные через fetch() с фонтэнда, почти всегда в req.body, по этому если я пишу сначала бэкенд, то могу сразу брать эти данные из req.body
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        // метод существует после добавления app.use(cookieParser());
        maxAge: 30 * 24 * 60 * 60 * 1000, // метод добавляет в куки в response на бекэнд refreshtoken;
        httpOnly: true,
      });
      return res.json(userData); // данные передаются на фронтенд просто через res.json(). Я не мог в последний раз;
    } catch (error) {
      // прочесть так переданые данные;
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        // метод существует после добавления app.use(cookieParser());
        maxAge: 30 * 24 * 60 * 60 * 1000, // метод добавляет в куки в response на бекэнд refreshtoken.
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      console.log("logout...");
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const link = req.params.link;
      userService.activate(link);
      return res.redirect(config.get("CLIENT_URL"));
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new Usercontroller();
