import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import ViewButton from "../../../components/buttons/ViewButton";

import DeleteButton from "../../../components/buttons/DeleteButton";

import {
  FaSearch,
  FaDownload,
} from "react-icons/fa";

const LoanSettlementTable = ({
  data,
  filters,
  onFilterChange,
  onView,
  onDelete,
}) => {

  const [entries, setEntries] = useState(10);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredData = useMemo(() => {

    return data.filter((item) => {

      const branchMatch =
        !filters.branch ||
        item.branch === filters.branch;

      const customerMatch =
        !filters.customer ||
        item.memberName === filters.customer;

      const dateMatch =
        !filters.date ||
        item.settlementDate === filters.date;

      const statusMatch =
        !filters.status ||
        item.settlementStatus === filters.status;

      const loanMatch =
        !filters.loanNumber ||
        item.loanId
          .toLowerCase()
          .includes(
            filters.loanNumber.toLowerCase()
          );

      return (
        branchMatch &&
        customerMatch &&
        dateMatch &&
        statusMatch &&
        loanMatch
      );

    });

  }, [data, filters]);


  // =====================================================
  // DISPLAY DATA
  // =====================================================

  const displayedData = filteredData.slice(
    0,
    Number(entries)
  );


  // =====================================================
  // FORMAT AMOUNT
  // =====================================================

  const formatAmount = (amount) => {

    return Number(amount || 0).toLocaleString(
      "en-IN"
    );

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const parts = date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

  };


  // =====================================================
  // EXPORT
  // =====================================================

  const handleExport = () => {

    const headers = [
      "Sr No",
      "Loan ID",
      "Member Name",
      "Member Code",
      "Member Alias",
      "Member Mobile",
      "Plan Amount",
      "Paid Amount",
      "Due Amount",
      "Settlement Amount",
      "Settlement Date",
      "Created By",
      "Payment Mode",
      "Status",
    ];


    const rows = filteredData.map(
      (item, index) => [

        index + 1,

        item.loanId,

        item.memberName,

        item.memberCode,

        item.memberAlias,

        item.memberMobile,

        item.planAmount,

        item.paidAmount,

        item.dueAmount,

        item.settleAmount,

        item.settlementDate,

        item.createdBy,

        item.paymentMode,

        item.settlementStatus,

      ]
    );


    const csv = [

      headers.join(","),

      ...rows.map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      ),

    ].join("\n");


    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "loan-settlement-list.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  };


  return (

    <div className="loan-settlement-list-card">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="loan-settlement-list-header">

        <h2>
          SETTLEMENT LIST
        </h2>

        <button
          type="button"
          className="loan-settlement-list-export"
          onClick={handleExport}
        >

          <FaDownload />

          DOWNLOAD EXCEL

        </button>

      </div>


      {/* =================================================
          CONTROLS
      ================================================= */}

      <div className="loan-settlement-table-controls">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />


        <div className="loan-settlement-table-search">

          <input
            type="text"
            placeholder="Search by loan No."
            value={filters.loanNumber}
            onChange={(e) =>
              onFilterChange(
                "loanNumber",
                e.target.value
              )
            }
          />

          <FaSearch />

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR.<br />NO.
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                MEM NAME
              </th>

              <th>
                (C/O)<br />ALIAS
              </th>

              <th>
                MEM MOB
              </th>

              <th>
                PLAN<br />AMT
              </th>

              <th>
                PAID<br />AMT
              </th>

              <th>
                DUE<br />AMT
              </th>

              <th>
                SETTLE<br />AMT
              </th>

              <th>
                SETTLE<br />DATE
              </th>

              <th>
                CREATED<br />BY
              </th>

              <th>
                PAY<br />MODE
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

            {displayedData.length > 0 ? (

              displayedData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>
                      {index + 1}
                    </td>


                    <td className="loan-id-cell">
                      {item.loanId}
                    </td>


                    <td>

                      <strong>
                        {item.memberName}
                      </strong>

                      <br />

                      <span className="member-code">
                        {item.memberCode}
                      </span>

                    </td>


                    <td>
                      {item.memberAlias}
                    </td>


                    <td>
                      {item.memberMobile}
                    </td>


                    <td>
                      {formatAmount(
                        item.planAmount
                      )}
                    </td>


                    <td>
                      {formatAmount(
                        item.paidAmount
                      )}
                    </td>


                    <td>
                      {formatAmount(
                        item.dueAmount
                      )}
                    </td>


                    <td>
                      {formatAmount(
                        item.settleAmount
                      )}
                    </td>


                    <td>
                      {formatDate(
                        item.settlementDate
                      )}
                    </td>


                    <td>
                      {item.createdBy}
                    </td>


                    <td>
                      {item.paymentMode}
                    </td>


                    <td>

                      <span className="loan-settlement-status">

                        {item.settlementStatus}

                      </span>

                    </td>


                    {/* ===================================
                        ACTION
                    =================================== */}

                    <td>

                      <div className="loan-settlement-action-buttons">

                        {/* YOUR VIEW BUTTON */}

                        <ViewButton
                          onClick={() =>
                            onView(item)
                          }
                        />


                        {/* YOUR DELETE BUTTON */}

                        <DeleteButton
                          onClick={() =>
                            onDelete(item.id)
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
                  colSpan="14"
                  className="common-table-empty"
                >
                  No settlement records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="loan-settlement-table-footer">

        SHOWING{" "}

        {displayedData.length > 0 ? 1 : 0}

        {" "}TO{" "}

        {displayedData.length}

        {" "}OF{" "}

        {filteredData.length}

        {" "}ENTRIES

      </div>

    </div>

  );
};

export default LoanSettlementTable;