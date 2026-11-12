import React, { useMemo, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./Disbursement.css";


const DisbursementTable = ({ filters }) => {


    // =========================================================
    // TABLE STATES
    // =========================================================

    const [entries, setEntries] = useState(10);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);


    // =========================================================
    // DUMMY DATA
    // =========================================================

    const { items: disbursementData, remove } = useSwaggerEntity("disbursement");



    // =========================================================
    // FILTER + SEARCH
    // =========================================================

    const filteredData = useMemo(() => {

        let result = [...disbursementData];


        // MEMBER FILTER
        if (filters?.member) {

            result = result.filter((item) =>
                item.member
                    .toLowerCase()
                    .includes(
                        filters.member.toLowerCase()
                    )
            );

        }


        // BRANCH FILTER
        if (filters?.branch) {

            result = result.filter(
                (item) =>
                    item.branch === filters.branch
            );

        }


        // STAFF FILTER
        if (filters?.staff) {

            result = result.filter((item) =>
                item.staff
                    .toLowerCase()
                    .includes(
                        filters.staff.toLowerCase()
                    )
            );

        }


        // TABLE SEARCH
        if (search) {

            const searchText =
                search.toLowerCase();

            result = result.filter((item) =>

                Object.values(item).some((value) =>
                    String(value)
                        .toLowerCase()
                        .includes(searchText)
                )

            );

        }


        return result;

    }, [filters, search]);


    // =========================================================
    // PAGINATION
    // =========================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredData.length / entries
            )
        );


    const startIndex =
        (currentPage - 1) * entries;


    const paginatedData =
        filteredData.slice(
            startIndex,
            startIndex + entries
        );


    // =========================================================
    // CHANGE ENTRIES
    // =========================================================

    const handleEntriesChange = (e) => {

        setEntries(
            Number(e.target.value)
        );

        setCurrentPage(1);

    };


    // =========================================================
    // SEARCH
    // =========================================================

    const handleSearch = (e) => {

        setSearch(e.target.value);

        setCurrentPage(1);

    };


    // =========================================================
    // PAGINATION
    // =========================================================

    const handlePageChange = (page) => {

        if (
            page >= 1 &&
            page <= totalPages
        ) {

            setCurrentPage(page);

        }

    };


    return (

        <div className="disbursement-table-card">


            {/* =====================================================
                TABLE TITLE
            ===================================================== */}

            <div className="disbursement-table-title-row">

                <h2>
                    INDIVIDUAL DISBURSEMENT LIST
                </h2>

            </div>


            {/* =====================================================
                TABLE CONTROLS
            ===================================================== */}

            <div className="disbursement-table-controls">


                {/* ENTRIES */}

                <div className="disbursement-entries">

                    <select
                        value={entries}
                        onChange={handleEntriesChange}
                    >

                        <option value={10}>
                            10
                        </option>

                        <option value={25}>
                            25
                        </option>

                        <option value={50}>
                            50
                        </option>

                        <option value={100}>
                            100
                        </option>

                    </select>

                </div>


                {/* SEARCH */}

                <div className="disbursement-table-search">

                    <input
                        type="text"
                        placeholder="Search by Application No."
                        value={search}
                        onChange={handleSearch}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setCurrentPage(1);
                        }}
                        title="Search"
                    >
                        🔍
                    </button>

                </div>

            </div>


            {/* =====================================================
                TABLE
            ===================================================== */}

            <div className="common-table-wrapper">

                <table className="common-table">


                    <thead>

                        <tr>

                            <th>SR.</th>

                            <th>LOAN ID</th>

                            <th>
                                PL NAME &<br />
                                <span>
                                    PENALTY NAME
                                </span>
                            </th>

                            <th>
                                PL<br />
                                CATEGORY
                            </th>

                            <th>
                                PL EMI<br />
                                TYPE
                            </th>

                            <th>
                                PLAN<br />
                                AMT
                            </th>

                            <th>
                                DIS<br />
                                AMT
                            </th>

                            <th>
                                DISBURSEMENT<br />
                                DT
                            </th>

                            <th>
                                EMI START DATE
                            </th>

                            <th>
                                EMI END DATE
                            </th>

                            <th>
                                MEMBER
                            </th>

                            <th>
                                ALIAS
                            </th>

                            <th>
                                STAFF
                            </th>

                            <th>
                                BRANCH<br />
                                CENTER
                            </th>

                            <th>
                                BRANCH
                            </th>

                            <th>
                                PAY<br />
                                MODE
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {paginatedData.length > 0 ? (

                            paginatedData.map(
                                (item, index) => (

                                    <tr key={item.id}>

                                        <td>
                                            {startIndex + index + 1}
                                        </td>

                                        <td>
                                            {item.loanId}
                                        </td>

                                        <td className="disbursement-loan-name">

                                            <strong>
                                                {item.plName}
                                            </strong>

                                            <br />

                                            <span>
                                                {item.penaltyName}
                                            </span>

                                        </td>

                                        <td>
                                            {item.category}
                                        </td>

                                        <td>
                                            {item.emiType}
                                        </td>

                                        <td>
                                            ₹{item.planAmount}
                                        </td>

                                        <td>
                                            ₹{item.disAmount}
                                        </td>

                                        <td>
                                            {item.disbursementDate}
                                        </td>

                                        <td>
                                            {item.emiStartDate}
                                        </td>

                                        <td>
                                            {item.emiEndDate}
                                        </td>

                                        <td className="disbursement-member">
                                            {item.member}
                                        </td>

                                        <td>
                                            {item.alias}
                                        </td>

                                        <td>
                                            {item.staff}
                                        </td>

                                        <td>
                                            {item.branchCenter}
                                        </td>

                                        <td>
                                            {item.branch}
                                        </td>

                                        <td>
                                            {item.payMode}
                                        </td>

                                        <td>

                                            <span className="disbursement-task">
                                                Task ▾
                                            </span>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="17"
                                    className="disbursement-no-data"
                                >
                                    No records found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <div className="disbursement-table-footer">


                <div className="disbursement-showing">

                    Showing{" "}
                    {filteredData.length === 0
                        ? 0
                        : startIndex + 1}
                    {" "}to{" "}
                    {Math.min(
                        startIndex + entries,
                        filteredData.length
                    )}
                    {" "}of{" "}
                    {filteredData.length}
                    {" "}entries

                </div>


                {/* PAGINATION */}

                <div className="disbursement-pagination">

                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            handlePageChange(
                                currentPage - 1
                            )
                        }
                    >
                        PREV
                    </button>


                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    )
                        .slice(0, 5)
                        .map((page) => (

                            <button
                                type="button"
                                key={page}
                                className={
                                    currentPage === page
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handlePageChange(page)
                                }
                            >
                                {page}
                            </button>

                        ))}


                    <button
                        type="button"
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            handlePageChange(
                                currentPage + 1
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


export default DisbursementTable;