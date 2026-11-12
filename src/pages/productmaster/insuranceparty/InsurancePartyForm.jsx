import React, {
    useEffect,
    useState,
} from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";

import { validateRequired } from "../../../utils/validation";

import {
    SaveButton,
    CancelButton,
    CloseButton,
} from "../../../components/buttons";


const InsurancePartyForm = ({
    data,
    onSaveSuccess,
    onClose,
}) => {


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        insurancePartyName: "",

        insurancePartyCode: "",

        remark: "",

        status: "ACTIVE",

    });


    // ==========================================
    // ERRORS
    // ==========================================

    const [errors, setErrors] = useState({});


    // ==========================================
    // EDIT DATA
    // ==========================================

    useEffect(() => {

        if (data) {

            setFormData({

                insurancePartyName:
                    data.insurancePartyName || "",

                insurancePartyCode:
                    data.insurancePartyCode || "",

                remark:
                    data.remark || "",

                status:
                    data.status || "ACTIVE",

            });

        } else {

            setFormData({

                insurancePartyName: "",

                insurancePartyCode: "",

                remark: "",

                status: "ACTIVE",

            });

        }

    }, [data]);


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));


        // Clear error

        if (errors[name]) {

            setErrors((prev) => ({

                ...prev,

                [name]: "",

            }));

        }

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        const validationErrors =
            validateRequired(

                formData,

                [

                    {
                        name: "insurancePartyName",
                        label: "Insurance Party Name",
                    },

                    {
                        name: "insurancePartyCode",
                        label: "Insurance Party Code",
                    },

                ]

            );


        setErrors(validationErrors);


        if (
            Object.keys(validationErrors).length > 0
        ) {

            return;

        }


        // ==========================================
        // SAVE
        // ==========================================

        onSaveSuccess(formData);

    };


    return (

        <div className="common-modal">


            <div className="common-modal-content insurance-party-form-modal">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "EDIT INSURANCE PARTY"
                            : "ADD NEW"
                        }

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* ==========================================
                    FORM
                ========================================== */}

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >


                    <div className="common-form-grid">


                        {/* ==========================================
                            INSURANCE PARTY NAME
                        ========================================== */}

                        <div className="common-form-group">

                            <label>

                                Insurance Party Name

                                <span>
                                    *
                                </span>

                            </label>


                            <input
                                type="text"
                                name="insurancePartyName"
                                placeholder="Enter Insurance Party Name"
                                value={
                                    formData.insurancePartyName
                                }
                                onChange={handleChange}
                                className={
                                    errors.insurancePartyName
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.insurancePartyName && (

                                <p className="error-text">

                                    {
                                        errors.insurancePartyName
                                    }

                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            REMARK
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Remark
                            </label>


                            <input
                                type="text"
                                name="remark"
                                placeholder="Enter Remark"
                                value={
                                    formData.remark
                                }
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            INSURANCE PARTY CODE
                        ========================================== */}

                        <div className="common-form-group">

                            <label>

                                Insurance Party Code

                                <span>
                                    *
                                </span>

                            </label>


                            <input
                                type="text"
                                name="insurancePartyCode"
                                placeholder="Enter Insurance Party Code"
                                value={
                                    formData.insurancePartyCode
                                }
                                onChange={handleChange}
                                className={
                                    errors.insurancePartyCode
                                        ? "error-input"
                                        : ""
                                }
                            />


                            {errors.insurancePartyCode && (

                                <p className="error-text">

                                    {
                                        errors.insurancePartyCode
                                    }

                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            STATUS
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Status
                            </label>


                            <div className="radio-group">


                                {/* ACTIVE */}

                                <label>

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

                                    <span>
                                        Active
                                    </span>

                                </label>


                                {/* INACTIVE */}

                                <label>

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

                                    <span>
                                        Inactive
                                    </span>

                                </label>


                            </div>

                        </div>


                    </div>


                    {/* ==========================================
                        BUTTONS
                    ========================================== */}

                    <div className="common-form-buttons">


                        <SaveButton
                            type="submit"
                            text="Save"
                        />


                        <CancelButton
                            type="button"
                            text="Cancel"
                            onClick={onClose}
                        />


                    </div>


                </form>


            </div>

        </div>

    );

};


export default InsurancePartyForm;