import React, { useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import AddButton from "../../../components/buttons/AddButton";
import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";
import "./LoanTopup.css";

import LoanTopupView from "./LoanTopupView";

const LoanTopupTable = ({
  branchSearch,
  memberSearch,
  onAddNew,
  onApprove,
}) => {

  const [entries, setEntries] = useState(10);
  const [openTask, setOpenTask] = useState(null);

  // =====================================================
  // VIEW STATE - ADDED
  // =====================================================

  const [viewLoan, setViewLoan] = useState(null);


  /* =====================================================
     DEMO DATA
  ===================================================== */

  const { items: loanTopupData, remove } = useSwaggerEntity("loanTopup");



  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = loanTopupData.filter((item) => {

    const branchMatch =
      branchSearch.trim() === "" ||
      item.branchName
        .toLowerCase()
        .includes(branchSearch.toLowerCase());

    const memberMatch =
      memberSearch.trim() === "" ||
      item.member
        .toLowerCase()
        .includes(memberSearch.toLowerCase());

    return branchMatch && memberMatch;
  });


  /* =====================================================
     TASK DROPDOWN
  ===================================================== */

  const toggleTask = (id) => {

    setOpenTask(
      openTask === id ? null : id
    );

  };


  /* =====================================================
     VIEW
     ONLY VIEW LOGIC ADDED
  ===================================================== */

  const handleView = (loan) => {

    console.log("VIEW:", loan);

    // Store selected loan
    setViewLoan(loan);

    // Close Task dropdown
    setOpenTask(null);

  };


  /* =====================================================
     CLOSE VIEW
  ===================================================== */

  const handleCloseView = () => {

    setViewLoan(null);

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (loan) => {
    try {
      await remove(loan.id);
      setOpenTask(null);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="loan-topup-list-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="loan-topup-list-header">

          <h2>LOAN TOPUP LIST</h2>

          <AddButton onClick={onAddNew}>
            Add New
          </AddButton>

        </div>


        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="loan-topup-table-toolbar">

          <EntriesDropdown
            value={entries}
            onChange={(value) => setEntries(Number(value))}
          />

          <div className="loan-topup-table-search">

            <input
              type="text"
              placeholder="Search"
            />

            <span>⌕</span>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="common-table-wrapper">

          <table className="common-table loan-topup-table">

            <thead>

              <tr>

                <th>SR.</th>

                <th>ACTION</th>

                <th>
                  APPLY
                  <br />
                  LOAN
                  <br />
                  AMT
                </th>

                <th>MEMBER</th>

                <th>BRANCH NAME</th>

                <th>PRE LOAN ID</th>

                <th>
                  PRE LOAN
                  <br />
                  TOTAL
                  <br />
                  AMOUNT
                </th>

                <th>
                  PRE LOAN
                  <br />
                  DUE
                  <br />
                  AMOUNT
                </th>

                <th>
                  PRE LOAN DUE
                  <br />
                  PRINCIPAL
                  <br />
                  AMOUNT
                </th>

                <th>
                  PRE LOAN DUE
                  <br />
                  INTEREST
                  <br />
                  AMOUNT
                </th>

                <th>
                  PRE LOAN DUE
                  <br />
                  FORCLOSE
                  <br />
                  CHARGES
                </th>

                <th>
                  PRE LOAN
                  <br />
                  DISCOUNT
                </th>

                <th>
                  CREATED
                  <br />
                  BY
                </th>

                <th>STATUS</th>

              </tr>

            </thead>


            <tbody>

              {filteredData
                .slice(0, entries)
                .map((loan, index) => (

                  <tr key={loan.id}>

                    <td>
                      {index + 1}
                    </td>


                    {/* ACTION */}

                    <td className="loan-topup-action-cell">

                      <button
                        type="button"
                        className="loan-topup-task-button"
                        onClick={() => toggleTask(loan.id)}
                      >
                        Task ▼
                      </button>


                      {openTask === loan.id && (

                        <div className="loan-topup-task-menu">

                          {/* APPROVE */}

                          <button
                            type="button"
                            onClick={() => {
                              setOpenTask(null);
                              onApprove(loan);
                            }}
                          >
                            <span>▣</span>
                            Loan Topup Approve
                          </button>


                          {/* =================================================
                              VIEW
                              ONLY THIS PART CHANGED
                          ================================================= */}

                          <button
                            type="button"
                            onClick={() => handleView(loan)}
                          >
                            <span>▣</span>
                            View
                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() => handleDelete(loan)}
                          >
                            <span>▥</span>
                            Delete
                          </button>

                        </div>

                      )}

                    </td>


                    <td>
                      {loan.applyLoanAmount}
                    </td>


                    <td>

                      <div className="loan-topup-member">

                        <span>
                          {loan.member}
                        </span>

                        <small>
                          ({loan.memberCode})
                        </small>

                      </div>

                    </td>


                    <td>

                      {loan.branchName}

                      <br />

                      ({loan.branchCode})

                    </td>


                    <td>
                      {loan.preLoanId}
                    </td>


                    <td>
                      {loan.preLoanTotalAmount}
                    </td>


                    <td>
                      {loan.preLoanDueAmount}
                    </td>


                    <td>
                      {loan.preLoanDuePrincipal}
                    </td>


                    <td>
                      {loan.preLoanDueInterest}
                    </td>


                    <td>
                      {loan.preLoanDueForeclose}
                    </td>


                    <td>
                      {loan.preLoanDiscount}
                    </td>


                    <td>
                      {loan.createdBy}
                    </td>


                    <td>

                      <span
                        className={
                          loan.status === "APPROVED"
                            ? "loan-topup-status approved"
                            : "loan-topup-status pending"
                        }
                      >
                        {loan.status}
                      </span>

                    </td>

                  </tr>

                ))}


              {filteredData.length === 0 && (

                <tr>

                  <td
                    colSpan="14"
                    className="loan-topup-no-data"
                  >
                    No records found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================================================
          VIEW FORM

          IMPORTANT:
          This is OUTSIDE the table.
      ========================================================= */}

      {viewLoan && (

        <LoanTopupView
          loan={viewLoan}
          onClose={handleCloseView}
        />

      )}

    </>
  );
};

export default LoanTopupTable;