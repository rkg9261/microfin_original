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

import ProductLoanView
    from "./ProductLoanView";

import "./ProductLoan.css";


const ProductLoanTable = ({
    onEdit,
    refresh,
}) => {
  const confirm = useConfirm();


    // ==========================================
    // STATES
    // ==========================================

    const [search, setSearch] =
        useState("");

    const [entries, setEntries] =
        useState(10);

    const [viewData, setViewData] =
        useState(null);


    // ==========================================
    // SAMPLE DATA
    // ==========================================

const { items: loans, remove } = useSwaggerEntity("productLoan");



    // ==========================================
    // SEARCH
    // ==========================================

    const filteredLoans = useMemo(() => {

        const value =
            search
                .toLowerCase()
                .trim();


        return loans.filter((item) => {

            return (

                String(item.loanId)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.memberName)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.mobile)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.branch)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.product)
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.status)
                    .toLowerCase()
                    .includes(value)

            );

        });

    }, [loans, search, refresh]);


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Product Loan?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


        if (!confirmDelete) {

            return;

        }


        remove(id);

    };


    // ==========================================
    // VIEW
    // ==========================================

    const handleView = (loan) => {

        setViewData(loan);

    };


    return (

        <>


            {/* ==========================================
                CONTROLS
            ========================================== */}

            <div className="product-loan-controls">


                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product Loan..."
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
                                LOAN ID
                            </th>

                            <th>
                                MEM NAME
                            </th>

                            <th>
                                MOBILE
                            </th>

                            <th>
                                BRANCH
                            </th>

                            <th>
                                BRANCH CENTER
                            </th>

                            <th>
                                GROUP NAME
                            </th>

                            <th>
                                PRODUCT
                            </th>

                            <th>
                                DISBURSEMENT DATE
                            </th>

                            <th>
                                EMI START DATE
                            </th>

                            <th>
                                EMI LAST DATE
                            </th>

                            <th>
                                TOTAL PRICE
                            </th>

                            <th>
                                DOWN PAYMENT
                            </th>

                            <th>
                                LOAN AMOUNT
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

                        {filteredLoans
                            .slice(0, entries)
                            .map(
                                (
                                    loan,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            loan.id
                                        }
                                    >


                                        <td>
                                            {index + 1}
                                        </td>


                                        <td>
                                            {loan.loanId}
                                        </td>


                                        <td>
                                            {loan.memberName}
                                        </td>


                                        <td>
                                            {loan.mobile}
                                        </td>


                                        <td>
                                            {loan.branch}
                                        </td>


                                        <td>
                                            {loan.branchCenter}
                                        </td>


                                        <td>
                                            {loan.groupName}
                                        </td>


                                        <td>
                                            {loan.product}
                                        </td>


                                        <td>
                                            {loan.mfgDate}
                                        </td>


                                        <td>
                                            {loan.mfgDate}
                                        </td>


                                        <td>
                                            {loan.expireDate}
                                        </td>


                                        <td>
                                            ₹ {loan.totalAmount}
                                        </td>


                                        <td>
                                            ₹ {loan.downPayment}
                                        </td>


                                        <td>
                                            ₹ {loan.loanAmount}
                                        </td>


                                        <td>

                                            <span
                                                className={`table-status ${
                                                    String(
                                                        loan.status
                                                    ).toLowerCase()
                                                }`}
                                            >

                                                {
                                                    loan.status
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            <div className="table-action">


                                                <ViewButton
                                                    onClick={() =>
                                                        handleView(
                                                            loan
                                                        )
                                                    }
                                                />


                                                <EditButton
                                                    onClick={() =>
                                                        onEdit(
                                                            loan
                                                        )
                                                    }
                                                />


                                                <DeleteButton
                                                    onClick={() =>
                                                        handleDelete(
                                                            loan.id
                                                        )
                                                    }
                                                />


                                            </div>

                                        </td>


                                    </tr>

                                )
                            )}


                        {filteredLoans.length === 0 && (

                            <tr>

                                <td
                                    colSpan="16"
                                    className="table-empty"
                                >

                                    No Product Loan Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="product-loan-table-footer">


                <div>

                    Showing{" "}

                    {filteredLoans.length === 0
                        ? 0
                        : 1}

                    {" "}to{" "}

                    {Math.min(
                        entries,
                        filteredLoans.length
                    )}

                    {" "}of{" "}

                    {filteredLoans.length}

                    {" "}entries

                </div>


                <div className="product-loan-pagination">

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

                <ProductLoanView

                    data={viewData}

                    onClose={() =>
                        setViewData(null)
                    }

                />

            )}

        </>

    );

};


export default ProductLoanTable;