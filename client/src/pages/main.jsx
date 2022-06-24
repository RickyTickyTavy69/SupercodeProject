import { useContext, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context";
import PrizeTable from "../components/prizeTable";
import Messages from "../components/messages";
import useRequest from "../hooks/useRequest";

const Main = () => {
  const { boxOpenHandler, boxClasses1, boxClasses2, boxClasses3 } =
    useContext(Context);
  const [messages, setMessages] = useState(null);
  const params = useParams();
  const sendRequest = useRequest();

  const getMessages = useCallback(async () => {
    const url = "/userMessageApi/getMessages";
    try {
      const data = await sendRequest("GET", url);
      if (!data.ok) {
        throw new Error("ошибка получения сообщений");
      }
      const dataJson = await data.json();
      setMessages(dataJson);
    } catch (error) {
      console.error(error, "ошибка сервера");
    }
  }, []);

  useEffect(() => {
    getMessages();
  }, [params]);

  return (
    <>
      {messages && <Messages messages={messages} />}
      <div className="container">
        <div className="container__box-container">
          <div className="boxButtonContainer">
            <div onClick={boxOpenHandler} className={`${boxClasses1}`}></div>
          </div>
          <div className="boxButtonContainer">
            <div onClick={boxOpenHandler} className={`${boxClasses2}`}></div>
          </div>
          <div className="boxButtonContainer">
            <div onClick={boxOpenHandler} className={`${boxClasses3}`}></div>
          </div>
        </div>
      </div>
      <PrizeTable />
    </>
  );
};

export default Main;
