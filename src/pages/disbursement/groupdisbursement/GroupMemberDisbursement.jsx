import React, { useState } from "react";

import "./GroupMemberDisbursement.css";

import GroupMemberDisbursementTable from "./GroupMemberDisbursementTable";


const GroupMemberDisbursement = () => {

    // =========================================================
    // FILTER STATES
    // =========================================================

    const [filters, setFilters] = useState({

        member: "",

        disbursementDateFrom: "",

        disbursementDateTo: "",

        emiEndDateFrom: "",

        emiEndDateTo: "",

        branch: "",

        staff: "",

        group: "",

    });


    // =========================================================
    // HANDLE CHANGE
    // =========================================================

    const handleChange = (
        field,
        value
    ) => {

        setFilters((prev) => ({

            ...prev,

            [field]: value,

        }));

    };


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = () => {

        console.log(
            "Group Disbursement Filters:",
            filters
        );

    };


    // =========================================================
    // GET PRINT
    // =========================================================

    const handlePrint = () => {

        window.print();

    };


    return (

        <div className="group-disbursement-page">


            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <div className="group-disbursement-header">

                <h1>
                    GROUPMEMBERDISBURSEMENT
                </h1>


                <div className="group-disbursement-breadcrumb">

                    <span>
                        DASHBOARD
                    </span>

                    <span>
                        ›
                    </span>

                    <strong>
                        GROUPMEMBERDISBURSEMENT
                    </strong>

                </div>

            </div>


            {/* =====================================================
                SEARCH CARD
            ===================================================== */}

            <div className="group-disbursement-search-card">


                <div className="group-disbursement-search-title">

                    SEARCH BY

                </div>


                <div className="group-disbursement-filter-grid">


                    {/* =================================================
                        MEMBER
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            MEMBER (TYPE HERE)
                        </label>

                        <div className="group-disbursement-input-wrapper">

                            <input
                                type="text"
                                value={
                                    filters.member
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "member",
                                        e.target.value
                                    )
                                }
                            />

                            {filters.member && (

                                <button
                                    type="button"
                                    className="group-disbursement-clear"
                                    onClick={() =>
                                        handleChange(
                                            "member",
                                            ""
                                        )
                                    }
                                >
                                    ×
                                </button>

                            )}

                            <span>
                                ▾
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        DISBURSEMENT DATE FROM
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            DISBURSEMENT DATE FROM
                        </label>

                        <input
                            type="date"
                            value={
                                filters.disbursementDateFrom
                            }
                            onChange={(e) =>
                                handleChange(
                                    "disbursementDateFrom",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        DISBURSEMENT DATE TO
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            DISBURSEMENT DATE TO
                        </label>

                        <input
                            type="date"
                            value={
                                filters.disbursementDateTo
                            }
                            onChange={(e) =>
                                handleChange(
                                    "disbursementDateTo",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        EMI END DATE FROM
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            EMI END DATE FROM
                        </label>

                        <input
                            type="date"
                            value={
                                filters.emiEndDateFrom
                            }
                            onChange={(e) =>
                                handleChange(
                                    "emiEndDateFrom",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        EMI END DATE TO
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            EMI END DATE TO
                        </label>

                        <input
                            type="date"
                            value={
                                filters.emiEndDateTo
                            }
                            onChange={(e) =>
                                handleChange(
                                    "emiEndDateTo",
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        BRANCH
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            BRANCH
                        </label>

                        <div className="group-disbursement-input-wrapper">

                            <select
                                value={
                                    filters.branch
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "branch",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Branch
                                </option>

                                <option value="MAIN BRANCH">
                                    MAIN BRANCH
                                </option>

                                <option value="LASKARHAT">
                                    LASKARHAT
                                </option>

                                <option value="ANAND NAGAR">
                                    ANAND NAGAR
                                </option>

                                <option value="RAMNAGAR">
                                    RAMNAGAR
                                </option>

                            </select>

                            <span>
                                ▾
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        STAFF ID
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            STAFF ID
                        </label>

                        <div className="group-disbursement-input-wrapper">

                            <input
                                type="text"
                                value={
                                    filters.staff
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "staff",
                                        e.target.value
                                    )
                                }
                            />

                            {filters.staff && (

                                <button
                                    type="button"
                                    className="group-disbursement-clear"
                                    onClick={() =>
                                        handleChange(
                                            "staff",
                                            ""
                                        )
                                    }
                                >
                                    ×
                                </button>

                            )}

                            <span>
                                ▾
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        GROUP
                    ================================================= */}

                    <div className="group-disbursement-field">

                        <label>
                            GROUP
                        </label>

                        <div className="group-disbursement-input-wrapper">

                            <select
                                value={
                                    filters.group
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "group",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Group
                                </option>

                                <option value="GROUP 01">
                                    GROUP 01
                                </option>

                                <option value="GROUP 02">
                                    GROUP 02
                                </option>

                                <option value="GROUP 03">
                                    GROUP 03
                                </option>

                                <option value="GROUP 04">
                                    GROUP 04
                                </option>

                            </select>

                            <span>
                                ▾
                            </span>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    BUTTONS
                ===================================================== */}

                <div className="group-disbursement-buttons">

                    <button
                        type="button"
                        className="group-disbursement-submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>


                    <button
                        type="button"
                        className="group-disbursement-print"
                        onClick={handlePrint}
                    >
                        Get Print
                    </button>

                </div>

            </div>


            {/* =====================================================
                TABLE
            ===================================================== */}

            <GroupMemberDisbursementTable
                filters={filters}
            />

        </div>

    );

};


export default GroupMemberDisbursement;