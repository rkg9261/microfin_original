import React, { useEffect, useState } from "react";

const AccFundTransferForm = ({
  onSave,
  editingTransfer,
  onCancelEdit,
}) => {
  const getToday = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const initialState = {
    paymentType: "cash",
    fromBranch: "",
    fromBranchLedger: "",
    amount: "",
    date: getToday(),
    toBranch: "",
    toBranchLedger: "",
    narration: "",
  };

  const [formData, setFormData] =
    useState(initialState);

  // =========================================================
  // EDIT DATA
  // =========================================================

  useEffect(() => {
    if (editingTransfer) {
      setFormData({
        paymentType:
          editingTransfer.ledger === "BANK A/C"
            ? "bank"
            : "cash",

        fromBranch:
          editingTransfer.fromBranch || "",

        fromBranchLedger:
          editingTransfer.ledger || "",

        amount:
          editingTransfer.amount || "",

        date: editingTransfer.date
          ? convertDateToInput(
              editingTransfer.date
            )
          : getToday(),

        toBranch:
          editingTransfer.toBranch || "",

        toBranchLedger:
          editingTransfer.toBranchLedger || "",

        narration:
          editingTransfer.narration || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingTransfer]);

  // =========================================================
  // DATE CONVERTER
  // =========================================================

  const convertDateToInput = (dateString) => {
    if (!dateString) {
      return getToday();
    }

    const parts = dateString.split("-");

    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    return dateString;
  };

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
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fromBranch) {
      alert("Please select From Branch.");
      return;
    }

    if (!formData.fromBranchLedger) {
      alert(
        "Please select From Branch Ledger."
      );
      return;
    }

    if (!formData.amount) {
      alert("Please enter Amount.");
      return;
    }

    if (!formData.toBranch) {
      alert("Please select To Branch.");
      return;
    }

    if (!formData.toBranchLedger) {
      alert(
        "Please select To Branch Ledger."
      );
      return;
    }

    onSave(formData);

    if (!editingTransfer) {
      setFormData(initialState);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setFormData(initialState);

    if (editingTransfer) {
      onCancelEdit();
    }
  };

  return (
    <div className="fund-transfer-form-card">

      {/* =====================================================
          GREEN TITLE BAR
      ===================================================== */}

      <div className="fund-transfer-form-title">

        <span>
          BRANCH TO BRANCH FUND TRANSFER
        </span>

        <strong>
          UMANG MICRO FINANCE ASSOCIATION LIMITED
        </strong>

      </div>

      <form onSubmit={handleSubmit}>

        {/* =====================================================
            PAYMENT TYPE
        ===================================================== */}

        <div className="fund-transfer-payment-type">

          <label>
            PAYMENT TYPE
          </label>

          <label className="fund-transfer-radio">

            <input
              type="radio"
              name="paymentType"
              value="cash"
              checked={
                formData.paymentType === "cash"
              }
              onChange={handleChange}
            />

            <span>
              CASH
            </span>

          </label>

          <label className="fund-transfer-radio">

            <input
              type="radio"
              name="paymentType"
              value="bank"
              checked={
                formData.paymentType === "bank"
              }
              onChange={handleChange}
            />

            <span>
              BANK
            </span>

          </label>

        </div>

        {/* =====================================================
            MAIN FORM
        ===================================================== */}

        <div className="fund-transfer-main-grid">

          {/* LEFT SIDE */}

          <div className="fund-transfer-left">

            {/* FROM BRANCH */}

            <div className="fund-transfer-row">

              <label>
                FROM BRANCH <span>*</span>
              </label>

              <select
                name="fromBranch"
                value={formData.fromBranch}
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

                <option value="KALITAKUCHI">
                  KALITAKUCHI
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

              </select>

            </div>

            {/* FROM BRANCH LEDGER */}

            <div className="fund-transfer-row">

              <label>
                FROM BRANCH LEDGER <span>*</span>
              </label>

              <select
                name="fromBranchLedger"
                value={
                  formData.fromBranchLedger
                }
                onChange={handleChange}
              >

                <option value="">
                  Select Ledger
                </option>

                <option value="CASH">
                  CASH
                </option>

                <option value="BANK A/C">
                  BANK A/C
                </option>

                <option value="AJAY">
                  AJAY
                </option>

              </select>

            </div>

            {/* AMOUNT */}

            <div className="fund-transfer-row">

              <label>
                AMT <span>*</span>
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter Amount"
              />

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="fund-transfer-right">

            {/* DATE */}

            <div className="fund-transfer-row">

              <label>
                DATE <span>*</span>
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

            </div>

            {/* TO BRANCH */}

            <div className="fund-transfer-row">

              <label>
                TO BRANCH <span>*</span>
              </label>

              <select
                name="toBranch"
                value={formData.toBranch}
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

                <option value="KALITAKUCHI">
                  KALITAKUCHI
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

              </select>

            </div>

            {/* TO BRANCH LEDGER */}

            <div className="fund-transfer-row">

              <label>
                TO BRANCH LEDGER <span>*</span>
              </label>

              <select
                name="toBranchLedger"
                value={
                  formData.toBranchLedger
                }
                onChange={handleChange}
              >

                <option value="">
                  Select Ledger
                </option>

                <option value="CASH">
                  CASH
                </option>

                <option value="BANK A/C">
                  BANK A/C
                </option>

                <option value="AJAY">
                  AJAY
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* =====================================================
            NARRATION
        ===================================================== */}

        <div className="fund-transfer-narration">

          <label>
            NARRATION
          </label>

          <textarea
            name="narration"
            value={formData.narration}
            onChange={handleChange}
            placeholder="Enter narration"
            rows="3"
          />

        </div>

        {/* =====================================================
            BUTTONS
        ===================================================== */}

        <div className="fund-transfer-form-actions">

          {editingTransfer && (
            <button
              type="button"
              className="fund-transfer-cancel-btn"
              onClick={handleReset}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="fund-transfer-save-btn"
          >
            💾 {editingTransfer ? "Update" : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AccFundTransferForm;