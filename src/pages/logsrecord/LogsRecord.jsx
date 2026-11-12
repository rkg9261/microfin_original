import React, { useState } from "react";
import LogsRecordTable from "./LogsRecordTable";
import "./LogsRecord.css";

const LogsRecord = () => {
  const [branch, setBranch] = useState("");

  const handleClearBranch = () => {
    setBranch("");
  };

  return (
    <div className="logs-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="logs-page-header">

        <div className="logs-page-title">
          LOGS
        </div>

        <div className="logs-breadcrumb">
          <span>●</span>
          <span>DASHBOARD</span>
          <span>›</span>
          <strong>LOGS</strong>
        </div>

      </div>


      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="logs-filter-card">

        <div className="logs-filter-title">
          FILTER BY
        </div>


        <div className="logs-filter-row">

          <div className="logs-filter-field">

            <label>
              BRANCH
            </label>

            <div className="logs-select-wrapper">

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value)
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="KOLKATA - DALHOUSIE">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="JAGATAPURA">
                  JAGATAPURA
                </option>

                <option value="LASKARHAT">
                  LASKARHAT
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

                <option value="RAM CAPITAL TRUST">
                  RAM CAPITAL TRUST
                </option>

              </select>


              {branch && (
                <button
                  type="button"
                  className="logs-clear-button"
                  onClick={handleClearBranch}
                >
                  ×
                </button>
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          LOG TABLE
      ===================================================== */}

      <LogsRecordTable
        branch={branch}
      />

    </div>
  );
};

export default LogsRecord;