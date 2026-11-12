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

const SoftwareTimingForm = ({
    data,
    onSave,
    onClose,
}) => {

    const [formData, setFormData] =
        useState({
            timeIn: "",
            timeOut: "",
            status: "ACTIVE",
        });

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        if (data) {

            setFormData({

                timeIn:
                    data.timeIn || "",

                timeOut:
                    data.timeOut || "",

                status:
                    data.status || "ACTIVE",

            });

        }

    }, [data]);

    const handleChange = (e) => {

        const { name, value } =
            e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const validationErrors =
            validateRequired(
                formData,
                [

                    {
                        name: "timeIn",
                        label: "Time In",
                    },

                    {
                        name: "timeOut",
                        label: "Time Out",
                    },

                    {
                        name: "status",
                        label: "Status",
                    },

                ]
            );

        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            setErrors(
                validationErrors
            );

            return;

        }

        onSave(formData);

    };

    return (

        <div className="common-modal">

            <div className="common-modal-content">

                {/* Header */}

                <div className="common-modal-header">

                    <h2>

                        UPDATE SOFTWARE TIMING

                    </h2>

                    <CloseButton
                        onClick={
                            onClose
                        }
                    />

                </div>

                {/* Form */}

                <form
                    className="common-form"
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="common-form-grid">

                        {/* Time In */}

                        <div className="common-form-group">

                            <label>

                                Time In
                                <span> *</span>

                            </label>

                            <input
                                type="time"
                                name="timeIn"
                                value={
                                    formData.timeIn
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.timeIn
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.timeIn && (

                                <p className="error-text">

                                    {
                                        errors.timeIn
                                    }

                                </p>

                            )}

                        </div>

                        {/* Status */}

                        <div className="common-form-group">

                            <label>

                                Select Status
                                <span> *</span>

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

                                <option value="ACTIVE">

                                    ACTIVE

                                </option>

                                <option value="INACTIVE">

                                    INACTIVE

                                </option>

                            </select>

                            {errors.status && (

                                <p className="error-text">

                                    {
                                        errors.status
                                    }

                                </p>

                            )}

                        </div>

                        {/* Time Out */}

                        <div className="common-form-group">

                            <label>

                                Time Out
                                <span> *</span>

                            </label>

                            <input
                                type="time"
                                name="timeOut"
                                value={
                                    formData.timeOut
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    errors.timeOut
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.timeOut && (

                                <p className="error-text">

                                    {
                                        errors.timeOut
                                    }

                                </p>

                            )}

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="common-form-buttons">

                        <SaveButton
                            type="submit"
                            text="Save Timing"
                        />

                        <CancelButton
                            type="button"
                            text="Cancel"
                            onClick={
                                onClose
                            }
                        />

                    </div>

                </form>

            </div>

        </div>

    );

};

export default SoftwareTimingForm;