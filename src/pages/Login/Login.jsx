import React, { useReducer } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Login.css";

import { AuthButton } from "../../components";
import { loginReducer } from "./loginReducer";
import { actions } from "../../utils/actions";

const Login = () => {
  const { SET_EMAIL, SET_PASSWORD, SHOW_PASSWORD, LOGIN_AS_GUEST } = actions;

  const { state } = useLocation();

  const path = state?.from ? state.from : "/";

  const initialLoginCredentials = {
    email: "",
    password: "",
    showPassword: "",
    submitting: false,
  };

  const [loginCredentials, dispatchLoginCredentials] = useReducer(
    loginReducer,
    initialLoginCredentials
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="login">
        <h2 className="login__title">LOG IN</h2>

        <label htmlFor="email" className="login__label--text">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="login__email login--common"
          placeholder="Enter Email"
          pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
          value={loginCredentials.email}
          onChange={(e) =>
            dispatchLoginCredentials({
              type: SET_EMAIL,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="password" className="login__label--text">
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

        {/* <span className="login__extra">
          <button
            className="login__forget-password"
            onClick={() => console.log("forget password")}
          >
            Forget Password ?
          </button>
        </span> */}
        <span className="lg__container">
          <span className="login__create-account-text">
            Don't have an account ?
          </span>
          <Link to="/signup" className="login__create-account__btn">
            Create account
          </Link>
        </span>

        <AuthButton
          data={{
            type: "LOGIN",
            btnText: "LOG IN",
            btnClass: "login__btn",
            payload: {
              email: loginCredentials.email.trim() || loginCredentials.email,
              password:
                loginCredentials.password.trim() || loginCredentials.password,
            },
            path,
            submitting: loginCredentials.sub,
          }}
        />

        <div className="guestLogin__container">
          <AuthButton
            data={{
              type: "LOGIN",
              btnText: "Login as Guest",
              btnClass: "guestLogin__btn",
              submitting: loginCredentials.submitting,
              callback: () =>
                dispatchLoginCredentials({ type: LOGIN_AS_GUEST }),
              payload: {
                email: process.env.REACT_APP_GUEST_EMAIL,
                password: process.env.REACT_APP_GUEST_PASSWORD,
              },
            }}
          />
        </div>
      </div>
    </form>
  );
};

export { Login };
