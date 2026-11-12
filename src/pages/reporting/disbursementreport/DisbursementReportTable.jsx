import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";
import "../../../components/common/Table.css";

import {
  FaSearch,
  FaFileExcel,
} from "react-icons/fa";


const DisbursementReportTable = ({
  data = [],
}) => {

  // =========================================================
  // STATE
  // =========================================================

  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState(10);


  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredData = useMemo(() => {

    const searchValue = search
      .toLowerCase()
      .trim();


    if (!searchValue) {

      return data;

    }


    return data.filter((item) => {

      return (

        item.loanId
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.memberName
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.memberCode
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.mobile
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.centerName
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.staff
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.status
          ?.toLowerCase()
          .includes(searchValue)

      );

    });

  }, [data, search]);


  // =========================================================
  // DISPLAY DATA
  // =========================================================

  const displayedData = filteredData.slice(
    0,
    entries
  );


  // =========================================================
  // TOTAL LOAN AMOUNT
  // =========================================================

  const totalLoanAmount = filteredData.reduce(
    (total, item) =>
      total + Number(item.loanAmount || 0),
    0
  );


  // =========================================================
  // TOTAL DISBURSEMENT AMOUNT
  // =========================================================

  const totalDisbAmount = filteredData.reduce(
    (total, item) =>
      total + Number(item.disbAmount || 0),
    0
  );


  // =========================================================
  // DOWNLOAD EXCEL
  // =========================================================

  const handleExcelDownload = () => {

    alert(
      "Excel download functionality will be connected with API."
    );

  };


  return (

    <div className="disbursement-table-container">

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="disbursement-table-header">

        <h2>
          DISBURSEMENT RECORDS
        </h2>


        <div className="disbursement-table-summary">

          <button
            type="button"
            className="disbursement-download-btn"
            onClick={handleExcelDownload}
          >

            <FaFileExcel />

            DOWNLOAD EXCEL

          </button>


          <div className="disbursement-total-summary">

            <span>
              TOTAL LOAN AMOUNT:
            </span>

            <strong>
              ₹ {totalLoanAmount.toLocaleString("en-IN")}
            </strong>


            <span>
              TOTAL DISB AMOUNT:
            </span>

            <strong>
              ₹ {totalDisbAmount.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          TOTAL AMOUNT
      ===================================================== */}

      <div className="disbursement-total-row">

        TOTAL AMOUNT:

        <strong>
          ₹ {totalDisbAmount.toLocaleString("en-IN")}
        </strong>

      </div>


      {/* =====================================================
          TABLE TOOLBAR
      ===================================================== */}

      <div className="disbursement-table-toolbar">


        {/* ENTRIES */}

        <div className="disbursement-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

        </div>


        {/* SEARCH */}

        <div className="disbursement-search">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search"
          />

          <FaSearch />

        </div>

      </div>


      {/* =====================================================
          COMMON TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

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
                MEM CODE
              </th>

              <th>
                MOBILE
              </th>

              <th>
                CENTERNAME
              </th>

              <th>
                DISBURSEMENT DATE
              </th>

              <th>
                LOAN START DATE
              </th>

              <th>
                LOAN END DATE
              </th>

              <th>
                LOAN AMOUNT
              </th>

              <th>
                DISB AMOUNT
              </th>

              <th>
                STAFF
              </th>

              <th>
                PAY MODE
              </th>

              <th>
                STATUS
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

                    <td>
                      {item.loanId}
                    </td>

                    <td>
                      {item.memberName}
                    </td>

                    <td>
                      {item.memberCode}
                    </td>

                    <td>
                      {item.mobile}
                    </td>

                    <td>
                      {item.centerName}
                    </td>

                    <td>
                      {item.disbursementDate}
                    </td>

                    <td>
                      {item.loanStartDate}
                    </td>

                    <td>
                      {item.loanEndDate}
                    </td>

                    <td className="disbursement-money">

                      ₹{" "}
                      {Number(
                        item.loanAmount
                      ).toLocaleString("en-IN")}

                    </td>

                    <td className="disbursement-money">

                      ₹{" "}
                      {Number(
                        item.disbAmount
                      ).toLocaleString("en-IN")}

                    </td>

                    <td>
                      {item.staff}
                    </td>

                    <td>
                      {item.payMode}
                    </td>

                    <td>

                      {/* STATUS CLASS NOT CHANGED */}

                      <span
                        className={
                          item.status === "DISBURSED"
                            ? "disbursement-status-success"
                            : "disbursement-status-pending"
                        }
                      >

                        {item.status}

                      </span>

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

                  No disbursement records found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default DisbursementReportTable;