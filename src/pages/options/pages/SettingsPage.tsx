import "@pages/options/style/OptionPage.css";
import OptionsMenu from "../components/OptionsMenu";
import { StyledHeader1 } from "@root/src/shared/styledComponents/StyledText";
import { StyledOptionsDiv } from "@root/src/shared/styledComponents/StyledDiv";

const SettingsPage = () => {
  return (
    <div className="settings">
      <StyledOptionsDiv>
        <StyledHeader1 style={{ textAlign: "left" }}>ACCOUNT</StyledHeader1>
      </StyledOptionsDiv>
    </div>
  );
};
export default SettingsPage;
