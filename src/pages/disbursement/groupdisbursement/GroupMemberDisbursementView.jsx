import React from "react";

import "./GroupMemberDisbursement.css";


const GroupMemberDisbursementView = ({
    data,
    onClose,
}) => {

    return (

        <div
            className="group-disbursement-modal-overlay"
            onClick={onClose}
        >

            <div
                className="group-disbursement-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="group-modal-header">

                    <div>

                        <h2>
                            GROUP DISBURSEMENT DETAILS
                        </h2>

                        <p>
                            Application No:
                            {" "}
                            {data.applicationNo}
                        </p>

                    </div>


                    <button
                        type="button"
                        className="group-modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* =================================================
                    BODY
                ================================================= */}

                <div className="group-modal-body">


                    {/* LOAN */}

                    <div className="group-modal-section">

                        <div className="group-modal-section-title">

                            LOAN INFORMATION

                        </div>


                        <div className="group-details-grid">

                            <Detail
                                label="APPLICATION NO"
                                value={
                                    data.applicationNo
                                }
                            />

                            <Detail
                                label="PL NAME"
                                value={
                                    data.plName
                                }
                            />

                            <Detail
                                label="PENALTY NAME"
                                value={
                                    data.penaltyName
                                }
                            />

                            <Detail
                                label="EMI TYPE"
                                value={
                                    data.emiType
                                }
                            />

                            <Detail
                                label="PLAN AMOUNT"
                                value={`₹${data.planAmount}`}
                            />

                            <Detail
                                label="DISBURSEMENT AMOUNT"
                                value={`₹${data.disAmount}`}
                            />

                            <Detail
                                label="PAYMENT MODE"
                                value={
                                    data.payMode
                                }
                            />

                        </div>

                    </div>


                    {/* DATES */}

                    <div className="group-modal-section">

                        <div className="group-modal-section-title">

                            DATE INFORMATION

                        </div>


                        <div className="group-details-grid">

                            <Detail
                                label="DISBURSEMENT DATE"
                                value={
                                    data.disDate
                                }
                            />

                            <Detail
                                label="EMI START DATE"
                                value={
                                    data.emiStartDate
                                }
                            />

                            <Detail
                                label="EMI END DATE"
                                value={
                                    data.emiEndDate
                                }
                            />

                        </div>

                    </div>


                    {/* MEMBER */}

                    <div className="group-modal-section">

                        <div className="group-modal-section-title">

                            MEMBER INFORMATION

                        </div>


                        <div className="group-details-grid">

                            <Detail
                                label="MEMBER"
                                value={
                                    data.member
                                }
                            />

                            <Detail
                                label="GROUP"
                                value={
                                    data.group
                                }
                            />

                            <Detail
                                label="BRANCH CENTER"
                                value={
                                    data.branchCenter
                                }
                            />

                            <Detail
                                label="BRANCH"
                                value={
                                    data.branch
                                }
                            />

                            <Detail
                                label="STAFF"
                                value={
                                    data.staff
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="group-modal-footer">

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

};


const Detail = ({
    label,
    value,
}) => {

    return (

        <div className="group-detail-item">

            <label>
                {label}
            </label>

            <span>
                {value || "-"}
            </span>

        </div>

    );

};


export default GroupMemberDisbursementView;