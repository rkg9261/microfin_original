import React from "react";

const PromiseToPayForm = ({
  filters,
  onChange,
  onGetRecord,
  onClear,
}) => {
  return (
    <div className="promise-to-pay-filter-card">

      <div className="promise-to-pay-filter-title">
        FILTER BY
      </div>

      <div className="promise-to-pay-filter-grid">

        {/* BRANCH */}

        <div className="promise-to-pay-field">

          <label>BRANCH</label>

          <div className="promise-to-pay-select-wrapper">

            <select
              value={filters.branch}
              onChange={(e) =>
                onChange(
                  "branch",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Branch
              </option>

              <option value="JAGATPURA">
                JAGATPURA
              </option>

              <option value="SHREEJA GROUP">
                SHREEJA GROUP
              </option>

              <option value="KOLKATA">
                KOLKATA
              </option>

              <option value="DELHI">
                DELHI
              </option>
            </select>

            {filters.branch && (
              <button
                type="button"
                className="promise-to-pay-clear-select"
                onClick={() =>
                  onChange("branch", "")
                }
              >
                ×
              </button>
            )}

          </div>

        </div>

        {/* DATE */}

        <div className="promise-to-pay-field">

          <label>
            DATE <span>*</span>
          </label>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onChange(
                "date",
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="promise-to-pay-form-buttons">

        <button
          type="button"
          className="promise-to-pay-get-btn"
          onClick={onGetRecord}
        >
          GET RECORD
        </button>

        <button
          type="button"
          className="promise-to-pay-clear-btn"
          onClick={onClear}
        >
          CLEAR
        </button>

      </div>

    </div>
  );
};

export default PromiseToPayForm;