import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const redirectUri = "http://localhost:8080/oauth2/redirect";
const apiBaseUrl = "http://localhost:8080";
// const GOOGLE_AUTH_URL =
//   apiBaseUrl + "/oauth2/authorize/google?redirect_uri=" + redirectUri;
// const GOOGLE_AUTH_URL = "http://localhost:8080/auth/redirect/google";
const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

const Login = ({
  authenticated,
  setIsAuthenticated,
}: {
  authenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}) => {
  if (authenticated) {
    return <Navigate to={"/"} />;
  } else {
    return <SampleLogin setIsAuthenticated={setIsAuthenticated} />;
  }
};

const SampleLogin = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (authenticated: boolean) => void;
}) => {
  return (
    <div className="social-login">
      <a
        className="btn btn-block social-btn google"
        href={GOOGLE_AUTH_URL}
        onClick={() => setIsAuthenticated(true)}
      >
        {/* <img src={googleLogo} alt="Google" />  */}
        Log in with Google
      </a>
    </div>
  );
};

export default Login;
