import { Router } from "express";
const router = Router();
import Usercontroller from "../controllers/user-controller.js";
import { body } from "express-validator"; // пакет для валидации переменных, передаваемых с фронтэнда.
import authMiddleware from "../middlewares/auth-middleware.js";

router.post(
  // валидаторы помещаются таким образом, между ссылкой запроса и функцией, по нему выполняемой.
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  Usercontroller.register
);

router.post("/login", Usercontroller.login);

router.post("/logout", Usercontroller.logout);

router.get("/activate/:link", Usercontroller.activate);

router.get("/refresh", Usercontroller.refresh);

router.get("/users", authMiddleware, Usercontroller.getUsers);

export default router;
