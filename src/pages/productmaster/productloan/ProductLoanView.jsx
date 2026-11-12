import React, {
    useState,
} from "react";

import "../../../components/common/CommonView.css";

import {
    CloseButton,
    CancelButton,
} from "../../../components/buttons";

import profileImage
    from "../../../assets/profile.png";


const ProductLoanView = ({
    data,
    onClose,
}) => {


    const [preview, setPreview] =
        useState(profileImage);


    if (!data) {

        return null;

    }


    // ==========================================
    // IMAGE
    // ==========================================

    const handleImage = (e) => {

        const file =
            e.target.files[0];


        if (file) {

            setPreview(
                URL.createObjectURL(
                    file
                )
            );

        }

    };


    return (

        <div className="common-view-overlay">


            <div className="common-view-modal product-loan-view-modal">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="common-view-header">

                    <h2>
                        PRODUCT LOAN DETAILS
                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* ==================================
                    BODY
                ================================== */}

                <div className="common-view-body">


                    {/* ==================================
                        IMAGE
                    ================================== */}

                    <div className="common-view-image">

                        <img
                            src={preview}
                            alt="Product Loan"
                        />


                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />

                    </div>


                    {/* ==================================
                        DETAILS
                    ================================== */}

                    <div className="common-view-details">


                        <table className="common-view-table">

                            <tbody>


                                <tr>

                                    <td className="common-view-label">
                                        LOAN ID :
                                    </td>

                                    <td className="common-view-value">
                                        {data.loanId || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        MEMBER NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.memberName || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        MOBILE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.mobile || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        BRANCH :
                                    </td>

                                    <td className="common-view-value">
                                        {data.branch || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        BRANCH CENTER :
                                    </td>

                                    <td className="common-view-value">
                                        {data.branchCenter || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        GROUP NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.groupName || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        PRODUCT :
                                    </td>

                                    <td className="common-view-value">
                                        {data.product || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        SUPPLIER NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.supplierName || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        MFG DATE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.mfgDate || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        EXPIRE DATE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.expireDate || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        IMEI NO 1 :
                                    </td>

                                    <td className="common-view-value">
                                        {data.imeiNo1 || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        IMEI NO 2 :
                                    </td>

                                    <td className="common-view-value">
                                        {data.imeiNo2 || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        SERIAL NO :
                                    </td>

                                    <td className="common-view-value">
                                        {data.serialNo || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        INSURANCE COMPANY :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.insuranceCompanyName
                                            || "-"
                                        }
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        WARRANTY :
                                    </td>

                                    <td className="common-view-value">
                                        {data.warranty || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        PRODUCT MRP :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.productMrp || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        DISCOUNT AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.discountAmount || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        SALE PRICE :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.salePrice || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        GST AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.gstAmount || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        UNITS :
                                    </td>

                                    <td className="common-view-value">
                                        {data.units || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        DOWN PAYMENT :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.downPayment || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        LOAN AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.loanAmount || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        DISBURSEMENT AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.disbursementAmount || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        TOTAL AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        ₹ {data.totalAmount || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        IS REFURBISHED :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.isRefurbished
                                            || "-"
                                        }
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        INSURANCE NUMBER :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.insuranceNumber
                                            || "-"
                                        }
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        INSURANCE START DATE :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.insuranceStartDate
                                            || "-"
                                        }
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        INSURANCE END DATE :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.insuranceEndDate
                                            || "-"
                                        }
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        REMARK :
                                    </td>

                                    <td className="common-view-value">
                                        {data.remark || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        DESCRIPTION :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.description
                                            || "-"
                                        }
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        CREATED AT :
                                    </td>

                                    <td className="common-view-value">
                                        {data.createdAt || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        STATUS :
                                    </td>

                                    <td className="common-view-value">

                                        <span
                                            className={`common-view-status ${
                                                String(
                                                    data.status
                                                ).toLowerCase()
                                            }`}
                                        >

                                            {
                                                data.status
                                                || "-"
                                            }

                                        </span>

                                    </td>

                                </tr>


                            </tbody>

                        </table>

                    </div>

                </div>


                {/* ==================================
                    FOOTER
                ================================== */}

                <div className="common-view-footer">

                    <CancelButton
                        text="Close"
                        onClick={onClose}
                    />

                </div>


            </div>

        </div>

    );

};


export default ProductLoanView;