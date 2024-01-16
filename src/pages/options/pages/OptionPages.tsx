import "@pages/options/style/OptionPage.css";
import React, { useState } from "react";
import SettingsPage from "./SettingsPage";
import WishlistPage from "./WishlistPage";
import OptionsMenu from "../components/OptionsMenu";

const OptionPages = () => {
  const [tab, setTab] = useState(
    window.location.hash.substring(1).split("#")[0],
  );

  console.log(tab);

  return (
    <div className="options-page">
      <OptionsMenu tab={tab} setTab={(tab: string) => setTab(tab)} />
      {tab === "settings" && <SettingsPage />}
      {tab === "wishlist" && <WishlistPage />}
    </div>
  );
};
export default OptionPages;
