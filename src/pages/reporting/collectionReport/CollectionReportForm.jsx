import React, { useState } from "react";

import {
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";



import { validateRequired } from "../../../utils/validation";


const CollectionReportForm = ({
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


    // Remove error while typing
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
        name: "planType",
        label: "Select Plan Type",
      },

      {
        name: "paymentType",
        label: "Payment Type",
      },

      {
        name: "recoveryType",
        label: "Recovery Type",
      },

    ];


    const validationErrors = validateRequired(
      formData,
      requiredFields
    );


    setErrors(validationErrors);


    // Stop submit if validation fails
    if (Object.keys(validationErrors).length > 0) {

      return;

    }


    // Send data to parent
    onGetRecord(formData);

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    const resetData = {

      branch: "",
      loanType: "All",
      ledgerAccount: "",
      recoveryType: "All",

      planType: "All",
      paymentType: "All",
      applicationNo: "",
      paymentStatus: "All",

      staff: "",
      member: "",

      paymentDate: "",
      paymentStartDate: "",
      paymentEndDate: "",

    };


    setFormData(resetData);

    setErrors({});

    onReset();

  };


  return (

    <form
      className="collection-report-form"
      onSubmit={handleSubmit}
    >

      {/* =====================================================
          ROW 1
      ===================================================== */}

      <div className="collection-report-grid">


        {/* BRANCH */}

        <div className="collection-form-group">

          <label>
            BRANCH
          </label>

          <div className="collection-select-wrapper">

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

        </div>


        {/* LOAN TYPE */}

        <div className="collection-form-group">

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


        {/* LEDGER ACCOUNT */}

        <div className="collection-form-group">

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


        {/* RECOVERY TYPE */}

        <div className="collection-form-group">

          <label>
            RECOVERY TYPE <span>*</span>
          </label>

          <select
            name="recoveryType"
            value={formData.recoveryType}
            onChange={handleChange}
            className={
              errors.recoveryType
                ? "collection-input-error"
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

            <small className="collection-error">
              {errors.recoveryType}
            </small>

          )}

        </div>


        {/* =================================================
            ROW 2
        ================================================= */}


        {/* PLAN TYPE */}

        <div className="collection-form-group">

          <label>
            SELECT PLAN TYPE <span>*</span>
          </label>

          <select
            name="planType"
            value={formData.planType}
            onChange={handleChange}
            className={
              errors.planType
                ? "collection-input-error"
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

            <small className="collection-error">
              {errors.planType}
            </small>

          )}

        </div>


        {/* PAYMENT TYPE */}

        <div className="collection-form-group">

          <label>
            PAYMENT TYPE <span>*</span>
          </label>

          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className={
              errors.paymentType
                ? "collection-input-error"
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

            <option value="ADVANCE">
              Advance
            </option>

          </select>

          {errors.paymentType && (

            <small className="collection-error">
              {errors.paymentType}
            </small>

          )}

        </div>


        {/* APPLICATION NO */}

        <div className="collection-form-group">

          <label>
            APPLICATION NO
          </label>

          <input
            type="text"
            name="applicationNo"
            value={formData.applicationNo}
            onChange={handleChange}
            placeholder="Application No"
          />

        </div>


        {/* PAYMENT STATUS */}

        <div className="collection-form-group">

          <label>
            SELECT PAYMENT STATUS
          </label>

          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >

            <option value="All">
              All
            </option>

            <option value="PAID">
              Paid
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="FAILED">
              Failed
            </option>

          </select>

        </div>


        {/* =================================================
            ROW 3
        ================================================= */}


        {/* STAFF */}

        <div className="collection-form-group">

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


        {/* MEMBER */}

        <div className="collection-form-group">

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


        {/* PAYMENT DATE */}

        <div className="collection-form-group">

          <label>
            PAYMENT DATE
          </label>

          <div className="collection-date-wrapper">

            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* PAYMENT START DATE */}

        <div className="collection-form-group">

          <label>
            PAYMENT START DATE
          </label>

          <div className="collection-date-wrapper">

            <input
              type="date"
              name="paymentStartDate"
              value={formData.paymentStartDate}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


        {/* PAYMENT END DATE */}

        <div className="collection-form-group">

          <label>
            PAYMENT END DATE
          </label>

          <div className="collection-date-wrapper">

            <input
              type="date"
              name="paymentEndDate"
              value={formData.paymentEndDate}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

        </div>


      </div>


      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="collection-report-buttons">

        <button
          type="submit"
          className="collection-get-record-btn"
        >

          <FaPaperPlane />

          GET RECORD

        </button>


        <button
          type="button"
          className="collection-reset-btn"
          onClick={handleReset}
        >

          RESET

        </button>

      </div>

    </form>

  );

};

export default CollectionReportForm;