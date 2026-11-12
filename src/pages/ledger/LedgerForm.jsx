import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const LedgerForm = ({
  ledger,
  onSave,
  onCancel,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    group: "",
    status: "",
  });


  // ============================================
  // LOAD DATA FOR UPDATE
  // ============================================

  useEffect(() => {

    if (ledger) {

      setFormData({
        name: ledger.name || "",
        alias: ledger.alias || "",
        group: ledger.group || "",
        status: ledger.status || "",
      });

    } else {

      setFormData({
        name: "",
        alias: "",
        group: "",
        status: "",
      });

    }

  }, [ledger]);


  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = (event) => {

    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter ledger name.");
      return;
    }

    if (!formData.alias.trim()) {
      alert("Please enter alias.");
      return;
    }

    if (!formData.group) {
      alert("Please select group.");
      return;
    }

    if (!formData.status) {
      alert("Please select status.");
      return;
    }

    onSave(formData);
  };


  return (
    <div
      className="ledger-modal-overlay"
      onClick={onCancel}
    >

      <div
        className="ledger-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ======================================
            MODAL HEADER
        ====================================== */}

        <div className="ledger-modal-header">

          <h2>
            {ledger
              ? "UPDATE"
              : "ADD NEW"}
          </h2>

          <button
            type="button"
            className="ledger-close-button"
            onClick={onCancel}
          >
            <FaTimes />
          </button>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <form
          className="ledger-form"
          onSubmit={handleSubmit}
        >

          <div className="ledger-form-grid">


            {/* ==================================
                LEDGER
            ================================== */}

            <div className="ledger-form-field">

              <label>
                LEDGER <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
              />

            </div>


            {/* ==================================
                GROUP
            ================================== */}

            <div className="ledger-form-field">

              <label>
                GROUP <span>*</span>
              </label>

              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
              >

                <option value="">
                  Select Group
                </option>

                <option value="LOAN (LIABILITY)">
                  Loan (Liability)
                </option>

                <option value="SUNDERY CREDITOR">
                  Sundery Creditor
                </option>

                <option value="SUNDERY DEBTORS">
                  Sundery Debtors
                </option>

                <option value="BANK A/C">
                  Bank A/C
                </option>

                <option value="CASH IN HAND">
                  Cash In Hand
                </option>

                <option value="INDIRECT EXPENSE">
                  Indirect Expense
                </option>

                <option value="P C L">
                  P C L
                </option>

                <option value="SALES ACCOUNT">
                  Sales Account
                </option>

              </select>

            </div>


            {/* ==================================
                ALIAS
            ================================== */}

            <div className="ledger-form-field">

              <label>
                ALIAS <span>*</span>
              </label>

              <input
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                placeholder=""
              />

            </div>


            {/* ==================================
                STATUS
            ================================== */}

            <div className="ledger-form-field">

              <label>
                SELECT STATUS <span>*</span>
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="">
                  Select Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

          </div>


          {/* ======================================
              BUTTONS
          ====================================== */}

          <div className="ledger-form-actions">

            <button
              type="submit"
              className="ledger-save-button"
            >
              {ledger
                ? "UPDATE"
                : "CREATE"}
            </button>

            <button
              type="button"
              className="ledger-cancel-button"
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

export default LedgerForm;