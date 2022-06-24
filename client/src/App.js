import "./index.css";
import { useState } from "react";
import Game from "./pages/game";
import { Context } from "./context";
import useAuth from "./hooks/authHook";
import useRandom from "./hooks/useRandom";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { box1, box2, box3, mixBoxes, setFalseBox } = useRandom();
  const [won, setWon] = useState(0);
  const [bthCount, setBthCount] = useState(100);
  const { token, userId, login, logout } = useAuth();
  const [zeroWindow, setZeroWindow] = useState(false);
  const isAuthenticated = !!token;
  const [boxClasses1, setBoxClasses1] = useState("container__box-button 1");
  const [boxClasses2, setBoxClasses2] = useState("container__box-button 2");
  const [boxClasses3, setBoxClasses3] = useState("container__box-button 3");
  const [loadingBoxes, setLoadingBoxes] = useState(false); // чтобы, после нажатия, пока коробки перезапускаются, я не мог по ним кликать.
  const [modalWindow, setModalWindow] = useState(false); // чтобы при наличии модального окна пользователь также не мог кликать по коробкам.

  const resetClasses = () => {
    setTimeout(() => {
      setBoxClasses1("container__box-button 1"); // после показа картинки, через две секунды, картинка снова меняется на коробку.
      setBoxClasses2("container__box-button 2");
      setBoxClasses3("container__box-button 3");
      setLoadingBoxes(false);
    }, 2000);
  };

  const boxOpenHandler = (event) => {
    const buttonClasses = event.target.classList;
    if (
      bthCount > 0 &&
      //buttonClasses.contains("container__box-button") &&
      !loadingBoxes &&
      !modalWindow
    ) {
      setLoadingBoxes(true);
      setBthCount(bthCount - 10);
      // функция реагирует на нажатие, смотрит номер коробке в ClassList и проверяет значение
      // в массиве boxes под соответствующим номером.
      const boxNumber = buttonClasses.toString().split(" ")[1];
      console.log(`open box ${boxNumber}`);
      //richtige Kiste - dann + 1 Gewinn und die Kisten werden gemischt.
      if (boxNumber === "1") {
        if (box1 === true) {
          setBoxClasses1("container__box-button-won");
          setWon(won + 1);
          console.log("won!");
          resetClasses();
          setFalseBox(1);
          mixBoxes();
        } else {
          setBoxClasses1("container__box-button-lost");
          console.log("loose");
          setWon(0);
          resetClasses();
        }
      }
      if (boxNumber === "2") {
        if (box2 === true) {
          setBoxClasses2("container__box-button-won");
          setWon(won + 1);
          console.log("won!");
          resetClasses();
          setFalseBox(2);
          mixBoxes();
        } else {
          setBoxClasses2("container__box-button-lost");
          console.log("loose");
          setWon(0);
          resetClasses();
        }
      }
      if (boxNumber === "3") {
        if (box3 === true) {
          setBoxClasses3("container__box-button-won");
          setWon(won + 1);
          console.log("won!");
          resetClasses();
          setFalseBox(3);
          mixBoxes();
        } else {
          setBoxClasses3("container__box-button-lost");
          console.log("loose");
          setWon(0);
          resetClasses();
        }
      }
    } else if (bthCount === 0) {
      zeroWindowHandler();
    }
  };

  const zeroWindowHandler = () => {
    setZeroWindow(true);

    setTimeout(() => {
      setZeroWindow(false);
    }, 3000);
  };

  return (
    <>
      <Context.Provider
        value={{
          modalWindow,
          setModalWindow,
          boxClasses1,
          setBoxClasses1,
          boxClasses2,
          setBoxClasses2,
          boxClasses3,
          setBoxClasses3,
          boxOpenHandler,
          mixBoxes,
          won,
          setWon,
          bthCount,
          setBthCount,
          token,
          userId,
          login,
          logout,
          zeroWindow,
          setZeroWindow,
          isAuthenticated,
          loadingBoxes,
        }}
      >
        <BrowserRouter>
          <Game />
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
