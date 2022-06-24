const ThirdPrizeWindow = ({ thirdPrizeHandler }) => {
  return (
    <div className="prizeWindow">
      <p>Вы выиграли приз - удалить сообщение с сайиа</p>
      <p>Удалите сообщение или продолжите играть</p>
      <div className="prizeWindowButtons">
        <button
          onClick={thirdPrizeHandler}
          className="prizeWindow_button continue continue"
        >
          Дальше
        </button>
        <button
          onClick={thirdPrizeHandler}
          className="prizeWindow_button takePrize delMessage"
        >
          Удалить сообщение с сайта
        </button>
      </div>
    </div>
  );
};

export default ThirdPrizeWindow;
