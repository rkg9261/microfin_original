import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";


const CibilReportEquifaxTable = ({ data = [] }) => {

  // =========================================================
  // STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredData = useMemo(() => {

    if (!search.trim()) {
      return data;
    }

    const value = search.toLowerCase();

    return data.filter((item) =>

      item.name?.toLowerCase().includes(value) ||

      item.branch?.toLowerCase().includes(value) ||

      item.idProof?.toLowerCase().includes(value) ||

      item.address?.toLowerCase().includes(value) ||

      item.status?.toLowerCase().includes(value)

    );

  }, [data, search]);


  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / entries)
  );

  const startIndex =
    (currentPage - 1) * entries;

  const endIndex =
    startIndex + entries;

  const currentData =
    filteredData.slice(
      startIndex,
      endIndex
    );


  // =========================================================
  // ENTRIES CHANGE
  // =========================================================

  const handleEntriesChange = (value) => {

    setEntries(Number(value));

    setCurrentPage(1);

  };


  // =========================================================
  // SEARCH CHANGE
  // =========================================================

  const handleSearch = (e) => {

    setSearch(e.target.value);

    setCurrentPage(1);

  };


  // =========================================================
  // PAGE CHANGE
  // =========================================================

  const goToPage = (page) => {

    if (
      page >= 1 &&
      page <= totalPages
    ) {

      setCurrentPage(page);

    }

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div className="cibil-equifax-table-card">

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="cibil-equifax-table-header">

        <h2>
          CIBIL CHECK REPORTING
        </h2>

      </div>


      {/* =====================================================
          TABLE TOOLBAR
      ===================================================== */}

      <div className="cibil-equifax-table-toolbar">

        {/* ENTRIES */}

        <div className="cibil-equifax-entries">

          <EntriesDropdown
            value={entries}
            onChange={handleEntriesChange}
          />

        </div>


        {/* SEARCH */}

        <div className="cibil-equifax-search">

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by MobileNo, Aadhaar, Pancard"
          />

          <span>
            🔍
          </span>

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
                NAME
              </th>

              <th>
                BRANCH
              </th>

              <th>
                ID PROOF
              </th>

              <th>
                DATE
              </th>

              <th>
                ADDRESS
              </th>

              <th>
                CREDIT SCORE
              </th>

              <th>
                STATUS
              </th>

            </tr>

          </thead>


          <tbody>

            {currentData.length > 0 ? (

              currentData.map((item, index) => (

                <tr key={item.id}>

                  <td>
                    {startIndex + index + 1}
                  </td>

                  <td>
                    {item.name}
                  </td>

                  <td>
                    {item.branch}
                  </td>

                  <td>
                    {item.idProof}
                  </td>

                  <td>
                    {item.date}
                  </td>

                  <td>
                    {item.address}
                  </td>

                  <td className="cibil-equifax-score">

                    {item.creditScore}

                  </td>

                  <td>

                    {/* STATUS CLASS NOT CHANGED */}

                    <span
                      className={
                        item.status === "COMPLETED"
                          ? "cibil-equifax-status completed"
                          : "cibil-equifax-status pending"
                      }
                    >

                      {item.status}

                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="common-table-empty"
                >

                  No records found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          TABLE FOOTER
      ===================================================== */}

      <div className="cibil-equifax-table-footer">

        <div className="cibil-equifax-showing">

          SHOWING{" "}

          {filteredData.length === 0
            ? 0
            : startIndex + 1}

          {" "}TO{" "}

          {Math.min(
            endIndex,
            filteredData.length
          )}

          {" "}OF{" "}

          {filteredData.length}

          {" "}ENTRIES

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="cibil-equifax-pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              goToPage(currentPage - 1)
            }
          >
            PREV
          </button>


          <button
            type="button"
            className="active"
          >
            {currentPage}
          </button>


          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              goToPage(currentPage + 1)
            }
          >
            NEXT
          </button>

        </div>

      </div>

    </div>

  );

};

export default CibilReportEquifaxTable;