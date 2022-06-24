const FourthPrizeWindow = ({ fourthPrizeHandler }) => {
  return (
    <div className="prizeWindow">
      <p>Вы выиграли приз - машина от компании Tesla*</p>
      <p>Нажмите "Забрать приз", чтобы получить Теслу.</p>
      <div className="prizeWindowButtons">
        <button
          onClick={fourthPrizeHandler}
          className="prizeWindow_button notGetTesla"
        >
          У меня уже есть, спасибо.
        </button>
        <button
          onClick={fourthPrizeHandler}
          className="prizeWindow_button getTesla"
        >
          Забрать приз
        </button>
      </div>
    </div>
  );
};

export default FourthPrizeWindow;
