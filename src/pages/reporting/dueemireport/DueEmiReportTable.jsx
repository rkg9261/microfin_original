import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";
import "../../../components/common/Table.css";

import {
  FaSearch,
  FaEye,
  FaFileExcel,
} from "react-icons/fa";

const DueEmiReportTable = ({
  data = [],
}) => {

  // =========================================================
  // SEARCH
  // =========================================================

  const [search, setSearch] = useState("");

  // =========================================================
  // ENTRIES
  // =========================================================

  const [entries, setEntries] = useState(10);

  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredData = useMemo(() => {

    if (!search.trim()) {
      return data;
    }

    const value = search.toLowerCase().trim();

    return data.filter((item) =>

      String(item.loanId)
        .toLowerCase()
        .includes(value) ||

      String(item.memberName)
        .toLowerCase()
        .includes(value) ||

      String(item.memberCode)
        .toLowerCase()
        .includes(value) ||

      String(item.mobile)
        .toLowerCase()
        .includes(value) ||

      String(item.collectionCenter)
        .toLowerCase()
        .includes(value)

    );

  }, [data, search]);


  // =========================================================
  // DISPLAY DATA
  // =========================================================

  const displayData = filteredData.slice(0, entries);


  // =========================================================
  // TOTAL EMI
  // =========================================================

  const totalEmi = filteredData.reduce(
    (total, item) =>
      total + Number(item.emi || 0),
    0
  );


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (item) => {

    alert(
      `Loan ID: ${item.loanId}\nMember: ${item.memberName}\nEMI: ₹${item.emi}`
    );

  };


  // =========================================================
  // EXCEL
  // =========================================================

  const handleExcelDownload = () => {

    alert("Excel download will be connected to API.");

  };


  return (

    <div className="due-emi-report-table-container">

      {/* =====================================================
          TABLE TOP
      ===================================================== */}

      <div className="common-table-top">

        <div>

          <h3 className="common-table-title">
            MEMBER DUE EMIS
          </h3>

          <span>
            AMT : ₹{totalEmi.toLocaleString()}
          </span>

        </div>


        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div className="due-emi-report-table-actions">

          <button
            type="button"
            className="common-download-btn"
            onClick={handleExcelDownload}
          >

            <FaFileExcel />

            &nbsp; DOWNLOAD EXCEL

          </button>


          <div className="due-emi-report-search">

            <input
              type="text"
              placeholder="Search by Member Name, Code, Mobile"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <FaSearch />

          </div>

        </div>

      </div>


      {/* =====================================================
          ENTRIES
      ===================================================== */}

      <div className="due-emi-report-entries-row">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />

      </div>


      {/* =====================================================
          COMMON TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>SR. NO.</th>

              <th>LOAN ID</th>

              <th>MEM NAME</th>

              <th>MEM CODE</th>

              <th>MOBILE</th>

              <th>TYPE</th>

              <th>COLLECTION CENTER</th>

              <th>EMI DATE</th>

              <th>DUES</th>

              <th>EMI</th>

              <th>STATUS</th>

              <th className="action-column">
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {displayData.length > 0 ? (

              displayData.map((item, index) => (

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
                    {item.type}
                  </td>

                  <td>
                    {item.collectionCenter}
                  </td>

                  <td>
                    {item.emiDate}
                  </td>

                  <td>
                    {item.dues}
                  </td>

                  <td>
                    ₹{Number(item.emi || 0).toLocaleString()}
                  </td>

                  <td>

                    <span
                      className={
                        item.status === "OVERDUE"
                          ? "status status-overdue"
                          : "status status-due"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="action-column">

                    <div className="action-cell">

                      <button
                        type="button"
                        className="due-emi-report-view-btn"
                        onClick={() =>
                          handleView(item)
                        }
                        title="View"
                      >

                        <FaEye />

                        VIEW

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="12"
                  className="common-table-empty"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default DueEmiReportTable;