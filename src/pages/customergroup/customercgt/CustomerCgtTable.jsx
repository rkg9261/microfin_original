import React, {
    useState,
} from "react";

import {
    AddButton,
    EditButton,
    DeleteButton,
} from "../../../components/buttons";

import EntriesDropdown from "../../../components/common/EntriesDropdown";
const CustomerCgtTable = ({
    records,
    onAdd,
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

    const [entries, setEntries] =   useState(10);
     


    // =====================================================
    // PAGE
    // =====================================================

    const [currentPage, setCurrentPage] =useState(1);
        


    // =====================================================
    // SEARCH
    // =====================================================

    const searchedRecords =
        records.filter((record) => {

            const value =
                search.toLowerCase();


            return (

                record.memberName
                    ?.toLowerCase()
                    .includes(value)

                ||

                record.memberCode
                    ?.toLowerCase()
                    .includes(value)

                ||

                record.branch
                    ?.toLowerCase()
                    .includes(value)

                ||

                record.collectionCenter
                    ?.toLowerCase()
                    .includes(value)

                ||

                record.cgtStaff
                    ?.toLowerCase()
                    .includes(value)

                ||

                record.grtStaff
                    ?.toLowerCase()
                    .includes(value)

                ||

                record.status
                    ?.toLowerCase()
                    .includes(value)

            );

        });


    // =====================================================
    // PAGINATION
    // =====================================================

    const totalPages =
        Math.ceil(
            searchedRecords.length /
            entries
        );


    const startIndex =
        (currentPage - 1) *
        entries;


    const currentRecords =
        searchedRecords.slice(
            startIndex,
            startIndex + entries
        );


    // =====================================================
    // SEARCH CHANGE
    // =====================================================

    const handleSearch = (e) => {

        setSearch(
            e.target.value
        );

        setCurrentPage(1);

    };


    // =====================================================
    // ENTRIES CHANGE
    // =====================================================

    const handleEntriesChange = (e) => {

        setEntries(
            Number(e.target.value)
        );

        setCurrentPage(1);

    };


    return (

        <div className="customer-cgt-card">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="customer-cgt-card-header">

                <h2>
                    CGT & GRT RECORDS
                </h2>


                <div className="customer-cgt-card-actions">

                    <AddButton
                        onClick={onAdd}
                    />

                </div>

            </div>


            {/* =================================================
                CONTROLS
            ================================================= */}

            <div className="customer-cgt-controls">


                        <EntriesDropdown
                  value={entries}
              onChange={setEntries}
                 />


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

            <div className="customer-cgt-table-wrapper">

                <table className="customer-cgt-table">


                    <thead>

                        <tr>

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                CUSTOMER DETAILS
                            </th>

                            <th>
                                DATE RECORDS
                            </th>

                            <th>
                                STAFF DETAILS
                            </th>

                            <th>
                                STATUS
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {currentRecords.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="customer-cgt-no-data"
                                >
                                    No records found
                                </td>

                            </tr>

                        ) : (

                            currentRecords.map(
                                (record, index) => (

                                    <tr
                                        key={record.id}
                                    >


                                        {/* SR NO */}

                                        <td>

                                            {startIndex +
                                                index +
                                                1}

                                        </td>


                                        {/* CUSTOMER DETAILS */}

                                        <td>

                                            <div className="customer-cgt-customer-details">

                                                <strong>
                                                    👤{" "}
                                                    {record.memberName}
                                                </strong>

                                                <span>
                                                    📄{" "}
                                                    {record.memberCode}
                                                </span>

                                                <span>
                                                    🏢{" "}
                                                    {record.branch}
                                                </span>

                                                <span>
                                                    📍{" "}
                                                    {record.collectionCenter}
                                                </span>

                                            </div>

                                        </td>


                                        {/* DATE RECORDS */}

                                        <td>

                                            <div className="customer-cgt-date-details">

                                                <span>
                                                    <b>
                                                        CGT DATE
                                                    </b>
                                                    {" - "}
                                                    {record.cgtDate}
                                                </span>

                                                <span>
                                                    <b>
                                                        GRT DATE
                                                    </b>
                                                    {" - "}
                                                    {record.grtDate}
                                                </span>

                                                <span>
                                                    <b>
                                                        CREATED AT
                                                    </b>
                                                    {" - "}
                                                    {record.createdAt}
                                                </span>

                                            </div>

                                        </td>


                                        {/* STAFF DETAILS */}

                                        <td>

                                            <div className="customer-cgt-staff-details">

                                                <div>

                                                    <span className="customer-cgt-badge cgt">
                                                        CGT
                                                    </span>

                                                    <strong>
                                                        {record.cgtStaff}
                                                    </strong>

                                                    <small>
                                                        ({record.cgtStaffCode})
                                                    </small>

                                                </div>


                                                <div>

                                                    <span className="customer-cgt-badge grt">
                                                        GRT
                                                    </span>

                                                    <strong>
                                                        {record.grtStaff}
                                                    </strong>

                                                    <small>
                                                        ({record.grtStaffCode})
                                                    </small>

                                                </div>

                                            </div>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <div className="customer-cgt-status-details">

                                                <span>
                                                    TRAINING STATUS -
                                                </span>


                                                <strong
                                                    className={
                                                        `customer-cgt-status ${
                                                            record.status ===
                                                            "PASSED"
                                                                ? "passed"
                                                                : record.status ===
                                                                  "REJECT"
                                                                ? "reject"
                                                                : "pending"
                                                        }`
                                                    }
                                                >

                                                    {record.status}

                                                </strong>


                                                <span>
                                                    CGT -{" "}
                                                    {record.cgtStatus}
                                                </span>

                                                <span>
                                                    GRT -{" "}
                                                    {record.grtStatus}
                                                </span>

                                            </div>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <div className="customer-cgt-actions">

                                                <EditButton
                                                    onClick={() =>
                                                        onEdit(record)
                                                    }
                                                />

                                                <DeleteButton
                                                    onClick={() =>
                                                        onDelete(
                                                            record.id
                                                        )
                                                    }
                                                />

                                            </div>

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

            <div className="customer-cgt-table-footer">


                <div>

                    Showing{" "}

                    {searchedRecords.length === 0
                        ? 0
                        : startIndex + 1}

                    {" "}to{" "}

                    {Math.min(
                        startIndex +
                            entries,
                        searchedRecords.length
                    )}

                    {" "}of{" "}

                    {searchedRecords.length}

                    {" "}entries

                </div>


                <div className="customer-cgt-pagination">


                    <button
                        type="button"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    Math.max(
                                        prev - 1,
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
                                (prev) =>
                                    Math.min(
                                        prev + 1,
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


export default CustomerCgtTable;