import React, { useEffect, useState } from "react";

import SaveButton from "../../../components/buttons/SaveButton";
import CancelButton from "../../../components/buttons/CancelButton";
import CloseButton from "../../../components/buttons/CloseButton";
import "../../../components/common/CommonForm.css";
import "./GroupLoan.css";

const GroupLoanForm = ({
  loan,
  onClose,
  onSave,
}) => {

  const isEdit = Boolean(loan);


  const [formData, setFormData] = useState({

    branch: "",
    plan: "",
    branchCenter: "",
    description: "",
    agentId: "",
    member: "",
    group: "",
    guarantor: "",
    groupLeader: "",
    purpose: "",
    loanType: "Single Ledger",
    penaltyScheme: "",
    hideRateInterest: "NO",

  });


  /* =====================================================
     LOAD EDIT DATA
  ===================================================== */

  useEffect(() => {

    if (loan) {

      setFormData({

        branch: loan.branch || "",
        plan: loan.plan || "",

        branchCenter:
          loan.branchCenter || "",

        description:
          loan.description || "",

        agentId:
          loan.agentId || "",

        member:
          loan.member || "",

        group:
          loan.group || "",

        guarantor:
          loan.guarantor || "",

        groupLeader:
          loan.groupLeader || "",

        purpose:
          loan.purpose || "",

        loanType:
          loan.loanType || "Single Ledger",

        penaltyScheme:
          loan.penaltyScheme || "",

        hideRateInterest:
          loan.hideRateInterest || "NO",

      });

    }

  }, [loan]);


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

    onSave({
      ...formData,
      id: loan?.id,
    });

  };


  return (
    <div className="group-loan-modal-overlay">

      <div className="group-loan-form-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="group-loan-form-header">

          <h2>
            {isEdit
              ? "EDIT GROUP LOAN"
              : "CREATE NEW LOAN"}
          </h2>

          <CloseButton
                        onClick={onClose}
                    />

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="group-loan-form-body"
        >

          <div className="group-loan-form-grid">


            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div>


              {/* BRANCH */}

              <div className="group-loan-form-group">

                <label>
                  BRANCH <span>*</span>
                </label>

                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select branch
                  </option>

                  <option value="SHREEJA GROUP">
                    SHREEJA GROUP
                  </option>

                  <option value="BRANCH M FINANCE">
                    BRANCH M FINANCE
                  </option>

                </select>

              </div>


              {/* BRANCH CENTER */}

              <div className="group-loan-form-group">

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

                  <option value="SHREEJA CENTER">
                    SHREEJA CENTER
                  </option>

                  <option value="CENTER AM5">
                    CENTER AM5
                  </option>

                </select>

              </div>


              {/* AGENT ID */}

              <div className="group-loan-form-group">

                <label>
                  AGENT ID <span>*</span>
                </label>

                <select
                  name="agentId"
                  value={formData.agentId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Agent
                  </option>

                  <option value="AG001">
                    AG001
                  </option>

                  <option value="AG002">
                    AG002
                  </option>

                  <option value="AG003">
                    AG003
                  </option>

                </select>

              </div>


              {/* GROUP */}

              <div className="group-loan-form-group">

                <label>
                  GROUP
                </label>

                <select
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Group
                  </option>

                  <option value="SHREEJA GROUP">
                    SHREEJA GROUP
                  </option>

                  <option value="BRANCH M FINANCE">
                    BRANCH M FINANCE
                  </option>

                </select>

              </div>


              {/* GROUP LEADER */}

              <div className="group-loan-form-group">

                <label>
                  GROUP LEADER <span>*</span>
                </label>

                <select
                  name="groupLeader"
                  value={formData.groupLeader}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Group Leader
                  </option>

                  <option value="DEEPAK">
                    DEEPAK
                  </option>

                  <option value="AKSHAY GARG">
                    AKSHAY GARG
                  </option>

                  <option value="KOYEL SARKAR">
                    KOYEL SARKAR
                  </option>

                </select>

              </div>


              {/* PURPOSE */}

              <div className="group-loan-form-group">

                <label>
                  PURPOSE <span>*</span>
                </label>

                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Purpose
                  </option>

                  <option value="Business">
                    Business
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Medical">
                    Medical
                  </option>

                  <option value="Personal">
                    Personal
                  </option>

                </select>

              </div>


              {/* LOAN TYPE */}

              <div className="group-loan-form-group">

                <label>
                  LOAN TYPE <span>*</span>
                </label>

                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  required
                >

                  <option value="Single Ledger">
                    Single Ledger
                  </option>

                  <option value="Multiple Ledger">
                    Multiple Ledger
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div>


              {/* PLAN */}

              <div className="group-loan-form-group">

                <label>
                  PLAN <span>*</span>
                </label>

                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Plan
                  </option>

                  <option value="NORMAL PLAN 12 EMI 36%">
                    NORMAL PLAN 12 EMI 36%
                  </option>

                  <option value="NORMAL PLAN 24 EMI 30%">
                    NORMAL PLAN 24 EMI 30%
                  </option>

                  <option value="MICRO LOAN PLAN">
                    MICRO LOAN PLAN
                  </option>

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="group-loan-form-group">

                <label>
                  DESCRIPTION <span>*</span>
                </label>

                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  required
                />

              </div>


              {/* MEMBER */}

              <div className="group-loan-form-group">

                <label>
                  MEMBER <span>*</span>
                </label>

                <select
                  name="member"
                  value={formData.member}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Member
                  </option>

                  <option value="DEEPAK">
                    DEEPAK
                  </option>

                  <option value="AKSHAY GARG">
                    AKSHAY GARG
                  </option>

                  <option value="KOYEL SARKAR">
                    KOYEL SARKAR
                  </option>

                </select>

              </div>


              {/* GUARANTOR */}

              <div className="group-loan-form-group">

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
                    DEEPAK
                  </option>

                  <option value="AKSHAY GARG">
                    AKSHAY GARG
                  </option>

                  <option value="KOYEL SARKAR">
                    KOYEL SARKAR
                  </option>

                </select>

              </div>


              {/* PENALTY SCHEME */}

              <div className="group-loan-form-group">

                <label>
                  SELECT PENALTY SCHEME
                </label>

                <select
                  name="penaltyScheme"
                  value={formData.penaltyScheme}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Penalty Scheme
                  </option>

                  <option value="NORMAL PENALTY">
                    NORMAL PENALTY
                  </option>

                  <option value="STANDARD PENALTY">
                    STANDARD PENALTY
                  </option>

                  <option value="MICRO PENALTY">
                    MICRO PENALTY
                  </option>

                </select>

              </div>


              {/* HIDE RATE */}

              <div className="group-loan-form-group">

                <label>
                  HIDE RATE OF INTEREST IN PRINT
                </label>

                <div className="group-loan-radio-group">

                  <label>

                    <input
                      type="radio"
                      name="hideRateInterest"
                      value="YES"
                      checked={
                        formData.hideRateInterest === "YES"
                      }
                      onChange={handleChange}
                    />

                    <span className="radio-yes">
                      ✓ YES
                    </span>

                  </label>


                  <label>

                    <input
                      type="radio"
                      name="hideRateInterest"
                      value="NO"
                      checked={
                        formData.hideRateInterest === "NO"
                      }
                      onChange={handleChange}
                    />

                    <span className="radio-no">
                      ✕ NO
                    </span>

                  </label>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FOOTER BUTTONS
          ================================================= */}

          <div className="group-loan-form-footer">

            <button
              type="button"
              className="group-loan-calculator-btn"
            >
              Calculator
            </button>

            <SaveButton type="submit">
              {isEdit ? "UPDATE" : "CREATE"}
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

export default GroupLoanForm;