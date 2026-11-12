import React, { useState } from "react";

const PenaltyWaiveForm = ({
  data,
  onClose,
  onCreate,
}) => {

  const [formData, setFormData] = useState({
    waivedAmount: data.amount || "",
    waivedDate: new Date()
      .toISOString()
      .split("T")[0],
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
    });

  };

  return (
    <div className="due-penalty-modal-overlay">

      <div className="due-penalty-waive-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="due-penalty-modal-header">

          <h2>
            PENALTY WAIVED OFF
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="due-penalty-modal-close"
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="due-penalty-modal-body">

            {/* CUSTOMER INFORMATION */}

            <div className="due-penalty-waive-customer">

              <div className="due-penalty-profile">

                <div className="due-penalty-profile-circle">
                  👤
                </div>

              </div>

              <div className="due-penalty-waive-info">

                <h3>
                  {data.member}
                </h3>

                <p>
                  <strong>MOBILE</strong>
                  {" - "}
                  {data.mobile}
                </p>

                <p>
                  <strong>AADHARNNO</strong>
                  {" - "}
                  123456781258
                </p>

                <p>
                  <strong>PANCARDNO</strong>
                  {" - "}
                  EDYND4568T
                </p>

                <p>
                  <strong>ADDRESS</strong>
                  {" - "}
                  JAIPUR, JAIPUR, JAIPUR,
                  PINCODE - 144002
                </p>

                <p>
                  <strong>FATHER NAME</strong>
                  {" - "}
                  NA
                  {" "}
                  <strong>SPOUSE NAME</strong>
                  {" - "}
                  NA
                </p>

              </div>

            </div>

            {/* FORM */}

            <div className="due-penalty-waive-grid">

              {/* WAIVED AMOUNT */}

              <div className="due-penalty-modal-field">

                <label>
                  WAIVED AMT <span>*</span>
                </label>

                <input
                  type="number"
                  name="waivedAmount"
                  value={formData.waivedAmount}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* WAIVED DATE */}

              <div className="due-penalty-modal-field">

                <label>
                  WAIVED DATE <span>*</span>
                </label>

                <input
                  type="date"
                  name="waivedDate"
                  value={formData.waivedDate}
                  onChange={handleChange}
                  required
                />

              </div>

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

export default PenaltyWaiveForm;