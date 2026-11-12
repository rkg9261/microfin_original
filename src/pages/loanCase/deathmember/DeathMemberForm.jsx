import React, { useState } from "react";

import {
  SaveButton,
  CancelButton,
} from "../../../components/buttons";
import CloseButton from "../../../components/buttons/CloseButton";

const DeathMemberForm = ({
  branches,
  onSave,
  onClose,
}) => {



  // FORM STATE


  const [formData, setFormData] = useState({

    branch: "",

    memberName: "",

    deathDate: "",

    mobile: "",

    deathTime: "",

    deathCause: "",

    staffId: "",

  });



  // CHANGE


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



  // SUBMIT


  const handleSubmit = (e) => {

    e.preventDefault();


    if (!formData.branch) {

      alert("Please select branch");

      return;

    }


    if (!formData.memberName) {

      alert("Please enter member name");

      return;

    }


    if (!formData.deathDate) {

      alert("Please select death date");

      return;

    }


    if (!formData.mobile) {

      alert("Please enter mobile number");

      return;

    }


    if (!formData.deathCause) {

      alert("Please enter death cause");

      return;

    }


    if (!formData.staffId) {

      alert("Please enter staff ID");

      return;

    }


    const formattedDate =
      formData.deathDate
        ? formData.deathDate
            .split("-")
            .reverse()
            .join("-")
        : "";


    onSave({

      ...formData,

      deathDate: formattedDate,

      verifiedBy: formData.staffId,

    });

  };


  return (

    <div className="death-modal-overlay">


      <div className="death-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="death-modal-header">

          <h2>
            ADD NEW
          </h2>

                <CloseButton
            onClick={onClose}
          />

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="death-form"
          onSubmit={handleSubmit}
        >


          <div className="death-form-grid">


            {/* LEFT COLUMN */}

            <div className="death-form-column">


              {/* BRANCH */}

              <div className="death-form-group">

                <label>
                  BRANCH
                </label>

                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Branch
                  </option>

                  {branches.map(
                    (branch) => (

                      <option
                        key={branch}
                        value={branch}
                      >
                        {branch}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* MEMBER */}

              <div className="death-form-group">

                <label>
                  MEMBER (TYPE HERE)
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="memberName"
                  placeholder="Enter member name"
                  value={formData.memberName}
                  onChange={handleChange}
                />

              </div>


              {/* DEATH DATE */}

              <div className="death-form-group">

                <label>
                  MEMBER DEATH DATE
                </label>

                <input
                  type="date"
                  name="deathDate"
                  value={formData.deathDate}
                  onChange={handleChange}
                />

              </div>


              {/* MOBILE */}

              <div className="death-form-group">

                <label>
                  MOBILE NUMBER
                  <span>*</span>
                </label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* RIGHT COLUMN */}

            <div className="death-form-column">


              {/* DEATH TIME */}

              <div className="death-form-group">

                <label>
                  DEATH TIME
                </label>

                <input
                  type="time"
                  name="deathTime"
                  value={formData.deathTime}
                  onChange={handleChange}
                />

              </div>


              {/* DEATH CAUSE */}

              <div className="death-form-group">

                <label>
                  DEATH CAUSE
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="deathCause"
                  placeholder="Enter death cause"
                  value={formData.deathCause}
                  onChange={handleChange}
                />

              </div>


              {/* STAFF */}

              <div className="death-form-group">

                <label>
                  STAFF ID
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="staffId"
                  placeholder="Enter staff ID"
                  value={formData.staffId}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="death-form-actions">

            <SaveButton
              type="submit"
            />

            <CancelButton
              type="button"
              onClick={onClose}
            />

          </div>

        </form>

      </div>

    </div>

  );

};


export default DeathMemberForm;