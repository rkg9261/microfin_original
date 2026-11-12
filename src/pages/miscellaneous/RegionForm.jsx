import React, {
  useEffect,
  useState,
} from "react";
import "../../components/common/CommonForm.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { toast } from "react-toastify";

  



const RegionForm = ({
  data,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] =
    useState({
      regionName: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});


 
  // EDIT DATA
 

  useEffect(() => {

    if (data) {

      setFormData({
        regionName:
          data.regionName || "",

        status:
          data.status || "ACTIVE",
      });

    } else {

      setFormData({
        regionName: "",
        status: "ACTIVE",
      });

    }

    setErrors({});

  }, [data]);


 
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

  };


 
  // SUBMIT
 

 const handleSubmit = async (e) => {

  e.preventDefault();

  const validationErrors =
    validateRequired(
      formData,
      [
        {
          name: "regionName",
          label: "Region Name",
        },
        {
          name: "status",
          label: "Status",
        },
      ]
    );

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const saved = {
    id: data?.id,
    regionName: formData.regionName.trim(),
    status: formData.status,
  };

  if (onSave) {
    onSave(saved);
  }

  toast.success(
    data
      ? "Region updated."
      : "Region saved."
  );

  if (onClose) {
    onClose();
  }

};


  return (

    <div className="common-modal">

      <div className="common-modal-content">


        <div className="common-modal-header">

          <h2>

            {data
              ? "Edit Region"
              : "Add Region"}

          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>


        <form
          className="common-form"
          onSubmit={handleSubmit}
        >

          <div className="common-form-grid">


            {/* REGION NAME */}

            <div className="common-form-group">

              <label>

                Region Name
                <span>*</span>

              </label>

              <input
                type="text"
                name="regionName"
                placeholder="Enter Region Name"
                value={formData.regionName}
                onChange={handleChange}
                className={
                  errors.regionName
                    ? "error-input"
                    : ""
                }
              />

              {errors.regionName && (

                <p className="error-text">
                  {errors.regionName}
                </p>

              )}

            </div>


            {/* STATUS */}

            <div className="common-form-group">

              <label>

                Status
                <span>*</span>

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


          <div className="common-form-buttons">

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


export default RegionForm;