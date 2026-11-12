import React, {
  useEffect,
  useState,
} from "react";

import {
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import "./Payment.css";

import "../../../../components/common/CommonForm.css";

import {
  CancelButton,
  CloseButton,
  SaveButton,
} from "../../../../components/buttons";


const PaymentForm = ({
  voucherType = "Payment",
}) => {


  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] =
    useState({

      branch: "",

      voucherType:
        voucherType,

      creditAccount: "",

      narration: "",

    });


  // =========================================================
  // UPDATE VOUCHER TYPE
  // =========================================================

  useEffect(() => {

    setFormData((prev) => ({

      ...prev,

      voucherType:
        voucherType,

    }));

  }, [voucherType]);


  // =========================================================
  // CREDIT BALANCE
  // =========================================================

  const [
    creditBalance,
    setCreditBalance,
  ] = useState("0.00");


  // =========================================================
  // LEDGER LIST
  // =========================================================

  const [
    ledgerList,
    setLedgerList,
  ] = useState([

    {
      id: 1,

      ledger: "CASH",

      openingBalance: 25000,
    },

    {
      id: 2,

      ledger: "BANK",

      openingBalance: 75000,
    },

    {
      id: 3,

      ledger: "HDFC BANK",

      openingBalance: 125000,
    },

  ]);


  // =========================================================
  // DR ACCOUNTS
  // =========================================================

  const [
    drAccounts,
    setDrAccounts,
  ] = useState([

    {
      id: 1,

      account: "",

      amount: "",
    },

  ]);


  // =========================================================
  // LEDGER MODAL
  // =========================================================

  const [
    showLedgerModal,
    setShowLedgerModal,
  ] = useState(false);


  // =========================================================
  // LEDGER FORM
  // =========================================================

  const [
    ledgerForm,
    setLedgerForm,
  ] = useState({

    ledger: "",

    openingBalance: "",

    alias: "",

    status: "",

    group: "",

  });


  // =========================================================
  // FORM CHANGE
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
  // CREDIT ACCOUNT
  // =========================================================

  const handleCreditAccount = (e) => {

    const value =
      e.target.value;


    setFormData((prev) => ({

      ...prev,

      creditAccount:
        value,

    }));


    const selectedLedger =
      ledgerList.find(
        (item) =>
          item.ledger === value
      );


    if (selectedLedger) {

      setCreditBalance(

        Number(
          selectedLedger.openingBalance
        ).toLocaleString(
          "en-IN",
          {
            minimumFractionDigits: 2,

            maximumFractionDigits: 2,
          }
        )

      );

    } else {

      setCreditBalance(
        "0.00"
      );

    }

  };


  // =========================================================
  // DR ACCOUNT CHANGE
  // =========================================================

  const handleDrAccountChange = (
    id,
    value
  ) => {

    setDrAccounts(
      (prev) =>

        prev.map(
          (item) =>

            item.id === id

              ? {
                  ...item,

                  account:
                    value,
                }

              : item
        )
    );

  };


  // =========================================================
  // AMOUNT CHANGE
  // =========================================================

  const handleAmountChange = (
    id,
    value
  ) => {

    setDrAccounts(
      (prev) =>

        prev.map(
          (item) =>

            item.id === id

              ? {
                  ...item,

                  amount:
                    value,
                }

              : item
        )
    );

  };


  // =========================================================
  // ADD DR ACCOUNT
  // =========================================================

  const addDrAccount = () => {

    setDrAccounts(
      (prev) => [

        ...prev,

        {
          id: Date.now(),

          account: "",

          amount: "",
        },

      ]
    );

  };


  // =========================================================
  // REMOVE DR ACCOUNT
  // =========================================================

  const removeDrAccount = (
    id
  ) => {

    if (
      drAccounts.length === 1
    ) {

      return;

    }


    setDrAccounts(
      (prev) =>

        prev.filter(
          (item) =>
            item.id !== id
        )
    );

  };


  // =========================================================
  // TOTAL AMOUNT
  // =========================================================

  const totalAmount =
    drAccounts.reduce(

      (total, item) => {

        return (
          total +
          Number(
            item.amount || 0
          )
        );

      },

      0

    );


  // =========================================================
  // LEDGER FORM CHANGE
  // =========================================================

  const handleLedgerChange = (
    e
  ) => {

    const {
      name,
      value,
    } = e.target;


    setLedgerForm(
      (prev) => ({

        ...prev,

        [name]:
          value,

      })
    );

  };


  // =========================================================
  // SAVE LEDGER
  // =========================================================

  const handleSaveLedger = (
    e
  ) => {

    e.preventDefault();


    if (
      !ledgerForm.ledger.trim()
    ) {

      alert(
        "Please enter Ledger."
      );

      return;

    }


    const newLedger = {

      id: Date.now(),

      ledger:
        ledgerForm.ledger,

      openingBalance:
        Number(
          ledgerForm.openingBalance ||
            0
        ),

      alias:
        ledgerForm.alias,

      status:
        ledgerForm.status,

      group:
        ledgerForm.group,

    };


    setLedgerList(
      (prev) => [

        ...prev,

        newLedger,

      ]
    );


    setLedgerForm({

      ledger: "",

      openingBalance: "",

      alias: "",

      status: "",

      group: "",

    });


    setShowLedgerModal(
      false
    );

  };


  // =========================================================
  // SAVE VOUCHER
  // =========================================================

  const handleSave = () => {

    const voucherData = {

      ...formData,

      voucherType:
        voucherType,

      drAccounts:

        drAccounts,

      totalAmount:

        totalAmount,

    };


    console.log(
      `${voucherType.toUpperCase()} DATA:`,
      voucherData
    );


    alert(
      `${voucherType} voucher saved successfully!`
    );

  };


  // =========================================================
  // CLOSE LEDGER MODAL
  // =========================================================

  const closeLedgerModal = () => {

    setShowLedgerModal(
      false
    );

  };


  return (

    <>

      {/* =====================================================
          ACCOUNTING VOUCHER
      ===================================================== */}

      <div
        className="payment-form-container"
        data-voucher-type={
          voucherType
        }
      >


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="payment-form-header">

          <span>
            ACCOUNTING VOUCHER CREATION
          </span>

          <span>
            MICRO FINANCE ASSOCIATION LIMITED
          </span>

        </div>


        {/* ===================================================
            BASIC INFORMATION
        =================================================== */}

        <div className="payment-basic-section">


          {/* BRANCH */}

          <div className="payment-field">

            <label>

              BRANCH

              <span>*</span>

            </label>


            <select
              name="branch"
              value={
                formData.branch
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select Branch
              </option>

              <option value="MAIN BRANCH">
                MAIN BRANCH
              </option>

              <option value="BRANCH 01">
                BRANCH 01
              </option>

              <option value="BRANCH 02">
                BRANCH 02
              </option>

            </select>

          </div>


          {/* VOUCHER TYPE */}

          <div className="payment-field">

            <label>

              VOUCHERTYPE

              <span>*</span>

            </label>


            <select
              name="voucherType"
              value={
                voucherType
              }
              disabled
            >

              <option value="Payment">
                Payment
              </option>

              <option value="Receipt">
                Receipt
              </option>

              <option value="Contra">
                Contra
              </option>

              <option value="Journal">
                Journal
              </option>

            </select>

          </div>


          {/* CREDIT ACCOUNT */}

          <div className="payment-field">

            <label>

              CR. ACCOUNT

              <span>*</span>

            </label>


            <select
              value={
                formData.creditAccount
              }
              onChange={
                handleCreditAccount
              }
            >

              <option value="">
                Select Credit Account
              </option>


              {ledgerList.map(
                (item) => (

                  <option
                    key={item.id}
                    value={
                      item.ledger
                    }
                  >

                    {item.ledger}

                  </option>

                )
              )}

            </select>


            <small>

              CUR BAL: CR{" "}

              {creditBalance}

            </small>

          </div>

        </div>


        {/* ===================================================
            DR ACCOUNT
        =================================================== */}

        <div className="payment-dr-section">


          {/* LEDGER */}

          <button
            type="button"
            className="payment-ledger-btn"
            onClick={() =>
              setShowLedgerModal(
                true
              )
            }
          >

            <FaPlus />

            Ledger

          </button>


          {/* TITLE */}

          <div className="payment-dr-title">

            DR. ACCOUNT

            <span>*</span>

          </div>


          {/* LIST */}

          <div className="payment-dr-list">


            {drAccounts.map(
              (
                item,
                index
              ) => (

                <div
                  className="payment-dr-row"
                  key={
                    item.id
                  }
                >


                  {/* ACCOUNT */}

                  <select
                    value={
                      item.account
                    }
                    onChange={
                      (e) =>
                        handleDrAccountChange(
                          item.id,
                          e.target.value
                        )
                    }
                  >

                    <option value="">
                      Select Debit Account
                    </option>


                    {ledgerList.map(
                      (ledger) => (

                        <option
                          key={
                            ledger.id
                          }
                          value={
                            ledger.ledger
                          }
                        >

                          {
                            ledger.ledger
                          }

                        </option>

                      )
                    )}

                  </select>


                  {/* AMOUNT */}

                  <input
                    type="number"
                    placeholder="AMT"
                    value={
                      item.amount
                    }
                    onChange={
                      (e) =>
                        handleAmountChange(
                          item.id,
                          e.target.value
                        )
                    }
                  />


                  {/* REMOVE */}

                  {index > 0 && (

                    <button
                      type="button"
                      className="payment-remove-row"
                      onClick={() =>
                        removeDrAccount(
                          item.id
                        )
                      }
                      title="Remove"
                    >

                      <CloseButton />

                    </button>

                  )}

                </div>

              )
            )}

          </div>


          {/* ADD */}

          <button
            type="button"
            className="payment-add-row"
            onClick={
              addDrAccount
            }
            title="Add Account"
          >

            <FaPlus />

          </button>

        </div>


        {/* ===================================================
            PARTICULAR
        =================================================== */}

        <div className="payment-particular-section">


          <div className="payment-particular-title">

            PARTICULAR

          </div>


          <div className="payment-total-box">

            <div>
              AMOUNT (DR)
            </div>


            <strong>

              {totalAmount.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,

                  maximumFractionDigits: 2,
                }
              )}

            </strong>


            <div className="payment-total-line"></div>


            <div>

              TOTAL:{" "}

              {totalAmount.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,

                  maximumFractionDigits: 2,
                }
              )}

            </div>

          </div>

        </div>


        {/* ===================================================
            NARRATION
        =================================================== */}

        <div className="payment-narration">

          <label>
            NARRATION
          </label>


          <textarea
            name="narration"
            value={
              formData.narration
            }
            onChange={
              handleChange
            }
            placeholder="Enter narration"
          />

        </div>


        {/* ===================================================
            SAVE
        =================================================== */}

        <div className="payment-save-container">

          <button
            type="button"
            className="payment-save-btn"
            onClick={
              handleSave
            }
          >

            <SaveButton />

          </button>

        </div>

      </div>


      {/* =====================================================
          LEDGER MODAL
      ===================================================== */}

      {showLedgerModal && (

        <div
          className="common-modal"
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {

              closeLedgerModal();

            }

          }}
        >

          <div className="common-modal-content">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="common-modal-header">

              <h2>
                ADD NEW LEDGER
              </h2>


              <button
                type="button"
                className="ledger-modal-close"
                onClick={
                  closeLedgerModal
                }
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <form
              className="common-form"
              onSubmit={
                handleSaveLedger
              }
            >

              <div className="common-form-grid">


                {/* LEDGER */}

                <div className="common-form-group">

                  <label>

                    LEDGER

                    <span>*</span>

                  </label>


                  <input
                    type="text"
                    name="ledger"
                    value={
                      ledgerForm.ledger
                    }
                    onChange={
                      handleLedgerChange
                    }
                    placeholder="Enter Ledger"
                  />

                </div>


                {/* OPENING BALANCE */}

                <div className="common-form-group">

                  <label>
                    OPENING BALANCE
                  </label>


                  <input
                    type="number"
                    name="openingBalance"
                    value={
                      ledgerForm.openingBalance
                    }
                    onChange={
                      handleLedgerChange
                    }
                    placeholder="Enter Opening Balance"
                  />

                </div>


                {/* ALIAS */}

                <div className="common-form-group">

                  <label>
                    ALIAS
                  </label>


                  <input
                    type="text"
                    name="alias"
                    value={
                      ledgerForm.alias
                    }
                    onChange={
                      handleLedgerChange
                    }
                    placeholder="Enter Alias"
                  />

                </div>


                {/* STATUS */}

                <div className="common-form-group">

                  <label>
                    STATUS
                  </label>


                  <select
                    name="status"
                    value={
                      ledgerForm.status
                    }
                    onChange={
                      handleLedgerChange
                    }
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


                {/* GROUP */}

                <div className="common-form-group">

                  <label>
                    GROUP
                  </label>


                  <select
                    name="group"
                    value={
                      ledgerForm.group
                    }
                    onChange={
                      handleLedgerChange
                    }
                  >

                    <option value="">
                      Select Group
                    </option>

                    <option value="Current Assets">
                      Current Assets
                    </option>

                    <option value="Fixed Assets">
                      Fixed Assets
                    </option>

                    <option value="Current Liabilities">
                      Current Liabilities
                    </option>

                    <option value="Capital Account">
                      Capital Account
                    </option>

                    <option value="Direct Expenses">
                      Direct Expenses
                    </option>

                    <option value="Indirect Expenses">
                      Indirect Expenses
                    </option>

                    <option value="Income">
                      Income
                    </option>

                  </select>

                </div>

              </div>


              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="common-form-buttons">


                <button
                  type="submit"
                  className="ledger-save-btn"
                >

                  <SaveButton />

                </button>


                <button
                  type="button"
                  className="ledger-cancel-btn"
                  onClick={
                    closeLedgerModal
                  }
                >

                  <CancelButton />

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>

  );

};


export default PaymentForm;