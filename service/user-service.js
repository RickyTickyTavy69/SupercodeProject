import User from "../models/User.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import config from "config";
import ApiError from "../exceptions/api-error.js";

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("пользователь уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4(); // создание ссылки для активации аккаунта.

    const user = new User({ email, password: hashPassword, activationLink });
    await user.save();

    const ApiUrl = config.get("API_URL");
    await mailService.sendActivationMail(
      email,
      `${ApiUrl}/authapi/activate/${activationLink}`
    );
    const userDto = new UserDto(user); // здесь класс используется, чтобы из объекта взять только определённые ключи.

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
    //const user = await User.create({email, password: hashPassword, activationLink});            // у него было так написано, я не знаю в чём отличие.
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }

    user.isActivated = true;

    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

export default new UserService();
