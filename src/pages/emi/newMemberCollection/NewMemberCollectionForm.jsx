import React, { useState } from "react";

const NewMemberCollectionForm = ({ onSearch }) => {

  const [formData, setFormData] = useState({
    branch: "",
    member: "",
    applicationNumber: "",
    date: "",
    status: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSearch(formData);

  };

  const handleReset = () => {

    setFormData({
      branch: "",
      member: "",
      applicationNumber: "",
      date: "",
      status: "",
    });

  };

  return (
    <div className="new-member-search-card">

      {/* SEARCH HEADER */}
      <div className="new-member-search-header">
        <span>SEARCH BY</span>
      </div>

      {/* FORM */}
      <form
        className="new-member-search-form"
        onSubmit={handleSubmit}
      >

        {/* BRANCH */}
        <div className="new-member-field">

          <label>
            BRANCH
          </label>

          <div className="new-member-select-box">

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >

              <option value="">
                Select Branch
              </option>

              <option value="Kolkata">
                Kolkata
              </option>

              <option value="Laskarthat">
                Laskarthat
              </option>

              <option value="Jagatpura">
                Jagatpura
              </option>

              <option value="Delhi">
                Delhi
              </option>

            </select>

            <span className="new-member-select-icon">
              ▼
            </span>

          </div>

        </div>

        {/* MEMBER */}
        <div className="new-member-field">

          <label>
            MEMBER (TYPE HERE)
          </label>

          <div className="new-member-select-box">

            <select
              name="member"
              value={formData.member}
              onChange={handleChange}
            >

              <option value="">
                Select Member
              </option>

              <option value="Sangita Balu Khare">
                Sangita Balu Khare
              </option>

              <option value="Priya Sharma">
                Priya Sharma
              </option>

              <option value="Ramesh Kumar">
                Ramesh Kumar
              </option>

            </select>

            <span className="new-member-select-icon">
              ▼
            </span>

          </div>

        </div>

        {/* APPLICATION NUMBER */}
        <div className="new-member-field">

          <label>
            APPLICATION NUMBER
          </label>

          <input
            type="text"
            name="applicationNumber"
            value={formData.applicationNumber}
            onChange={handleChange}
            placeholder="Application Number"
          />

        </div>

        {/* DATE */}
        <div className="new-member-field">

          <label>
            DATE
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

        </div>

        {/* STATUS */}
        <div className="new-member-field">

          <label>
            SELECT STATUS <span>*</span>
          </label>

          <div className="new-member-select-box">

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >

              <option value="">
                Select Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

            <span className="new-member-select-icon">
              ▼
            </span>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="new-member-form-buttons">

          <button
            type="submit"
            className="new-member-submit-btn"
          >
            Submit
          </button>

          <button
            type="button"
            className="new-member-reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>

      </form>

    </div>
  );
};

export default NewMemberCollectionForm;