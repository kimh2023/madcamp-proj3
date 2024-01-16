import "@pages/options/style/LoginPage.css";
import { StyledButton } from "@root/src/shared/styledComponents/StyledButton";
import { StyledDiv } from "@root/src/shared/styledComponents/StyledDiv";
import {
  StyledInput,
  StyledSelect,
} from "@root/src/shared/styledComponents/StyledInput";
import {
  StyledHeader1,
  StyledSubheader1,
} from "@root/src/shared/styledComponents/StyledText";
import axiosInstance from "@root/utils/axiosInstance";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../Options";
import { SessionDto } from "@root/src/shared/types";

const EmailVerification = () => {
  const authContext = useContext(AuthContext);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const setVerificationState = useCallback(async () => {
    if (!authContext?.session?.userId) {
      return;
    }
    const isVerifiedResponse = await axiosInstance.get(
      `/users/${authContext?.session?.userId}/verified`,
    );
    if (isVerifiedResponse.data.success && isVerifiedResponse.data.isVerified) {
      chrome.runtime.sendMessage({
        action: "setSession",
        message: {
          token: authContext?.session?.token,
          userId: authContext?.session?.userId,
          isVerified: true,
        } as SessionDto,
      });
    }
  }, [authContext?.session?.token, authContext?.session?.userId]);

  useEffect(() => {
    setVerificationState();

    const interval = setInterval(setVerificationState, 1000);

    return () => clearInterval(interval);
  }, [setVerificationState]);

  return (
    <React.Fragment>
      <StyledDiv style={{ marginBottom: "auto" }}>
        <StyledHeader1>EMAIL VERIFICATION</StyledHeader1>
        <StyledSubheader1>PLEASE CHECK YOUR INBOX FIRST</StyledSubheader1>
      </StyledDiv>
    </React.Fragment>
  );
};

export default EmailVerification;
