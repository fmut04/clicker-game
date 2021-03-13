import React, { useState } from "react";
import Axios from "axios";

function Login({ getGameInfo, setGameInfo }) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
      gameInfo: getGameInfo,
    });
  };

  const login = () => {
    console.log("h");
    Axios.post("http://localhost:3001/login", {
      username: usernameLogin,
      password: passwordLogin,
    }).then((response) => setGameInfo(JSON.parse(response.data[0].gameinfo)));
  };

  window.addEventListener("beforeunload", function (e) {
    Axios.post("http://localhost:3001/save", {
      username: usernameLogin,
      password: passwordLogin,
      gameInfo: getGameInfo,
    }).then((response) => console.log(response));
  });

  return (
    <div className="gridDiv" id="leftDiv">
      <h1>Sign Up</h1>

      <input
        className="textbox"
        placeholder="Username.."
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      ></input>

      <input
        className="textbox"
        placeholder="Password.."
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      ></input>

      <button onClick={register}>Enter</button>
      <h1>Login</h1>

      <input
        className="textbox"
        placeholder="Username.."
        onChange={(e) => {
          setUsernameLogin(e.target.value);
        }}
      ></input>

      <input
        className="textbox"
        placeholder="Password.."
        onChange={(e) => {
          setPasswordLogin(e.target.value);
        }}
      ></input>
      <button onClick={login}>Enter</button>
    </div>
  );
}

export default Login;
