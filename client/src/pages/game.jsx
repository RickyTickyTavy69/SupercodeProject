import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Redirect } from "react-router-dom";
import NavbarRouter from "../routes/navbarRoutes";
import AuthNavbar from "../components/AuthNavbar";
import ZeroWindow from "../components/ZeroWindow";
import PrizeWindow from "../components/PrizeWindow";
import SecondPrizeWindow from "../components/SecondPriceWindow";
import ThirdPrizeWindow from "../components/ThirdPrizeWindow";
import FourthPrizeWindow from "../components/FourthPrizeWindow";
import useStatistic from "../hooks/statistic.hook";
import { useContext } from "react";
import { Context } from "../context";
import { useParams } from "react-router-dom";

const Game = () => {
  const { saveStatistic } = useStatistic();
  const {
    modalWindow,
    setModalWindow,
    token,
    userId,
    isAuthenticated,
    setBthCount,
    mixBoxes,
    bthCount,
    won,
    zeroWindow,
    setWon,
  } = useContext(Context);

  const [priceWindow, setPriceWindow] = useState(false); // похоже на zeroWindow, меняется на true при выигрыше 2 раза подряд и выводит окно выигрыша 20бтх
  const [secondPrizeWindow, setSecondPriceWindow] = useState(false);
  const [thirdPrizeWindow, setThirdPrizeWindow] = useState(false);
  const [fourthPrizeWindow, setFourthPrizeWindow] = useState(false);
  const [gratz, setGratz] = useState(false); // стейт становится true при выигрыше и включает переадресацию на сайт выигрыша.
  const [delGratz, setDelGratz] = useState(false);
  const [getTesla, setGetTesla] = useState(false);
  const navRouthes = NavbarRouter(isAuthenticated);
  const params = useParams();

  useEffect(() => {
    setGratz(false);
  }, [params]);

  useEffect(() => {
    setBthCount(isAuthenticated ? 500 : 100); // только так работает, а если я напишу тринарное выражение в state, то работать не будет.
  }, [isAuthenticated]);

  useEffect(() => {
    mixBoxes();
  }, []);

  /*useEffect(() => {
    resetBoxes();
  }, [resetBoxes]);*/

  useEffect(() => {
    console.log(`У Вас ${bthCount} Бетховенов`);
  }, [bthCount]);

  useEffect(() => {
    // функция, которая следит за переменной won и, когда пользователь выиграл определённое количество раз - показывает окно выигрыша.
    if (won === 2) {
      setModalWindow(true); // каждый раз перед выводом модального окна, делаю её true, чтобы при нажатии на коробку сделать проверку, есть ли окно.
      setTimeout(() => {
        setPriceWindow(true);
        if (isAuthenticated) {
          console.log("sending statistic req...");
          saveStatistic(userId, 2);
        }
      }, 1000);
    }
    if (won === 3) {
      setModalWindow(true);
      setTimeout(() => {
        setSecondPriceWindow(true);
        if (isAuthenticated) {
          saveStatistic(userId, 3); // может, эту функцию можно вызвать без async, так как мне не нужны данные, которые она возвращает.
        }
      }, 1000);
    }
    if (won === 5) {
      setModalWindow(true);
      setTimeout(() => {
        setThirdPrizeWindow(true);
        if (isAuthenticated) {
          saveStatistic(userId, 5);
        }
      }, 1000);
    }

    if (won === 10) {
      setModalWindow(true);
      setTimeout(() => {
        setFourthPrizeWindow(true);
        if (isAuthenticated) {
          saveStatistic(userId, 10);
        }
      }, 1000);
    }
  }, [won]);

  const firstPrizeHandler = (event) => {
    // срабатывает при нажатии на одну из кнопок в окне выводящимся при получении 1 приза за 2 выигрыша подряд.
    if (event.target.classList.contains("takePrize")) {
      setBthCount(bthCount + 20);
      setWon(0);
      setPriceWindow(false);
    } else if (event.target.classList.contains("continue")) {
      setPriceWindow(false);
    }
    setModalWindow(false); // при нажатии на любую кнопку в окне, которая его убирает, так же убирается блокировка коробок
  };

  const secondPrizeHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains("message")) {
      console.log("message chosen");
      localStorage.setItem("getPrize", "true");
      setGratz(true);
      setWon(0);
      setSecondPriceWindow(false);
    } else if (event.target.classList.contains("continue")) {
      setSecondPriceWindow(false);
    }
    setModalWindow(false);
  };

  const thirdPrizeHandler = (event) => {
    if (event.target.classList.contains("delMessage")) {
      setWon(0);
      localStorage.setItem("getPrize", "true");
      setThirdPrizeWindow(false);
      setDelGratz(true);
    } else if (event.target.classList.contains("continue")) {
      setThirdPrizeWindow(false);
    }
    setModalWindow(false);
  };

  const fourthPrizeHandler = (event) => {
    if (event.target.classList.contains("getTesla")) {
      setWon(0);
      setFourthPrizeWindow(false);
      localStorage.setItem("getPrize", "true");
      setGetTesla(true);
    } else if (event.target.classList.contains("notGetTesla")) {
      setFourthPrizeWindow(false);
      setWon(0);
    }
    setModalWindow(false);
  };

  return (
    <>
      {gratz === true && <Redirect to={"/gratz/message"} />}
      {delGratz && <Redirect to={"/delGratz/delMessage"} />}
      {getTesla && <Redirect to={"/getTesla/get"} />}

      {isAuthenticated && (
        <AuthNavbar
          token={token}
          userId={userId}
          won={won}
          bthCount={bthCount}
        />
      )}
      {!isAuthenticated && <Navbar won={won} bthCount={bthCount} />}
      {zeroWindow && <ZeroWindow />}
      {priceWindow && <PrizeWindow firstPrizeHandler={firstPrizeHandler} />}
      {secondPrizeWindow && (
        <SecondPrizeWindow secondPrizeHandler={secondPrizeHandler} />
      )}
      {thirdPrizeWindow && (
        <ThirdPrizeWindow thirdPrizeHandler={thirdPrizeHandler} />
      )}
      {fourthPrizeWindow && (
        <FourthPrizeWindow fourthPrizeHandler={fourthPrizeHandler} />
      )}
      {navRouthes}
    </>
  );
};

export default Game;
