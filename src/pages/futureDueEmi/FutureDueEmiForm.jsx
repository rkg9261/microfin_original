import React from "react";

const FutureDueEmiForm = ({
  filters,
  onChange,
  onClear,
  onGetRecord,
}) => {
  return (
    <div className="future-due-emi-filter-card">

      <div className="future-due-emi-filter-grid">

        {/* BRANCH */}

        <div className="future-due-emi-field">
          <label>BRANCH</label>

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

            <option value="KOLKATA">
              KOLKATA
            </option>

            <option value="DELHI">
              DELHI
            </option>

            <option value="MUMBAI">
              MUMBAI
            </option>
          </select>
        </div>

        {/* RECOVERY TYPE */}

        <div className="future-due-emi-field">
          <label>
            RECOVERY TYPE <span>*</span>
          </label>

          <select
            value={filters.recoveryType}
            onChange={(e) =>
              onChange(
                "recoveryType",
                e.target.value
              )
            }
          >
            <option value="">
              Recovery type
            </option>

            <option value="Regular">
              Regular
            </option>

            <option value="Recovery">
              Recovery
            </option>
          </select>
        </div>

        {/* DESIGNATION */}

        <div className="future-due-emi-field">
          <label>DESIGNATION</label>

          <select
            value={filters.designation}
            onChange={(e) =>
              onChange(
                "designation",
                e.target.value
              )
            }
          >
            <option value="">
              Select Designation
            </option>

            <option value="Manager">
              Manager
            </option>

            <option value="Field Staff">
              Field Staff
            </option>

            <option value="Collection Staff">
              Collection Staff
            </option>
          </select>
        </div>

        {/* STAFF */}

        <div className="future-due-emi-field">
          <label>STAFF (TYPE HERE)</label>

          <select
            value={filters.staff}
            onChange={(e) =>
              onChange(
                "staff",
                e.target.value
              )
            }
          >
            <option value="">
              Select Staff
            </option>

            <option value="ANIL SINGHA">
              ANIL SINGHA
            </option>

            <option value="AADITYA KUMAR">
              AADITYA KUMAR
            </option>

            <option value="RAHUL KUMAR">
              RAHUL KUMAR
            </option>
          </select>
        </div>

        {/* DATE */}

        <div className="future-due-emi-field">
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

        {/* ORDER EMI DATE */}

        <div className="future-due-emi-field">
          <label>ORDER BY EMI DATE</label>

          <select
            value={filters.orderByEmiDate}
            onChange={(e) =>
              onChange(
                "orderByEmiDate",
                e.target.value
              )
            }
          >
            <option value="">
              Select Value
            </option>

            <option value="asc">
              Oldest First
            </option>

            <option value="desc">
              Newest First
            </option>
          </select>
        </div>

        {/* ORDER GROUP */}

        <div className="future-due-emi-field">
          <label>ORDER BY GROUP</label>

          <select
            value={filters.orderByGroup}
            onChange={(e) =>
              onChange(
                "orderByGroup",
                e.target.value
              )
            }
          >
            <option value="">
              Select Value
            </option>

            <option value="asc">
              A - Z
            </option>

            <option value="desc">
              Z - A
            </option>
          </select>
        </div>

        {/* SELECT TYPE */}

        <div className="future-due-emi-field">
          <label>SELECT TYPE</label>

          <select
            value={filters.type}
            onChange={(e) =>
              onChange(
                "type",
                e.target.value
              )
            }
          >
            <option value="">
              Select Type
            </option>

            <option value="INDIVIDUAL">
              Individual
            </option>

            <option value="GROUP">
              Group
            </option>

            <option value="PRODUCT">
              Product
            </option>
          </select>
        </div>

        {/* CITY */}

        <div className="future-due-emi-field">
          <label>SEARCH BY CITY</label>

          <div className="future-due-emi-city-search">
            <input
              type="text"
              placeholder="Search Member by City"
              onChange={(e) =>
                onChange(
                  "city",
                  e.target.value
                )
              }
              value={filters.city}
            />

            <span>⌕</span>
          </div>
        </div>

        {/* PAYMENT STATUS */}

        <div className="future-due-emi-field">
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

            <option value="Pending">
              Pending
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="Paid">
              Paid
            </option>
          </select>
        </div>

      </div>

      {/* BUTTONS */}

      <div className="future-due-emi-buttons">

        <button
          type="button"
          className="future-due-emi-get"
          onClick={onGetRecord}
        >
          ➤ GET RECORD
        </button>

        <button
          type="button"
          className="future-due-emi-print"
          onClick={() => window.print()}
        >
          🖨 GET PRINT
        </button>

        <button
          type="button"
          className="future-due-emi-download"
          onClick={() =>
            alert(
              "Download will be connected with API."
            )
          }
        >
          ⬇ DOWNLOAD
        </button>

        <button
          type="button"
          className="future-due-emi-clear"
          onClick={onClear}
        >
          CLEAR
        </button>

      </div>

    </div>
  );
};

export default FutureDueEmiForm;