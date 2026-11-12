import React, {
    useState,
} from "react";

import {
    AddButton,
    ViewButton,
    EditButton,
    DeleteButton,
} from "../../../components/buttons";


const MemberTable = ({
    members,
    onAdd,
    onView,
    onEdit,
    onDelete,
}) => {


    // =====================================================
    // SEARCH
    // =====================================================

    const [search, setSearch] =
        useState("");


    // =====================================================
    // ENTRIES
    // =====================================================

    const [entries, setEntries] =
        useState(10);


    // =====================================================
    // PAGE
    // =====================================================

    const [currentPage, setCurrentPage] =
        useState(1);


    // =====================================================
    // SEARCH DATA
    // =====================================================

    const filteredMembers =
        members.filter((member) => {
            const value = search.toLowerCase().trim();
            if (!value) return true;

            return (
                String(member.memberId ?? "")
                    .toLowerCase()
                    .includes(value) ||
                String(member.memberName ?? "")
                    .toLowerCase()
                    .includes(value) ||
                String(member.mobileNumber ?? "")
                    .toLowerCase()
                    .includes(value) ||
                String(member.branch ?? "")
                    .toLowerCase()
                    .includes(value) ||
                String(member.state ?? "")
                    .toLowerCase()
                    .includes(value) ||
                String(member.district ?? "")
                    .toLowerCase()
                    .includes(value) ||
                String(member.villageCity ?? "")
                    .toLowerCase()
                    .includes(value)
            );
        });


    // =====================================================
    // PAGINATION
    // =====================================================

    const totalPages =
        Math.ceil(
            filteredMembers.length /
            entries
        );


    const startIndex =
        (currentPage - 1) *
        entries;


    const currentMembers =
        filteredMembers.slice(
            startIndex,
            startIndex + entries
        );


    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = (e) => {

        setSearch(
            e.target.value
        );

        setCurrentPage(1);

    };


    // =====================================================
    // ENTRIES
    // =====================================================

    const handleEntries = (e) => {

        setEntries(
            Number(e.target.value)
        );

        setCurrentPage(1);

    };


    return (

        <div className="member-table-card">


            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <div className="member-table-header">

                <div>

                    <h2>
                        MEMBER LIST
                    </h2>

                    <p>

                        SHOWING{" "}
                        {filteredMembers.length === 0
                            ? 0
                            : startIndex + 1}

                        {" "}TO{" "}

                        {Math.min(
                            startIndex +
                                entries,
                            filteredMembers.length
                        )}

                        {" "}OF{" "}

                        {filteredMembers.length}

                        {" "}ENTRIES

                    </p>

                </div>


                <div className="member-table-header-actions">

                    <button
                        type="button"
                        className="member-download-button"
                        onClick={() =>
                            alert(
                                "Excel download will be connected with API."
                            )
                        }
                    >
                        ⇩ DOWNLOAD EXCEL
                    </button>


                    <AddButton
                        onClick={onAdd}
                    />

                </div>

            </div>


            {/* =================================================
                CONTROLS
            ================================================= */}

            <div className="member-table-controls">


                <select
                    value={entries}
                    onChange={handleEntries}
                    className="member-entry-select"
                >

                    <option value="10">
                        10
                    </option>

                    <option value="25">
                        25
                    </option>

                    <option value="50">
                        50
                    </option>

                    <option value="100">
                        100
                    </option>

                </select>


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearch}
                    />

                    <span>
                        🔍
                    </span>

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="member-table-wrapper">

                <table className="member-table">

                    <thead>

                        <tr>

                            <th>
                                ACTION
                            </th>

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                MEMBER DETAILS
                            </th>

                            <th>
                                FATHER / HUSBAND
                            </th>

                            <th>
                                GENDER
                            </th>

                            <th>
                                BIRTHDATE
                            </th>

                            <th>
                                AADHAAR / KYC
                            </th>

                            <th>
                                PAN / KYC
                            </th>

                            <th>
                                MOBILE
                            </th>

                            <th>
                                CITY
                            </th>

                            <th>
                                AGENT
                            </th>

                            <th>
                                BRANCH
                            </th>

                            <th>
                                CREATED
                            </th>

                            <th>
                                KYC
                            </th>

                            <th>
                                STATUS
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {currentMembers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="15"
                                    className="member-no-data"
                                >
                                    No members found
                                </td>

                            </tr>

                        ) : (

                            currentMembers.map(
                                (member, index) => (

                                    <tr
                                        key={member.id}
                                    >


                                        {/* ACTION */}

                                        <td>

                                            <div className="member-action-buttons">

                                                <ViewButton
                                                    onClick={() =>
                                                        onView(
                                                            member
                                                        )
                                                    }
                                                />

                                                <EditButton
                                                    onClick={() =>
                                                        onEdit(
                                                            member
                                                        )
                                                    }
                                                />

                                                <DeleteButton
                                                    onClick={() =>
                                                        onDelete(
                                                            member.id
                                                        )
                                                    }
                                                />

                                            </div>

                                        </td>


                                        {/* SR */}

                                        <td>

                                            {startIndex +
                                                index +
                                                1}

                                        </td>


                                        {/* MEMBER */}

                                        <td>

                                            <div className="member-details-cell">

                                                <strong>
                                                    👤{" "}
                                                    {member.memberName}
                                                </strong>

                                                <small>
                                                    (
                                                    {
                                                        member.memberId
                                                    }
                                                    )
                                                </small>

                                            </div>

                                        </td>


                                        {/* FATHER */}

                                        <td>

                                            {
                                                member.fatherHusbandName
                                            }

                                        </td>


                                        {/* GENDER */}

                                        <td>

                                            {
                                                member.gender
                                            }

                                        </td>


                                        {/* DOB */}

                                        <td>

                                            {member.dateOfBirth}

                                        </td>


                                        {/* KYC */}

                                        <td>

                                            {member.kycType ===
                                            "Aadhaar"
                                                ? member.kycNumber
                                                : "—"}

                                        </td>


                                        {/* PAN */}

                                        <td>

                                            {member.kycType ===
                                            "PAN"
                                                ? member.kycNumber
                                                : "—"}

                                        </td>


                                        {/* MOBILE */}

                                        <td>

                                            {
                                                member.mobileNumber
                                            }

                                        </td>


                                        {/* CITY */}

                                        <td>

                                            <div className="member-location">

                                                📍{" "}
                                                {
                                                    member.villageCity
                                                }

                                            </div>

                                        </td>


                                        {/* AGENT */}

                                        <td>

                                            <div className="member-agent">

                                                👤{" "}
                                                {
                                                    member.staff ||
                                                    "-"
                                                }

                                            </div>

                                        </td>


                                        {/* BRANCH */}

                                        <td>

                                            <div className="member-branch">

                                                🏢{" "}
                                                {
                                                    member.branch
                                                }

                                            </div>

                                        </td>


                                        {/* CREATED */}

                                        <td>

                                            {
                                                member.memberSince
                                            }

                                        </td>


                                        {/* KYC STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    `member-kyc-badge ${
                                                        member.kycNumber
                                                            ? "verified"
                                                            : "pending"
                                                    }`
                                                }
                                            >

                                                {member.kycNumber
                                                    ? "✓"
                                                    : "!"}

                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    `member-status-badge ${
                                                        member.status ===
                                                        "ACTIVE"
                                                            ? "active"
                                                            : "inactive"
                                                    }`
                                                }
                                            >

                                                ●

                                            </span>

                                        </td>


                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="member-table-footer">


                <div className="member-showing">

                    Showing{" "}

                    {filteredMembers.length === 0
                        ? 0
                        : startIndex + 1}

                    {" "}to{" "}

                    {Math.min(
                        startIndex +
                            entries,
                        filteredMembers.length
                    )}

                    {" "}of{" "}

                    {filteredMembers.length}

                    {" "}entries

                </div>


                <div className="member-pagination">


                    <button
                        type="button"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                (page) =>
                                    Math.max(
                                        page - 1,
                                        1
                                    )
                            )
                        }
                    >
                        PREV
                    </button>


                    {Array.from(
                        {
                            length:
                                totalPages,
                        },
                        (_, index) => (

                            <button
                                type="button"
                                key={index}
                                className={
                                    currentPage ===
                                    index + 1
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        index + 1
                                    )
                                }
                            >
                                {index + 1}
                            </button>

                        )
                    )}


                    <button
                        type="button"
                        disabled={
                            currentPage ===
                                totalPages ||
                            totalPages === 0
                        }
                        onClick={() =>
                            setCurrentPage(
                                (page) =>
                                    Math.min(
                                        page + 1,
                                        totalPages
                                    )
                            )
                        }
                    >
                        NEXT
                    </button>

                </div>

            </div>

        </div>

    );

};


export default MemberTable;