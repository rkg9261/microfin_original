import React from "react";

const PaidEmiForm = ({
  filters,
  onChange,
  onClear,
  onGetRecord,
}) => {
  return (
    <div className="paid-emi-filter-card">

      <div className="paid-emi-filter-title">
        SEARCH BY
      </div>


      <div className="paid-emi-filter-grid">

        {/* BRANCH */}
        <div className="paid-emi-field">

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


        {/* STAFF */}
        <div className="paid-emi-field">

          <label>STAFF (TYPE HERE)</label>

          <select
            value={filters.staff}
            onChange={(e) =>
              onChange("staff", e.target.value)
            }
          >
            <option value="">Select Staff</option>
            <option value="ADMIN (ADMO1)">
              ADMIN (ADMO1)
            </option>
            <option value="STAFF 01">
              STAFF 01
            </option>
          </select>

        </div>


        {/* MEMBER */}
        <div className="paid-emi-field">

          <label>MEMBER (TYPE HERE)</label>

          <select
            value={filters.member}
            onChange={(e) =>
              onChange("member", e.target.value)
            }
          >
            <option value="">Select Member</option>
            <option value="SANGITA BALU KHARE">
              SANGITA BALU KHARE
            </option>
            <option value="PRIYA SHARMA">
              PRIYA SHARMA
            </option>
            <option value="RAMESH KUMAR">
              RAMESH KUMAR
            </option>
            <option value="PANKAJ JI">
              PANKAJ JI
            </option>
          </select>

        </div>


        {/* COLLECTION TYPE */}
        <div className="paid-emi-field">

          <label>COLLECTION TYPE</label>

          <select
            value={filters.collectionType}
            onChange={(e) =>
              onChange(
                "collectionType",
                e.target.value
              )
            }
          >
            <option value="">Select Type</option>
            <option value="EMI">EMI</option>
            <option value="CASH">CASH</option>
            <option value="BANK">BANK</option>
          </select>

        </div>


        {/* APPLICATION */}
        <div className="paid-emi-field">

          <label>APPLICATION NO</label>

          <input
            type="text"
            placeholder="Enter Application No"
            value={filters.applicationNo}
            onChange={(e) =>
              onChange(
                "applicationNo",
                e.target.value
              )
            }
          />

        </div>


        {/* PAYMENT STATUS */}
        <div className="paid-emi-field">

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
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>

        </div>


        {/* DATE */}
        <div className="paid-emi-field">

          <label>DATE</label>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onChange("date", e.target.value)
            }
          />

        </div>


        {/* PAYMENT START DATE */}
        <div className="paid-emi-field">

          <label>PAYMENT START DATE</label>

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


        {/* PAYMENT END DATE */}
        <div className="paid-emi-field">

          <label>PAYMENT END DATE</label>

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


      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="paid-emi-filter-actions">

        <button
          type="button"
          className="paid-emi-get-record"
          onClick={onGetRecord}
        >
          GET RECORD
        </button>

        <button
          type="button"
          className="paid-emi-clear-button"
          onClick={onClear}
        >
          CLEAR
        </button>

      </div>

    </div>
  );
};

export default PaidEmiForm;