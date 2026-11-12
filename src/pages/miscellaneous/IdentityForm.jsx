import React, {
  useEffect,
  useState,
} from "react";
import {
  createIdentityProof,
  updateIdentityProof,
} from "../../store/slices/identityProofSlice";
import { useAppDispatch } from "../../store/hooks";
import "../../components/common/CommonForm.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";
import { toast } from "react-toastify";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";


const IdentityForm = ({
  data,
  onSave,
  onClose,
}) => {
  const dispatch = useAppDispatch();


  const [formData, setFormData] =
    useState({
      identity: "",
      status: "ACTIVE",
    });


  const [errors, setErrors] =
    useState({});



  // LOAD EDIT DATA


  useEffect(() => {

    if (data) {

      setFormData({

        identity:
          data.identity || "",

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

        identity: "",

        status: "ACTIVE",

      });

    }

  }, [data]);



  // HANDLE CHANGE


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
  // POST / PUT


  const handleSubmit = async (e) => {

    e.preventDefault();


  
    // VALIDATION
  

    const validationErrors =
      validateRequired(

        formData,

        [

          {
            name: "identity",
            label: "Identity",
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


  
    // PAYLOAD
  

    const payload = {

      id: data?.id || 0,

      identityName:
        formData.identity.trim(),

      status:
        formData.status,

    };


    console.log(
      "IDENTITY PROOF PAYLOAD:",
      payload
    );


    try {


      // UPDATE - PUT


      if (data) {

        const response =
          await dispatch(updateIdentityProof({ id: data.id, data: payload })).unwrap();


        console.log(
          "IDENTITY PROOF UPDATED:",
          response
        );


        toast.success(
          "Identity Proof updated successfully!"
        );


        if (onSave) {

          onSave(
            response || payload
          );

        }

      }


      // CREATE - POST


      else {

        const response =
          await dispatch(createIdentityProof(
            payload
          )).unwrap();


        console.log(
          "IDENTITY PROOF CREATED:",
          response
        );


        toast.success(
          "Identity Proof added successfully!"
        );


        if (onSave) {

          onSave(response);

        }

      }



      // CLOSE FORM


      onClose();


    } catch (error) {

      console.error(
        "IDENTITY PROOF SAVE ERROR:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        error.response?.data?.title ||

        "Failed to save Identity Proof."

      );

    }

  };


  return (

    <div className="common-modal">

      <div className="common-modal-content">

        {/* Header */}

        <div className="common-modal-header">

          <h2>

            {data
              ? "Edit Identity"
              : "Add Identity"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="common-form"
        >

          <div className="common-form-grid">

            {/* Identity */}

            <div className="common-form-group">

              <label>

                Identity <span>*</span>

              </label>


              <input
                type="text"
                name="identity"
                value={formData.identity}
                onChange={handleChange}
                placeholder="Enter Identity"
                className={
                  errors.identity
                    ? "error-input"
                    : ""
                }
              />


              {errors.identity && (

                <p className="error-text">

                  {errors.identity}

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


export default IdentityForm;