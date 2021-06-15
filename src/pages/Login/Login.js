import React from 'react';

import './Login.css';

import { constants } from '../../utils/constants';

import { useReducer } from 'react';
import { useAuthData } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const Login = () => {
  const { SET_EMAIL, SET_PASSWORD, SHOW_PASSWORD, STAY_LOGGEDIN } = constants;

  const { handleLogin } = useAuthData();

  const loginReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_EMAIL:
        return { ...state, email: payload.data };
      case SET_PASSWORD:
        return { ...state, password: payload.data };
      case SHOW_PASSWORD:
        return { ...state, showPassword: !state.showPassword };
      case STAY_LOGGEDIN:
        return { ...state, stayLoggedIn: !state.stayLoggedIn };
    }
  };

  const [loginCredentials, dispatchLoginCredentials] = useReducer(
    loginReducer,
    {
      email: '',
      password: '',
      showPassword: '',
      stayLoggedIn: false,
    }
  );

  const handleLoginClick = async (e) => {
    e.preventDefault();

    const { email, password } = loginCredentials;

    handleLogin({ email, password });
  };

  return (
    <form>
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
          pattern=".+@*\.com"
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
          type={loginCredentials.showPassword ? 'text' : 'password'}
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
          required
        />

        <span className="login__extra">
          <span className="login__checkbox">
            <input
              type="checkbox"
              id="login"
              onChange={() => dispatchLoginCredentials({ type: STAY_LOGGEDIN })}
              checked={loginCredentials.stayLoggedIn}
            />
            <label htmlFor="login" className="checkbox__text">
              Stay logged in
            </label>
          </span>
          <button
            className="login__forget-password"
            onClick={() => console.log('forget password')}
          >
            Forget Password ?
          </button>
        </span>

        <button
          type="submit"
          className="login__btn"
          onClick={(e) => handleLoginClick(e)}
        >
          LOG IN
        </button>

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
