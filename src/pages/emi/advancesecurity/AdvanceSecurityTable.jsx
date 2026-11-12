import React from "react";

import {
  FaEye,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

const AdvanceSecurityTable = ({
  data,
  entries,
  setEntries,
  search,
  setSearch,
  onView,
  onDelete,
}) => {

  const totalAmount = data.reduce(
    (total, item) =>
      total + Number(item.amount),
    0
  );

  return (
    <div className="advance-security-table-card">

      {/* ==============================================
          TABLE HEADER
      =============================================== */}

      <div className="advance-security-table-heading">

        <h3>
          ADVANCE SECURITY RECORDS
        </h3>

        <span className="advance-security-download">
          DOWNLOAD EXCEL
        </span>

      </div>


      {/* ==============================================
          TABLE TOP
      =============================================== */}

      <div className="advance-security-table-controls">

        <div className="advance-security-left-controls">

          <EntriesDropdown
            value={entries}
            onChange={setEntries}
            options={[10, 25, 50, 100]}
          />

          <span className="advance-security-total">
            AMT : ₹
            {totalAmount.toLocaleString("en-IN")}
          </span>

        </div>


        {/* SEARCH */}

        <div className="advance-security-search-box">

          <input
            type="text"
            placeholder="Search by Loan ID"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="button">
            <FaSearch />
          </button>

        </div>

      </div>


      {/* ==============================================
          TABLE
      =============================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>SR.</th>

              <th>LOAN ID</th>

              <th>MEM NAME</th>

              <th>ALIAS</th>

              <th>MOBILE</th>

              <th>TYPE</th>

              <th>CENTER NAME</th>

              <th>PAY DATE</th>

              <th>AMOUNT</th>

              <th>RECEIVED BY</th>

              <th>CREATED</th>

              <th>STATUS</th>

              <th>ACTION</th>

            </tr>

          </thead>


          <tbody>

            {data
              .slice(0, entries)
              .map((item, index) => (

                <tr key={item.id}>

                  {/* SR NO */}

                  <td>
                    {index + 1}
                  </td>


                  {/* LOAN ID */}

                  <td>
                    <span className="advance-security-loan-id">
                      {item.loanId}
                    </span>
                  </td>


                  {/* MEMBER */}

                  <td>

                    <div className="advance-security-member">

                      <strong>
                        {item.memberName}
                      </strong>

                      <small>
                        ({item.memberCode})
                      </small>

                    </div>

                  </td>


                  {/* ALIAS */}

                  <td>
                    {item.alias}
                  </td>


                  {/* MOBILE */}

                  <td>
                    {item.mobile}
                  </td>


                  {/* TYPE */}

                  <td>
                    {item.type}
                  </td>


                  {/* CENTER */}

                  <td>
                    {item.centerName}
                  </td>


                  {/* PAY DATE */}

                  <td>
                    {item.payDate}
                  </td>


                  {/* AMOUNT */}

                  <td>

                    <span className="advance-security-amount">

                      ₹{" "}
                      {item.amount.toLocaleString(
                        "en-IN"
                      )}

                      /-

                    </span>

                  </td>


                  {/* RECEIVED BY */}

                  <td>
                    {item.receivedBy}
                  </td>


                  {/* CREATED */}

                  <td>
                    {item.createdAt}
                  </td>


                  {/* STATUS */}

                  <td>

                    {item.status === "Approved" ? (

                      <span className="advance-security-status approved">
                        Approved
                      </span>

                    ) : (

                      <span className="advance-security-status pending">
                        Pending
                      </span>

                    )}

                  </td>


                  {/* ACTION */}

                  <td>

                    <div className="advance-security-action-buttons">

                      {/* VIEW */}

                      <button
                        type="button"
                        className="advance-security-view-button"
                        title="View"
                        onClick={() =>
                          onView(item)
                        }
                      >
                        <FaEye />
                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="advance-security-delete-button"
                        title="Delete"
                        onClick={() =>
                          onDelete(item.id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}


            {/* ========================================
                NO DATA
            ======================================== */}

            {data.length === 0 && (

              <tr>

                <td
                  colSpan="13"
                  className="advance-security-no-data"
                >
                  No data available
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* ==============================================
          TABLE FOOTER
      =============================================== */}

      <div className="advance-security-table-footer">

        <span>
          ROWS PER PAGE
        </span>

        <strong>
          {entries}
        </strong>

        <span>
          SHOWING 1 TO{" "}
          {Math.min(data.length, entries)}{" "}
          OF {data.length} ENTRIES
        </span>

      </div>

    </div>
  );
};

export default AdvanceSecurityTable;