import React, {
    useState,
} from "react";

import "../../../components/common/CommonView.css";

import {    CloseButton,CancelButton,} from "../../../components/buttons";

import profileImage from "../../../assets/profile.png";


const InsurancePartyView = ({
    data,
    onClose,
}) => {

    const [preview, setPreview] =useState(profileImage);
        
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
                className="common-view-modal insurance-party-view-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="common-view-header">

                    <h2>
                        INSURANCE PARTY DETAILS
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
                            alt="Insurance Party"
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


                                {/* INSURANCE PARTY NAME */}

                                <tr>

                                    <td className="common-view-label">

                                        INSURANCE PARTY NAME :

                                    </td>

                                    <td className="common-view-value">

                                        {
                                            data.insurancePartyName ||
                                            "-"
                                        }

                                    </td>

                                </tr>


                                {/* INSURANCE PARTY CODE */}

                                <tr>

                                    <td className="common-view-label">

                                        INSURANCE PARTY CODE :

                                    </td>

                                    <td className="common-view-value">

                                        {
                                            data.insurancePartyCode ||
                                            "-"
                                        }

                                    </td>

                                </tr>


                                {/* REMARK */}

                                <tr>

                                    <td className="common-view-label">

                                        REMARK :

                                    </td>

                                    <td className="common-view-value">

                                        {
                                            data.remark ||
                                            "-"
                                        }

                                    </td>

                                </tr>


                                {/* CREATED AT */}

                                <tr>

                                    <td className="common-view-label">

                                        CREATED AT :

                                    </td>

                                    <td className="common-view-value">

                                        {
                                            data.createdAt ||
                                            "-"
                                        }

                                    </td>

                                </tr>


                                {/* STATUS */}

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

                                            {
                                                data.status ||
                                                "ACTIVE"
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


export default InsurancePartyView;