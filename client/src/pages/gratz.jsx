import { useState } from "react";
import { useHistory } from "react-router-dom";
import useRequest from "../hooks/useRequest";

const Gratz = () => {
  const [message, setMessage] = useState({
    // сетйт меняется при изменении содержания полей формы ниже.
    name: null,
    message: null,
    color: null,
    fontSize: null,
    place: "rightTop",
  });
  //const [ready, setReady] = useState(false); // стейт, который говорит о том, что форма отправлена и пришёл ответ, для того, чтобы сделать redirect.
  const sendRequest = useRequest();
  const history = useHistory();
  const writeMessage = localStorage.getItem("getPrize");

  if (!writeMessage) {
    history.push("/");
  }

  const sendMessageHandler = async (event) => {
    console.log("sending message request...");
    event.preventDefault();

    try {
      const url = "/userMessageApi/writeMessage";
      const data = await sendRequest("POST", url, message);
      if (data.ok) {
        //const dataJson = await data.json();
        localStorage.removeItem("writeMessage");
        history.replace("/addedMessage");
        //setReady(true); //  устанавливает стейт, который говорит, что форма отправлена и ответ пришёл.
      }
    } catch (error) {
      console.log("ошибка запроса", error);
    }
  };

  const changeHandler = (event) => {
    console.log(event.target.name, event.target.value);
    setMessage({ ...message, [event.target.name]: event.target.value }); // так работает спред оператор, он разворачивает объект message, и потом
    //                                                                  // в формате [key] : value, можно написать ключ, который надо заменить.
  };

  return (
    // форма, которую пользователь заполняет, чтобы отправить сообщение на бекэнд, для отображения на сайте
    <>
      {/*ready && <Redirect to="/" />*/}
      <div className="title">
        <h1>Congratulations!!</h1>
        <p>Ты выиграл возможность оставить сообщение на сайте!</p>
        <p>Заполни эту форму, и сообщение добавится на главную страницу!</p>
      </div>

      <div className="messageContainer">
        <form className="messageContainer__form" action="">
          <input
            onChange={changeHandler}
            name="name"
            className="messageContainer__form_item"
            type="text"
            placeholder="Ваше Имя/Никнейм"
          />
          <textarea
            maxLength="100"
            onChange={changeHandler}
            name="message"
            className="messageContainer__form_item messageContainer_textarea"
            placeholder="введите ваше сообщение"
          ></textarea>
          <input
            onChange={changeHandler}
            name="color"
            className="messageContainer__form_item"
            type="text"
            placeholder="введите код цвета сообщения"
            maxLength="6"
          />
          <input
            onChange={changeHandler}
            name="fontSize"
            className="messageContainer__form_item"
            type="text"
            placeholder="Введите размер шрифта от 1 до 10"
            maxLength="2"
          />
          <div className="messageContainer__form_radio-container">
            <p className="messagePlace">Выберите место для сообщения:</p>
            <input
              onChange={changeHandler}
              id="leftTop"
              name="place"
              className="messageContainer__form_item_radio"
              type="radio"
              value={"leftTop"}
            />
            <label htmlFor="leftTop">слева наверху</label>
            <input
              onChange={changeHandler}
              defaultChecked
              id="rightTop"
              name="place"
              className="messageContainer__form_item_radio"
              type="radio"
              value={"rightTop"}
            />
            <label htmlFor="rightTop">справа наверху</label>
            <input
              onChange={changeHandler}
              id="rightDown"
              name="place"
              className="messageContainer__form_item_radio"
              type="radio"
              value={"rightDown"}
            />
            <label htmlFor="rightDown">справа внизу</label>
            <input
              onChange={changeHandler}
              id="leftDown"
              name="place"
              className="messageContainer__form_item_radio"
              type="radio"
              value={"leftDown"}
            />
            <label htmlFor="leftDown">слева внизу</label>
          </div>

          <button
            onClick={sendMessageHandler}
            className="messageContainer__form_item_button"
          >
            Отправить
          </button>
        </form>
      </div>
    </>
  );
};

export default Gratz;
