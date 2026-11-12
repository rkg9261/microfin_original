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


const ProductLoanForm = ({
    data,
    onSave,
    onClose,
}) => {


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        branch: "",

        supplierName: "",

        mfgDate: "",

        branchCenter: "",

        imeiNo1: "",

        expireDate: "",

        productName: "",

        imeiNo2: "",

        insuranceCompanyName: "",

        memberName: "",

        serialNo: "",

        warranty: "",

        productMrp: "",

        discountAmount: "",

        salePrice: "",

        gstAmount: "",

        units: "",

        downPayment: "",

        loanAmount: "",

        disbursementAmount: "",

        totalAmount: "",

        isRefurbished: "",

        insuranceNumber: "",

        insuranceStartDate: "",

        insuranceEndDate: "",

        remark: "",

        description: "",

        status: "ACTIVE",

    });


    const [errors, setErrors] = useState({});


    // ==========================================
    // EDIT DATA
    // ==========================================

    useEffect(() => {

        if (data) {

            setFormData({

                branch:
                    data.branch || "",

                supplierName:
                    data.supplierName || "",

                mfgDate:
                    data.mfgDate || "",

                branchCenter:
                    data.branchCenter || "",

                imeiNo1:
                    data.imeiNo1 || "",

                expireDate:
                    data.expireDate || "",

                productName:
                    data.productName || "",

                imeiNo2:
                    data.imeiNo2 || "",

                insuranceCompanyName:
                    data.insuranceCompanyName || "",

                memberName:
                    data.memberName || "",

                serialNo:
                    data.serialNo || "",

                warranty:
                    data.warranty || "",

                productMrp:
                    data.productMrp || "",

                discountAmount:
                    data.discountAmount || "",

                salePrice:
                    data.salePrice || "",

                gstAmount:
                    data.gstAmount || "",

                units:
                    data.units || "",

                downPayment:
                    data.downPayment || "",

                loanAmount:
                    data.loanAmount || "",

                disbursementAmount:
                    data.disbursementAmount || "",

                totalAmount:
                    data.totalAmount || "",

                isRefurbished:
                    data.isRefurbished || "",

                insuranceNumber:
                    data.insuranceNumber || "",

                insuranceStartDate:
                    data.insuranceStartDate || "",

                insuranceEndDate:
                    data.insuranceEndDate || "",

                remark:
                    data.remark || "",

                description:
                    data.description || "",

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
                        name: "branch",
                        label: "Branch",
                    },

                    {
                        name: "mfgDate",
                        label: "MFG Date",
                    },

                    {
                        name: "memberName",
                        label: "Member",
                    },

                    {
                        name: "productName",
                        label: "Product Name",
                    },

                    {
                        name: "productMrp",
                        label: "Product MRP",
                    },

                    {
                        name: "salePrice",
                        label: "Sale Price",
                    },

                    {
                        name: "totalAmount",
                        label: "Total Amount",
                    },

                    {
                        name: "isRefurbished",
                        label: "Is Refurbished",
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

        <div className="common-modal ">


            <div className="common-modal-content product-loan-form-modal">


                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="common-modal-header">

                    <h2>

                        {data
                            ? "EDIT PRODUCT LOAN"
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


                        {/* BRANCH */}

                        <div className="common-form-group">

                            <label>

                                Branch
                                <span> *</span>

                            </label>

                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className={
                                    errors.branch
                                        ? "error-input"
                                        : ""
                                }
                            >

                                <option value="">
                                    Select Branch
                                </option>

                                <option value="SHREEJA GROUP">
                                    SHREEJA GROUP
                                </option>

                                <option value="LASKARHAT">
                                    LASKARHAT
                                </option>

                            </select>

                            {errors.branch && (

                                <p className="error-text">
                                    {errors.branch}
                                </p>

                            )}

                        </div>


                        {/* SUPPLIER */}

                        <div className="common-form-group">

                            <label>
                                Supplier Name
                            </label>

                            <input
                                type="text"
                                name="supplierName"
                                placeholder="Supplier Name"
                                value={formData.supplierName}
                                onChange={handleChange}
                            />

                        </div>


                        {/* MFG DATE */}

                        <div className="common-form-group">

                            <label>

                                MFG Date
                                <span> *</span>

                            </label>

                            <input
                                type="date"
                                name="mfgDate"
                                value={formData.mfgDate}
                                onChange={handleChange}
                                className={
                                    errors.mfgDate
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.mfgDate && (

                                <p className="error-text">
                                    {errors.mfgDate}
                                </p>

                            )}

                        </div>


                        {/* BRANCH CENTER */}

                        <div className="common-form-group">

                            <label>
                                Branch Center
                            </label>

                            <input
                                type="text"
                                name="branchCenter"
                                placeholder="Branch Center"
                                value={formData.branchCenter}
                                onChange={handleChange}
                            />

                        </div>


                        {/* IMEI 1 */}

                        <div className="common-form-group">

                            <label>
                                IMEI No 1
                            </label>

                            <input
                                type="text"
                                name="imeiNo1"
                                placeholder="Enter IMEI No 1"
                                value={formData.imeiNo1}
                                onChange={handleChange}
                            />

                        </div>


                        {/* EXPIRE DATE */}

                        <div className="common-form-group">

                            <label>
                                Expire Date
                            </label>

                            <input
                                type="date"
                                name="expireDate"
                                value={formData.expireDate}
                                onChange={handleChange}
                            />

                        </div>


                        {/* PRODUCT NAME */}

                        <div className="common-form-group">

                            <label>

                                Product Name
                                <span> *</span>

                            </label>

                            <input
                                type="text"
                                name="productName"
                                placeholder="Product Name"
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


                        {/* IMEI 2 */}

                        <div className="common-form-group">

                            <label>
                                IMEI No 2
                            </label>

                            <input
                                type="text"
                                name="imeiNo2"
                                placeholder="Enter IMEI No 2"
                                value={formData.imeiNo2}
                                onChange={handleChange}
                            />

                        </div>


                        {/* INSURANCE COMPANY */}

                        <div className="common-form-group">

                            <label>
                                Insurance Company Name
                            </label>

                            <input
                                type="text"
                                name="insuranceCompanyName"
                                placeholder="Insurance Company Name"
                                value={formData.insuranceCompanyName}
                                onChange={handleChange}
                            />

                        </div>


                        {/* MEMBER */}

                        <div className="common-form-group">

                            <label>

                                Member
                                <span> *</span>

                            </label>

                            <input
                                type="text"
                                name="memberName"
                                placeholder="Member Name"
                                value={formData.memberName}
                                onChange={handleChange}
                                className={
                                    errors.memberName
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.memberName && (

                                <p className="error-text">
                                    {errors.memberName}
                                </p>

                            )}

                        </div>


                        {/* SERIAL */}

                        <div className="common-form-group">

                            <label>
                                Serial No
                            </label>

                            <input
                                type="text"
                                name="serialNo"
                                placeholder="Serial No"
                                value={formData.serialNo}
                                onChange={handleChange}
                            />

                        </div>


                        {/* WARRANTY */}

                        <div className="common-form-group">

                            <label>
                                Warranty
                            </label>

                            <input
                                type="text"
                                name="warranty"
                                placeholder="Warranty"
                                value={formData.warranty}
                                onChange={handleChange}
                            />

                        </div>


                        {/* PRODUCT MRP */}

                        <div className="common-form-group">

                            <label>

                                Product MRP
                                <span> *</span>

                            </label>

                            <input
                                type="number"
                                name="productMrp"
                                placeholder="Product MRP"
                                value={formData.productMrp}
                                onChange={handleChange}
                                className={
                                    errors.productMrp
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.productMrp && (

                                <p className="error-text">
                                    {errors.productMrp}
                                </p>

                            )}

                        </div>


                        {/* DISCOUNT */}

                        <div className="common-form-group">

                            <label>
                                Discount Amount
                            </label>

                            <input
                                type="number"
                                name="discountAmount"
                                placeholder="Discount Amount"
                                value={formData.discountAmount}
                                onChange={handleChange}
                            />

                        </div>


                        {/* SALE PRICE */}

                        <div className="common-form-group">

                            <label>

                                Sale Price
                                <span> *</span>

                            </label>

                            <input
                                type="number"
                                name="salePrice"
                                placeholder="Sale Price"
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


                        {/* GST */}

                        <div className="common-form-group">

                            <label>
                                GST Amount
                            </label>

                            <input
                                type="number"
                                name="gstAmount"
                                placeholder="GST Amount"
                                value={formData.gstAmount}
                                onChange={handleChange}
                            />

                        </div>


                        {/* UNITS */}

                        <div className="common-form-group">

                            <label>
                                Units
                            </label>

                            <input
                                type="number"
                                name="units"
                                placeholder="Units"
                                value={formData.units}
                                onChange={handleChange}
                            />

                        </div>


                        {/* DOWN PAYMENT */}

                        <div className="common-form-group">

                            <label>
                                Downpayment
                            </label>

                            <input
                                type="number"
                                name="downPayment"
                                placeholder="Downpayment"
                                value={formData.downPayment}
                                onChange={handleChange}
                            />

                        </div>


                        {/* LOAN AMOUNT */}

                        <div className="common-form-group">

                            <label>
                                Loan Amount
                            </label>

                            <input
                                type="number"
                                name="loanAmount"
                                placeholder="Loan Amount"
                                value={formData.loanAmount}
                                onChange={handleChange}
                            />

                        </div>


                        {/* DISBURSEMENT */}

                        <div className="common-form-group">

                            <label>
                                Disbursement Amount
                            </label>

                            <input
                                type="number"
                                name="disbursementAmount"
                                placeholder="Disbursement Amount"
                                value={formData.disbursementAmount}
                                onChange={handleChange}
                            />

                        </div>


                        {/* TOTAL */}

                        <div className="common-form-group">

                            <label>

                                Total Amount
                                <span> *</span>

                            </label>

                            <input
                                type="number"
                                name="totalAmount"
                                placeholder="Total Amount"
                                value={formData.totalAmount}
                                onChange={handleChange}
                                className={
                                    errors.totalAmount
                                        ? "error-input"
                                        : ""
                                }
                            />

                            {errors.totalAmount && (

                                <p className="error-text">
                                    {errors.totalAmount}
                                </p>

                            )}

                        </div>


                        {/* IS REFURBISHED */}

                        <div className="common-form-group">

                            <label>

                                Is Refurbished
                                <span> *</span>

                            </label>

                            <select
                                name="isRefurbished"
                                value={formData.isRefurbished}
                                onChange={handleChange}
                                className={
                                    errors.isRefurbished
                                        ? "error-input"
                                        : ""
                                }
                            >

                                <option value="">
                                    Select Is Refurbished
                                </option>

                                <option value="YES">
                                    Yes
                                </option>

                                <option value="NO">
                                    No
                                </option>

                            </select>

                            {errors.isRefurbished && (

                                <p className="error-text">
                                    {errors.isRefurbished}
                                </p>

                            )}

                        </div>


                        {/* INSURANCE NUMBER */}

                        <div className="common-form-group">

                            <label>
                                Insurance Number
                            </label>

                            <input
                                type="text"
                                name="insuranceNumber"
                                placeholder="Insurance Number"
                                value={formData.insuranceNumber}
                                onChange={handleChange}
                            />

                        </div>


                        {/* INSURANCE START */}

                        <div className="common-form-group">

                            <label>
                                Insurance Start Date
                            </label>

                            <input
                                type="date"
                                name="insuranceStartDate"
                                value={formData.insuranceStartDate}
                                onChange={handleChange}
                            />

                        </div>


                        {/* INSURANCE END */}

                        <div className="common-form-group">

                            <label>
                                Insurance End Date
                            </label>

                            <input
                                type="date"
                                name="insuranceEndDate"
                                value={formData.insuranceEndDate}
                                onChange={handleChange}
                            />

                        </div>


                        {/* REMARK */}

                        <div className="common-form-group">

                            <label>
                                Remark
                            </label>

                            <input
                                type="text"
                                name="remark"
                                placeholder="Remark"
                                value={formData.remark}
                                onChange={handleChange}
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="common-form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>


                        {/* STATUS */}

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


export default ProductLoanForm;