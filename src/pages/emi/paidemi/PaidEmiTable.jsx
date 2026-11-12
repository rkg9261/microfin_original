import React, { useState } from "react";
import {
  FaChevronDown,
  FaCheck,
  FaClock,
  FaEye,
} from "react-icons/fa";

const PaidEmiTable = ({
  data,
  entries,
  setEntries,
  search,
  setSearch,
  onTask,
  onView,
}) => {
  const [openTask, setOpenTask] = useState(null);

  const visibleData = data.slice(0, Number(entries));

  const totalAmount = data.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="paid-emi-table-card">

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="paid-emi-table-header">

        <h3>MEMBER PAID EMIS</h3>

        <div className="paid-emi-table-header-right">

          <div className="paid-emi-total">
            AMT : ₹{totalAmount.toLocaleString("en-IN")}
          </div>

          <div className="paid-emi-search">

            <input
              type="text"
              placeholder="Search by City"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <span>⌕</span>

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLE CONTROLS
      ===================================================== */}

      <div className="paid-emi-table-controls">

        <select
          value={entries}
          onChange={(e) =>
            setEntries(Number(e.target.value))
          }
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <span>entries</span>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>SELECT</th>
              <th>SR.</th>
              <th>LOAN ID</th>
              <th>MEM NAME</th>
              <th>ALIAS</th>
              <th>MOBILE</th>
              <th>TYPE</th>
              <th>CENTER NAME</th>
              <th>PAY DATE</th>
              <th>AMOUNT</th>
              <th>BRANCH</th>
              <th>RECEIVED BY</th>
              <th>APPROVED BY</th>
              <th>CREATED</th>
              <th>STATUS</th>
              <th>ACTION</th>

            </tr>

          </thead>


          <tbody>

            {visibleData.length === 0 ? (

              <tr>

                <td
                  colSpan="16"
                  className="paid-emi-no-data"
                >
                  NO DATA FOUND
                </td>

              </tr>

            ) : (

              visibleData.map((record, index) => (

                <tr key={record.id}>

                  {/* SELECT */}
                  <td>

                    <input
                      type="checkbox"
                      className="paid-emi-checkbox"
                    />

                  </td>


                  {/* SR */}
                  <td>{index + 1}</td>


                  {/* LOAN ID */}
                  <td>

                    <span className="paid-emi-loan-id">
                      {record.loanId}
                    </span>

                  </td>


                  {/* MEMBER NAME */}
                  <td>

                    <div className="paid-emi-member">

                      <strong>
                        {record.memberName}
                      </strong>

                      <small>
                        ({record.memberCode})
                      </small>

                    </div>

                  </td>


                  {/* ALIAS */}
                  <td>
                    {record.alias}
                  </td>


                  {/* MOBILE */}
                  <td>
                    {record.mobile}
                  </td>


                  {/* TYPE */}
                  <td>

                    <span className="paid-emi-type">
                      {record.type}
                    </span>

                  </td>


                  {/* CENTER */}
                  <td>
                    {record.centerName}
                  </td>


                  {/* PAY DATE */}
                  <td>
                    {record.payDate}
                  </td>


                  {/* AMOUNT */}
                  <td>

                    <strong className="paid-emi-amount">
                      ₹
                      {record.amount.toLocaleString(
                        "en-IN"
                      )}
                      /-
                    </strong>

                  </td>


                  {/* BRANCH */}
                  <td>
                    {record.branch}
                  </td>


                  {/* RECEIVED BY */}
                  <td>
                    {record.receivedBy}
                  </td>


                  {/* APPROVED BY */}
                  <td>
                    {record.approvedBy || "-"}
                  </td>


                  {/* CREATED */}
                  <td>
                    {record.created}
                  </td>


                  {/* STATUS */}
                  <td>

                    {record.status === "Approved" ? (

                      <span className="paid-emi-status approved">

                        <FaCheck />

                        Approved

                      </span>

                    ) : (

                      <span className="paid-emi-status pending">

                        <FaClock />

                        Pending

                      </span>

                    )}

                  </td>


                  {/* ACTION */}
                  <td>

                    <div className="paid-emi-action">

                      {/* VIEW */}
                      <button
                        type="button"
                        className="paid-emi-view-button"
                        onClick={() =>
                          onView(record)
                        }
                      >
                        <FaEye />
                        View
                      </button>


                      {/* TASK */}
                      <button
                        type="button"
                        className="paid-emi-task-button"
                        onClick={() =>
                          setOpenTask(
                            openTask === record.id
                              ? null
                              : record.id
                          )
                        }
                      >
                        Task
                        <FaChevronDown />
                      </button>


                      {/* TASK MENU */}
                      {openTask === record.id && (

                        <div className="paid-emi-task-menu">

                          {record.status !==
                            "Approved" && (

                            <button
                              type="button"
                              onClick={() => {
                                onTask(
                                  record,
                                  "approve"
                                );

                                setOpenTask(null);
                              }}
                            >
                              <FaCheck />
                              Approve
                            </button>

                          )}


                          {record.status ===
                            "Approved" && (

                            <button
                              type="button"
                              onClick={() => {
                                onTask(
                                  record,
                                  "pending"
                                );

                                setOpenTask(null);
                              }}
                            >
                              <FaClock />
                              Set Pending
                            </button>

                          )}

                        </div>

                      )}

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          TABLE FOOTER
      ===================================================== */}

      <div className="paid-emi-table-footer">

        <span>
          SHOWING{" "}
          {visibleData.length === 0
            ? 0
            : 1}{" "}
          TO{" "}
          {visibleData.length}{" "}
          OF{" "}
          {data.length}{" "}
          ENTRIES
        </span>

        <div className="paid-emi-pagination">

          <button type="button">
            ‹
          </button>

          <button
            type="button"
            className="active"
          >
            1
          </button>

          <button type="button">
            ›
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaidEmiTable;