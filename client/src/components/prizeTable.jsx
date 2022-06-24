const PrizeTable = () => {
  return (
    <div className="prizeTable">
      <div className="prizeTable_top">
        <p className="priceTable_line">2 выигрыша подряд - 20 Бетховенов</p>
        <p className="priceTable_line">
          3 выигрыша подряд - Оставь своё сообщение на этом сайте
        </p>
      </div>
      <div className="prizeTable_bottom">
        <p className="priceTable_line">
          5 выигрышей подряд - Удалить любое сообщение с сайта
        </p>
        <p className="priceTable_line">
          10 выигрышей подряд - получи Tesla в подарок*
        </p>
      </div>
    </div>
  );
};

export default PrizeTable;
