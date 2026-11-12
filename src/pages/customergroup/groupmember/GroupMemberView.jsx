import React, {
    useState,
} from "react";

import "../../../components/common/CommonView.css";

import {
    CloseButton,
    CancelButton,
} from "../../../components/buttons";

import profileImage from "../../../assets/profile.png";


const GroupMemberView = ({
    data,
    onClose,
}) => {


    const [preview, setPreview] =
        useState(profileImage);


    if (!data) {

        return null;

    }


    // =====================================================
    // IMAGE
    // =====================================================

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

                className="common-view-modal group-member-view-modal"

                onClick={(e) =>
                    e.stopPropagation()
                }

            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="common-view-header">

                    <h2>
                        GROUP MEMBER DETAILS
                    </h2>


                    <CloseButton
                        onClick={onClose}
                    />

                </div>


                {/* =================================================
                    BODY
                ================================================= */}

                <div className="common-view-body">


                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="common-view-image">

                        <img

                            src={preview}

                            alt="Group Member"

                        />


                        <input

                            type="file"

                            accept="image/*"

                            onChange={
                                handleImage
                            }

                        />

                    </div>


                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="common-view-details">

                        <table className="common-view-table">

                            <tbody>


                                {/* CODE */}

                                <tr>

                                    <td className="common-view-label">
                                        CODE :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.code ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* GROUP NAME */}

                                <tr>

                                    <td className="common-view-label">
                                        GROUP NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.name ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* GROUP CITY */}

                                <tr>

                                    <td className="common-view-label">
                                        GROUP CITY :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.groupCity ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* MEMBER NAME */}

                                <tr>

                                    <td className="common-view-label">
                                        MEMBER NAME :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.memberName ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* MEMBER CODE */}

                                <tr>

                                    <td className="common-view-label">
                                        MEMBER CODE :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.memberCode ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* MOBILE */}

                                <tr>

                                    <td className="common-view-label">
                                        MOBILE :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.mobile ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* BRANCH */}

                                <tr>

                                    <td className="common-view-label">
                                        BRANCH :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.branch ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* BRANCH CODE */}

                                <tr>

                                    <td className="common-view-label">
                                        BRANCH CODE :
                                    </td>

                                    <td className="common-view-value">
                                        {
                                            data.branchCode ||
                                            "-"
                                        }
                                    </td>

                                </tr>


                                {/* CREATED */}

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

                                            className={`
                                                common-view-status
                                                ${
                                                    data.status ===
                                                    "ACTIVE"
                                                        ? "active"
                                                        : "inactive"
                                                }
                                            `}

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


                {/* =================================================
                    FOOTER
                ================================================= */}

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


export default GroupMemberView;