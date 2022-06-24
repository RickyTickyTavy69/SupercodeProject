const Navbar = ({ won, bthCount }) => {
  const deletePrize = () => {
    localStorage.removeItem("getPrize");
  };

  return (
    <div className="navigation">
      <ul className="navbarList list">
        <li className="navbarList__item">
          <p>
            У вас на счету <strong>{bthCount} Бетховенов </strong>
          </p>
        </li>
        <li className="navbarList__item">
          <p>
            Вы выиграли <strong>{won}</strong> раз
          </p>
        </li>
        <li className="navbarList__item">
          <p>
            Открыть одну коробку - <strong>10 Бетховенов</strong>
          </p>
        </li>
      </ul>
      <ul className="registerList list">
        <li className="registerList_Button">
          <a onClick={deletePrize} href="/">
            Играть
          </a>
        </li>
        <li className="registerList_Button">
          <a onClick={deletePrize} href="/auth/register">
            Регистрация
          </a>
        </li>
        <li className="registerList_Button">
          <a onClick={deletePrize} href="/auth/login">
            Войти
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
