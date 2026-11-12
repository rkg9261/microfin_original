import React, { useEffect, useState } from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";

import { validateRequired } from "../../../utils/validation";

import {
    SaveButton,
    CancelButton,
    CloseButton,
} from "../../../components/buttons";


const ProductForm = ({
    data,
    onSave,
    onClose,
}) => {

    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        categoryName: "",
        brandName: "",
        variantName: "",

        productName: "",
        productCode: "",

        hsnSac: "",

        about: "",
        description: "",

        mrpPrice: "",
        costPrice: "",
        salePrice: "",

        discountAmount: "",

        gstAmount: "",
        gstPercentage: "",

        total: "",

        tag: "",

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

                categoryName: data.categoryName || "",
                brandName: data.brandName || "",
                variantName: data.variantName || "",

                productName: data.productName || "",
                productCode: data.productCode || "",

                hsnSac: data.hsnSac || "",

                about: data.about || "",
                description: data.description || "",

                mrpPrice: data.mrpPrice || "",
                costPrice: data.costPrice || "",
                salePrice: data.salePrice || "",

                discountAmount: data.discountAmount || "",

                gstAmount: data.gstAmount || "",
                gstPercentage: data.gstPercentage || "",

                total: data.total || "",

                tag: data.tag || "",
                remark: data.remark || "",

                status: data.status || "ACTIVE",

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


        const validationErrors = validateRequired(

            formData,

            [

                {
                    name: "categoryName",
                    label: "Category Name",
                },

                {
                    name: "brandName",
                    label: "Brand Name",
                },

                {
                    name: "variantName",
                    label: "Product Variant",
                },

                {
                    name: "productName",
                    label: "Product Name",
                },

                {
                    name: "productCode",
                    label: "Product Code",
                },

                {
                    name: "mrpPrice",
                    label: "MRP Price",
                },

                {
                    name: "salePrice",
                    label: "Sale Price",
                },

                {
                    name: "total",
                    label: "Total",
                },

            ]

        );


        setErrors(validationErrors);


        if (Object.keys(validationErrors).length > 0) {

            return;

        }


        onSave(formData);

    };


    return (

        <div className="common-modal">

            <div className="common-modal-content">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "EDIT PRODUCT"
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
                            CATEGORY NAME
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Category Name
                                <span> *</span>
                            </label>

                            <input
                                type="text"
                                name="categoryName"
                                placeholder="Enter Category Name"
                                value={formData.categoryName}
                                onChange={handleChange}
                                className={
                                    errors.categoryName
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.categoryName && (

                                <p className="error-text">
                                    {errors.categoryName}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            MRP PRICE
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                MRP Price
                                <span> *</span>
                            </label>

                            <input
                                type="number"
                                name="mrpPrice"
                                placeholder="Enter MRP Price"
                                value={formData.mrpPrice}
                                onChange={handleChange}
                                className={
                                    errors.mrpPrice
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.mrpPrice && (

                                <p className="error-text">
                                    {errors.mrpPrice}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            BRAND NAME
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Brand Name
                                <span> *</span>
                            </label>

                            <input
                                type="text"
                                name="brandName"
                                placeholder="Enter Brand Name"
                                value={formData.brandName}
                                onChange={handleChange}
                                className={
                                    errors.brandName
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.brandName && (

                                <p className="error-text">
                                    {errors.brandName}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            COST PRICE
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Cost Price
                            </label>

                            <input
                                type="number"
                                name="costPrice"
                                placeholder="Enter Cost Price"
                                value={formData.costPrice}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            PRODUCT VARIANT
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Product Variant
                                <span> *</span>
                            </label>

                            <input
                                type="text"
                                name="variantName"
                                placeholder="Enter Product Variant"
                                value={formData.variantName}
                                onChange={handleChange}
                                className={
                                    errors.variantName
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.variantName && (

                                <p className="error-text">
                                    {errors.variantName}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            SALE PRICE
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Sale Price (Without GST)
                                <span> *</span>
                            </label>

                            <input
                                type="number"
                                name="salePrice"
                                placeholder="Enter Sale Price"
                                value={formData.salePrice}
                                onChange={handleChange}
                                className={
                                    errors.salePrice
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.salePrice && (

                                <p className="error-text">
                                    {errors.salePrice}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            PRODUCT NAME
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Product Name
                                <span> *</span>
                            </label>

                            <input
                                type="text"
                                name="productName"
                                placeholder="Enter Product Name"
                                value={formData.productName}
                                onChange={handleChange}
                                className={
                                    errors.productName
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.productName && (

                                <p className="error-text">
                                    {errors.productName}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            DISCOUNT AMOUNT
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Discount Amount
                            </label>

                            <input
                                type="number"
                                name="discountAmount"
                                placeholder="Enter Discount Amount"
                                value={formData.discountAmount}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            PRODUCT CODE
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Product Code
                                <span> *</span>
                            </label>

                            <input
                                type="text"
                                name="productCode"
                                placeholder="Enter Product Code"
                                value={formData.productCode}
                                onChange={handleChange}
                                className={
                                    errors.productCode
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.productCode && (

                                <p className="error-text">
                                    {errors.productCode}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            GST AMOUNT
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                GST Amount
                            </label>

                            <input
                                type="number"
                                name="gstAmount"
                                placeholder="Enter GST Amount"
                                value={formData.gstAmount}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            HSN / SAC
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                HSN / SAC
                            </label>

                            <input
                                type="text"
                                name="hsnSac"
                                placeholder="Enter HSN / SAC"
                                value={formData.hsnSac}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            GST PERCENTAGE
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                GST Percentage
                            </label>

                            <input
                                type="number"
                                name="gstPercentage"
                                placeholder="Enter GST Percentage"
                                value={formData.gstPercentage}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            ABOUT
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                About
                            </label>

                            <input
                                type="text"
                                name="about"
                                placeholder="Enter About Product"
                                value={formData.about}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            TOTAL
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Total
                                <span> *</span>
                            </label>

                            <input
                                type="number"
                                name="total"
                                placeholder="Enter Total"
                                value={formData.total}
                                onChange={handleChange}
                                className={
                                    errors.total
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.total && (

                                <p className="error-text">
                                    {errors.total}
                                </p>

                            )}

                        </div>


                        {/* ==========================================
                            DESCRIPTION
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Enter Description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                            />

                        </div>


                        {/* ==========================================
                            TAG
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Tag
                            </label>

                            <input
                                type="text"
                                name="tag"
                                placeholder="Enter Tag"
                                value={formData.tag}
                                onChange={handleChange}
                            />

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
                                value={formData.remark}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ==========================================
                            STATUS
                        ========================================== */}

                        <div className="common-form-group">

                            <label>
                                Status
                            </label>

                            <div className="radio-group">

                                <label>

                                    <input
                                        type="radio"
                                        name="status"
                                        value="ACTIVE"
                                        checked={
                                            formData.status === "ACTIVE"
                                        }
                                        onChange={handleChange}
                                    />

                                    <span>
                                        Active
                                    </span>

                                </label>


                                <label>

                                    <input
                                        type="radio"
                                        name="status"
                                        value="INACTIVE"
                                        checked={
                                            formData.status === "INACTIVE"
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

export default ProductForm;