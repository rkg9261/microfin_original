import React, { useState } from "react";
import { useSwaggerEntity } from "../../store/useSwaggerEntity";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import "../../components/common/Table.css";
import "./LoanSummary.css";

const LoanSummaryTable = ({
  onView,
}) => {

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [openAction, setOpenAction] = useState(null);


  /* =====================================================
     DEMO DATA
  ===================================================== */

  const { items: loanSummaryData, remove } = useSwaggerEntity("loanSummary");



  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredData = loanSummaryData.filter((loan) => {

    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      loan.loanId.toLowerCase().includes(value) ||
      loan.memberName.toLowerCase().includes(value) ||
      loan.memberCode.toLowerCase().includes(value) ||
      loan.branch.toLowerCase().includes(value) ||
      loan.planName.toLowerCase().includes(value)
    );
  });


  /* =====================================================
     ACTION
  ===================================================== */

  const toggleAction = (id) => {

    setOpenAction(
      openAction === id ? null : id
    );
  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {

    setOpenAction(null);

    onView(loan);
  };


  return (
    <div className="loan-summary-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="loan-summary-list-header">

        <h2>
          LOAN SUMMARY
        </h2>

        <button
          type="button"
          className="loan-summary-download-btn"
        >
          ⇩ DOWNLOAD EXCEL
        </button>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="loan-summary-toolbar">

        <div className="loan-summary-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

          <span>
            OUTSTANDING AMOUNT : 0
          </span>

        </div>


        <div className="loan-summary-table-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <span>
            ⌕
          </span>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="common-table-wrapper">

        <table className="common-table ">

          <thead>

            <tr>

              <th>
                SR.
                <br />
                NO.
              </th>

              <th>
                ACTION
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                MEM
                <br />
                NAME
              </th>

              <th>
                MOBILE
              </th>

              <th>
                BRANCH
                <br />
                CENTER
              </th>

              <th>
                BRANCH
              </th>

              <th>
                DISBURSEMENT
                <br />
                DATE
              </th>

              <th>
                EMI
                <br />
                START DATE
              </th>

              <th>
                EMI
                <br />
                LAST DATE
              </th>

              <th>
                LOAN
                <br />
                CLOSE DATE
              </th>

              <th>
                PLAN
                <br />
                AMT
              </th>

              <th>
                DISB
                <br />
                AMT
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                REC.
                <br />
                AMOUNT
              </th>

              <th>
                PENALTY
              </th>

              <th>
                DUE.
                <br />
                AMOUNT
              </th>

              <th>
                STATUS
              </th>

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

                  <td className="loan-summary-action-cell">

                    <button
                      type="button"
                      className="loan-summary-task-btn"
                      onClick={() =>
                        toggleAction(loan.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openAction === loan.id && (

                      <div className="loan-summary-action-menu">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(loan)
                          }
                        >
                          👁 View
                        </button>

                      </div>

                    )}

                  </td>


                  <td>
                    {loan.loanId}
                  </td>


                  <td>

                    <div className="loan-summary-member">

                      <strong>
                        {loan.memberName}
                      </strong>

                      <small>
                        ({loan.memberCode})
                      </small>

                    </div>

                  </td>


                  <td>
                    {loan.mobile}
                  </td>


                  <td>
                    {loan.branchCenter}
                  </td>


                  <td>

                    {loan.branch}

                    <br />

                    <small>
                      ({loan.branchCode})
                    </small>

                  </td>


                  <td>
                    {loan.disbursementDate}
                  </td>


                  <td>
                    {loan.emiStartDate}
                  </td>


                  <td>
                    {loan.emiLastDate}
                  </td>


                  <td>
                    {loan.loanCloseDate || "-"}
                  </td>


                  <td>
                    {loan.planAmount}
                  </td>


                  <td>
                    {loan.disbAmount}
                  </td>


                  <td>
                    {loan.amount}
                  </td>


                  <td>
                    {loan.recoveryAmount}
                  </td>


                  <td>
                    {loan.penalty}
                  </td>


                  <td>
                    {loan.dueAmount}
                  </td>


                  <td>

                    <span
                      className={
                        loan.status === "Running"
                          ? "loan-summary-status running"
                          : loan.status === "Closed"
                          ? "loan-summary-status closed"
                          : "loan-summary-status pending"
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
                  colSpan="18"
                  className="loan-summary-no-data"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="loan-summary-table-footer">

        SHOWING 1 TO {filteredData.length} OF{" "}
        {filteredData.length} ENTRIES

      </div>

    </div>
  );
};

export default LoanSummaryTable;