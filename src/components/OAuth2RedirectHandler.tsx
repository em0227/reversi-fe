import { Navigate } from "react-router-dom";

const getUrlParameter = (name: string) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

  const results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const OAuth2RedirectHandler = () => {
  const token = getUrlParameter("token");
  const error = getUrlParameter("error");
  if (token) {
    localStorage.setItem("accessToken", token);
    return <Navigate to={"/"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default OAuth2RedirectHandler;
