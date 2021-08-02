const validatLoginCredentials = ({ email, password }) => {
  const emailRegex = new RegExp(/[^@]+@[^@]+\.[a-zA-Z]{2,}/);
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  if (
    password.length >= 8 &&
    email.length > 4 &&
    emailRegex.test(email) &&
    passwordRegex.test(password)
  ) {
    return true;
  }

  return false;
};

const validateSignUpCredentials = ({
  uname,
  email,
  password,
  isPasswordsMatching,
}) => {
  const emailRegex = new RegExp(/[^@]+@[^@]+\.[a-zA-Z]{2,}/);
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  if (
    password.length >= 8 &&
    email.length > 4 &&
    uname.length >= 2 &&
    emailRegex.test(email) &&
    passwordRegex.test(password) &&
    isPasswordsMatching
  ) {
    return true;
  }

  return false;
};

export { validatLoginCredentials, validateSignUpCredentials };
