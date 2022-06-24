import useStatistic from "../hooks/statistic.hook";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const Statistics = () => {
  const { getStatistics } = useStatistic();
  const { token, userId } = useContext(Context);
  const [data, setData] = useState(null);
  const history = useHistory();

  const showStatistics = useCallback(async (userId, token) => {
    console.log("getting stats", userId, token);
    const stat = await getStatistics(userId, token);
    if (stat) {
      setData(stat);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect");
    const userData = localStorage.getItem("userData");

    if (!userData) {
      history.push("/");
    }

    if (userData) {
      console.log("userData, token", userData, token);
      if (token) {
        showStatistics(userId, token);
      }
    }
  }, [token]);

  return (
    <>
      {data && (
        <div className="StatisticContainer">
          <div className="column1">
            <p>UserId:</p>
            <p>Всего выигранных призов:</p>
            <p>Из них сообщений:</p>
            <p>Удалить сообщения:</p>
            <p>Главный приз, Тесла:</p>
          </div>
          <div className="column2">
            <p>{data.User}</p>
            <p>{data.PrizesWon}</p>
            <p>{data.MessagesWritten}</p>
            <p>{data.MessagesDeleted}</p>
            <p>{data.WonTesla}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Statistics;
