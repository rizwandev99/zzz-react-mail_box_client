import { useState } from "react";
import "./App.css";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
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
            className="border border-slate-400 rounded p-2 required "
          />
          <input
            type="password"
            placeholder="password"
            className="border border-slate-400 rounded p-2 required "
          />
          {loginStatus ? null : (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-slate-400 rounded p-2 required "
            />
          )}

          <button className="bg-violet-600 p-2 rounded-full text-white font-semibold">
            Submit
          </button>
        </form>
        <div className="p-4 rounded-md mt-4 bg-green-300 min-w-80 text-center">
          {loginStatus ? (
            <>
              <span>Don't have an Account ? </span>
              <button
                className="text-blue-570 font-bold"
                onClick={() => {
                  setLoginStatus((prevState) => !prevState);
                }}
              >
                SignUp
              </button>
            </>
          ) : (
            <>
              <span>Have an Account ? </span>
              <button
                className="text-blue-570 font-bold"
                onClick={() => {
                  setLoginStatus((prevState) => !prevState);
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
