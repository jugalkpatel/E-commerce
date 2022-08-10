import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import "./Signup.css";

import { AuthButton } from "../../components";
import { signUpReducer } from "./signupReducer";
import { actions } from "../../utils/actions";

const Signup = () => {
  const {
    SET_EMAIL,
    SET_USER_NAME,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    RESET_SIGNUP,
    SHOW_PASSWORD,
  } = actions;

  const initialSignUpCredentials = {
    email: "",
    uname: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    isPasswordsMatching: false,
  };

  const [signUpCredentials, dispatchSignUpCredentials] = useReducer(
    signUpReducer,
    initialSignUpCredentials
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="signup">
        <h2 className="signup__title">CREATE AN ACCOUNT</h2>

        <label htmlFor="uname" className="signup__label--text">
          Username
        </label>
        <input
          id="uname"
          type="text"
          className="signup__name signup--common"
          placeholder="Enter Username"
          maxLength="20"
          minLength="3"
          value={signUpCredentials.uname}
          onChange={(e) =>
            dispatchSignUpCredentials({
              type: SET_USER_NAME,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="email" className="signup__label--text">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="signup__email signup--common"
          placeholder="Enter Email"
          pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
          value={signUpCredentials.email}
          onChange={(e) =>
            dispatchSignUpCredentials({
              type: SET_EMAIL,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="password" className="signup__label--text">
          Password
          <span
            href="#"
            className="signup__show-password"
            onClick={() => dispatchSignUpCredentials({ type: SHOW_PASSWORD })}
          >
            Show Password
          </span>
        </label>
        <input
          id="password"
          type={signUpCredentials.showPassword ? "text" : "password"}
          className="signup__password signup--common"
          placeholder="Enter Password(8 Chars including atleast one number)"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          value={signUpCredentials.password}
          onChange={(e) =>
            dispatchSignUpCredentials({
              type: SET_PASSWORD,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="password" className="signup__label--text">
          Confirm Password
          <span
            href="#"
            className="signup__show-password"
            onClick={() => dispatchSignUpCredentials({ type: SHOW_PASSWORD })}
          >
            Show Password
          </span>
        </label>
        <input
          id="password"
          type={signUpCredentials.showPassword ? "text" : "password"}
          className="signup__password signup--common"
          placeholder="Enter Password(8 Chars including atleast one number)"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          value={signUpCredentials.confirmPassword}
          onChange={(e) =>
            dispatchSignUpCredentials({
              type: SET_CONFIRM_PASSWORD,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <span className="sg--container">
          <button
            type="reset"
            className="reset__btn"
            onClick={() => dispatchSignUpCredentials({ type: RESET_SIGNUP })}
          >
            RESET
          </button>

          <AuthButton
            data={{
              type: "SIGNUP",
              btnText: "SIGN UP",
              btnClass: "signup__btn",
              payload: {
                uname:
                  signUpCredentials.uname.trim() || signUpCredentials.uname,
                email:
                  signUpCredentials.email.trim() || signUpCredentials.email,
                password:
                  signUpCredentials.password.trim() ||
                  signUpCredentials.password,
                isPasswordsMatching: signUpCredentials.isPasswordsMatching,
              },
              path: "/",
            }}
          />
        </span>

        <span className="sg--create-acc-container">
          <span className="signup-accout-text">Already have an account ?</span>
          <Link to="/login" className="signup__create-account-btn">
            Log in
          </Link>
        </span>
      </div>
    </form>
  );
};

export { Signup };
