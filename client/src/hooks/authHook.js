import { useState, useEffect, useCallback } from "react";
import useRequest from "./useRequest";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const sendRequest = useRequest();

  const login = useCallback((JWTtoken, id) => {
    console.log("auth login", JWTtoken, id); // so far correct
    setUserId(id);
    setToken(JWTtoken);
    localStorage.setItem(
      "userData",
      JSON.stringify({ id: id, JWTtoken: JWTtoken })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("getPrize");
    setToken(null);
    setUserId(null);
    const url = "/authapi/logout";
    const Request = async (url) => {
      console.log("req...");
      await sendRequest("POST", url);
    };
    Request(url);
    localStorage.removeItem("userData");
  }, [sendRequest]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.JWTtoken) {
      login(data.JWTtoken, data.id);
    }
  }, [login]);

  return { token, userId, login, logout };
};

export default useAuth;
