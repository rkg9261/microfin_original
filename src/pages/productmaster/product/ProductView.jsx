import React, {
    useState,
} from "react";

import "../../../components/common/CommonView.css";

import {
    CloseButton,
    CancelButton,
} from "../../../components/buttons";

import profileImage from "../../../assets/profile.png";


const ProductView = ({
    data,
    onClose,
}) => {

    const [preview, setPreview] =
        useState(profileImage);


    if (!data) return null;


    // ==========================================
    // IMAGE
    // ==========================================

    const handleImage = (e) => {

        const file =
            e.target.files[0];


        if (file) {

            setPreview(
                URL.createObjectURL(file)
            );

        }

    };


    return (

        <div
            className="common-view-overlay"
            onClick={onClose}
        >

            <div
                className="common-view-modal product-view-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="common-view-header">

                    <h2>
                        PRODUCT DETAILS
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
                            alt="Product"
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
                                        PRODUCT NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.productName}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        VARIANT NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.variantName || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        PRODUCT CODE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.productCode || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        PRODUCT ABOUT :
                                    </td>

                                    <td className="common-view-value">
                                        {data.about || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        BRAND NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.brandName}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        CATEGORY NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {data.categoryName}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        DESCRIPTION :
                                    </td>

                                    <td className="common-view-value">
                                        {data.description || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        HSN / SAC :
                                    </td>

                                    <td className="common-view-value">
                                        {data.hsnSac || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        MRP PRICE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.mrpPrice || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        COST PRICE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.costPrice || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        SALE PRICE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.salePrice || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        DISCOUNT AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        {data.discountAmount || "-"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        GST PERCENTAGE :
                                    </td>

                                    <td className="common-view-value">
                                        {data.gstPercentage || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        GST AMOUNT :
                                    </td>

                                    <td className="common-view-value">
                                        {data.gstAmount || "0"}
                                    </td>

                                </tr>


                                <tr>

                                    <td className="common-view-label">
                                        TOTAL :
                                    </td>

                                    <td className="common-view-value">
                                        {data.total || "-"}
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
                                                data.status === "ACTIVE"
                                                    ? "active"
                                                    : "inactive"
                                            }`}
                                        >

                                            {data.status}

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

export default ProductView;