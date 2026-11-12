import React, { useState } from "react";
import "./Disbursement.css";

import DisbursementTable from "./DisbursementTable";

import { ResetButton } from "../../../components/buttons";


const Disbursement = () => {

    // =========================================================
    // FILTER STATES
    // =========================================================

    const [member, setMember] = useState("");

    const [disbursementDateFrom, setDisbursementDateFrom] =
        useState("");

    const [disbursementDateTo, setDisbursementDateTo] =
        useState("");

    const [emiEndDateFrom, setEmiEndDateFrom] =
        useState("");

    const [emiEndDateTo, setEmiEndDateTo] =
        useState("");

    const [branch, setBranch] = useState("");

    const [staff, setStaff] = useState("");


    // =========================================================
    // SEARCH STATE
    // =========================================================

    const [searchFilters, setSearchFilters] = useState({
        member: "",
        disbursementDateFrom: "",
        disbursementDateTo: "",
        emiEndDateFrom: "",
        emiEndDateTo: "",
        branch: "",
        staff: "",
    });


    // =========================================================
    // SUBMIT SEARCH
    // =========================================================

    const handleSearch = () => {

        setSearchFilters({
            member,
            disbursementDateFrom,
            disbursementDateTo,
            emiEndDateFrom,
            emiEndDateTo,
            branch,
            staff,
        });

    };


    // =========================================================
    // RESET FILTER
    // =========================================================

    const handleReset = () => {

        setMember("");
        setDisbursementDateFrom("");
        setDisbursementDateTo("");
        setEmiEndDateFrom("");
        setEmiEndDateTo("");
        setBranch("");
        setStaff("");

        setSearchFilters({
            member: "",
            disbursementDateFrom: "",
            disbursementDateTo: "",
            emiEndDateFrom: "",
            emiEndDateTo: "",
            branch: "",
            staff: "",
        });

    };


    return (

        <div className="disbursement-page">


            {/* =====================================================
                PAGE TITLE
            ===================================================== */}

            <div className="disbursement-page-heading">

                <h2>
                    DISBURSEMENT
                </h2>

            </div>


            {/* =====================================================
                SEARCH CARD
            ===================================================== */}

            <div className="disbursement-search-card">


                {/* SEARCH HEADER */}

                <div className="disbursement-search-header">

                    <span>
                        SEARCH BY
                    </span>

                </div>


                {/* SEARCH BODY */}

                <div className="disbursement-search-body">


                    {/* =================================================
                        MEMBER
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            MEMBER (TYPE HERE)
                        </label>

                        <div className="disbursement-input-wrapper">

                            <input
                                type="text"
                                value={member}
                                onChange={(e) =>
                                    setMember(e.target.value)
                                }
                            />

                            {member && (
                                <button
                                    type="button"
                                    className="disbursement-clear-btn"
                                    onClick={() =>
                                        setMember("")
                                    }
                                >
                                    ×
                                </button>
                            )}

                            <span className="disbursement-dropdown-icon">
                                ▼
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        DISBURSEMENT DATE FROM
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            DISBURSEMENT DATE FROM
                        </label>

                        <input
                            type="date"
                            value={disbursementDateFrom}
                            onChange={(e) =>
                                setDisbursementDateFrom(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        DISBURSEMENT DATE TO
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            DISBURSEMENT DATE TO
                        </label>

                        <input
                            type="date"
                            value={disbursementDateTo}
                            onChange={(e) =>
                                setDisbursementDateTo(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        EMI END DATE FROM
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            EMI END DATE FROM
                        </label>

                        <input
                            type="date"
                            value={emiEndDateFrom}
                            onChange={(e) =>
                                setEmiEndDateFrom(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        EMI END DATE TO
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            EMI END DATE TO
                        </label>

                        <input
                            type="date"
                            value={emiEndDateTo}
                            onChange={(e) =>
                                setEmiEndDateTo(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =================================================
                        BRANCH
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            SELECT BRANCH
                        </label>

                        <select
                            value={branch}
                            onChange={(e) =>
                                setBranch(e.target.value)
                            }
                        >

                            <option value="">
                                Select Company Branch
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

                    </div>


                    {/* =================================================
                        STAFF
                    ================================================= */}

                    <div className="disbursement-field">

                        <label>
                            STAFF ID
                        </label>

                        <div className="disbursement-input-wrapper">

                            <input
                                type="text"
                                value={staff}
                                onChange={(e) =>
                                    setStaff(e.target.value)
                                }
                            />

                            {staff && (
                                <button
                                    type="button"
                                    className="disbursement-clear-btn"
                                    onClick={() =>
                                        setStaff("")
                                    }
                                >
                                    ×
                                </button>
                            )}

                            <span className="disbursement-dropdown-icon">
                                ▼
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="disbursement-filter-buttons">

                        <button
                            type="button"
                            className="disbursement-submit-button"
                            onClick={handleSearch}
                        >
                            🔍 Submit
                        </button>


                        <ResetButton
                            text="Reset"
                            onClick={handleReset}
                        />

                    </div>


                </div>

            </div>


            {/* =====================================================
                TABLE
            ===================================================== */}

            <DisbursementTable
                filters={searchFilters}
            />


        </div>

    );

};


export default Disbursement;