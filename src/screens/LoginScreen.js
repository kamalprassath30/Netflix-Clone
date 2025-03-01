import React, { useState } from "react";
import "./LoginScreen.css";
import Signupscreen from "./SignupScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <img
          className="loginScreen_logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQeRoc_BhrP-jahuwf0Hrxe48LiP6DiHWiiw&s"
          alt=""
        />
        <button className="loginScreen_button" onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className="loginScreen_gradient"></div>
        <div className="loginScreen_body">
          {signIn ? (
            <Signupscreen />
          ) : (
            <>
              <h1>Unlimited flims, TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership
              </h3>
              <div className="loginScreen_input">
                <form>
                  <input type="email" placeholder="Email address" />
                  <button
                    className="loginScreen_getStarted"
                    onClick={() => setSignIn(true)}
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default LoginScreen;
