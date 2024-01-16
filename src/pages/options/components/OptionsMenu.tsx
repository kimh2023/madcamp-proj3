import "@pages/options/style/OptionPage.css";
import { StyledOptionMenuButton } from "@root/src/shared/styledComponents/StyledButton";
import {
  StyledHeader1,
  StyledHeader2,
} from "@root/src/shared/styledComponents/StyledText";
import { useState } from "react";

const OptionsMenu = ({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (tab: string) => void;
}) => {
  const handleLogout = () => {
    chrome.runtime.sendMessage({
      action: "setSession",
      message: null,
    });
  };

  return (
    <div className="options-menu">
      <StyledHeader2 style={{ marginBottom: "20px" }}>VISHOP</StyledHeader2>

      <StyledOptionMenuButton
        isCurrent={tab === "settings"}
        onClick={() => {
          window.location.hash = "settings";
          setTab("settings");
        }}
      >
        SETTINGS
      </StyledOptionMenuButton>
      <StyledOptionMenuButton
        isCurrent={tab === "wishlist"}
        onClick={() => {
          window.location.hash = "wishlist";
          setTab("wishlist");
        }}
      >
        WISHLIST
      </StyledOptionMenuButton>

      <StyledOptionMenuButton
        isCurrent={true}
        style={{ marginTop: "auto", fontSize: "26px" }}
        onClick={handleLogout}
      >
        LOGOUT
      </StyledOptionMenuButton>
    </div>
  );
};

export default OptionsMenu;
