import React, { useState, useEffect, createContext } from "react";
import "@pages/options/Options.css";
import LoginPage from "./pages/LoginPage";
import {
  SessionContextCompleteDto,
  SessionContextDto,
} from "@root/src/shared/types";
import SettingsPage from "./pages/SettingsPage";
import OptionPages from "./pages/OptionPages";

export const AuthContext = createContext<SessionContextCompleteDto>({
  session: { token: null, userId: null, isVerified: false, signUpTab: 0 },
  setSession: null,
});

const Options: React.FC = () => {
  const [session, setSession] = useState<SessionContextDto>({
    token: null,
    userId: null,
    isVerified: false,
    signUpTab: 0,
  });

  useEffect(() => {
    const handleMessage = (message) => {
      if (message.action === "session") {
        setSession((prevState) => ({
          ...prevState,
          token: message.token,
          userId: message.userId,
          isVerified: message.isVerified,
          signUpTab: message.signUpTab,
        }));

        if (
          message.isVerified &&
          window.location.hash.substring(1).split("#")[0].length == 0
        ) {
          window.location.hash = "settings";
        }
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.runtime.sendMessage({ action: "getSession" });
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  if (session === null) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession: (newSession) =>
          setSession((prevSession) => ({ ...prevSession, ...newSession })),
      }}
    >
      {!session?.isVerified && <LoginPage />}
      {session?.isVerified && <OptionPages />}
    </AuthContext.Provider>
  );
};

export default Options;
