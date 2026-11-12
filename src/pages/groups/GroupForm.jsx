import React, {
  useEffect,
  useState,
} from "react";

import "./Group.css";

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
import { fetchBranches } from "../../store/slices/branchSlice";

const GroupForm = ({
  data,
  onSave,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const initialForm = {

    branchId: "",

    groupName: "",

    city: "",

    collectionTime: "",

    address: "",

    collectionDay: "",

    centerLeader: "",

    status: "ACTIVE",

  };

  const [formData, setFormData] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (data) {
      const branchId =
        data.branchId != null && data.branchId !== ""
          ? String(data.branchId)
          : "";

      setFormData({
        ...initialForm,
        ...data,
        branchId,
        city: data.city || data.cityVillageName || "",
        status:
          data.status === "INACTIVE" || data.status === false
            ? "INACTIVE"
            : "ACTIVE",
      });
    } else {
      const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;
      setFormData({
        ...initialForm,
        branchId:
          defaultBranchId != null ? String(defaultBranchId) : "",
      });
    }

  }, [data, branches]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

    setErrors((prev) => ({

      ...prev,

      [name]: "",

    }));

  };

  const handleReset = () => {
    const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;

    setFormData({
      ...initialForm,
      branchId:
        defaultBranchId != null ? String(defaultBranchId) : "",
    });

    setErrors({});

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validation = validateRequired(

      formData,

      [

        {
          name: "branchId",
          label: "Branch Name",
        },

        {
          name: "groupName",
          label: "Group Name",
        },

        {
          name: "city",
          label: "City / Village Name",
        },

        {
          name: "collectionTime",
          label: "Collection Time",
        },

        {
          name: "address",
          label: "Address",
        },

        {
          name: "collectionDay",
          label: "Collection Day",
        },

        {
          name: "centerLeader",
          label: "Center Leader",
        },

      ]

    );

    if (
      Object.keys(validation).length > 0
    ) {

      setErrors(validation);

      return;

    }

    setErrors({});

    onSave(formData);

  };

  return (

    <div className="group-modal">

      <div className="group-modal-content">

        <div className="group-modal-header">

          <h2>

            {data
              ? "Edit Group"
              : "Add New Group"}

          </h2>

          <CloseButton
            onClick={onClose}
          />

        </div>

        <form
          className="group-form"
          onSubmit={handleSubmit}
        >

          <div className="group-form-grid">

      {/* ================= Left Column ================= */}

            <div className="group-form-group">

              <label>
                Branch Name <span>*</span>
              </label>

              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                disabled={branchesLoading}
                className={
                  errors.branchId ? "error-input" : ""
                }
              >

                <option value="">
                  {branchesLoading
                    ? "Loading branches..."
                    : branches.length
                    ? "Select Company Branch"
                    : "No branches available"}
                </option>

                {branches.map((branch) => {
                  const id = branch.branchId ?? branch.id;
                  return (
                    <option key={id} value={String(id)}>
                      {branch.branchName || branch.name || `Branch ${id}`}
                    </option>
                  );
                })}

              </select>

              {errors.branchId && (

                <p className="error-text">
                  {errors.branchId}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                City / Village Name <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City / Village"
                className={
                  errors.city ? "error-input" : ""
                }
              />

              {errors.city && (

                <p className="error-text">
                  {errors.city}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Group Name <span>*</span>
              </label>

              <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                placeholder="Enter Group Name"
                className={
                  errors.groupName
                    ? "error-input"
                    : ""
                }
              />

              {errors.groupName && (

                <p className="error-text">
                  {errors.groupName}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Collection Time <span>*</span>
              </label>

              <input
                type="time"
                name="collectionTime"
                value={formData.collectionTime}
                onChange={handleChange}
                className={
                  errors.collectionTime
                    ? "error-input"
                    : ""
                }
              />

              {errors.collectionTime && (

                <p className="error-text">
                  {errors.collectionTime}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Address <span>*</span>
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className={
                  errors.address
                    ? "error-input"
                    : ""
                }
              />

              {errors.address && (

                <p className="error-text">
                  {errors.address}
                </p>

              )}

            </div>

            <div className="group-form-group">

              <label>
                Collection Day <span>*</span>
              </label>

              <select
                name="collectionDay"
                value={formData.collectionDay}
                onChange={handleChange}
                className={
                  errors.collectionDay
                    ? "error-input"
                    : ""
                }
              >

                <option value="">
                  Select Collection Day
                </option>

                <option value="MONDAY">
                  Monday
                </option>

                <option value="TUESDAY">
                  Tuesday
                </option>

                <option value="WEDNESDAY">
                  Wednesday
                </option>

                <option value="THURSDAY">
                  Thursday
                </option>

                <option value="FRIDAY">
                  Friday
                </option>

                <option value="SATURDAY">
                  Saturday
                </option>

                <option value="SUNDAY">
                  Sunday
                </option>

              </select>

              {errors.collectionDay && (

                <p className="error-text">
                  {errors.collectionDay}
                </p>

              )}

            </div>



       {/* ================= Center Leader ================= */}

            <div className="group-form-group">

              <label>
                Center Leader (Type Here) <span>*</span>
              </label>

              <input
                type="text"
                name="centerLeader"
                value={formData.centerLeader}
                onChange={handleChange}
                placeholder="Enter Center Leader"
                className={
                  errors.centerLeader
                    ? "error-input"
                    : ""
                }
              />

              {errors.centerLeader && (

                <p className="error-text">
                  {errors.centerLeader}
                </p>

              )}

            </div>

            {/* ================= Group Status ================= */}

            <div className="group-form-group">

              <label>
                Group Status
              </label>

              <div className="radio-group">

                <label className="radio-item">

                  <input
                    type="radio"
                    name="status"
                    value="ACTIVE"
                    checked={
                      formData.status ===
                      "ACTIVE"
                    }
                    onChange={handleChange}
                  />

                  Active

                </label>

                <label className="radio-item">

                  <input
                    type="radio"
                    name="status"
                    value="INACTIVE"
                    checked={
                      formData.status ===
                      "INACTIVE"
                    }
                    onChange={handleChange}
                  />

                  Inactive

                </label>

              </div>

            </div>

          </div>

          {/* ================= Buttons ================= */}

          <div className="group-form-buttons">

            <SaveButton
              text={
                data
                  ? "Update Group"
                  : "Save Group"
              }
              type="submit"
            />

            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
            />

            <button
              type="button"
              className="btn btn-reset"
              onClick={handleReset}
            >

              Reset

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default GroupForm;