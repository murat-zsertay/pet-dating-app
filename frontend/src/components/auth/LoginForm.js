import React, { useState } from "react";
import "../user/signUpForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
      console.log("oops");
      navigate("/login");
    } else {
      console.log("yay");
      let data = await response.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user_id", data.user_id);
      navigate("/findPetsPage");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main>
      <h2 id="login-title">Login to Pawty!</h2>
      <div className="container">
        <form className="signUpLoginForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              className="form_field"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <label id="form_label" htmlFor="email">
              Email
            </label>
            <i></i>
          </div>

          <div className="input-box">
            <input
              className="form_field"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label id="form_label" htmlFor="password">
              Password
            </label>
            <i></i>
          </div>
          <input id="submit" type="submit" value="Login" />
        </form>
        <p>
          New user? <a href="/signup">Signup</a> here.
        </p>
      </div>
    </main>
  );
};

export default LogInForm;
