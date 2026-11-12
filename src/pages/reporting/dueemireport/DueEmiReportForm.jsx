import React, { useState } from "react";



import {
  FaCalendarAlt,
  FaPaperPlane,
  FaPrint,
  FaTimes,
} from "react-icons/fa";

import { validateRequired } from "../../../utils/validation";

const DueEmiReportForm = ({
  filters,
  onGetRecord,
  onReset,
}) => {

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    date: filters?.date || "",
    branch: filters?.branch || "",
    designation: filters?.designation || "",
    staff: filters?.staff || "",
  });

  // =========================================================
  // ERROR STATE
  // =========================================================

  const [errors, setErrors] = useState({});

  // =========================================================
  // ENTRIES STATE
  // =========================================================



  // =========================================================
  // BRANCH DATA
  // =========================================================

  const branches = [
    "LASKARHAT",
    "SALINARA",
    "MAIN BRANCH",
    "DURGAPUR",
  ];

  // =========================================================
  // DESIGNATION DATA
  // =========================================================

  const designations = [
    "MANAGER",
    "FIELD OFFICER",
    "ACCOUNTANT",
    "COLLECTION OFFICER",
  ];

  // =========================================================
  // STAFF DATA
  // =========================================================

  const staffs = [
    "ADMIN",
    "RAHUL",
    "AMIT",
    "PRIYA",
  ];

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================================================
  // SELECT CHANGE
  // =========================================================

  const handleSelectChange = (name, value) => {

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================================================
  // GET RECORD
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    const requiredFields = [
      {
        name: "date",
        label: "Date",
      },
    ];

    const validationErrors =
      validateRequired(
        formData,
        requiredFields
      );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onGetRecord(formData);
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    setFormData({
      date: "",
      branch: "",
      designation: "",
      staff: "",
    });

    setErrors({});

    onReset();
  };

  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {

    window.print();

  };

  return (

    <form
      className="due-emi-report-form"
      onSubmit={handleSubmit}
    >

      {/* =====================================================
          FORM TITLE
      ===================================================== */}

      <div className="due-emi-report-form-title">

        <span>
          SEARCH BY
        </span>

      </div>


      {/* =====================================================
          FORM GRID
      ===================================================== */}

      <div className="due-emi-report-form-grid">

        {/* ===================================================
            DATE
        =================================================== */}

        <div className="due-emi-report-field">

          <label>
            DATE <span>*</span>
          </label>

          <div className="due-emi-report-input-wrapper">

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <FaCalendarAlt />

          </div>

          {errors.date && (

            <small className="due-emi-report-error">
              {errors.date}
            </small>

          )}

        </div>


        {/* ===================================================
            BRANCH
        =================================================== */}

        <div className="due-emi-report-field">

          <label>
            BRANCH
          </label>

          <div className="due-emi-report-select-wrapper">

            <select
              value={formData.branch}
              onChange={(e) =>
                handleSelectChange(
                  "branch",
                  e.target.value
                )
              }
            >

              <option value="">
                Select Branch
              </option>

              {branches.map((branch) => (

                <option
                  key={branch}
                  value={branch}
                >
                  {branch}
                </option>

              ))}

            </select>

            {formData.branch && (

              <button
                type="button"
                className="due-emi-report-clear-select"
                onClick={() =>
                  handleSelectChange(
                    "branch",
                    ""
                  )
                }
              >
                <FaTimes />
              </button>

            )}

          </div>

        </div>


        {/* ===================================================
            DESIGNATION
        =================================================== */}

        <div className="due-emi-report-field">

          <label>
            DESIGNATION
          </label>

          <div className="due-emi-report-select-wrapper">

            <select
              value={formData.designation}
              onChange={(e) =>
                handleSelectChange(
                  "designation",
                  e.target.value
                )
              }
            >

              <option value="">
                Select Designation
              </option>

              {designations.map((designation) => (

                <option
                  key={designation}
                  value={designation}
                >
                  {designation}
                </option>

              ))}

            </select>

            {formData.designation && (

              <button
                type="button"
                className="due-emi-report-clear-select"
                onClick={() =>
                  handleSelectChange(
                    "designation",
                    ""
                  )
                }
              >
                <FaTimes />
              </button>

            )}

          </div>

        </div>


        {/* ===================================================
            STAFF
        =================================================== */}

        <div className="due-emi-report-field">

          <label>
            STAFF
          </label>

          <div className="due-emi-report-select-wrapper">

            <select
              value={formData.staff}
              onChange={(e) =>
                handleSelectChange(
                  "staff",
                  e.target.value
                )
              }
            >

              <option value="">
                Select Staff
              </option>

              {staffs.map((staff) => (

                <option
                  key={staff}
                  value={staff}
                >
                  {staff}
                </option>

              ))}

            </select>

            {formData.staff && (

              <button
                type="button"
                className="due-emi-report-clear-select"
                onClick={() =>
                  handleSelectChange(
                    "staff",
                    ""
                  )
                }
              >
                <FaTimes />
              </button>

            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="due-emi-report-form-buttons">

        <button
          type="submit"
          className="due-emi-report-get-btn"
        >

          <FaPaperPlane />

          GET RECORD

        </button>


        <button
          type="button"
          className="due-emi-report-print-btn"
          onClick={handlePrint}
        >

          <FaPrint />

          GET PRINT

        </button>


        <button
          type="button"
          className="due-emi-report-reset-btn"
          onClick={handleReset}
        >

          RESET

        </button>

      </div>

    </form>

  );
};

export default DueEmiReportForm;