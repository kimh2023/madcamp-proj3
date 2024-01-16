import "@pages/options/style/LoginPage.css";
import Login from "@root/src/shared/components/Login";

import React, { useEffect, useState, useContext } from "react";
import AdditionalInfo from "../components/LoginAdditionalInfo";
import { AuthContext } from "../Options";
import EmailVerification from "../components/LoginEmailVerification";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  return (
    <main className="Login">
      <div className="Login-left">
        <div className="Login-elements"></div>
        {authContext?.session?.signUpTab === 0 && <Login isOptionPage={true} />}
        {authContext?.session?.signUpTab === 1 && <AdditionalInfo />}
        {authContext?.session?.signUpTab === 2 && <EmailVerification />}
      </div>
    </main>
  );
};

export default LoginPage;
