import React, { useState } from "react";

const DuePenaltyForm = () => {
  const [formData, setFormData] = useState({
    branch: "",
    member: "",
    paymentStatus: "Pending",
    mergeRecords: "No",
    loanApplication: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetRecord = (e) => {
    e.preventDefault();

    console.log("Due Penalty Filter:", formData);
  };

  return (
    <div className="due-penalty-filter-card">

      <form onSubmit={handleGetRecord}>

        <div className="due-penalty-filter-grid">

          {/* BRANCH */}

          <div className="due-penalty-field">
            <label>BRANCH</label>

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="">
                Select Branch
              </option>

              <option value="LASKARHAT">
                LASKARHAT
              </option>

              <option value="JAGATPURA">
                JAGATPURA
              </option>

              <option value="SHREEJA GROUP">
                SHREEJA GROUP
              </option>
            </select>
          </div>

          {/* MEMBER */}

          <div className="due-penalty-field">
            <label>MEMBER (TYPE HERE)</label>

            <select
              name="member"
              value={formData.member}
              onChange={handleChange}
            >
              <option value="">
                Select Member
              </option>

              <option value="GAGAN">
                GAGAN
              </option>

              <option value="PRADEEP">
                PRADEEP
              </option>

              <option value="MAKSUD ALAM">
                MAKSUD ALAM
              </option>
            </select>
          </div>

          {/* PAYMENT STATUS */}

          <div className="due-penalty-field">
            <label>SELECT PAYMENT STATUS</label>

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Waived">
                Waived
              </option>
            </select>
          </div>

          {/* MERGE RECORDS */}

          <div className="due-penalty-field">
            <label>MERGE RECORDS</label>

            <select
              name="mergeRecords"
              value={formData.mergeRecords}
              onChange={handleChange}
            >
              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>
            </select>
          </div>

        </div>

        {/* SECOND ROW */}

        <div className="due-penalty-filter-bottom">

          <div className="due-penalty-loan-search">

            <input
              type="text"
              name="loanApplication"
              value={formData.loanApplication}
              onChange={handleChange}
              placeholder="Search by Loan Application"
            />

            <button type="button">
              🔍
            </button>

          </div>

          <button
            type="submit"
            className="due-penalty-get-record-btn"
          >
            ➤ GET RECORD
          </button>

        </div>

      </form>

    </div>
  );
};

export default DuePenaltyForm;