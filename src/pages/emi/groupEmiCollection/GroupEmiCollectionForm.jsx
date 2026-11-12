import React from "react";

const GroupEmiCollectionForm = ({
  filters,
  onChange,
  onGetRecord,
}) => {
  return (
    <div className="group-emi-filter-card">

      <div className="group-emi-filter-grid">

        {/* DATE */}

        <div className="group-emi-field">

          <label>
            DATE <span>*</span>
          </label>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onChange("date", e.target.value)
            }
          />

        </div>

        {/* PAYMENT STATUS */}

        <div className="group-emi-field">

          <label>
            SELECT PAYMENT STATUS
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
            <option value="Unpaid">
              Unpaid
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="All">
              All
            </option>
          </select>

        </div>

        {/* BRANCH */}

        <div className="group-emi-field">

          <label>BRANCH</label>

          <div className="group-emi-select-wrapper">

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
            </select>

            {filters.branch && (
              <button
                type="button"
                onClick={() =>
                  onChange("branch", "")
                }
              >
                ×
              </button>
            )}

          </div>

        </div>

        {/* GROUP */}

        <div className="group-emi-field">

          <label>GROUP</label>

          <div className="group-emi-select-wrapper">

            <select
              value={filters.group}
              onChange={(e) =>
                onChange(
                  "group",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Group
              </option>

              <option value="SITA HOUSE">
                SITA HOUSE
              </option>

              <option value="MAA GROUP">
                MAA GROUP
              </option>

              <option value="DEVAS">
                DEVAS
              </option>
            </select>

            {filters.group && (
              <button
                type="button"
                onClick={() =>
                  onChange("group", "")
                }
              >
                ×
              </button>
            )}

          </div>

        </div>

      </div>

      <div className="group-emi-filter-line" />

    </div>
  );
};

export default GroupEmiCollectionForm;