import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import Login from "./components/Login";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import { getCurrentUser } from "./utils/user";

type User = {
  currentUser: {};
  authenticated: boolean;
  loading: boolean;
};

function App() {
  // const [user, setUser] = useState<User>({
  //   currentUser: {},
  //   authenticated: false,
  //   loading: false,
  // });
  // useEffect(() => {
  //   getCurrentUser()
  //     .then((response) => {
  //       setUser({
  //         currentUser: response,
  //         authenticated: true,
  //         loading: false,
  //       });
  //     })
  //     .catch((error) => {
  //       setUser({
  //         ...user,
  //         loading: false,
  //       });
  //     });
  // }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   // Check authentication status
  //   fetch("http://localhost:8080/authenticated", { credentials: "include" })
  //     .then((response) => response.json())
  //     .then((authenticated) => {
  //       setIsAuthenticated(authenticated);
  //       if (authenticated) {
  //         // Fetch user details
  //         fetch("http://localhost:8080/user", { credentials: "include" })
  //           .then((response) => response.json())
  //           .then((userData) => setUser(userData));
  //       }
  //     });
  // }, []);

  //land on page
  //login with Google in Login component
  //backend take care Oauth and return user info
  //route to game page
  return (
    <div className="App">
      <h2>Reversi</h2>
      {/* <Route component={NotFound}></Route> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                authenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          ></Route>
          {/* <Route
            path="/oauth2/redirect"
            element={<OAuth2RedirectHandler />}
          ></Route> */}
          <Route
            path="/"
            element={<Board user={user} />}
            // element={user ? <Login setUser={setUser} /> : <Board user={user} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
