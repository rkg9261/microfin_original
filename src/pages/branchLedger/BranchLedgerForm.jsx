import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const BranchLedgerForm = ({
  branches,
  onCreate,
  onCancel,
}) => {

  const [formData, setFormData] = useState({
    branch: "",
    ledger: "",
    description: "",
  });


  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = (e) => {

    e.preventDefault();


    if (!formData.branch) {
      alert("Please select branch name.");
      return;
    }


    if (!formData.ledger) {
      alert("Please select ledger name.");
      return;
    }


    onCreate(formData);

  };


  return (
    <div
      className="branch-ledger-modal-overlay"
      onClick={onCancel}
    >

      <div
        className="branch-ledger-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* ======================================
            MODAL HEADER
        ====================================== */}

        <div className="branch-ledger-modal-header">

          <h2>
            ADD NEW
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="branch-ledger-close"
          >
            <FaTimes />
          </button>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <form
          className="branch-ledger-form"
          onSubmit={handleSubmit}
        >

          <div className="branch-ledger-form-grid">


            {/* ==================================
                BRANCH NAME
            ================================== */}

            <div className="branch-ledger-form-field">

              <label>
                BRANCH NAME
                <span>*</span>
              </label>

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >

                <option value="">
                  Select Company Branch
                </option>

                {branches.map(
                  (branch) => (
                    <option
                      key={branch}
                      value={branch}
                    >
                      {branch}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* ==================================
                LEDGER NAME
            ================================== */}

            <div className="branch-ledger-form-field">

              <label>
                LEDGER NAME
                <span>*</span>
              </label>

              <select
                name="ledger"
                value={formData.ledger}
                onChange={handleChange}
              >

                <option value="">
                  Select Ledger
                </option>

                <option value="6000127240">
                  6000127240
                </option>

                <option value="DINESH 1">
                  DINESH 1
                </option>

                <option value="BRANCH AMAN KUMAR">
                  BRANCH AMAN KUMAR
                </option>

                <option value="BRANCH SALIWARA">
                  BRANCH SALIWARA
                </option>

                <option value="TDS">
                  TDS
                </option>

                <option value="MUKESH">
                  MUKESH
                </option>

                <option value="BRANCH SAHARANPUR">
                  BRANCH SAHARANPUR
                </option>

              </select>

            </div>


            {/* ==================================
                DESCRIPTION
            ================================== */}

            <div className="branch-ledger-form-field description-field">

              <label>
                DESCRIPTION
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder=""
              />

            </div>

          </div>


          {/* ======================================
              BUTTONS
          ====================================== */}

          <div className="branch-ledger-form-actions">

            <button
              type="submit"
              className="branch-ledger-create-btn"
            >
              CREATE
            </button>

            <button
              type="button"
              className="branch-ledger-cancel-btn"
              onClick={onCancel}
            >
              CANCEL
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default BranchLedgerForm;