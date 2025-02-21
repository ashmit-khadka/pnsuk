import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import LoginContext from './../../LoginContext';
import { useForm } from "react-hook-form";
import FormFieldTextbox from './form/FormFieldTextbox';
import Button from "../Button";
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const { setLoginState } = useContext(LoginContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        username: "admin",
        password: "admin",
      }
    });

  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const login = async (data) => {
    await axios.post(`${process.env.REACT_APP_API}/login`, {
      username: data.username,
      password: data.password
    }).then((response) => {
      if (response.status === 200) {
        //setLoginState(true);
        Cookies.set('login', true, { expires: 7 });
        navigate("/admin/dashboard/articles");
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        setHasLoginFailed(true);
      }
    });
  }

  return (
    <div>
      <h1>PNSUK</h1>
      <h2>Admin Login</h2>
      {hasLoginFailed && <p>Invalid username or password</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
        <FormFieldTextbox
          id="username"
          label="Username"
          placeholder="Enter your username"
          register={register}
          errors={errors}
          validation={{ required: "Username is required" }}
        />
        <FormFieldTextbox
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          validation={{ required: "Password is required" }}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;