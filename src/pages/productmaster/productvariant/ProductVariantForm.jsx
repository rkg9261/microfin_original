import React, { useEffect, useState } from "react";

import SaveButton from "../../../components/buttons/SaveButton";
import CancelButton from "../../../components/buttons/CancelButton";
import CloseButton from "../../../components/buttons/CloseButton";

import { validateRequired } from "../../../utils/validation";

import "../../../utils/validation.css";

import "./ProductVariant.css";


const ProductVariantForm = ({
    editData,
    onClose,
    onSave
}) => {

    const [errors, setErrors] = useState({});


    const [formData, setFormData] = useState({

        name: "",
        code: "",
        remark: "",
        status: "Active"

    });


    // ==========================================
    // EDIT DATA
    // ==========================================

    useEffect(() => {

        if (editData) {

            setFormData({

                name: editData.name || "",

                code: editData.code || "",

                remark: editData.remark || "",

                status: editData.status || "Active"

            });

        }

    }, [editData]);


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));


        // Remove error
        if (errors[name]) {

            setErrors((prev) => ({

                ...prev,

                [name]: ""

            }));

        }

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        const validation = validateRequired(
            formData,
            [
                {
                    name: "name",
                    label: "Variant Name"
                },
                {
                    name: "code",
                    label: "Variant Code"
                }
            ]
        );


        if (Object.keys(validation).length > 0) {

            setErrors(validation);

            return;

        }


        setErrors({});


        onSave(formData);

    };


    return (

        <div
            className="common-modal"
            onClick={onClose}
        >

            <div
                className="common-modal-content product-variant-form-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* =================================
                    HEADER
                ================================= */}

                <div className="common-modal-header">

                    <h2>

                        {editData
                            ? "EDIT VARIANT"
                            : "ADD NEW"}

                    </h2>

                     <CloseButton
            onClick={onClose}
          />

                </div>


                {/* =================================
                    FORM
                ================================= */}

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >

                    <div className="common-form-grid">


                        {/* VARIANT NAME */}

                        <div className="common-form-group">

                            <label>

                                Variant Name

                                <span>
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Variant Name"
                                value={formData.name}
                                onChange={handleChange}
                                className={
                                    errors.name
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.name && (

                                <p className="error-text">
                                    {errors.name}
                                </p>

                            )}

                        </div>


                        {/* VARIANT CODE */}

                        <div className="common-form-group">

                            <label>

                                Variant Code

                                <span>
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="code"
                                placeholder="Enter Variant Code"
                                value={formData.code}
                                onChange={handleChange}
                                className={
                                    errors.code
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.code && (

                                <p className="error-text">
                                    {errors.code}
                                </p>

                            )}

                        </div>


                        {/* REMARK */}

                        <div className="common-form-group">

                            <label>
                                Remark
                            </label>

                            <input
                                type="text"
                                name="remark"
                                placeholder="Enter Remark"
                                value={formData.remark}
                                onChange={handleChange}
                            />

                        </div>


                        {/* STATUS */}

                        <div className="common-form-group">

                            <label>

                                Status

                                <span>
                                    *
                                </span>

                            </label>

                            <div className="radio-group">

                                <label>

                                    <input
                                        type="radio"
                                        name="status"
                                        value="Active"
                                        checked={
                                            formData.status ===
                                            "Active"
                                        }
                                        onChange={handleChange}
                                    />

                                    Active

                                </label>


                                <label>

                                    <input
                                        type="radio"
                                        name="status"
                                        value="Inactive"
                                        checked={
                                            formData.status ===
                                            "Inactive"
                                        }
                                        onChange={handleChange}
                                    />

                                    Inactive

                                </label>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        BUTTONS
                    ================================= */}

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

export default ProductVariantForm;