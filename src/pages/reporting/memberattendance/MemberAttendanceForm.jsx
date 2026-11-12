import React, { useState } from "react";

import {
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import {
  validateRequired,
} from "../../../utils/validation";


const MemberAttendanceForm = ({
  filters,
  onGetRecord,
}) => {

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({

    branch: filters?.branch || "",

  });


  // =========================================================
  // ERROR STATE
  // =========================================================

  const [errors, setErrors] = useState({});


  // =========================================================
  // BRANCH DATA
  // =========================================================

  const branches = [

    "KOLKATA - DALHOUSIE",

    "BRANCH M FINANCE",

    "ADITYAPUR",

    "SHREEJA GROUP",

  ];


  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));


    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();


    const validationErrors = validateRequired(
      formData,
      [
        {
          name: "branch",
          label: "Branch",
        },
      ]
    );


    setErrors(validationErrors);


    if (Object.keys(validationErrors).length > 0) {
      return;
    }


    onGetRecord(formData);

  };


  // =========================================================
  // CLEAR BRANCH
  // =========================================================

  const clearBranch = () => {

    setFormData((previous) => ({
      ...previous,
      branch: "",
    }));


    setErrors((previous) => ({
      ...previous,
      branch: "",
    }));

  };


  return (

    <form
      className="member-attendance-filter-card"
      onSubmit={handleSubmit}
    >


      {/* =====================================================
          FILTER TITLE
      ===================================================== */}

      <div className="member-attendance-filter-title">

        FILTER BY

      </div>


      {/* =====================================================
          FILTER GRID
      ===================================================== */}

      <div className="member-attendance-filter-grid">


        {/* =================================================
            BRANCH
        ================================================= */}

        <div className="member-attendance-form-group">

          <label>
            BRANCH
          </label>


          <div className="member-attendance-select-wrapper">

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
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
                className="member-attendance-clear-btn"
                onClick={clearBranch}
              >

                <FaTimes />

              </button>

            )}


            <FaChevronDown
              className="member-attendance-select-arrow"
            />

          </div>


          {errors.branch && (

            <span className="member-attendance-error">
              {errors.branch}
            </span>

          )}

        </div>


      </div>


      {/* =====================================================
          BUTTON
      ===================================================== */}

      <div className="member-attendance-form-actions">

        <button
          type="submit"
          className="member-attendance-get-record-btn"
        >

          GET RECORD

        </button>

      </div>


    </form>

  );

};


export default MemberAttendanceForm;