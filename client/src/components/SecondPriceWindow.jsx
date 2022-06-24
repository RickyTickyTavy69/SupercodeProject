const SecondPrizeWindow = ({ secondPrizeHandler }) => {
  return (
    <div className="prizeWindow">
      <p>Вы выиграли приз - сообщение</p>
      <p>Получите приз или продолжите играть</p>
      <div className="prizeWindowButtons">
        <button
          onClick={secondPrizeHandler}
          className="prizeWindow_button continue continue"
        >
          Дальше
        </button>
        <button
          onClick={secondPrizeHandler}
          className="prizeWindow_button takePrize message"
        >
          Написать сообщение
        </button>
      </div>
    </div>
  );
};

export default SecondPrizeWindow;
