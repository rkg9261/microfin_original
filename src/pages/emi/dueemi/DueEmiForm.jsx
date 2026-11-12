import React from "react";

const DueEmiForm = ({
  filters,
  onChange,
  onClear,
  onGetRecord,
}) => {
  return (
    <div className="due-emi-filter-card">

      <div className="due-emi-filter-grid">

        {/* BRANCH */}
        <div className="due-emi-field">
          <label>BRANCH</label>

          <select
            value={filters.branch}
            onChange={(e) =>
              onChange("branch", e.target.value)
            }
          >
            <option value="">Select Branch</option>
            <option value="KOLKATA">KOLKATA</option>
            <option value="DELHI">DELHI</option>
            <option value="MUMBAI">MUMBAI</option>
          </select>
        </div>

        {/* DESIGNATION */}
        <div className="due-emi-field">
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
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Field Staff">Field Staff</option>
            <option value="Collection Staff">
              Collection Staff
            </option>
          </select>
        </div>

        {/* COLLECTION DAY */}
        <div className="due-emi-field">
          <label>
            SELECT COLLECTION DAY <span>*</span>
          </label>

          <select
            value={filters.collectionDay}
            onChange={(e) =>
              onChange(
                "collectionDay",
                e.target.value
              )
            }
          >
            <option value="EveryDay">
              EveryDay
            </option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">
              Wednesday
            </option>
            <option value="Thursday">
              Thursday
            </option>
            <option value="Friday">Friday</option>
            <option value="Saturday">
              Saturday
            </option>
          </select>
        </div>

        {/* STAFF */}
        <div className="due-emi-field">
          <label>STAFF (TYPE HERE)</label>

          <select
            value={filters.staff}
            onChange={(e) =>
              onChange("staff", e.target.value)
            }
          >
            <option value="">Select Staff</option>
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
        <div className="due-emi-field">
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

        {/* EMI FROM */}
        <div className="due-emi-field">
          <label>EMI FROM DATE</label>

          <input
            type="date"
            value={filters.emiFromDate}
            onChange={(e) =>
              onChange(
                "emiFromDate",
                e.target.value
              )
            }
          />
        </div>

        {/* EMI TO */}
        <div className="due-emi-field">
          <label>EMI TO DATE</label>

          <input
            type="date"
            value={filters.emiToDate}
            onChange={(e) =>
              onChange(
                "emiToDate",
                e.target.value
              )
            }
          />
        </div>

        {/* TYPE */}
        <div className="due-emi-field">
          <label>SELECT TYPE</label>

          <select
            value={filters.type}
            onChange={(e) =>
              onChange("type", e.target.value)
            }
          >
            <option value="">Select Type</option>
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

        {/* SEARCH CITY */}
        <div className="due-emi-field">
          <label>SEARCH BY CITY</label>

          <div className="due-emi-search-input">
            <input
              type="text"
              placeholder="Search Member by City"
              value={filters.city}
              onChange={(e) =>
                onChange("city", e.target.value)
              }
            />

            <span>⌕</span>
          </div>
        </div>

        {/* RECOVERY TYPE */}
        <div className="due-emi-field">
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

        {/* SORT */}
        <div className="due-emi-field">
          <label>SORT BY</label>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange(
                "sortBy",
                e.target.value
              )
            }
          >
            <option value="">Select Value</option>
            <option value="name">
              Member Name
            </option>
            <option value="amount">
              Amount
            </option>
            <option value="date">
              EMI Date
            </option>
          </select>
        </div>

        {/* PAYMENT STATUS */}
        <div className="due-emi-field">
          <label>SELECT PAYMENT STATUS</label>

          <select
            value={filters.paymentStatus}
            onChange={(e) =>
              onChange(
                "paymentStatus",
                e.target.value
              )
            }
          >
            <option value="Due">Due</option>
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

      <div className="due-emi-filter-actions">

        <button
          type="button"
          className="due-emi-get-btn"
          onClick={onGetRecord}
        >
          ➤ GET RECORD
        </button>

        <button
          type="button"
          className="due-emi-print-btn"
          onClick={() => window.print()}
        >
          🖨 GET PRINT
        </button>

        <button
          type="button"
          className="due-emi-download-btn"
          onClick={() =>
            alert("Download will be connected with API")
          }
        >
          ⬇ DOWNLOAD
        </button>

        <button
          type="button"
          className="due-emi-clear-btn"
          onClick={onClear}
        >
          CLEAR
        </button>

      </div>

    </div>
  );
};

export default DueEmiForm;