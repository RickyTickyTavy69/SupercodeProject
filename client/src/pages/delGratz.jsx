import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import useRequest from "../hooks/useRequest";

const DelGratz = () => {
  const sendRequest = useRequest();
  const history = useHistory();
  const [messages, setMessages] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const writeMessage = localStorage.getItem("getPrize");

  if (!writeMessage) {
    history.push("/");
  }

  const showAllMessages = async () => {
    const url = "/userMessageApi/getMessages"; // отправляет запрос на сервер о данных всех сообщений и кладет в стейт
    const data = await sendRequest("GET", url);
    const dataJson = await data.json();
    if (dataJson) {
      setMessages(dataJson);
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
    const url = "/userMessageApi/deleteMessage";
    const idx = event.target.id;
    const targetMessage = { message: messages[idx].message };
    console.log("target", targetMessage);
    const data = await sendRequest("POST", url, targetMessage);
    localStorage.removeItem("getPrize");
    console.log("data", data);
  };

  useEffect(() => {
    showAllMessages();
  }, [showAllMessages]);

  return (
    // список сообщений, которые есть на сайте.
    <>
      {deleted && <Redirect to="/" />}
      {messages &&
        messages.map((message, idx) => {
          return (
            <div key={message._id} className="message">
              <h1>Сообщение N{idx + 1}</h1>
              <p>Автор - {message.name}</p>
              <p>Сообщение - {message.message}</p>
              <button onClick={deleteHandler} id={idx}>
                Удалить это
              </button>
            </div>
          );
        })}
    </>
  );
};

export default DelGratz;
