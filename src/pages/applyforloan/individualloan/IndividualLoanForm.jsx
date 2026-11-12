import React, { useEffect, useState } from "react";

import SaveButton from "../../../components/buttons/SaveButton";
import CancelButton from "../../../components/buttons/CancelButton";
import CloseButton from "../../../components/buttons/CloseButton";

import "../../../components/common/CommonForm.css";
import "./IndividualLoan.css";

const IndividualLoanForm = ({
  loan,
  onClose,
  onSave,
}) => {

  const [formData, setFormData] = useState({

    branch: "",
    plan: "",
    branchCenter: "",
    description: "",
    staffId: "",
    guarantor: "",
    member: "",
    penaltyScheme: "",
    purpose: "",
    loanType: "single Ledger",
    hideRateInterest: "NO",

  });


  /* =====================================================
     EDIT DATA
  ===================================================== */

  useEffect(() => {

    if (loan) {

      setFormData({

        branch: loan.branchName || "",

        plan: loan.planName || "",

        branchCenter:
          loan.branchCenter || "",

        description:
          loan.description || "",

        staffId:
          loan.staff || "",

        guarantor:
          loan.guarantor || "",

        member:
          loan.member || "",

        penaltyScheme:
          loan.penaltyScheme || "",

        purpose:
          loan.purpose || "",

        loanType:
          loan.loanType || "single Ledger",

        hideRateInterest:
          loan.hideRateInterest || "NO",

      });

    }

  }, [loan]);


  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: loan?.id,
    });
  };


  return (

    <div className="individual-loan-modal-overlay">

      <div className="individual-loan-form-modal">

        {/* HEADER */}

        <div className="individual-loan-form-header">

          <h2>
            {loan
              ? "EDIT INDIVIDUAL LOAN"
              : "CREATE NEW LOAN"}
          </h2>

                     <CloseButton
                        onClick={onClose}/>
                    

        </div>


        {/* FORM */}

        <form
          className="individual-loan-form-body"
          onSubmit={handleSubmit}
        >

          <div className="individual-loan-form-grid">

            {/* LEFT */}

            <div>

              <label>
                BRANCH <span>*</span>
              </label>

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">
                  Select Branch
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

                <option value="MAIN BRANCH">
                  MAIN BRANCH
                </option>

              </select>


              <label>
                BRANCH CENTER (TYPE HERE)
              </label>

              <input
                name="branchCenter"
                value={formData.branchCenter}
                onChange={handleChange}
                placeholder="Select Branch Center"
              />


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
                  ADMIN
                </option>

                <option value="STAFF001">
                  STAFF001
                </option>

              </select>


              <label>
                MEMBER (TYPE HERE) <span>*</span>
              </label>

              <select
                name="member"
                value={formData.member}
                onChange={handleChange}
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

              </select>


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

                <option value="PERSONAL">
                  PERSONAL
                </option>

                <option value="BUSINESS">
                  BUSINESS
                </option>

                <option value="EDUCATION">
                  EDUCATION
                </option>

              </select>


              <label>
                LOAN TYPE <span>*</span>
              </label>

              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
              >
                <option value="single Ledger">
                  single Ledger
                </option>

                <option value="Multiple Ledger">
                  Multiple Ledger
                </option>

              </select>

            </div>


            {/* RIGHT */}

            <div>

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

                <option value="NORMAL PLAN 12 EMI 36%">
                  NORMAL PLAN 12 EMI 36%
                </option>

              </select>


              <label>
                DESCRIPTION <span>*</span>
              </label>

              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
              />


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

              </select>


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

                <option value="NORMAL">
                  NORMAL
                </option>

              </select>


              <label>
                HIDE RATE OF INTEREST IN PRINT
              </label>

              <div className="individual-loan-radio-group">

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

                  ✓ YES
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

                  ✕ NO
                </label>

              </div>

            </div>

          </div>


          {/* FOOTER */}

          <div className="individual-loan-form-footer">

            <SaveButton type="submit">
              {loan ? "UPDATE" : "CREATE"}
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

export default IndividualLoanForm;