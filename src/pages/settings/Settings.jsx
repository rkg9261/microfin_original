import React, { useState } from "react";
import "./Settings.css";

import ApiCharges from "./ApiCharges";
import WalletTransaction from "./WalletTransaction";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("api");

  return (
    <div className="settings-page">


      <div className="settings-header">

        <div>
          <h2>USER SETTINGS</h2>

          <p>
            Manage API charges and wallet transactions
          </p>
        </div>

      </div>


      {/* ================================
          TABS
      ================================= */}

      <div className="settings-tabs">

        <button
          className={
            activeTab === "api"
              ? "settings-tab active"
              : "settings-tab"
          }
          onClick={() => setActiveTab("api")}
        >
          API CHARGES
        </button>


        <button
          className={
            activeTab === "wallet"
              ? "settings-tab active"
              : "settings-tab"
          }
          onClick={() => setActiveTab("wallet")}
        >
          WALLET TRANSACTION
        </button>

      </div>


      {/* ================================
          CONTENT
      ================================= */}

      <div className="settings-content">

        {activeTab === "api" && (
          <ApiCharges />
        )}

        {activeTab === "wallet" && (
          <WalletTransaction />
        )}

      </div>

    </div>
  );
};

export default Settings;