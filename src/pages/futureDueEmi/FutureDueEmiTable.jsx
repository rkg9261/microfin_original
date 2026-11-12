import React, { useState } from "react";
import {
  FaChevronDown,
  FaEye,
  FaMoneyBillWave,
} from "react-icons/fa";

const FutureDueEmiTable = ({
  data,
  entries,
  setEntries,
  loanSearch,
  setLoanSearch,
  memberSearch,
  setMemberSearch,
  emiTotal,
  payableAmount,
  onView,
  onPayNow,
}) => {
  const [openTask, setOpenTask] =
    useState(null);

  const visibleData = data.slice(
    0,
    Number(entries)
  );

  return (
    <div className="future-due-emi-table-card">

      {/* TABLE TITLE */}

      <div className="future-due-emi-table-heading">

        <div>
          <h3>MEMBER DUE EMIS</h3>

          <div className="future-due-emi-summary">

            <span>EMI TOTAL :</span>

            <strong>
              ₹ {emiTotal.toLocaleString("en-IN")} /-
            </strong>

            <span>|</span>

            <span>PAYABLE AMT :</span>

            <strong>
              ₹{" "}
              {payableAmount.toLocaleString(
                "en-IN"
              )} /-
            </strong>

          </div>
        </div>

      </div>

      {/* SEARCH ROW */}

      <div className="future-due-emi-search-row">

        <div className="future-due-emi-entries">

          <select
            value={entries}
            onChange={(e) =>
              setEntries(
                Number(e.target.value)
              )
            }
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span>ENTRIES</span>

        </div>

        <div className="future-due-emi-search-box">

          <input
            type="text"
            placeholder="Search by Loan Application"
            value={loanSearch}
            onChange={(e) =>
              setLoanSearch(
                e.target.value
              )
            }
          />

          <span>⌕</span>

        </div>

        <div className="future-due-emi-search-box member">

          <input
            type="text"
            placeholder="Search by Member Name, Code, Mobile"
            value={memberSearch}
            onChange={(e) =>
              setMemberSearch(
                e.target.value
              )
            }
          />

          <span>⌕</span>

        </div>

      </div>

      {/* TABLE */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>
              <th>SR.<br />NO.</th>
              <th>LOAN ID</th>
              <th>MEM<br />NAME</th>
              <th>CONTACTNUMBER</th>
              <th>TYPE</th>
              <th>STAFF</th>
              <th>PREV. DATE</th>
              <th>EMI DATE</th>
              <th>ADV<br />EMI</th>
              <th>EMI<br />NO.</th>
              <th>DUES</th>
              <th>ADVANCE</th>
              <th>EMI<br />TOTAL</th>
              <th>PAYABLE<br />AMT</th>
              <th>PREV<br />STATUS</th>
              <th>ACTION</th>
            </tr>

          </thead>

          <tbody>

            {visibleData.length === 0 ? (

              <tr>
                <td
                  colSpan="16"
                  className="future-due-emi-no-data"
                >
                  NO DATA FOUND
                </td>
              </tr>

            ) : (

              visibleData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <div className="future-due-emi-loan">

                        <strong>
                          ♟ {item.loanId}
                        </strong>

                        <small>
                          ({item.loanType})
                        </small>

                      </div>
                    </td>

                    <td>
                      <div className="future-due-emi-member">

                        <strong>
                          {item.memberName}
                        </strong>

                        <small>
                          ({item.memberCode})
                        </small>

                      </div>
                    </td>

                    <td>
                      {item.mobile}
                    </td>

                    <td>
                      <span className="future-due-emi-type">
                        {item.type}
                      </span>
                    </td>

                    <td>
                      <div className="future-due-emi-staff">

                        <strong>
                          {item.staff}
                        </strong>

                        <small>
                          ({item.staffCode})
                        </small>

                      </div>
                    </td>

                    <td>
                      {item.previousDate}
                    </td>

                    <td>
                      {item.emiDate}
                    </td>

                    <td>
                      {item.advanceEmi}
                    </td>

                    <td>
                      {item.emiNo}
                    </td>

                    <td>
                      {item.dues}
                    </td>

                    <td>
                      ₹ {item.advance}
                    </td>

                    <td>
                      <strong>
                        ₹{" "}
                        {item.emiTotal.toLocaleString(
                          "en-IN"
                        )}
                        /-
                      </strong>
                    </td>

                    <td>
                      <strong className="future-due-emi-payable">
                        ₹{" "}
                        {item.payableAmount.toLocaleString(
                          "en-IN"
                        )}
                        /-
                      </strong>
                    </td>

                    <td>

                      {item.previousStatus ===
                        "PENDING" && (

                        <span className="future-due-emi-status pending">
                          PENDING
                        </span>

                      )}

                      {item.previousStatus ===
                        "APPROVED" && (

                        <span className="future-due-emi-status approved">
                          APPROVED
                        </span>

                      )}

                    </td>

                    <td>

                      <div className="future-due-emi-action">

                        <button
                          type="button"
                          className="future-due-emi-task-btn"
                          onClick={() =>
                            setOpenTask(
                              openTask ===
                                item.id
                                ? null
                                : item.id
                            )
                          }
                        >
                          Task
                          <FaChevronDown />
                        </button>

                        {openTask === item.id && (

                          <div className="future-due-emi-task-menu">

                            <button
                              type="button"
                              onClick={() => {
                                onView(item);
                                setOpenTask(null);
                              }}
                            >
                              <FaEye />
                              View
                            </button>

                            {item.status !==
                              "Paid" && (

                              <button
                                type="button"
                                className="future-due-emi-pay-option"
                                onClick={() => {
                                  onPayNow(item);
                                  setOpenTask(null);
                                }}
                              >
                                <FaMoneyBillWave />
                                Pay Now
                              </button>

                            )}

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="future-due-emi-footer">

        <span>
          SHOWING{" "}
          {visibleData.length > 0
            ? 1
            : 0}
          {" "}TO{" "}
          {visibleData.length}
          {" "}OF{" "}
          {data.length}
          {" "}ENTRIES
        </span>

        <div className="future-due-emi-pagination">

          <button>‹</button>

          <button className="active">
            1
          </button>

          <button>›</button>

        </div>

      </div>

    </div>
  );
};

export default FutureDueEmiTable;