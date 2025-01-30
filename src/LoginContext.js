import React, { createContext, useState } from 'react';

const defaultLoginState = {
  loginState: false,
  setLoginState: () => {}
};

const LoginContext = createContext(defaultLoginState);

export const LoginProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);

  return (
    <LoginContext.Provider value={{ loginState, setLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;