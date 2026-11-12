import React, { useState } from "react";

import {
  FaCalendarAlt,
} from "react-icons/fa";

import { validateRequired } from "../../../utils/validation";


const SettlementReportForm = ({
  filters,
  onGetRecord,
  onReset,
}) => {

  // =========================================================
  // STATE
  // =========================================================

  const [formData, setFormData] = useState(filters);

  const [errors, setErrors] = useState({});


  // =========================================================
  // CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));


    if (errors[name]) {

      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));

    }

  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    const requiredFields = [

      {
        name: "status",
        label: "Select Status",
      },

    ];


    const validationErrors = validateRequired(
      formData,
      requiredFields
    );


    setErrors(validationErrors);


    if (
      Object.keys(validationErrors).length > 0
    ) {

      return;

    }


    onGetRecord(formData);

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    const resetData = {

      branch: "",

      loanType: "All",

      member: "",

      settlementDate: "",

      settlementFrom: "",

      settlementTo: "",

      ledgerAccount: "",

      status: "",

    };


    setFormData(resetData);

    setErrors({});

    onReset();

  };


  return (

    <form
      className="settlement-report-form"
      onSubmit={handleSubmit}
    >


      {/* =====================================================
          SEARCH BY
      ===================================================== */}

      <div className="settlement-search-title">
        SEARCH BY
      </div>


      <div className="settlement-report-grid">


        {/* ===================================================
            BRANCH
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            BRANCH
          </label>

          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          >

            <option value="">
              Select Branch
            </option>

            <option value="KOLKATA - DALHOUSIE">
              KOLKATA - DALHOUSIE
            </option>

            <option value="LASKARHAT">
              LASKARHAT
            </option>

            <option value="SALINARA">
              SALINARA
            </option>

          </select>

        </div>


        {/* ===================================================
            LOAN TYPE
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            LOAN TYPE
          </label>

          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
          >

            <option value="All">
              All
            </option>

            <option value="Individual">
              Individual
            </option>

            <option value="Group">
              Group
            </option>

          </select>

        </div>


        {/* ===================================================
            MEMBER
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            MEMBER (TYPE HERE)
          </label>

          <input
            type="text"
            name="member"
            value={formData.member}
            onChange={handleChange}
            placeholder="Search Member"
          />

        </div>


        {/* ===================================================
            SETTLEMENT DATE
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            SETTLEMENT DATE
          </label>

          <div className="settlement-date-wrapper">

            <input
              type="date"
              name="settlementDate"
              value={formData.settlementDate}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* ===================================================
            SETTLEMENT FROM
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            SETTLEMENT FROM
          </label>

          <div className="settlement-date-wrapper">

            <input
              type="date"
              name="settlementFrom"
              value={formData.settlementFrom}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* ===================================================
            SETTLEMENT TO
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            SETTLEMENT TO
          </label>

          <div className="settlement-date-wrapper">

            <input
              type="date"
              name="settlementTo"
              value={formData.settlementTo}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* ===================================================
            LEDGER ACCOUNT
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            SELECT LEDGER ACCOUNT
          </label>

          <select
            name="ledgerAccount"
            value={formData.ledgerAccount}
            onChange={handleChange}
          >

            <option value="">
              Select Ledger Account
            </option>

            <option value="CASH">
              CASH
            </option>

            <option value="BANK A/C">
              BANK A/C
            </option>

            <option value="UPI">
              UPI
            </option>

          </select>

        </div>


        {/* ===================================================
            STATUS
        =================================================== */}

        <div className="settlement-form-group">

          <label>
            SELECT STATUS <span>*</span>
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={
              errors.status
                ? "settlement-input-error"
                : ""
            }
          >

            <option value="">
              Select Status
            </option>

            <option value="APPROVED">
              Approved
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>


          {errors.status && (

            <small className="settlement-error">
              {errors.status}
            </small>

          )}

        </div>

      </div>


      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="settlement-form-buttons">

        <button
          type="submit"
          className="settlement-submit-btn"
        >
          Submit
        </button>


        <button
          type="button"
          className="settlement-reset-btn"
          onClick={handleReset}
        >
          Reset
        </button>

      </div>


    </form>

  );
};

export default SettlementReportForm;