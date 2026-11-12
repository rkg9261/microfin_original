import React, { useState } from "react";
import {
  FaChevronDown,
  FaEye,
  FaMoneyBillWave,
} from "react-icons/fa";

const DueEmiTable = ({
  data,
  entries,
  setEntries,
  search,
  setSearch,
  totalEmi,
  totalAmount,
  onView,
  onPayNow,
}) => {
  const [openTask, setOpenTask] = useState(null);

  const visibleData = data.slice(
    0,
    Number(entries)
  );

  return (
    <div className="due-emi-table-card">

      {/* HEADER */}

      <div className="due-emi-table-heading">

        <div>
          <h3>MEMBER DUE EMIS</h3>

          <div className="due-emi-summary">
            EMI TOTAL :
            <strong>
              ₹ {totalEmi.toLocaleString("en-IN")}/-
            </strong>

            <span>|</span>

            AMT :
            <strong>
              ₹ {totalAmount.toLocaleString("en-IN")}/-
            </strong>
          </div>
        </div>

        <div className="due-emi-table-search">
          <input
            type="text"
            placeholder="Search by Member Name, Code, Mobile"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <span>⌕</span>
        </div>

      </div>


      {/* CONTROLS */}

      <div className="due-emi-table-controls">

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

        <span>ENTRIES</span>

      </div>


      {/* TABLE */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>
            <tr>
              <th>SR. NO.</th>
              <th>LOAN ID</th>
              <th>MEM NAME</th>
              <th>ALIAS</th>
              <th>CONTACT NUMBER</th>
              <th>TYPE</th>
              <th>STAFF</th>
              <th>EMI DATE</th>
              <th>ADV EMI</th>
              <th>EMI NO.</th>
              <th>PENALTY</th>
              <th>DUES EMI</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {visibleData.length === 0 ? (

              <tr>
                <td
                  colSpan="14"
                  className="due-emi-no-data"
                >
                  NO DATA FOUND
                </td>
              </tr>

            ) : (

              visibleData.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    <div className="due-emi-loan">
                      <strong>♟ {item.loanId}</strong>
                      <small>
                        ({item.loanType})
                      </small>
                    </div>
                  </td>

                  <td>
                    <div className="due-emi-member">
                      <strong>
                        {item.memberName}
                      </strong>
                      <small>
                        ({item.memberCode})
                      </small>
                    </div>
                  </td>

                  <td>
                    {item.alias}
                  </td>

                  <td>
                    {item.mobile}
                  </td>

                  <td>
                    <span className="due-emi-type">
                      {item.type}
                    </span>
                  </td>

                  <td>
                    <div className="due-emi-staff">
                      <strong>
                        {item.staff}
                      </strong>
                      <small>
                        ({item.staffCode})
                      </small>
                    </div>
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
                    ₹ {item.penalty.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <strong className="due-emi-amount">
                      ₹{" "}
                      {item.duesEmi.toLocaleString(
                        "en-IN"
                      )}
                      /-
                    </strong>
                  </td>

                  <td>

                    {item.status === "Partial" && (
                      <span className="due-emi-status partial">
                        PARTIAL
                      </span>
                    )}

                    {item.status === "Pending" && (
                      <span className="due-emi-status pending">
                        PENDING
                      </span>
                    )}

                    {item.status === "Paid" && (
                      <span className="due-emi-status paid">
                        PAID
                      </span>
                    )}

                  </td>

                  <td>

                    <div className="due-emi-action">

                      <button
                        type="button"
                        className="due-emi-task-btn"
                        onClick={() =>
                          setOpenTask(
                            openTask === item.id
                              ? null
                              : item.id
                          )
                        }
                      >
                        Task
                        <FaChevronDown />
                      </button>


                      {openTask === item.id && (

                        <div className="due-emi-task-menu">

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

                          {item.status !== "Paid" && (

                            <button
                              type="button"
                              className="pay-option"
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

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* FOOTER */}

      <div className="due-emi-table-footer">

        <span>
          SHOWING{" "}
          {visibleData.length > 0 ? 1 : 0}
          {" "}TO{" "}
          {visibleData.length}
          {" "}OF{" "}
          {data.length}
          {" "}ENTRIES
        </span>

        <div className="due-emi-pagination">

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

export default DueEmiTable;