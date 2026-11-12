import React, { useState } from "react";

import SaveButton from "../../../components/buttons/SaveButton";

const PaymentCollectionForm = ({
  member,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    amount: member.currentDue,

    headOfficeCollection: "No",

    ledgerAccount: "Cash",

    paymentDate:
      new Date().toISOString().split("T")[0],

    attendance: "Present",

    remark: "",
  });

  const handleChange = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <div
      className="group-emi-modal-overlay"
      onClick={onClose}
    >

      <div
        className="group-emi-payment-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* MODAL HEADER */}

        <div className="group-emi-modal-header">

          <h2>
            PAYMENT COLLECTION
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="group-emi-modal-close"
          >
            ×
          </button>

        </div>

        <div className="group-emi-modal-body">

          {/* LEFT FORM */}

          <form
            className="group-emi-payment-form"
            onSubmit={handleSubmit}
          >

            {/* AMOUNT */}

            <div className="group-emi-payment-field">

              <label>
                AMOUNT <span>*</span>
              </label>

              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  handleChange(
                    "amount",
                    e.target.value
                  )
                }
              />

            </div>

            {/* HEAD OFFICE */}

            <div className="group-emi-payment-field">

              <label>
                HEADOFFICE COLLECTION
                <span>*</span>
              </label>

              <select
                value={
                  formData.headOfficeCollection
                }
                onChange={(e) =>
                  handleChange(
                    "headOfficeCollection",
                    e.target.value
                  )
                }
              >
                <option value="No">
                  No
                </option>

                <option value="Yes">
                  Yes
                </option>
              </select>

            </div>

            {/* LEDGER */}

            <div className="group-emi-payment-field">

              <label>
                SELECT LEDGER ACCOUNT
              </label>

              <select
                value={formData.ledgerAccount}
                onChange={(e) =>
                  handleChange(
                    "ledgerAccount",
                    e.target.value
                  )
                }
              >
                <option value="Cash">
                  Cash
                </option>

                <option value="Bank A/C">
                  Bank A/C
                </option>

                <option value="UPI">
                  UPI
                </option>
              </select>

            </div>

            {/* PAYMENT DATE */}

            <div className="group-emi-payment-field">

              <label>
                PAYMENT DATE <span>*</span>
              </label>

              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) =>
                  handleChange(
                    "paymentDate",
                    e.target.value
                  )
                }
              />

            </div>

            {/* ATTENDANCE */}

            <div className="group-emi-payment-field">

              <label>
                ATTENDANCE <span>*</span>
              </label>

              <select
                value={formData.attendance}
                onChange={(e) =>
                  handleChange(
                    "attendance",
                    e.target.value
                  )
                }
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>

            </div>

            {/* REMARK */}

            <div className="group-emi-payment-field">

              <label>
                REMARK
              </label>

              <textarea
                value={formData.remark}
                onChange={(e) =>
                  handleChange(
                    "remark",
                    e.target.value
                  )
                }
                rows="4"
              />

            </div>

            {/* BUTTONS */}

            <div className="group-emi-payment-buttons">

              <SaveButton
                type="submit"
              />

              <button
                type="button"
                className="group-emi-cancel-button"
                onClick={onClose}
              >
                CANCEL
              </button>

            </div>

          </form>

          {/* RIGHT CUSTOMER DETAILS */}

          <div className="group-emi-customer-section">

            <h3>
              📣 CUSTOMER DETAILS
            </h3>

            <div className="group-emi-profile-image">
              USER PROFILE PICTURE
            </div>

            <div className="group-emi-customer-card">

              <label>
                MEMBER
              </label>

              <strong>
                {member.memberName}
              </strong>

              <label>
                MOBILE NO
              </label>

              <strong>
                {member.mobile}
              </strong>

              <label>
                ADDRESS
              </label>

              <strong>
                THYRUHRYUIH
              </strong>

            </div>

            <div className="group-emi-group-card">

              <label>
                GROUP
              </label>

              <strong>
                {member.group}
              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentCollectionForm;