import React, { useState } from "react";

import { validateRequired } from "../../../utils/validation";

const CibilReportEquifaxForm = ({
  filters,
  onChange,
  onGetRecord,
  onReset,
}) => {

  // =========================================================
  // VALIDATION ERROR STATE
  // =========================================================

  const [errors, setErrors] = useState({});

  // =========================================================
  // GET RECORD
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    // -------------------------------------------------------
    // Required fields
    // -------------------------------------------------------

    const requiredFields = [
      {
        name: "status",
        label: "Status",
      },
    ];

    const validationErrors = validateRequired(
      filters,
      requiredFields
    );

    setErrors(validationErrors);

    // -------------------------------------------------------
    // STOP IF ERROR
    // -------------------------------------------------------

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // -------------------------------------------------------
    // SEND DATA TO PARENT
    // -------------------------------------------------------

    onGetRecord(filters);

  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    setErrors({});

    onReset();

  };

  // =========================================================
  // CLEAR FIELD
  // =========================================================

  const clearField = (fieldName) => {

    onChange({
      target: {
        name: fieldName,
        value: "",
      },
    });

  };

  // =========================================================
  // RETURN
  // =========================================================

  return (

    <form
      className="cibil-equifax-filter-card"
      onSubmit={handleSubmit}
    >

      {/* =====================================================
          FILTER TITLE
      ===================================================== */}

      <div className="cibil-equifax-filter-title">
        FILTER BY
      </div>


      <div className="cibil-equifax-filter-grid">


        {/* =================================================
            BRANCH
        ================================================= */}

        <div className="cibil-equifax-field">

          <label>
            BRANCH
          </label>

          <div className="cibil-equifax-select-wrapper">

            <select
              name="branch"
              value={filters.branch}
              onChange={onChange}
            >

              <option value="">
                Select Branch
              </option>

              <option value="KOLKATA - DALHOUSIE">
                KOLKATA - DALHOUSIE
              </option>

              <option value="BRANCH M FINANCE">
                BRANCH M FINANCE
              </option>

              <option value="ADITYAPUR">
                ADITYAPUR
              </option>

              <option value="SHREEJA GROUP">
                SHREEJA GROUP
              </option>

            </select>

            {filters.branch && (

              <button
                type="button"
                className="cibil-equifax-clear"
                onClick={() => clearField("branch")}
              >
                ×
              </button>

            )}

          </div>

        </div>


        {/* =================================================
            MEMBER
        ================================================= */}

        <div className="cibil-equifax-field">

          <label>
            MEMBER (TYPE HERE)
          </label>

          <div className="cibil-equifax-input-wrapper">

            <input
              type="text"
              name="member"
              value={filters.member}
              onChange={onChange}
              placeholder=""
            />

            {filters.member && (

              <button
                type="button"
                className="cibil-equifax-clear"
                onClick={() => clearField("member")}
              >
                ×
              </button>

            )}

          </div>

        </div>


        {/* =================================================
            STATUS
        ================================================= */}

        <div className="cibil-equifax-field">

          <label>
            STATUS
            <span className="required-star">*</span>
          </label>

          <select
            name="status"
            value={filters.status}
            onChange={onChange}
            className={
              errors.status
                ? "cibil-equifax-error-input"
                : ""
            }
          >

            <option value="">
              status
            </option>

            <option value="COMPLETED">
              COMPLETED
            </option>

            <option value="PENDING">
              PENDING
            </option>

          </select>

          {errors.status && (

            <span className="cibil-equifax-error">
              {errors.status}
            </span>

          )}

        </div>


        {/* =================================================
            DATE
        ================================================= */}

        <div className="cibil-equifax-field">

          <label>
            DATE
          </label>

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={onChange}
          />

        </div>


        {/* =================================================
            START DATE
        ================================================= */}

        <div className="cibil-equifax-field">

          <label>
            START DATE
          </label>

          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onChange}
          />

        </div>


        {/* =================================================
            END DATE
        ================================================= */}

        <div className="cibil-equifax-field">

          <label>
            END DATE
          </label>

          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onChange}
          />

        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="cibil-equifax-button-area">

          <button
            type="submit"
            className="cibil-equifax-get-button"
          >

            <span className="cibil-equifax-send-icon">
              ➤
            </span>

            GET RECORD

          </button>


          <button
            type="button"
            className="cibil-equifax-reset-button"
            onClick={handleReset}
          >
            RESET
          </button>

        </div>

      </div>

    </form>

  );

};

export default CibilReportEquifaxForm;