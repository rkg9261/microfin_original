import React, {
  useEffect,
  useState,
} from "react";
import "../../components/common/CommonForm.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";
import { toast } from "react-toastify";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";


const PurposeForm = ({
  data,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] =
    useState({
      purpose: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});


  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {

    if (data) {

      setFormData({

        purpose:
          data.purpose || "",

        status:
          data.status === true ||
          String(data.status ?? "").toUpperCase() === "ACTIVE"
            ? "ACTIVE"
            : data.status === false ||
              String(data.status ?? "").toUpperCase() === "INACTIVE"
            ? "INACTIVE"
            : "ACTIVE",

      });

    } else {

      setFormData({

        purpose: "",
        status: "ACTIVE",

      });

    }

    setErrors({});

  }, [data]);


  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

    setErrors((prev) => ({

      ...prev,

      [name]: "",

    }));

  };


  // =====================================================
  // SUBMIT
  // POST / PUT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ===================================================
    // VALIDATION
    // ===================================================

    const validationErrors =
      validateRequired(

        formData,

        [

          {
            name: "purpose",
            label: "Purpose",
          },

          {
            name: "status",
            label: "Status",
          },

        ]

      );


    if (
      Object.keys(validationErrors)
        .length > 0
    ) {

      setErrors(validationErrors);

      return;

    }


    setErrors({});

    const saved = {
      id: data?.id,
      purpose: formData.purpose.trim(),
      status: formData.status,
    };

    if (onSave) {
      onSave(saved);
    }

    toast.success(
      data
        ? "Purpose updated."
        : "Purpose saved."
    );

    if (onClose) {
      onClose();
    }

  };


  return (

    <div className="common-modal">

      <div className="common-modal-content">

        {/* Header */}

        <div className="common-modal-header">

          <h2>

            {data
              ? "Edit Purpose"
              : "Add Purpose"}

          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* Form */}

        <form
          className="common-form"
          onSubmit={handleSubmit}
        >

          <div className="common-form-grid">


            {/* Purpose */}

            <div className="common-form-group">

              <label>

                Purpose <span>*</span>

              </label>

              <input
                type="text"
                name="purpose"
                placeholder="Enter Purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={
                  errors.purpose
                    ? "error-input"
                    : ""
                }
              />

              {errors.purpose && (

                <p className="error-text">

                  {errors.purpose}

                </p>

              )}

            </div>


            {/* Status */}

            <div className="common-form-group">

              <label>

                Status <span>*</span>

              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={
                  errors.status
                    ? "error-input"
                    : ""
                }
              >

                <option value="ACTIVE">

                  ACTIVE

                </option>

                <option value="INACTIVE">

                  INACTIVE

                </option>

              </select>

              {errors.status && (

                <p className="error-text">

                  {errors.status}

                </p>

              )}

            </div>

          </div>


          {/* Buttons */}

          <div className="common-form-buttons">

            <SaveButton
              type="submit"
              text={
                data
                  ? "Update"
                  : "Save"
              }
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


export default PurposeForm;