const PrizeWindow = ({ firstPrizeHandler }) => {
  return (
    <div className="prizeWindow">
      <p>Вы выиграли 20 Бетховенов</p>
      <p>Получите приз или продолжите играть</p>
      <div className="prizeWindowButtons">
        <button
          onClick={firstPrizeHandler}
          className="prizeWindow_button continue"
        >
          Дальше
        </button>
        <button
          onClick={firstPrizeHandler}
          className="prizeWindow_button takePrize"
        >
          Забрать приз
        </button>
      </div>
    </div>
  );
};

export default PrizeWindow;
