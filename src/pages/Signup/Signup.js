import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import './Signup.css';

import { useToast } from '../../contexts/ToastProvider';
import { constants } from '../../utils/constants';
import { postAPI } from '../../utils/postAPI';

const Signup = () => {
  const navigate = useNavigate();

  const { setupToast } = useToast();

  const {
    SET_EMAIL,
    SET_USER_NAME,
    SET_PASSWORD,
    RESET_SIGNUP,
    SHOW_PASSWORD,
  } = constants;

  const signUpReducer = (state, { type, payload }) => {
    switch (type) {
      case SET_EMAIL:
        return { ...state, email: payload.data };
      case SET_USER_NAME:
        return { ...state, uname: payload.data };
      case SET_PASSWORD:
        return { ...state, password: payload.data };
      case RESET_SIGNUP:
        return { ...state, email: '', uname: '', password: '' };
      case SHOW_PASSWORD:
        return { ...state, showPassword: !state.showPassword };
      default:
        throw new Error('Action not defined');
    }
  };

  const validate = (uname, email, password) => {
    const emailRegex = new RegExp('.+@*.com');
    const passwordRegex = new RegExp(
      '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
    );
    let validateFlag = false;
    if (
      uname.length <= 20 &&
      uname.length >= 3 &&
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      validateFlag = true;
    }
    return validateFlag;
  };

  const [signUpCredentials, dispatchSignUpCredentials] = useReducer(
    signUpReducer,
    {
      email: '',
      uname: '',
      password: '',
      showPassword: false,
    }
  );

  const handleSignup = async (e) => {
    e.preventDefault();
    const { uname, email, password } = signUpCredentials;

    if (validate(uname, email, password)) {
      const response = await postAPI(
        'https://neog-ecommerce--backend.herokuapp.com/user/signup',
        {
          uname,
          email,
          password,
        }
      );

      if (typeof response === 'number') {
        // TODO: show toast here instead of throwing error so that UI is not blocked
        setupToast(true, 'Error while creating user, Please try again');
        return;
      }

      navigate('/login');

      return;
    }

    setupToast(true, 'Please enter details in given format');
  };

  return (
    <form>
      <div className="signup__container">
        <h2 className="signup__title">CREATE AN ACCOUNT</h2>

        <label htmlFor="uname" className="signup__label-text">
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

        <label htmlFor="email" className="signup__label-text">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="signup__email signup--common"
          placeholder="Enter Email"
          pattern=".+@*.com"
          value={signUpCredentials.email}
          onChange={(e) =>
            dispatchSignUpCredentials({
              type: SET_EMAIL,
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="password" className="signup__label-text">
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
          type={signUpCredentials.showPassword ? 'text' : 'password'}
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

        <span className="signup__btn-container">
          <button
            type="reset"
            className="reset__btn"
            onClick={() => dispatchSignUpCredentials({ type: RESET_SIGNUP })}
          >
            RESET
          </button>

          <button type="submit" className="signup__btn" onClick={handleSignup}>
            SIGN UP
          </button>
        </span>

        <span className="signup__create-account-container">
          <span className="signup-accout-text">Already have an account ?</span>
          <button
            className="signup__create-account-btn"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
        </span>
      </div>
    </form>
  );
};

export { Signup };
