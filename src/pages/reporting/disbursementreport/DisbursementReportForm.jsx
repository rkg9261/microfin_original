import React, { useState } from "react";

import {
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";

import { validateRequired } from "../../../utils/validation";


const DisbursementReportForm = ({
  filters,
  onGetRecord,
  onReset,
}) => {

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState(filters);


  // =========================================================
  // ERROR STATE
  // =========================================================

  const [errors, setErrors] = useState({});


  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    // Remove individual error
    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    // =======================================================
    // REQUIRED FIELDS
    // =======================================================

    const requiredFields = [

      {
        name: "recoveryType",
        label: "Recovery Type",
      },

      {
        name: "planType",
        label: "Select Plan Type",
      },

      {
        name: "paymentStatus",
        label: "Select Payment Status",
      },

    ];


    const validationErrors = validateRequired(
      formData,
      requiredFields
    );


    setErrors(validationErrors);


    // =======================================================
    // STOP IF ERROR
    // =======================================================

    if (
      Object.keys(validationErrors).length > 0
    ) {

      return;

    }


    // =======================================================
    // SEND TO PARENT
    // =======================================================

    onGetRecord(formData);

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    const resetData = {

      branch: "",
      loanType: "All",
      loanPlanName: "",
      recoveryType: "All",

      planType: "All",
      paymentStatus: "Disbursed",
      ledgerAccount: "",

      staff: "",
      member: "",

      disbursementDate: "",
      disbursementDateFrom: "",
      disbursementDateTo: "",

      emiEndDateFrom: "",
      emiEndDateTo: "",

    };


    setFormData(resetData);

    setErrors({});

    onReset();

  };


  return (

    <form
      className="disbursement-report-form"
      onSubmit={handleSubmit}
    >

      <div className="disbursement-report-grid">


        {/* =================================================
            ROW 1
        ================================================= */}


        {/* BRANCH */}

        <div className="disbursement-form-group">

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

            <option value="LASKARHAT">
              LASKARHAT
            </option>

            <option value="SALINARA">
              SALINARA
            </option>

            <option value="CENTER A">
              CENTER A
            </option>

            <option value="CENTER B">
              CENTER B
            </option>

          </select>

        </div>


        {/* LOAN TYPE */}

        <div className="disbursement-form-group">

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


        {/* LOAN PLAN NAME */}

        <div className="disbursement-form-group">

          <label>
            LOAN PLAN NAME
          </label>

          <select
            name="loanPlanName"
            value={formData.loanPlanName}
            onChange={handleChange}
          >

            <option value="">
              Select Loan Plan
            </option>

            <option value="MICRO LOAN">
              Micro Loan
            </option>

            <option value="BUSINESS LOAN">
              Business Loan
            </option>

            <option value="GROUP LOAN">
              Group Loan
            </option>

          </select>

        </div>


        {/* RECOVERY TYPE */}

        <div className="disbursement-form-group">

          <label>
            RECOVERY TYPE <span>*</span>
          </label>

          <select
            name="recoveryType"
            value={formData.recoveryType}
            onChange={handleChange}
            className={
              errors.recoveryType
                ? "disbursement-input-error"
                : ""
            }
          >

            <option value="All">
              All
            </option>

            <option value="EMI">
              EMI
            </option>

            <option value="PENALTY">
              Penalty
            </option>

            <option value="OTHER">
              Other
            </option>

          </select>

          {errors.recoveryType && (

            <small className="disbursement-error">
              {errors.recoveryType}
            </small>

          )}

        </div>


        {/* =================================================
            ROW 2
        ================================================= */}


        {/* SELECT PLAN TYPE */}

        <div className="disbursement-form-group">

          <label>
            SELECT PLAN TYPE <span>*</span>
          </label>

          <select
            name="planType"
            value={formData.planType}
            onChange={handleChange}
            className={
              errors.planType
                ? "disbursement-input-error"
                : ""
            }
          >

            <option value="All">
              All
            </option>

            <option value="MONTHLY">
              Monthly
            </option>

            <option value="WEEKLY">
              Weekly
            </option>

            <option value="DAILY">
              Daily
            </option>

          </select>

          {errors.planType && (

            <small className="disbursement-error">
              {errors.planType}
            </small>

          )}

        </div>


        {/* PAYMENT STATUS */}

        <div className="disbursement-form-group">

          <label>
            SELECT PAYMENT STATUS <span>*</span>
          </label>

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className={
              errors.paymentStatus
                ? "disbursement-input-error"
                : ""
            }
          >

            <option value="Disbursed">
              Disbursed
            </option>

            <option value="All">
              All
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

          {errors.paymentStatus && (

            <small className="disbursement-error">
              {errors.paymentStatus}
            </small>

          )}

        </div>


        {/* LEDGER ACCOUNT */}

        <div className="disbursement-form-group">

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

            <option value="CASH IN HAND">
              CASH IN HAND
            </option>

            <option value="BANK ACCOUNT">
              BANK ACCOUNT
            </option>

            <option value="UPI ACCOUNT">
              UPI ACCOUNT
            </option>

          </select>

        </div>


        {/* STAFF */}

        <div className="disbursement-form-group">

          <label>
            STAFF (TYPE HERE)
          </label>

          <input
            type="text"
            name="staff"
            value={formData.staff}
            onChange={handleChange}
            placeholder="Search Staff"
          />

        </div>


        {/* =================================================
            ROW 3
        ================================================= */}


        {/* MEMBER */}

        <div className="disbursement-form-group">

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


        {/* DISBURSEMENT DATE */}

        <div className="disbursement-form-group">

          <label>
            DISBURSEMENT DATE
          </label>

          <div className="disbursement-date-wrapper">

            <input
              type="date"
              name="disbursementDate"
              value={formData.disbursementDate}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* DISBURSEMENT DATE FROM */}

        <div className="disbursement-form-group">

          <label>
            DISBURSEMENT DATE FROM
          </label>

          <div className="disbursement-date-wrapper">

            <input
              type="date"
              name="disbursementDateFrom"
              value={formData.disbursementDateFrom}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* DISBURSEMENT DATE TO */}

        <div className="disbursement-form-group">

          <label>
            DISBURSEMENT DATE TO
          </label>

          <div className="disbursement-date-wrapper">

            <input
              type="date"
              name="disbursementDateTo"
              value={formData.disbursementDateTo}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* EMI END DATE FROM */}

        <div className="disbursement-form-group">

          <label>
            EMI END DATE FROM
          </label>

          <div className="disbursement-date-wrapper">

            <input
              type="date"
              name="emiEndDateFrom"
              value={formData.emiEndDateFrom}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* =================================================
            ROW 4
        ================================================= */}


        {/* EMI END DATE TO */}

        <div className="disbursement-form-group">

          <label>
            EMI END DATE TO
          </label>

          <div className="disbursement-date-wrapper">

            <input
              type="date"
              name="emiEndDateTo"
              value={formData.emiEndDateTo}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


      </div>


      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="disbursement-report-buttons">

        <button
          type="submit"
          className="disbursement-get-record-btn"
        >

          <FaPaperPlane />

          GET RECORD

        </button>


        <button
          type="button"
          className="disbursement-reset-btn"
          onClick={handleReset}
        >

          RESET

        </button>

      </div>

    </form>

  );

};

export default DisbursementReportForm;