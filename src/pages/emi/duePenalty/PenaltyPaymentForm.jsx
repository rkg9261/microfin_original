import React, { useState } from "react";

const PenaltyPaymentForm = ({
  data,
  onClose,
  onCreate,
}) => {

  const [formData, setFormData] = useState({
    ledgerAccount: "",
    paymentDate: new Date()
      .toISOString()
      .split("T")[0],
    paymentMode: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onCreate({
      ...formData,
      penaltyId: data.id,
      amount: data.amount,
    });

  };

  return (
    <div className="due-penalty-modal-overlay">

      <div className="due-penalty-payment-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="due-penalty-modal-header">

          <h2>
            PENALTY COLLECTION
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="due-penalty-modal-close"
          >
            ×
          </button>

        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <form onSubmit={handleSubmit}>

          <div className="due-penalty-modal-body">

            {/* CUSTOMER */}

            <div className="due-penalty-customer-section">

              <div className="due-penalty-profile">

                <div className="due-penalty-profile-circle">
                  👤
                </div>

              </div>

              <div className="due-penalty-customer-info">

                <h3>
                  {data.member}
                </h3>

                <p>
                  <strong>MOBILE</strong>
                  {" - "}
                  {data.mobile}
                </p>

                <p>
                  <strong>ADDRESS</strong>
                  {" - "}
                  NHJHJJH, MUKTSAR,
                  PINCODE - 152026
                </p>

                <p>
                  <strong>FATHER NAME</strong>
                  {" - "}
                  XGFXGB
                  {" "}
                  <strong>SPOUSE NAME</strong>
                  {" - "}
                  MMMJUHN
                </p>

              </div>

            </div>

            {/* FORM */}

            <div className="due-penalty-payment-grid">

              {/* LEDGER */}

              <div className="due-penalty-modal-field">

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

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="Bank">
                    Bank
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                </select>

              </div>

              {/* DATE */}

              <div className="due-penalty-modal-field">

                <label>
                  PAYMENT DATE <span>*</span>
                </label>

                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PAYMENT MODE */}

            <div className="due-penalty-modal-field payment-mode-field">

              <label>
                PAYMENT MODE <span>*</span>
              </label>

              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Payment Mode
                </option>

                <option value="Cash">
                  Cash
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Bank">
                  Bank Transfer
                </option>

              </select>

            </div>

            {/* BUTTONS */}

            <div className="due-penalty-modal-buttons">

              <button
                type="submit"
                className="due-penalty-create-btn"
              >
                CREATE
              </button>

              <button
                type="button"
                className="due-penalty-cancel-btn"
                onClick={onClose}
              >
                CANCEL
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default PenaltyPaymentForm;