import React, {
  useEffect,
  useState,
} from "react";
import {
  createRelation,
  updateRelation,
} from "../../store/slices/relationSlice";
import { useAppDispatch } from "../../store/hooks";
import "../../components/common/CommonForm.css";
import "../../utils/validation.css";
import { validateRequired } from "../../utils/validation";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { toast } from "react-toastify";


const RelationForm = ({
  data,
  onSave,
  onClose,
}) => {
  const dispatch = useAppDispatch();


  const [formData, setFormData] =
    useState({
      relation: "",
      remark: "",
      status: "ACTIVE",
    });

  const [errors, setErrors] =
    useState({});


 
  // LOAD EDIT DATA
 

  useEffect(() => {

    if (data) {

      setFormData({

        relation:
          data.relation ||
          data.relationName ||
          "",

        remark:
          data.remark || "",

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

        relation: "",

        remark: "",

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


 
  // SUBMIT - POST / PUT
 

  const handleSubmit = async (e) => {

    e.preventDefault();


 
    // VALIDATION
 

    const validationErrors =
      validateRequired(

        formData,

        [

          {
            name: "relation",
            label: "Relation",
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


 
    // API PAYLOAD
 

    const payload = {

      id: data?.id || 0,

      relationName:
        formData.relation.trim(),

      remark:
        formData.remark.trim() || null,

      status:
        formData.status,

    };


    console.log(
      "RELATION PAYLOAD:",
      payload
    );


    try {

      
      // UPDATE - PUT
      

      if (data) {

        console.log(
          "PUT RELATION ID:",
          data.id
        );

        console.log(
          "PUT RELATION REQUEST:",
          payload
        );


        const response =
          await dispatch(updateRelation({ id: data.id, data: payload })).unwrap();


        console.log(
          "RELATION UPDATED:",
          response
        );


        toast.success(
          "Relation updated successfully!"
        );


        if (onSave) {

          onSave(
            response || {
              ...data,
              ...payload,
            }
          );

        }

      }

      
      // CREATE - POST
      

      else {

        console.log(
          "POST RELATION REQUEST:",
          payload
        );


        const response =
          await dispatch(createRelation(
            payload
          )).unwrap();


        console.log(
          "RELATION CREATED:",
          response
        );


        toast.success(
          "Relation added successfully!"
        );


        if (onSave) {

          onSave(response);

        }

      }


      
      // REFRESH RELATION TABLE
      

      window.dispatchEvent(
        new Event("relation-updated")
      );


      
      // CLOSE FORM
      

      onClose();


    } catch (error) {

      console.error(
        "RELATION SAVE ERROR:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        error.response?.data?.title ||

        "Failed to save Relation."

      );

    }

  };


  return (

    <div className="common-modal">

      <div className="common-modal-content">

        {/* ================= Header ================= */}

        <div className="common-modal-header">

          <h2>

            {data
              ? "Edit Relation"
              : "Add Relation"}

          </h2>


          <CloseButton
            onClick={onClose}
          />

        </div>


        {/* ================= Form ================= */}

        <form
          className="common-form"
          onSubmit={handleSubmit}
        >

          <div className="common-form-grid">

            {/* ================= Relation ================= */}

            <div className="common-form-group">

              <label>

                Relation <span>*</span>

              </label>


              <input
                type="text"
                name="relation"
                placeholder="Enter Relation"
                value={formData.relation}
                onChange={handleChange}
                className={
                  errors.relation
                    ? "error-input"
                    : ""
                }
              />


              {errors.relation && (

                <p className="error-text">

                  {errors.relation}

                </p>

              )}

            </div>


            {/* ================= Remark ================= */}

            <div className="common-form-group">

              <label>

                Remark

              </label>


              <textarea
                name="remark"
                rows="3"
                placeholder="Enter Remark"
                value={formData.remark}
                onChange={handleChange}
              />

            </div>


            {/* ================= Status ================= */}

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


          {/* ================= Buttons ================= */}

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


export default RelationForm;