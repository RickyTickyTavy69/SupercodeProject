import { Redirect, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import useRequest from "../hooks/useRequest";
import { Context } from "../context";
import useStatistic from "../hooks/statistic.hook.js";

const Auth = () => {
  const { params } = useParams();
  const [email, setEmail] = useState(null); // стейты для каждого поля при регистрации, которые меняютсяя
  const [password, setPassword] = useState(null); // через changeHandler
  const [password2, setPassword2] = useState(null);
  const sendRequest = useRequest();
  const { token, login } = useContext(Context);
  const { createStatistic } = useStatistic();

  const registerHandler = async (event) => {
    // при нажатии на кнопку "зарегиться", отправляет запрос на сервер, для валидации и сохранения в бд.
    event.preventDefault();
    const body = {
      email,
      password,
      password2,
    };
    const url = "/authapi/register";
    try {
      console.log("sending reg request...", body);
      const data = await sendRequest("POST", url, body);
      if (!data.ok) {
        throw new Error("ошибка создания пользователя");
      } else {
        const dataJson = await data.json();
        console.log("user created", dataJson.user.id);
        const data2 = await createStatistic(dataJson.user.id); // функция из хука statistic.hook, создающая статистику для пользователя при регимтрации.
      }
    } catch (error) {
      console.log("ошибка на сервере", error);
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };
    const url = "/authapi/login";
    try {
      console.log("sending login request", body);
      const data = await sendRequest("POST", url, body);
      if (!data.ok) {
        throw new Error("Ошибка регистрации");
      }
      if (data.ok) {
        const dataJson = await data.json();
        console.log("логин прошёл успешно");
        console.log("login data", dataJson);
        await login(dataJson.accessToken, dataJson.user.id);
      }
    } catch (error) {
      console.log("ошибка на сервере", error);
    }
  };

  const changeHandler = (event) => {
    // проверяет, какое поле изменилось и в соответствии с этим меняет стейт.
    const name = event.target.name;
    const value = event.target.value;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "password2") {
      setPassword2(value);
    }

    console.log(event.target.name, event.target.value);
  };

  if (token) {
    return <Redirect to={"/"} />;
  }

  //if (localStorage.getItem("accessToken")) {
  //  return <Redirect to={"/"} />;
  //}

  if (params === "login") {
    return (
      <>
        <form className="registerContainer">
          <input
            name="email"
            className="registerContainer__input"
            type="email"
            placeholder="введите ваш email"
            onChange={changeHandler}
          />
          <input
            name="password"
            className="registerContainer__input"
            type="password"
            placeholder="придумайте пароль"
            onChange={changeHandler}
          />
          <button
            onClick={loginHandler}
            className="registerContainer__input-button"
          >
            войти
          </button>
        </form>
      </>
    );
  }

  if (params === "register") {
    return (
      <>
        <form className="registerContainer">
          <input
            autocomplete="off"
            name="email"
            className="registerContainer__input"
            type="email"
            placeholder="введите ваш email"
            onChange={changeHandler}
          />
          <input
            name="password"
            className="registerContainer__input"
            type="password"
            placeholder="придумайте пароль"
            onChange={changeHandler}
          />
          <input
            name="password2"
            className="registerContainer__input"
            type="password"
            placeholder="повторите пароль"
            onChange={changeHandler}
          />
          <button
            onClick={registerHandler}
            className="registerContainer__input-button"
          >
            зарегиться
          </button>
        </form>
      </>
    );
  }
};

export default Auth;
