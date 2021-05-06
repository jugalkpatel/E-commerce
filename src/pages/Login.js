import React from "react";
import { useAuthData } from "../contexts/AuthProvider";

const Login = () => {
    // console.log("i m auth")
    const { isLoggedIn, setLogin } = useAuthData();
    return (
        <div>
            <h1>Hello, I'm login </h1>
            <button onClick={() => setLogin((prevState) => !prevState)}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
    )
}

export { Login };