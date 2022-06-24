import express from "express";
import config from "config";
import authrouter from "./routes/auth.routes.js";
import messagerouter from "./routes/messages.routes.js";
import statisticRouter from "./routes/statistic.routes.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; // пакет для jwt авторизации
import cookieParser from "cookie-parser"; // тоже для jwt
import errorMiddleware from "./middlewares/error-middleware.js"; // middleware, чтобы выводить сообщения об ошибках на фронтенд.

const app = express();

//app.use(express.json())                           //он это написал, не знаю надо ли.
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser()); // для передачи jwt токен в куки.
app.use(cors()); // чтобы взаимодействовать с сервером и с браузером
app.use(errorMiddleware); // middleware, для передачи ошибкок на фронт енд.

const port = process.env.PORT || config.get("PORT");
const mongoUrl = config.get("mongoURLv2");

const start = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("database connected");
    app.listen(port, () => {
      console.log("bakend is working, sir!");
    });
  } catch (error) {
    console.log(error, "ошибка соединения с БД");
  }
};

start();

app.use("/authapi", authrouter);
app.use("/userMessageApi", messagerouter);
app.use("/statisticApi", statisticRouter);
