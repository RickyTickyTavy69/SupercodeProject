import useRequest from "./useRequest";

const useStatistic = () => {
  const request = useRequest();

  const createStatistic = async (userId) => {
    const url = "/statisticApi/createStatistic";
    try {
      const data = await request("POST", url, { id: userId });
      if (!data.ok) {
        throw new Error();
      } else {
        const dataJson = await data.json();
        return dataJson;
      }
    } catch (error) {
      console.error(error, "ошибка создания статистики");
    }
  };

  const saveStatistic = async (userId, number) => {
    const url = "/statisticApi/saveStatistic";
    try {
      const data = await request("POST", url, { id: userId, number: number });
      if (!data.ok) {
        throw new Error();
      } else {
        console.log("statistic saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatistics = async (userId, token) => {
    const url = "/statisticApi/getStatistics";
    const data = await request(
      "POST",
      url,
      { id: userId },
      { Authorization: `Bearer ${token}` }
    ); // здесь я добавляю в запрос токен, который нужен для валидации на сервере
    const dataJson = await data.json();

    return dataJson;
  };

  return { createStatistic, saveStatistic, getStatistics };
};

export default useStatistic;
