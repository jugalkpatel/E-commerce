import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import { loginReducer } from "./loginReducer";
import { constants } from "../../utils/constants";
import { AuthButton } from "../../components/AuthButton/AuthButton";

const Login = () => {
  const { SET_EMAIL, SET_PASSWORD, SHOW_PASSWORD } = constants;

  const [loginCredentials, dispatchLoginCredentials] = useReducer(
    loginReducer,
    {
      email: "",
      password: "",
      showPassword: "",
    }
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="login__container">
        <h2 className="login__title">LOG IN</h2>

        <label htmlFor="email" className="login__label-text">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="login__email login--common"
          placeholder="Enter Email"
          pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
          value={loginCredentials.email}
          onChange={(e) =>
            dispatchLoginCredentials({
              type: SET_EMAIL,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="password" className="login__label-text">
          Password
          <span
            href="#"
            className="login__show-password"
            onClick={() => dispatchLoginCredentials({ type: SHOW_PASSWORD })}
          >
            Show Password
          </span>
        </label>
        <input
          id="password"
          type={loginCredentials.showPassword ? "text" : "password"}
          className="login__password login--common"
          placeholder="Enter Password(8 Chars including atleast one number)"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          onChange={(e) =>
            dispatchLoginCredentials({
              type: SET_PASSWORD,
              payload: { data: e.target.value },
            })
          }
          value={loginCredentials.password}
          minLength="8"
          required
        />

        <span className="login__extra">
          <button
            className="login__forget-password"
            onClick={() => console.log("forget password")}
          >
            Forget Password ?
          </button>
        </span>

        <AuthButton
          data={{
            type: "LOGIN",
            btnText: "LOG IN",
            btnClass: "login__btn",
            payload: {
              email: loginCredentials.email,
              password: loginCredentials.password,
            },
          }}
        />

        <span className="login__create-account-container">
          <span className="login__create-accout-text">
            Don't have an account ?
          </span>
          <Link to="/signup" className="login__create-account-btn">
            Create account
          </Link>
        </span>
      </div>
    </form>
  );
};

export { Login };
