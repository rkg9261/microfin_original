import React, {
    useMemo,
    useState,
} from "react";

import ViewButton from "../../../components/buttons/ViewButton";
import EditButton from "../../../components/buttons/EditButton";
import DeleteButton from "../../../components/buttons/DeleteButton";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "./GroupMember.css";


const GroupMemberTable = ({
    data = [],
    onView,
    onEdit,
    onDelete,
}) => {

    const [search, setSearch] = useState("");

    const [entries, setEntries] = useState(10);

    const [currentPage, setCurrentPage] = useState(1);


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredMembers = useMemo(() => {

        const value =
            search.toLowerCase().trim();

        if (!value) {
            return data;
        }

        return data.filter((item) => {

            return (

                String(item.code || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.name || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.groupCity || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.memberName || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.memberCode || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.mobile || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.branch || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.branchCode || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.status || "")
                    .toLowerCase()
                    .includes(value)

            );

        });

    }, [data, search]);


    // =====================================================
    // PAGINATION
    // =====================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredMembers.length /
                entries
            )
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
    // SEARCH CHANGE
    // =====================================================

    const handleSearch = (e) => {

        setSearch(e.target.value);

        setCurrentPage(1);

    };


    // =====================================================
    // ENTRIES CHANGE
    // =====================================================

    const handleEntries = (value) => {

        setEntries(Number(value));

        setCurrentPage(1);

    };


    return (

        <>

            {/* =================================================
                CONTROLS
            ================================================= */}

            <div className="group-member-controls">

                <EntriesDropdown
                    value={entries}
                    onChange={handleEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Group Member..."
                        value={search}
                        onChange={handleSearch}
                    />

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="table-wrapper">

                <table className="common-table">

                    <thead>

                        <tr>

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                CODE
                            </th>

                            <th>
                                NAME
                            </th>

                            <th>
                                GROUP CITY
                            </th>

                            <th>
                                MEM NAME
                            </th>

                            <th>
                                MEM CODE
                            </th>

                            <th>
                                MOBILE
                            </th>

                            <th>
                                BRANCH
                            </th>

                            <th>
                                BRANCH CODE
                            </th>

                            <th>
                                CREATED AT
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

                        {currentMembers.length > 0 ? (

                            currentMembers.map(
                                (member, index) => (

                                    <tr
                                        key={
                                            member.id ||
                                            index
                                        }
                                    >

                                        {/* SR NO */}

                                        <td>

                                            {
                                                startIndex +
                                                index +
                                                1
                                            }

                                        </td>


                                        {/* CODE */}

                                        <td>

                                            {
                                                member.code ||
                                                "-"
                                            }

                                        </td>


                                        {/* NAME */}

                                        <td>

                                            {
                                                member.name ||
                                                "-"
                                            }

                                        </td>


                                        {/* GROUP CITY */}

                                        <td>

                                            {
                                                member.groupCity ||
                                                "-"
                                            }

                                        </td>


                                        {/* MEMBER NAME */}

                                        <td>

                                            {
                                                member.memberName ||
                                                "-"
                                            }

                                        </td>


                                        {/* MEMBER CODE */}

                                        <td>

                                            {
                                                member.memberCode ||
                                                "-"
                                            }

                                        </td>


                                        {/* MOBILE */}

                                        <td>

                                            {
                                                member.mobile ||
                                                "-"
                                            }

                                        </td>


                                        {/* BRANCH */}

                                        <td>

                                            {
                                                member.branch ||
                                                "-"
                                            }

                                        </td>


                                        {/* BRANCH CODE */}

                                        <td>

                                            {
                                                member.branchCode ||
                                                "-"
                                            }

                                        </td>


                                        {/* CREATED AT */}

                                        <td>

                                            {
                                                member.createdAt ||
                                                "-"
                                            }

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`
                                                    table-status
                                                    ${
                                                        String(
                                                            member.status ||
                                                            ""
                                                        ).toLowerCase()
                                                    }
                                                `}
                                            >

                                                {
                                                    member.status ||
                                                    "-"
                                                }

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <div className="table-action">

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

                                    </tr>

                                )

                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="12"
                                    className="table-empty"
                                >

                                    No Group Member Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="group-member-table-footer">

                <div>

                    Showing{" "}

                    {filteredMembers.length === 0
                        ? 0
                        : startIndex + 1}

                    {" "}to{" "}

                    {Math.min(
                        startIndex + entries,
                        filteredMembers.length
                    )}

                    {" "}of{" "}

                    {filteredMembers.length}

                    {" "}entries

                </div>


                {/* =================================================
                    PAGINATION
                ================================================= */}

                <div className="group-member-pagination">

                    <button
                        type="button"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    Math.max(
                                        1,
                                        prev - 1
                                    )
                            )
                        }
                    >
                        Prev
                    </button>


                    {Array.from(
                        {
                            length: totalPages,
                        },
                        (_, index) =>
                            index + 1
                    ).map((page) => (

                        <button
                            type="button"
                            key={page}
                            className={
                                currentPage === page
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setCurrentPage(
                                    page
                                )
                            }
                        >

                            {page}

                        </button>

                    ))}


                    <button
                        type="button"
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) =>
                                    Math.min(
                                        totalPages,
                                        prev + 1
                                    )
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </>

    );

};

export default GroupMemberTable;