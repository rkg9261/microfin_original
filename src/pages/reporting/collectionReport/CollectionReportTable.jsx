import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";
import "../../../components/common/Table.css";

import {
  FaSearch,
  FaFileExcel,
  FaFileCsv,
} from "react-icons/fa";


const CollectionReportTable = ({
  data = [],
}) => {

  // =========================================================
  // STATE
  // =========================================================

  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState(10);


  // =========================================================
  // FILTER DATA
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

        item.paymentType
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
  // TOTAL AMOUNT
  // =========================================================

  const totalAmount = filteredData.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
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


  // =========================================================
  // DOWNLOAD CSV
  // =========================================================

  const handleCsvDownload = () => {

    alert(
      "CSV download functionality will be connected with API."
    );

  };


  return (

    <div className="collection-table-container">

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="collection-table-header">

        <h2>
          MEMBER COLLECTION
        </h2>


        <div className="collection-table-actions">

          {/* DOWNLOAD EXCEL */}

          <button
            type="button"
            className="collection-download-btn"
            onClick={handleExcelDownload}
          >

            <FaFileExcel />

            DOWNLOAD EXCEL

          </button>


          {/* DOWNLOAD CSV */}

          <button
            type="button"
            className="collection-download-btn"
            onClick={handleCsvDownload}
          >

            <FaFileCsv />

            DOWNLOAD CSV

          </button>


          {/* TOTAL */}

          <div className="collection-total">

            TOTAL AMOUNT:

            <strong>
              ₹ {totalAmount.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLE TOOLBAR
      ===================================================== */}

      <div className="collection-table-toolbar">

        {/* ENTRIES */}

        <div className="collection-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

        </div>


        {/* SEARCH */}

        <div className="collection-search">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by Member Name, Code, Mobile"
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
                PAYMENT TYPE
              </th>

              <th>
                CENTER NAME
              </th>

              <th>
                PAY DATE
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                RECEIVED BY
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
                      {item.paymentType}
                    </td>

                    <td>
                      {item.centerName}
                    </td>

                    <td>
                      {item.payDate}
                    </td>

                    <td className="collection-amount">

                      ₹{" "}
                      {Number(item.amount || 0)
                        .toLocaleString("en-IN")}

                    </td>

                    <td>
                      {item.receivedBy}
                    </td>

                    <td>
                      {item.payMode}
                    </td>

                    <td>

                      <span
                        className={
                          item.status === "PAID"
                            ? "status status-paid"
                            : "status status-pending"
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
                  colSpan="12"
                  className="common-table-empty"
                >

                  No collection records found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default CollectionReportTable;