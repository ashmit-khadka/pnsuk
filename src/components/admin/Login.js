import axios from "axios";
import React, { useState, createContext } from "react";
import { useNavigate } from "react-router";


export const LoginContext = createContext(false);

const Login = () => {

  const navigate = useNavigate();

  //could use this state as login context
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API}/login`, {
      username: e.target[0].value,
      password: e.target[1].value
    }).then((response) => {
      if (response.status === 200) {
        setLoginState(true);
        console.log("login state change to: ", loginState);
        navigate("/admin/dashboard");
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        setHasLoginFailed(true);
      }
    });
  }

  return (
    <div>
      <h1>PNSUK</h1>
      <h2>Admin Login</h2>
      {hasLoginFailed && <p>Invalid username or password</p>}
      <LoginContext.Provider value={{loginState, setLoginState}}>
        <form onSubmit={login}>
          <div>
            <label>Username</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </LoginContext.Provider>
    </div>
  );
};

export default Login;