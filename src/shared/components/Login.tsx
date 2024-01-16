import {
  StyledButton,
  StyledButtonWhite,
} from "@root/src/shared/styledComponents/StyledButton";
import { StyledInput } from "@root/src/shared/styledComponents/StyledInput";
import axiosInstance from "@root/utils/axiosInstance";
import React, { useState } from "react";

const Login = () => {
  const [authRequest, setAuthRequest] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const loginResponse = await axiosInstance.post("/auth/login", authRequest);
    console.log(loginResponse);
    if (loginResponse.data.success == true) {
      chrome.runtime.sendMessage({
        action: "setToken",
        message: loginResponse.data.token,
      });
    }
  };

  const handleSignup = async () => {
    const signupResponse = await axiosInstance.post("/auth/signup");
    chrome.runtime.sendMessage({
      action: "openLogin",
    });
  };

  return (
    <React.Fragment>
      <header className="App-header">LOGIN</header>
      <StyledInput
        style={{ marginTop: "auto" }}
        placeholder="EMAIL"
        value={authRequest.email}
        onChange={(e) =>
          setAuthRequest((prevState) => ({
            ...prevState,
            email: e.target.value,
          }))
        }
        type="email"
      />
      <StyledInput
        style={{ marginTop: 10 }}
        placeholder="PASSWORD"
        value={authRequest.password}
        onChange={(e) =>
          setAuthRequest((prevState) => ({
            ...prevState,
            password: e.target.value,
          }))
        }
        type="password"
      />
      <StyledButtonWhite onClick={handleSignup} style={{ marginTop: "auto" }}>
        SIGNUP
      </StyledButtonWhite>
      <StyledButton
        onClick={handleLogin}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        LOGIN
      </StyledButton>
    </React.Fragment>
  );
};

export default Login;
