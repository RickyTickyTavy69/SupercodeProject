import { useState } from "react";
import TeslaIMG from "../components/TeslaIMG.";
import { useHistory } from "react-router-dom";

const GetTesla = () => {
  const [teslaIMG, setTeslaIMG] = useState(false);
  const history = useHistory();

  const writeMessage = localStorage.getItem("getPrize");

  if (!writeMessage) {
    history.push("/");
  }

  const downloadTeslaHandler = () => {
    setTeslaIMG(true);
  };

  return (
    <div className="teslaContainer">
      {teslaIMG && <TeslaIMG />}
      <h1>Поздравляю, Вы выиграли Теслу</h1>
      <p>
        Вы смогли открыть 10 правильных ящиков подряд и выиграли главный Джек
        Пот - машину Тесла. На этой странице вы можете скачать ваш приз! Нажмите
        на кнопку скачать, чтобы получить Теслу.
      </p>
      <button onClick={downloadTeslaHandler}>Скачать Теслу</button>
    </div>
  );
};

export default GetTesla;
