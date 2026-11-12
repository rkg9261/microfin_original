import React, { useEffect, useState } from "react";

import SaveButton from "../../components/buttons/SaveButton";
import CancelButton from "../../components/buttons/CancelButton";
import CloseButton from "../../components/buttons/CloseButton";

import { validateRequired } from "../../utils/validation";


const initialFormData = {
  branch: "",
  distanceFromBranch: "",
  surveyDate: "",
  possibleCenter: "",
  areaName: "",
  mfiWorking: "",
  villageName: "",
  mfiName: "",
  populationOfVillages: "",
  majorOperationPeople: "",
  politicalSituation: "",
  roadStatus: "",
  lawAndOrderSituation: "",
  hinduReligionPercentage: "",
  muslimReligionPercentage: "",
  generalCastePercentage: "",
  sikhReligionPercentage: "",
  obcCastePercentage: "",
  christianReligionPercentage: "",
  scCastePercentage: "",
  stCastePercentage: "",
  otherReligionPercentage: "",
  otherCastePercentage: "",
  remark: "",
};


const AreaSummaryForm = ({
  area,
  onClose,
  onSave,
}) => {

  const [formData, setFormData] =
    useState(initialFormData);

  const [errors, setErrors] =
    useState({});


  /* =====================================================
     EDIT DATA
  ===================================================== */

  useEffect(() => {

    if (area) {

      setFormData({
        branch:
          area.branch || "",

        distanceFromBranch:
          area.distanceFromBranch || "",

        surveyDate:
          area.surveyDate || "",

        possibleCenter:
          area.possibleCenter || "",

        areaName:
          area.areaName || "",

        mfiWorking:
          area.mfiWorking || "",

        villageName:
          area.villageName || "",

        mfiName:
          area.mfiName || "",

        populationOfVillages:
          area.populationOfVillages || "",

        majorOperationPeople:
          area.majorOperationPeople || "",

        politicalSituation:
          area.politicalSituation || "",

        roadStatus:
          area.roadStatus || "",

        lawAndOrderSituation:
          area.lawAndOrderSituation || "",

        hinduReligionPercentage:
          area.hinduReligionPercentage || "",

        muslimReligionPercentage:
          area.muslimReligionPercentage || "",

        generalCastePercentage:
          area.generalCastePercentage || "",

        sikhReligionPercentage:
          area.sikhReligionPercentage || "",

        obcCastePercentage:
          area.obcCastePercentage || "",

        christianReligionPercentage:
          area.christianReligionPercentage || "",

        scCastePercentage:
          area.scCastePercentage || "",

        stCastePercentage:
          area.stCastePercentage || "",

        otherReligionPercentage:
          area.otherReligionPercentage || "",

        otherCastePercentage:
          area.otherCastePercentage || "",

        remark:
          area.remark || "",
      });

    } else {

      setFormData(initialFormData);

    }

    setErrors({});

  }, [area]);


  /* =====================================================
     CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };


  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = (e) => {

    e.preventDefault();


    const requiredFields = [

      {
        name: "branch",
        label: "Branch",
      },

      {
        name: "distanceFromBranch",
        label: "Distance From Branch",
      },

      {
        name: "surveyDate",
        label: "Survey Date",
      },

      {
        name: "possibleCenter",
        label: "Possible Center",
      },

      {
        name: "areaName",
        label: "Area Name",
      },

      {
        name: "mfiWorking",
        label: "MFI Working",
      },

      {
        name: "villageName",
        label: "Village Name",
      },

      {
        name: "mfiName",
        label: "MFI Name",
      },

      {
        name: "populationOfVillages",
        label: "Population Of Villages",
      },

      {
        name: "majorOperationPeople",
        label: "Major Operation People",
      },

      {
        name: "politicalSituation",
        label: "Political Situation",
      },

      {
        name: "roadStatus",
        label: "Road Status",
      },

      {
        name: "lawAndOrderSituation",
        label: "Law And Order Situation",
      },

      {
        name: "hinduReligionPercentage",
        label: "Hindu Religion Percentage",
      },

      {
        name: "muslimReligionPercentage",
        label: "Muslim Religion Percentage",
      },

      {
        name: "generalCastePercentage",
        label: "General Caste Percentage",
      },

      {
        name: "sikhReligionPercentage",
        label: "Sikh Religion Percentage",
      },

      {
        name: "obcCastePercentage",
        label: "OBC Caste Percentage",
      },

      {
        name: "christianReligionPercentage",
        label: "Christian Religion Percentage",
      },

      {
        name: "scCastePercentage",
        label: "SC Caste Percentage",
      },

      {
        name: "stCastePercentage",
        label: "ST Caste Percentage",
      },

      {
        name: "otherReligionPercentage",
        label: "Other Religion Percentage",
      },

      {
        name: "otherCastePercentage",
        label: "Other Caste Percentage",
      },

    ];


    const validationErrors =
      validateRequired(
        formData,
        requiredFields
      );


    setErrors(validationErrors);


    if (
      Object.keys(validationErrors).length > 0
    ) {

      return;

    }


    onSave(formData);

  };


  /* =====================================================
     FIELD
  ===================================================== */

  const renderInput = ({
    name,
    label,
    type = "text",
    required = true,
    placeholder = "",
  }) => {

    return (

      <div className="area-summary-form-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>


        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={
            errors[name]
              ? "area-summary-input error"
              : "area-summary-input"
          }
        />


        {errors[name] && (

          <span className="area-summary-error">
            {errors[name]}
          </span>

        )}

      </div>

    );

  };


  /* =====================================================
     SELECT
  ===================================================== */

  const renderSelect = ({
    name,
    label,
    options,
    required = true,
  }) => {

    return (

      <div className="area-summary-form-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>


        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={
            errors[name]
              ? "area-summary-input error"
              : "area-summary-input"
          }
        >

          <option value="">
            Select {label}
          </option>


          {options.map((option) => (

            <option
              key={option}
              value={option}
            >

              {option}

            </option>

          ))}

        </select>


        {errors[name] && (

          <span className="area-summary-error">
            {errors[name]}
          </span>

        )}

      </div>

    );

  };


  /* =====================================================
     JSX
  ===================================================== */

  return (

    <div className="area-summary-modal-overlay">

      <div className="area-summary-form-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="area-summary-modal-header">

          <h2>

            {area
              ? "EDIT AREA SURVEY"
              : "ADD NEW"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="area-summary-form"
        >

          <div className="area-summary-form-grid">


            {/* BRANCH */}

            {renderSelect({

              name: "branch",

              label: "Branch",

              options: [

                "KOLKATA - DALHOUSIE",

                "JAGATAPURA",

                "LASKARHAT",

                "SHREEJA GROUP",

                "RAM CAPITAL TRUST",

              ],

            })}


            {/* DISTANCE FROM BRANCH */}

            {renderInput({

              name: "distanceFromBranch",

              label: "Distance From Branch",

            })}


            {/* SURVEY DATE */}

            {renderInput({

              name: "surveyDate",

              label: "Survey Date",

              type: "date",

            })}


            {/* POSSIBLE CENTER */}

            {renderSelect({

              name: "possibleCenter",

              label: "Possible Center",

              options: [
                "YES",
                "NO",
              ],

            })}


            {/* AREA NAME */}

            {renderInput({

              name: "areaName",

              label: "Area Name",

            })}


            {/* MFI WORKING */}

            {renderSelect({

              name: "mfiWorking",

              label: "MFI Working",

              options: [
                "YES",
                "NO",
              ],

            })}


            {/* VILLAGE NAME */}

            {renderInput({

              name: "villageName",

              label: "Village Name",

            })}


            {/* MFI NAME */}

            {renderInput({

              name: "mfiName",

              label: "MFI Name",

              placeholder: "Micro Finance Name",

            })}


            {/* POPULATION */}

            {renderInput({

              name: "populationOfVillages",

              label: "Population Of Villages",

            })}


            {/* MAJOR OPERATION PEOPLE */}

            {renderInput({

              name: "majorOperationPeople",

              label: "Major Operation People",

            })}


            {/* POLITICAL SITUATION */}

            {renderInput({

              name: "politicalSituation",

              label: "Political Situation",

            })}


            {/* ROAD STATUS */}

            {renderInput({

              name: "roadStatus",

              label: "Road Status",

            })}


            {/* LAW AND ORDER */}

            {renderInput({

              name: "lawAndOrderSituation",

              label: "Law And Order Situation",

            })}


            {/* HINDU RELIGION */}

            {renderInput({

              name: "hinduReligionPercentage",

              label: "Hindu Religion Percentage",

            })}


            {/* GENERAL CASTE */}

            {renderInput({

              name: "generalCastePercentage",

              label: "General Caste Percentage",

            })}


            {/* MUSLIM RELIGION */}

            {renderInput({

              name: "muslimReligionPercentage",

              label: "Muslim Religion Percentage",

            })}


            {/* SIKH RELIGION */}

            {renderInput({

              name: "sikhReligionPercentage",

              label: "Sikh Religion Percentage",

            })}


            {/* OBC CASTE */}

            {renderInput({

              name: "obcCastePercentage",

              label: "OBC Caste Percentage",

            })}


            {/* CHRISTIAN RELIGION */}

            {renderInput({

              name: "christianReligionPercentage",

              label: "Christian Religion Percentage",

            })}


            {/* SC CASTE */}

            {renderInput({

              name: "scCastePercentage",

              label: "SC Caste Percentage",

            })}


            {/* ST CASTE */}

            {renderInput({

              name: "stCastePercentage",

              label: "ST Caste Percentage",

            })}


            {/* OTHER RELIGION */}

            {renderInput({

              name: "otherReligionPercentage",

              label: "Other Religion Percentage",

            })}


            {/* OTHER CASTE */}

            {renderInput({

              name: "otherCastePercentage",

              label: "Other Caste Percentage",

            })}


            {/* REMARK */}

            {renderInput({

              name: "remark",

              label: "Remark",

              required: false,

            })}


          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="area-summary-form-actions">

            <SaveButton type="submit">

              CREATE

            </SaveButton>


            <CancelButton
              type="button"
              onClick={onClose}
            >

              CANCEL

            </CancelButton>

          </div>


        </form>

      </div>

    </div>

  );

};


export default AreaSummaryForm;