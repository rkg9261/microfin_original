import React from "react";

const AdvanceSecurityForm = ({
  filters,
  onChange,
  onClear,
}) => {
  return (
    <div className="advance-security-form-card">

      <div className="advance-security-form-title">
        <h3>SEARCH BY</h3>
      </div>


      <div className="advance-security-form-grid">

        {/* ==========================================
            BRANCH
        ========================================== */}

        <div className="advance-security-form-group">

          <label>BRANCH</label>

          <select
            value={filters.branch}
            onChange={(e) =>
              onChange("branch", e.target.value)
            }
          >
            <option value="">
              Select Branch
            </option>

            <option value="Kolkata">
              Kolkata
            </option>

            <option value="Howrah">
              Howrah
            </option>

            <option value="Delhi">
              Delhi
            </option>

          </select>

        </div>


        {/* ==========================================
            PAYMENT STATUS
        ========================================== */}

        <div className="advance-security-form-group">

          <label>
            SELECT PAYMENT STATUS
            <span>*</span>
          </label>

          <select
            value={filters.paymentStatus}
            onChange={(e) =>
              onChange(
                "paymentStatus",
                e.target.value
              )
            }
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="All">
              All
            </option>

          </select>

        </div>


        {/* ==========================================
            DATE
        ========================================== */}

        <div className="advance-security-form-group">

          <label>DATE</label>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onChange("date", e.target.value)
            }
          />

        </div>


        {/* ==========================================
            PAYMENT START DATE
        ========================================== */}

        <div className="advance-security-form-group">

          <label>
            PAYMENT START DATE
          </label>

          <input
            type="date"
            value={filters.paymentStartDate}
            onChange={(e) =>
              onChange(
                "paymentStartDate",
                e.target.value
              )
            }
          />

        </div>


        {/* ==========================================
            PAYMENT END DATE
        ========================================== */}

        <div className="advance-security-form-group">

          <label>
            PAYMENT END DATE
          </label>

          <input
            type="date"
            value={filters.paymentEndDate}
            onChange={(e) =>
              onChange(
                "paymentEndDate",
                e.target.value
              )
            }
          />

        </div>

      </div>


      {/* ==============================================
          CLEAR BUTTON
      ============================================== */}

      <div className="advance-security-form-buttons">

        <button
          type="button"
          className="advance-security-clear-button"
          onClick={onClear}
        >
          Clear
        </button>

      </div>

    </div>
  );
};

export default AdvanceSecurityForm;