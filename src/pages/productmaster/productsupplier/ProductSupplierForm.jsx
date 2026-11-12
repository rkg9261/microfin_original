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


const ProductSupplierForm = ({
    data,
    onSave,
    onClose,
}) => {

    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        supplierName: "",
        supplierCode: "",

        mobile: "",
        phone: "",

        email: "",

        organization: "",

        gstin: "",

        address: "",
        city: "",
        state: "",
        pin: "",

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

                supplierName:
                    data.supplierName || "",

                supplierCode:
                    data.supplierCode || "",

                mobile:
                    data.mobile || "",

                phone:
                    data.phone || "",

                email:
                    data.email || "",

                organization:
                    data.organization || "",

                gstin:
                    data.gstin || "",

                address:
                    data.address || "",

                city:
                    data.city || "",

                state:
                    data.state || "",

                pin:
                    data.pin || "",

                remark:
                    data.remark || "",

                status:
                    data.status || "ACTIVE",

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


        // Clear field error
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
                        name: "supplierName",
                        label: "Supplier Name",
                    },

                    {
                        name: "mobile",
                        label: "Mobile Number",
                    },

                    {
                        name: "email",
                        label: "Email",
                    },

                    {
                        name: "organization",
                        label: "Organization",
                    },

                    {
                        name: "address",
                        label: "Address",
                    },

                    {
                        name: "state",
                        label: "State",
                    },

                    {
                        name: "pin",
                        label: "PIN Code",
                    },

                ]

            );


        setErrors(validationErrors);


        if (
            Object.keys(validationErrors).length > 0
        ) {

            return;

        }


        onSave(formData);

    };


    return (

        <div className="common-modal">

            <div className="common-modal-content">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="common-modal-header">

                    <h2>

                        {

                            data
                                ? "Edit Product Supplier"
                                : "Add Product Supplier"

                        }

                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="common-form"
                    onSubmit={handleSubmit}
                >


                    <div className="common-form-grid">


                        {/* ==================================
                            SUPPLIER NAME
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                Supplier Name
                                <span> *</span>

                            </label>

                            <input
                                type="text"
                                name="supplierName"
                                placeholder="Enter Supplier Name"
                                value={formData.supplierName}
                                onChange={handleChange}
                                className={
                                    errors.supplierName
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.supplierName && (

                                <p className="error-text">

                                    {errors.supplierName}

                                </p>

                            )}

                        </div>


                        {/* ==================================
                            ADDRESS
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                Address
                                <span> *</span>

                            </label>

                            <input
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={formData.address}
                                onChange={handleChange}
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


                        {/* ==================================
                            SUPPLIER CODE
                        ================================== */}

                        <div className="common-form-group">

                            <label>
                                Supplier Code
                            </label>

                            <input
                                type="text"
                                name="supplierCode"
                                placeholder="Enter Supplier Code"
                                value={formData.supplierCode}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==================================
                            CITY
                        ================================== */}

                        <div className="common-form-group">

                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                placeholder="Enter City"
                                value={formData.city}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==================================
                            MOBILE
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                Mobile No
                                <span> *</span>

                            </label>

                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Enter Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                maxLength="10"
                                className={
                                    errors.mobile
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.mobile && (

                                <p className="error-text">

                                    {errors.mobile}

                                </p>

                            )}

                        </div>


                        {/* ==================================
                            STATE
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                State
                                <span> *</span>

                            </label>

                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={
                                    errors.state
                                        ? "error-input"
                                        : ""
                                }
                            >

                                <option value="">
                                    Select State
                                </option>

                                <option value="Andhra Pradesh">
                                    Andhra Pradesh
                                </option>

                                <option value="Bihar">
                                    Bihar
                                </option>

                                <option value="Delhi">
                                    Delhi
                                </option>

                                <option value="Gujarat">
                                    Gujarat
                                </option>

                                <option value="Haryana">
                                    Haryana
                                </option>

                                <option value="Jharkhand">
                                    Jharkhand
                                </option>

                                <option value="Madhya Pradesh">
                                    Madhya Pradesh
                                </option>

                                <option value="Maharashtra">
                                    Maharashtra
                                </option>

                                <option value="Punjab">
                                    Punjab
                                </option>

                                <option value="Rajasthan">
                                    Rajasthan
                                </option>

                                <option value="Uttar Pradesh">
                                    Uttar Pradesh
                                </option>

                                <option value="Uttarakhand">
                                    Uttarakhand
                                </option>

                                <option value="West Bengal">
                                    West Bengal
                                </option>

                            </select>

                            {errors.state && (

                                <p className="error-text">

                                    {errors.state}

                                </p>

                            )}

                        </div>


                        {/* ==================================
                            PHONE
                        ================================== */}

                        <div className="common-form-group">

                            <label>
                                Phone No
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==================================
                            PIN
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                PIN
                                <span> *</span>

                            </label>

                            <input
                                type="text"
                                name="pin"
                                placeholder="Enter PIN Code"
                                value={formData.pin}
                                onChange={handleChange}
                                maxLength="6"
                                className={
                                    errors.pin
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.pin && (

                                <p className="error-text">

                                    {errors.pin}

                                </p>

                            )}

                        </div>


                        {/* ==================================
                            EMAIL
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                Email
                                <span> *</span>

                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={
                                    errors.email
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.email && (

                                <p className="error-text">

                                    {errors.email}

                                </p>

                            )}

                        </div>


                        {/* ==================================
                            REMARK
                        ================================== */}

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


                        {/* ==================================
                            ORGANIZATION
                        ================================== */}

                        <div className="common-form-group">

                            <label>

                                Organization
                                <span> *</span>

                            </label>

                            <input
                                type="text"
                                name="organization"
                                placeholder="Enter Organization"
                                value={formData.organization}
                                onChange={handleChange}
                                className={
                                    errors.organization
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.organization && (

                                <p className="error-text">

                                    {errors.organization}

                                </p>

                            )}

                        </div>


                        {/* ==================================
                            STATUS
                        ================================== */}

                        <div className="common-form-group">

                            <label>
                                Status
                            </label>


                            <div className="status-radio-group">


                                <label className="status-radio-label">

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


                                <label className="status-radio-label">

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


                        {/* ==================================
                            GSTIN
                        ================================== */}

                        <div className="common-form-group">

                            <label>
                                GSTIN
                            </label>

                            <input
                                type="text"
                                name="gstin"
                                placeholder="Enter GSTIN"
                                value={formData.gstin}
                                onChange={handleChange}
                            />

                        </div>


                    </div>


                    {/* ==================================
                        BUTTONS
                    ================================== */}

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


export default ProductSupplierForm;