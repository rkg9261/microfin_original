import React, { useState } from "react";

import SaveButton from "../../../components/buttons/SaveButton";
import CancelButton from "../../../components/buttons/CancelButton";
import CloseButton from "../../../components/buttons/CloseButton";

import "../../../components/common/CommonForm.css";
import "./LoanTopup.css";

const LoanTopupApproveForm = ({
  loan,
  onClose,
  onCreate,
}) => {

  const [formData, setFormData] = useState({
    branchCenter: "",
    plan: "",
    loanType: "",
    description: "",
    staffId: "",
    guarantor: "",
    purpose: "",
  });


  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();


    if (!formData.plan) {

      alert("Please select plan");

      return;

    }


    if (!formData.staffId) {

      alert("Please select staff ID");

      return;

    }


    if (!formData.description.trim()) {

      alert("Please enter description");

      return;

    }


    if (!formData.purpose) {

      alert("Please select purpose");

      return;

    }


    onCreate({
      ...formData,

      loanTopupId: loan?.id,

    });

  };


  return (
    <div className="common-modal-overlay">

      <div className="common-modal loan-topup-approve-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="common-modal-header">

          <h2>
            APPLY FOR LOAN TOPUP APPROVE
          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="common-form"
          onSubmit={handleSubmit}
        >

          <div className="common-form-grid">


            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="common-form-column">


              {/* BRANCH CENTER */}

              <div className="common-form-group">

                <label>
                  BRANCH CENTER (TYPE HERE)
                </label>

                <select
                  name="branchCenter"
                  value={formData.branchCenter}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Branch Center
                  </option>

                  <option value="CENTER 1">
                    CENTER 1
                  </option>

                  <option value="CENTER 2">
                    CENTER 2
                  </option>

                </select>

              </div>


              {/* LOAN TYPE */}

              <div className="common-form-group">

                <label>
                  LOAN TYPE
                </label>

                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Loan Type
                  </option>

                  <option value="TOPUP">
                    TOP UP
                  </option>

                  <option value="MICRO LOAN">
                    MICRO LOAN
                  </option>

                  <option value="BUSINESS LOAN">
                    BUSINESS LOAN
                  </option>

                </select>

              </div>


              {/* STAFF ID */}

              <div className="common-form-group">

                <label>
                  STAFF ID <span>*</span>
                </label>

                <select
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Staff
                  </option>

                  <option value="ADMIN">
                    ADMIN (ADM01)
                  </option>

                  <option value="STAFF01">
                    STAFF 01
                  </option>

                  <option value="STAFF02">
                    STAFF 02
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="common-form-column">


              {/* PLAN */}

              <div className="common-form-group">

                <label>
                  PLAN <span>*</span>
                </label>

                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Plan
                  </option>

                  <option value="PLAN 01">
                    PLAN 01
                  </option>

                  <option value="PLAN 02">
                    PLAN 02
                  </option>

                  <option value="PLAN 03">
                    PLAN 03
                  </option>

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="common-form-group">

                <label>
                  DESCRIPTION <span>*</span>
                </label>

                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>


              {/* GUARANTOR */}

              <div className="common-form-group">

                <label>
                  GUARANTOR (TYPE HERE)
                </label>

                <select
                  name="guarantor"
                  value={formData.guarantor}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Guarantor
                  </option>

                  <option value="DEEPAK">
                    DEEPAK (BRIAMSMEM32)
                  </option>

                  <option value="AKSHAY GARG">
                    AKSHAY GARG (BRI018)
                  </option>

                </select>

              </div>


              {/* PURPOSE */}

              <div className="common-form-group">

                <label>
                  PURPOSE <span>*</span>
                </label>

                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Purpose
                  </option>

                  <option value="BUSINESS">
                    BUSINESS
                  </option>

                  <option value="EDUCATION">
                    EDUCATION
                  </option>

                  <option value="MEDICAL">
                    MEDICAL
                  </option>

                  <option value="PERSONAL">
                    PERSONAL
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="common-form-actions">

            <SaveButton type="submit">
              CREATE
            </SaveButton>

            <CancelButton
              type="button"
              onClick={onClose}
            >
              CANCEL
            </CancelButton>

          </div>

        </form>

      </div>

    </div>
  );
};

export default LoanTopupApproveForm;