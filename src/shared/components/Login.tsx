import {
  StyledButton,
  StyledButtonWhite,
} from "@root/src/shared/styledComponents/StyledButton";
import { StyledInput } from "@root/src/shared/styledComponents/StyledInput";
import axiosInstance from "@root/utils/axiosInstance";
import React, { useState, useContext } from "react";
import {
  StyledHeader1,
  StyledSubheader1,
} from "../styledComponents/StyledText";
import { StyledDiv } from "../styledComponents/StyledDiv";
import { SessionDto } from "../types";
import { AuthContext } from "@root/src/pages/options/Options";

const Login = ({ isOptionPage }: { isOptionPage?: boolean }) => {
  const authContext = useContext(AuthContext);

  const [authRequest, setAuthRequest] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const loginResponse = await axiosInstance.post("/auth/login", authRequest);
    console.log(loginResponse);
    if (loginResponse.data.success) {
      chrome.runtime.sendMessage({
        action: "setSession",
        message: {
          token: loginResponse.data.token,
          userId: loginResponse.data.user.id,
          isVerified: true,
        } as SessionDto,
      });
    }
  };

  const handleSignup = async () => {
    const signupResponse = await axiosInstance.post(
      "/auth/signup",
      authRequest,
    );
    if (signupResponse.data.success) {
      chrome.runtime.sendMessage({
        action: "setSession",
        message: {
          token: signupResponse.data.token,
          userId: signupResponse.data.user.id,
          isVerified: false,
        } as SessionDto,
      });
      if (isOptionPage) {
        authContext.setSession({ signUpTab: 1 });
      }
    }
  };

  return (
    <React.Fragment>
      <StyledDiv>
        <StyledHeader1>LOGIN</StyledHeader1>
        {isOptionPage && (
          <StyledSubheader1>LOG IN TO USE OUR SERVICES</StyledSubheader1>
        )}
      </StyledDiv>

      <StyledDiv style={{ marginTop: "auto" }}>
        <StyledInput
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
      </StyledDiv>
      <StyledDiv style={{ marginTop: "auto" }}>
        <StyledButtonWhite onClick={handleSignup}>SIGNUP</StyledButtonWhite>
        <StyledButton onClick={handleLogin}>LOGIN</StyledButton>
      </StyledDiv>
    </React.Fragment>
  );
};

export default Login;
