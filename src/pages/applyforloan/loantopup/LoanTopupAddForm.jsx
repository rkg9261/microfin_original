import React, { useState } from "react";

import SaveButton from "../../../components/buttons/SaveButton";
import CancelButton from "../../../components/buttons/CancelButton";
import CloseButton from "../../../components/buttons/CloseButton";

import "../../../components/common/CommonForm.css";
import "./LoanTopup.css";

const LoanTopupAddForm = ({
  onClose,
  onCreate,
}) => {

  const [formData, setFormData] = useState({
    branch: "",
    member: "",
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


    if (!formData.branch) {

      alert("Please select branch");

      return;

    }


    if (!formData.member) {

      alert("Please select member");

      return;

    }


    onCreate(formData);

  };


  return (
    <div className="common-modal-overlay">

      <div className="common-modal loan-topup-add-modal">

        {/* HEADER */}

        <div className="common-modal-header">

          <h2>
            ADD NEW
          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* FORM */}

        <form
          className="common-form"
          onSubmit={handleSubmit}
        >

          <div className="common-form-grid">

            {/* =================================================
                BRANCH
            ================================================= */}

            <div className="common-form-group">

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
                  SHREEJA GROUP (BRI)
                </option>

                <option value="BRANCH M FINANCE">
                  BRANCH M FINANCE (AM5)
                </option>

                <option value="BRANCH A">
                  BRANCH A
                </option>

              </select>

            </div>


            {/* =================================================
                MEMBER
            ================================================= */}

            <div className="common-form-group">

              <label>
                MEMBER <span>*</span>
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
                  DEEPAK (BRIAMSMEM32)
                </option>

                <option value="AKSHAY GARG">
                  AKSHAY GARG (BRI018)
                </option>

                <option value="KOYEL SARKAR">
                  KOYEL SARKAR (BRIZMM011)
                </option>

              </select>

            </div>

          </div>


          {/* BUTTONS */}

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

export default LoanTopupAddForm;