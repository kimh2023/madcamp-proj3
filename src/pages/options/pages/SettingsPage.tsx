import "@pages/options/style/OptionPage.css";
import OptionsMenu from "../components/OptionsMenu";
import {
  StyledHeader1,
  StyledOptionsGrayText,
} from "@root/src/shared/styledComponents/StyledText";
import {
  StyledDiv,
  StyledOptionsDiv,
  StyledWhiteContainer,
} from "@root/src/shared/styledComponents/StyledDiv";
import {
  StyledButton,
  StyledButtonWhite,
} from "@root/src/shared/styledComponents/StyledButton";
import { useState, useContext, useEffect } from "react";
import {
  StyledInput,
  StyledSelect,
} from "@root/src/shared/styledComponents/StyledInput";
import { AuthContext } from "../Options";
import axiosInstance from "@root/utils/axiosInstance";

const SettingsPage = () => {
  const authContext = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "email@email.com" });
  const [updateRequest, setUpdateRequest] = useState({
    name: "",
    interest: null,
  });

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await axiosInstance.get(
        `/users/${authContext?.session?.userId}`,
      );
      if (userResponse.data.success) {
        setUserInfo({ email: userResponse?.data?.user?.email });
        setUpdateRequest({
          name: userResponse?.data?.user?.name,
          interest: userResponse?.data?.user?.interest,
        });
      }
    };
    getUser();
  }, [authContext?.session?.userId]);

  const handleSave = async () => {
    if (!authContext?.session?.userId) {
      return;
    }
    const updateResponse = await axiosInstance.patch(
      `/users/${authContext?.session?.userId}`,
      updateRequest,
    );
    console.log(updateResponse);
  };

  return (
    <div className="settings">
      <StyledOptionsDiv>
        <StyledHeader1 style={{ textAlign: "left" }}>ACCOUNT</StyledHeader1>
        <StyledWhiteContainer flexHorizontal={true}>
          <StyledDiv style={{ flex: 1, alignItems: "flex-start" }}>
            <StyledOptionsGrayText>EMAIL</StyledOptionsGrayText>
            <StyledOptionsGrayText>NAME</StyledOptionsGrayText>
            <StyledOptionsGrayText>INTERESTS</StyledOptionsGrayText>
          </StyledDiv>
          <StyledDiv style={{ flex: 3, alignItems: "flex-start" }}>
            <StyledOptionsGrayText>{userInfo.email}</StyledOptionsGrayText>
            <StyledInput
              placeholder="NAME"
              value={updateRequest.name}
              onChange={(e) =>
                setUpdateRequest((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              textAlign={"left"}
            />
            <StyledSelect
              placeholder={"INTERESTS"}
              options={[
                { label: "Food and Drink", value: "Food and Drink" },
                { label: "Technology", value: "Technology" },
              ]}
              selectedValue={updateRequest.interest}
              setSelectedValue={(value) =>
                setUpdateRequest((prevState) => ({
                  ...prevState,
                  interest: value,
                }))
              }
              textAlign={"left"}
            ></StyledSelect>
          </StyledDiv>

          <StyledDiv style={{ flex: 2, marginTop: "auto" }}>
            <StyledButtonWhite onClick={() => setIsModalOpen(true)}>
              CHANGE PASSWORD
            </StyledButtonWhite>
            <StyledButton onClick={handleSave}>SAVE</StyledButton>
          </StyledDiv>
        </StyledWhiteContainer>
      </StyledOptionsDiv>
    </div>
  );
};
export default SettingsPage;
