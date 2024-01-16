import React, { useState, useEffect, createContext } from "react";
import "@pages/options/Options.css";
import LoginPage from "./pages/LoginPage";
import {
  SessionContextCompleteDto,
  SessionContextDto,
} from "@root/src/shared/types";

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
        }));
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
    </AuthContext.Provider>
  );
};

export default Options;
