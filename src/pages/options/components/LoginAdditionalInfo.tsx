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
import React, { useState, useContext } from "react";
import { AuthContext } from "../Options";
import { SessionDto } from "@root/src/shared/types";

const AdditionalInfo = () => {
  const authContext = useContext(AuthContext);

  const [updateRequest, setUpdateRequest] = useState({
    name: "",
    interest: null,
  });

  const handleAdditionalInfo = async () => {
    if (!authContext?.session?.userId) {
      return;
    }
    const updateResponse = await axiosInstance.patch(
      `/users/${authContext?.session?.userId}/signUp`,
      updateRequest,
    );
    if (updateResponse.data.success == true) {
      chrome.runtime.sendMessage({
        action: "setSession",
        message: {
          token: authContext?.session?.token,
          userId: authContext?.session?.userId,
          isVerified: false,
          signUpTab: 2,
        } as SessionDto,
      });
    }
  };

  return (
    <React.Fragment>
      <StyledDiv>
        <StyledHeader1>ADDITIONAL INFORMATION</StyledHeader1>
        <StyledSubheader1>TELL US ABOUT YOURSELF</StyledSubheader1>
      </StyledDiv>
      <StyledDiv style={{ marginTop: "auto" }}>
        <StyledInput
          placeholder="NAME"
          value={updateRequest.name}
          onChange={(e) =>
            setUpdateRequest((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <StyledSelect
          placeholder={"INTERESTS"}
          options={[
            { label: "Food and Drink", value: "Food and Drink" },
            { label: "Technology", value: "Technology" },
          ]}
          selectedValue={updateRequest.interest}
          setSelectedValue={(value) =>
            setUpdateRequest((prevState) => ({ ...prevState, interest: value }))
          }
        ></StyledSelect>
      </StyledDiv>
      <StyledDiv style={{ marginTop: "auto" }}>
        <StyledButton onClick={handleAdditionalInfo}>NEXT</StyledButton>
      </StyledDiv>
    </React.Fragment>
  );
};

export default AdditionalInfo;
