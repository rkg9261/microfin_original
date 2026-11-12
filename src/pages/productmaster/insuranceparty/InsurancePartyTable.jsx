import React, {
    useMemo,
    useState,
} from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import ViewButton
    from "../../../components/buttons/ViewButton";

import EditButton
    from "../../../components/buttons/EditButton";

import DeleteButton
    from "../../../components/buttons/DeleteButton";

import EntriesDropdown
    from "../../../components/common/EntriesDropdown";

import InsurancePartyView
    from "./InsurancePartyView";

import "./InsuranceParty.css";


const InsurancePartyTable = ({
    onEdit,
    refresh,
}) => {
  const confirm = useConfirm();


    // ==========================================
    // STATES
    // ==========================================

    const [search, setSearch] = useState("");

    const [entries, setEntries] = useState(10);

    const [viewData, setViewData] = useState(null);


    // ==========================================
    // SAMPLE DATA
    // ==========================================

    const { items: insuranceParties, remove } = useSwaggerEntity("insuranceParty");



    // ==========================================
    // SEARCH
    // ==========================================

    const filteredParties = useMemo(() => {

        const value =
            search
                .toLowerCase()
                .trim();


        return insuranceParties.filter(
            (item) => {

                return (

                    item.insurancePartyName
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.insurancePartyCode
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.remark
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.createdAt
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.status
                        .toLowerCase()
                        .includes(value)

                );

            }
        );

    }, [
        insuranceParties,
        search,
        refresh,
    ]);


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Insurance Party?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


        if (!confirmDelete) {

            return;

        }


        setInsuranceParties(
            (prev) =>
                prev.filter(
                    (item) =>
                        item.id !== id
                )
        );

    };


    // ==========================================
    // VIEW
    // ==========================================

    const handleView = (party) => {

        setViewData(party);

    };


    return (

        <>


            {/* ==========================================
                CONTROLS
            ========================================== */}

            <div className="insurance-party-controls">


                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Insurance Party..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


            </div>


            {/* ==========================================
                TABLE
            ========================================== */}

            <div className="table-wrapper">


                <table className="common-table">


                    <thead>

                        <tr>

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                INSURANCE PARTY
                            </th>

                            <th>
                                CODE
                            </th>

                            <th>
                                REMARK
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


                        {filteredParties
                            .slice(0, entries)
                            .map(
                                (
                                    party,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            party.id
                                        }
                                    >


                                        {/* SR NO */}

                                        <td>

                                            {
                                                index + 1
                                            }

                                        </td>


                                        {/* NAME */}

                                        <td>

                                            {
                                                party.insurancePartyName
                                            }

                                        </td>


                                        {/* CODE */}

                                        <td>

                                            {
                                                party.insurancePartyCode
                                            }

                                        </td>


                                        {/* REMARK */}

                                        <td>

                                            {
                                                party.remark ||
                                                "-"
                                            }

                                        </td>


                                        {/* CREATED */}

                                        <td>

                                            {
                                                party.createdAt
                                            }

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    `table-status ${
                                                        party.status
                                                            .toLowerCase()
                                                    }`
                                                }
                                            >

                                                {
                                                    party.status
                                                }

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <div className="table-action">


                                                <ViewButton
                                                    onClick={() =>
                                                        handleView(
                                                            party
                                                        )
                                                    }
                                                />


                                                <EditButton
                                                    onClick={() =>
                                                        onEdit(
                                                            party
                                                        )
                                                    }
                                                />


                                                <DeleteButton
                                                    onClick={() =>
                                                        handleDelete(
                                                            party.id
                                                        )
                                                    }
                                                />


                                            </div>

                                        </td>


                                    </tr>

                                )
                            )}


                        {/* ==========================================
                            EMPTY
                        ========================================== */}

                        {filteredParties.length ===
                            0 && (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="table-empty"
                                    >

                                        No Insurance Party Found

                                    </td>

                                </tr>

                            )}


                    </tbody>


                </table>


            </div>


            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="insurance-party-table-footer">


                <div>

                    Showing{" "}

                    {
                        filteredParties.length ===
                        0
                            ? 0
                            : 1
                    }

                    {" "}to{" "}

                    {
                        Math.min(
                            entries,
                            filteredParties.length
                        )
                    }

                    {" "}of{" "}

                    {
                        filteredParties.length
                    }

                    {" "}entries

                </div>


                {/* PAGINATION */}

                <div className="insurance-party-pagination">


                    <button>
                        Prev
                    </button>


                    <button className="active">
                        1
                    </button>


                    <button>
                        2
                    </button>


                    <button>
                        Next
                    </button>


                </div>


            </div>


            {/* ==========================================
                VIEW
            ========================================== */}

            {viewData && (

                <InsurancePartyView

                    data={viewData}

                    onClose={() =>
                        setViewData(null)
                    }

                />

            )}


        </>

    );

};


export default InsurancePartyTable;