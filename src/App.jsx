import { useRef, useState } from "react";

import "./App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  console.log(inputEmail)

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    
    console.log(email)

    if (!loginStatus) {
      const confirmPassword = inputConfirmPassword.current.value;
      if (password !== confirmPassword) {
        alert("Password & Confirm Password are not same");
        return;
      }
      // console.log("Login Successful");
    }

    let url;
    if (loginStatus) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBd1PSbZ7xKiBdTzzu5bffqiG_sYszor7w";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBd1PSbZ7xKiBdTzzu5bffqiG_sYszor7w";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        // const data = res.json();
        // console.log("Hi", data);
        if (res.ok) {
          navigate("/welcome");
          return res.json();
        } else {
          throw new Error("Some Error in api");
        }
      })
      .then((data) => {
        console.log("SUCCESSSS", data);
        // ctx.login(data.idToken);
        // console.log("token", ctx.token);
      })
      .catch((err) => {
        alert(err);
      });
  };

  

  return (
    <>
      {/* Main Screen */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100">
        {/* Form Box */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-6 p-4 bg-white rounded-md shadow-2xl text-center min-w-80"
        >
          {loginStatus ? (
            <h1 className="font-light text-2xl my-6">Sign In</h1>
          ) : (
            <h1 className="font-light text-2xl my-6">Sign Up</h1>
          )}
          <input
            type="email"
            placeholder="email"
            className="border border-slate-400 rounded p-2"
            required
            ref={inputEmail}
          />
          <input
            type="password"
            placeholder="password"
            className="border border-slate-400 rounded p-2"
            required
            minLength={6}
            ref={inputPassword}
          />
          {loginStatus ? null : (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-slate-400 rounded p-2"
              required
              minLength={6}
              ref={inputConfirmPassword}
            />
          )}

          <button className="bg-violet-600 p-2 rounded-full text-white font-semibold">
            Submit
          </button>
        </form>
        {/* Login Button */}
        <div className="p-4 rounded-md mt-4 bg-green-300 min-w-80 text-center">
        <span>
            {loginStatus ? "Don't have an Account ? " : "Have an Account ? "}
          </span>
          <button
            className="text-blue-570 font-bold"
            onClick={() => setLoginStatus((prevState) => !prevState)}
          >
            {loginStatus ? "SignUp" : "Login"}
          </button> 
        </div>
      </div>
    </>
  );
}

export default App;