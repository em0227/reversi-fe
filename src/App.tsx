import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState({});

  //land on page
  //login with Google in Login component
  //backend take care Oauth and return user info
  //route to game page
  return (
    <div className="App">
      <h2>Reversi</h2>
      {/* <Route component={NotFound}></Route> */}
      <Route
        path="/game"
        element={user ? <Login setUser={setUser} /> : <Board user={user} />}
      ></Route>
    </div>
  );
}

export default App;
