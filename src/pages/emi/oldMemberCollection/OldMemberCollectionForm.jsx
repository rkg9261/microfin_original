import React, { useState } from "react";

const OldMemberCollectionForm = ({
  onSearch,
  onSubmitApplication,
}) => {
  const [formData, setFormData] = useState({
    branch: "",
    date: "",
    member: "",
    applicationNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch(formData);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    if (!formData.applicationNumber.trim()) {
      alert("Please enter application number");
      return;
    }

    onSubmitApplication(formData.applicationNumber);
  };

  return (
    <>
      {/* FILTER SECTION */}
      <div className="old-member-filter-section">

        <div className="old-member-filter-line" />

        <div className="old-member-filter-grid">

          {/* BRANCH */}
          <div className="old-member-field">

            <label>BRANCH</label>

            <div className="old-member-select-wrapper">

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Laskarthat">Laskarthat</option>
                <option value="Jagatpura">Jagatpura</option>
              </select>

              <span className="old-member-select-arrow">
                ▼
              </span>

            </div>

          </div>

          {/* DATE */}
          <div className="old-member-field">

            <label>DATE</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>

          {/* MEMBERS */}
          <div className="old-member-field">

            <label>MEMBERS</label>

            <div className="old-member-select-wrapper">

              <select
                name="member"
                value={formData.member}
                onChange={handleChange}
              >
                <option value="">Select Member</option>
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

              <span className="old-member-select-arrow">
                ▼
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* SINGLE MEMBER RECORD */}
      <div className="old-member-single-section">

        <div className="old-member-red-line" />

        <h3>GET SINGLE MEMBER RECORD</h3>

        <form
          className="old-member-single-form"
          onSubmit={handleApplicationSubmit}
        >

          <input
            type="text"
            name="applicationNumber"
            placeholder="Application Number"
            value={formData.applicationNumber}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="old-member-submit-button"
          >
            Submit
          </button>

        </form>

      </div>

    </>
  );
};

export default OldMemberCollectionForm;