import React, {
    useMemo,
    useState,
} from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./GroupMemberDisbursement.css";

import GroupMemberDisbursementView
    from "./GroupMemberDisbursementView";


const GroupMemberDisbursementTable = ({
    filters,
}) => {

    // =========================================================
    // STATES
    // =========================================================

    const [entries, setEntries] =
        useState(10);

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [taskOpen, setTaskOpen] =
        useState(null);

    const [
        selectedData,
        setSelectedData,
    ] = useState(null);


    // =========================================================
    // DUMMY DATA
    // =========================================================

    const { items: groupDisbursementData } = useSwaggerEntity("groupMemberDisbursement");



    // =========================================================
    // DATE CONVERSION
    // =========================================================

    const convertDate = (date) => {

        if (!date) {
            return "";
        }

        const [
            day,
            month,
            year,
        ] = date.split("-");

        return `${year}-${month}-${day}`;

    };


    // =========================================================
    // FILTER DATA
    // =========================================================

    const filteredData = useMemo(() => {

        let result = [
            ...groupDisbursementData,
        ];


        // MEMBER

        if (filters?.member) {

            result = result.filter(
                (item) =>
                    item.member
                        .toLowerCase()
                        .includes(
                            filters.member
                                .toLowerCase()
                        )
            );

        }


        // BRANCH

        if (filters?.branch) {

            result = result.filter(
                (item) =>
                    item.branch ===
                    filters.branch
            );

        }


        // STAFF

        if (filters?.staff) {

            result = result.filter(
                (item) =>
                    item.staff
                        .toLowerCase()
                        .includes(
                            filters.staff
                                .toLowerCase()
                        )
            );

        }


        // GROUP

        if (filters?.group) {

            result = result.filter(
                (item) =>
                    item.group ===
                    filters.group
            );

        }


        // DISBURSEMENT DATE FROM

        if (
            filters?.disbursementDateFrom
        ) {

            result = result.filter(
                (item) =>
                    convertDate(
                        item.disDate
                    ) >=
                    filters.disbursementDateFrom
            );

        }


        // DISBURSEMENT DATE TO

        if (
            filters?.disbursementDateTo
        ) {

            result = result.filter(
                (item) =>
                    convertDate(
                        item.disDate
                    ) <=
                    filters.disbursementDateTo
            );

        }


        // EMI END DATE FROM

        if (
            filters?.emiEndDateFrom
        ) {

            result = result.filter(
                (item) =>
                    convertDate(
                        item.emiEndDate
                    ) >=
                    filters.emiEndDateFrom
            );

        }


        // EMI END DATE TO

        if (
            filters?.emiEndDateTo
        ) {

            result = result.filter(
                (item) =>
                    convertDate(
                        item.emiEndDate
                    ) <=
                    filters.emiEndDateTo
            );

        }


        // SEARCH

        if (search.trim()) {

            const text =
                search
                    .toLowerCase()
                    .trim();

            result = result.filter(
                (item) =>
                    Object.values(item)
                        .some(
                            (value) =>
                                String(value)
                                    .toLowerCase()
                                    .includes(
                                        text
                                    )
                        )
            );

        }


        return result;

    }, [
        filters,
        search,
    ]);


    // =========================================================
    // PAGINATION
    // =========================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredData.length /
                entries
            )
        );


    const startIndex =
        (currentPage - 1) *
        entries;


    const paginatedData =
        filteredData.slice(
            startIndex,
            startIndex + entries
        );


    // =========================================================
    // VIEW
    // =========================================================

    const handleView = (item) => {

        setSelectedData(item);

        setTaskOpen(null);

    };


    // =========================================================
    // TASK
    // =========================================================

    const handleTask = (id) => {

        setTaskOpen(
            taskOpen === id
                ? null
                : id
        );

    };


    return (

        <div className="group-disbursement-table-card">


            {/* =====================================================
                TITLE
            ===================================================== */}

            <div className="group-disbursement-table-title">

                GROUP DISBURSEMENT LIST

            </div>


            {/* =====================================================
                CONTROLS
            ===================================================== */}

            <div className="group-disbursement-controls">


                <select
                    value={entries}
                    onChange={(e) => {

                        setEntries(
                            Number(
                                e.target.value
                            )
                        );

                        setCurrentPage(1);

                    }}
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


                <div className="group-disbursement-search">

                    <input
                        type="text"
                        placeholder="Search by Application No."
                        value={search}
                        onChange={(e) => {

                            setSearch(
                                e.target.value
                            );

                            setCurrentPage(1);

                        }}
                    />

                    <button
                        type="button"
                        onClick={() => {

                            setSearch("");

                            setCurrentPage(1);

                        }}
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

                            <th>
                                SR.
                            </th>

                            <th>
                                APPLICATION NO
                            </th>

                            <th>
                                PL NAME &
                                <br />
                                <span>
                                    PENALTY NAME
                                </span>
                            </th>

                            <th>
                                PL EMI TYPE
                            </th>

                            <th>
                                PLAN AMT
                            </th>

                            <th>
                                DIS AMT
                            </th>

                            <th>
                                DIS DT
                            </th>

                            <th>
                                EMI START DT
                            </th>

                            <th>
                                EMI END DT
                            </th>

                            <th>
                                MEMBER
                            </th>

                            <th>
                                GROUP
                            </th>

                            <th>
                                BRANCH CENTER
                            </th>

                            <th>
                                BRANCH
                            </th>

                            <th>
                                STAFF
                            </th>

                            <th>
                                PAY MODE
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {paginatedData.length > 0 ? (

                            paginatedData.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            item.id
                                        }
                                    >

                                        <td>
                                            {
                                                startIndex +
                                                index +
                                                1
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.applicationNo
                                            }
                                        </td>

                                        <td className="group-loan-name">

                                            <strong>
                                                {
                                                    item.plName
                                                }
                                            </strong>

                                            <br />

                                            <span>
                                                {
                                                    item.penaltyName
                                                }
                                            </span>

                                        </td>

                                        <td>
                                            {
                                                item.emiType
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                item.planAmount
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                item.disAmount
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.disDate
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.emiStartDate
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.emiEndDate
                                            }
                                        </td>

                                        <td className="group-member-name">

                                            {
                                                item.member
                                            }

                                        </td>

                                        <td>
                                            {
                                                item.group
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.branchCenter
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.branch
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.staff
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className={`group-pay-mode ${item.payMode.toLowerCase()}`}
                                            >
                                                {
                                                    item.payMode
                                                }
                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td className="group-action-cell">

                                            <div className="group-task-wrapper">

                                                <button
                                                    type="button"
                                                    className="group-task-button"
                                                    onClick={() =>
                                                        handleTask(
                                                            item.id
                                                        )
                                                    }
                                                >

                                                    Task

                                                    <span>
                                                        ▾
                                                    </span>

                                                </button>


                                                {taskOpen ===
                                                    item.id && (

                                                    <div className="group-task-menu">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleView(
                                                                    item
                                                                )
                                                            }
                                                        >

                                                            👁 View

                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="16"
                                    className="group-no-data"
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

            <div className="group-disbursement-footer">

                <div>

                    Showing{" "}

                    {filteredData.length === 0
                        ? 0
                        : startIndex + 1}

                    {" "}to{" "}

                    {Math.min(
                        startIndex +
                        entries,
                        filteredData.length
                    )}

                    {" "}of{" "}

                    {filteredData.length}

                    {" "}entries

                </div>


                <div className="group-pagination">

                    <button
                        type="button"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
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
                        (_, index) =>
                            index + 1
                    )
                        .slice(0, 5)
                        .map(
                            (page) => (

                                <button
                                    key={
                                        page
                                    }
                                    type="button"
                                    className={
                                        currentPage ===
                                        page
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            page
                                        )
                                    }
                                >
                                    {
                                        page
                                    }
                                </button>

                            )
                        )}


                    <button
                        type="button"
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                    >
                        NEXT
                    </button>

                </div>

            </div>


            {/* =====================================================
                VIEW POPUP
            ===================================================== */}

            {selectedData && (

                <GroupMemberDisbursementView
                    data={
                        selectedData
                    }
                    onClose={() =>
                        setSelectedData(
                            null
                        )
                    }
                />

            )}

        </div>

    );

};


export default GroupMemberDisbursementTable;