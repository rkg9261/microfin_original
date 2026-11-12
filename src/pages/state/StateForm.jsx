import React, {
  useEffect,
  useState,
} from "react";

import "../../components/common/CommonForm.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";

import {
  validateRequired,
} from "../../utils/validation";

import "../../utils/validation.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { swaggerActions } from "../../store/swaggerSlices";



// STATE FORM


const StateForm = ({
  data,
  onSave,
  onClose,
  loading,
}) => {
  const dispatch = useAppDispatch();
  const { items: countries } = useAppSelector((store) => store.country || { items: [] });

  useEffect(() => {
    if (swaggerActions.country?.fetchAll) {
      dispatch(swaggerActions.country.fetchAll());
    }
  }, [dispatch]);




  const initialForm = {

    stateName: "",

    stateCode: "",

    countryId: 0,

    status: "ACTIVE",

  };



  // FORM STATE


  const [formData, setFormData] =
    useState(initialForm);



  // ERRORS


  const [errors, setErrors] =
    useState({});



  // LOAD EDIT DATA


  useEffect(() => {

    if (data) {

      setFormData({

        stateName:
          data.stateName ?? "",

        stateCode:
          data.stateCode ?? "",

        countryId:
          data.countryId != null && data.countryId !== ""
            ? String(data.countryId)
            : "",

        status:
          data.isActive
            ? "ACTIVE"
            : "INACTIVE",

      });

    } else {
      const defaultCountryId =
        countries[0]?.countryId ?? countries[0]?.id ?? "";

      setFormData({
        ...initialForm,
        countryId:
          defaultCountryId !== "" ? String(defaultCountryId) : "",
      });

    }


    setErrors({});

  }, [data, countries]);



  // CHANGE


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData(
      (prev) => ({

        ...prev,

        [name]: value,

      })
    );


    setErrors(
      (prev) => ({

        ...prev,

        [name]: "",

      })
    );

  };



  // SUBMIT


  const handleSubmit = (e) => {

    e.preventDefault();


    const validation =
      validateRequired(

        formData,

        [

          {
            name: "stateName",
            label: "State Name",
          },

          {
            name: "stateCode",
            label: "State Code",
          },

          {
            name: "countryId",
            label: "Country",
          },

          {
            name: "status",
            label: "Status",
          },

        ]

      );


    if (
      Object.keys(validation)
        .length > 0
    ) {

      setErrors(
        validation
      );

      return;

    }


    setErrors({});


    onSave(
      formData
    );

    
  };


  return (

    <div className="common-modal">


      <div className="common-modal-content">


        {/* HEADER  */}
      

        <div className="common-modal-header">

          <h2>

            {data
              ? "Edit State"
              : "Add New State"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/*FORM*/}
        

        <form
          className="common-form"
          onSubmit={handleSubmit}
        >


          <div className="common-form-grid">


            {/*STATE NAME */}
          

            <div className="common-form-group">

              <label>

                State Name
                <span>*</span>

              </label>


              <input

                type="text"

                name="stateName"

                value={
                  formData.stateName
                }

                onChange={
                  handleChange
                }

                placeholder="Enter State Name"

                className={
                  errors.stateName
                    ? "error-input"
                    : ""
                }

              />


              {errors.stateName && (

                <p className="error-text">

                  {errors.stateName}

                </p>

              )}

            </div>


            {/*STATE CODE*/}
           

            <div className="common-form-group">

              <label>

                State Code
                <span>*</span>

              </label>


              <input

                type="text"

                name="stateCode"

                value={
                  formData.stateCode
                }

                onChange={
                  handleChange
                }

                placeholder="Enter State Code"

                className={
                  errors.stateCode
                    ? "error-input"
                    : ""
                }

              />


              {errors.stateCode && (

                <p className="error-text">

                  {errors.stateCode}

                </p>

              )}

            </div>


            {/* COUNTRY */}
          

            <div className="common-form-group">

              <label>

                Country
                <span>*</span>

              </label>


              <select
                name="countryId"
                value={formData.countryId}
                onChange={handleChange}
                className={
                  errors.countryId
                    ? "error-input"
                    : ""
                }
              >
                <option value="">
                  {countries.length
                    ? "Select Country"
                    : "No countries available"}
                </option>
                {countries.map((country) => {
                  const id = country.countryId ?? country.id;
                  return (
                    <option
                      key={id}
                      value={String(id)}
                    >
                      {country.countryName || country.name}
                    </option>
                  );
                })}
              </select>

              {errors.countryId && (
                <p className="error-text">
                  {errors.countryId}
                </p>
              )}

            </div>


            {/* STATUS*/}
           

            <div className="common-form-group">

              <label>

                Status
                <span>*</span>

              </label>


              <select

                name="status"

                value={
                  formData.status
                }

                onChange={
                  handleChange
                }

                className={
                  errors.status
                    ? "error-input"
                    : ""
                }

              >

                <option value="">
                  Select Status
                </option>

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


          {/*  BUTTONS */}
         

          <div className="common-form-buttons">


            <SaveButton

              text={
                data
                  ? "Update"
                  : "Save"
              }

              type="submit"

              disabled={loading}

            />


            <CancelButton

              text="Cancel"

              type="button"

              onClick={onClose}

              disabled={loading}

            />


          </div>


        </form>

      </div>

    </div>

  );

};


export default StateForm;