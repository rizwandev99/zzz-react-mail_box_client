import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ComposeMail = () => {
  const [value, setValue] = useState("");

  const inputEmail = useRef();
  const inputSubject = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const email = inputEmail.current.value;
    const subject = inputSubject.current.value;

    console.log("E-mail", email);

    let url = `https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email.json`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        subject: subject,
        letter: value,
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
      <form className="w-screen text-center" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="To : Enter email of recipient"
          className="w-full py-4"
          ref={inputEmail}
        />
        <hr />
        <input
          type="text"
          placeholder="Enter Subject"
          className="w-full py-4"
          ref={inputSubject}
        />
        <hr />
        <div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={(value) => setValue(value)}
            placeholder="Write your mail here"
            className="h-48 my-8"
          />
        </div>
        <button
          className="p-4 my-4 bg-green-400 rounded-xl text-white font-bold "
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ComposeMail;
