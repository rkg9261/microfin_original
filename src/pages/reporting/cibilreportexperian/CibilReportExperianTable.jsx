import React, { useMemo, useState } from "react";

import {
  FaSearch,
  FaExternalLinkAlt,
} from "react-icons/fa";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";


const CibilReportExperianTable = ({
  data = [],
}) => {


  // =========================================================
  // STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);


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

        item.name
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.mobile
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.pancard
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.date
          ?.toLowerCase()
          .includes(searchValue)

        ||

        String(item.creditScore)
          .includes(searchValue)

        ||

        item.status
          ?.toLowerCase()
          .includes(searchValue)

      );

    });

  }, [data, search]);


  // =========================================================
  // PAGINATION
  // =========================================================

  const totalEntries = filteredData.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalEntries / Number(entries)
    )
  );


  // If current page becomes invalid

  if (currentPage > totalPages) {

    setCurrentPage(totalPages);

  }


  const startIndex =
    (currentPage - 1) * Number(entries);


  const endIndex =
    startIndex + Number(entries);


  const displayedData =
    filteredData.slice(
      startIndex,
      endIndex
    );


  // =========================================================
  // PAGE CHANGE
  // =========================================================

  const goToPage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {

      return;

    }

    setCurrentPage(page);

  };


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

  const handleSearchChange = (e) => {

    setSearch(e.target.value);

    setCurrentPage(1);

  };


  return (

    <div className="cibil-report-experian-table-card">


      {/* =====================================================
          TABLE TITLE
      ===================================================== */}

      <div className="cibil-report-experian-table-title">

        <h3>
          CIBIL CHECK REPORTING
        </h3>

      </div>


      {/* =====================================================
          TABLE TOOLBAR
      ===================================================== */}

      <div className="cibil-report-experian-toolbar">


        {/* =================================================
            ENTRIES DROPDOWN
        ================================================= */}

        <div className="cibil-report-experian-entries">

          <EntriesDropdown
            value={entries}
            onChange={handleEntriesChange}
          />

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="cibil-report-experian-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />

          <FaSearch />

        </div>

      </div>


      {/* =====================================================
          COMMON TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">


          {/* =================================================
              HEAD
          ================================================= */}

          <thead>

            <tr>

              <th>
                SR. NO.
              </th>

              <th>
                NAME
              </th>

              <th>
                MOBILE
              </th>

              <th>
                PANCARD
              </th>

              <th>
                DATE
              </th>

              <th>
                CREDIT_REPORT_LINK
              </th>

              <th>
                CREDIT SCORE
              </th>

              <th>
                STATUS
              </th>

            </tr>

          </thead>


          {/* =================================================
              BODY
          ================================================= */}

          <tbody>

            {displayedData.length > 0 ? (

              displayedData.map((item, index) => (

                <tr key={item.id}>


                  {/* SR NO */}

                  <td>
                    {startIndex + index + 1}
                  </td>


                  {/* NAME */}

                  <td className="cibil-name">

                    {item.name}

                  </td>


                  {/* MOBILE */}

                  <td>

                    {item.mobile}

                  </td>


                  {/* PANCARD */}

                  <td>

                    {item.pancard}

                  </td>


                  {/* DATE */}

                  <td>

                    {item.date}

                  </td>


                  {/* CREDIT REPORT LINK */}

                  <td className="cibil-report-link-cell">

                    {item.creditReportLink ? (

                      <a
                        href={item.creditReportLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cibil-report-link"
                        title="Open Credit Report"
                      >

                        <span>
                          View Report
                        </span>

                        <FaExternalLinkAlt />

                      </a>

                    ) : (

                      <span className="cibil-no-link">
                        -
                      </span>

                    )}

                  </td>


                  {/* CREDIT SCORE */}

                  <td>

                    <span
                      className={`
                        cibil-credit-score
                        ${
                          item.creditScore >= 750
                            ? "cibil-score-excellent"
                            : item.creditScore >= 700
                              ? "cibil-score-good"
                              : item.creditScore >= 650
                                ? "cibil-score-average"
                                : "cibil-score-low"
                        }
                      `}
                    >

                      {item.creditScore}

                    </span>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={
                        item.status === "COMPLETED"
                          ? "cibil-status-completed"
                          : "cibil-status-pending"
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
          FOOTER
      ===================================================== */}

      <div className="cibil-report-experian-footer">


        {/* SHOWING ENTRIES */}

        <div className="cibil-showing-text">

          {totalEntries === 0 ? (

            "SHOWING 0 TO 0 OF 0 ENTRIES"

          ) : (

            <>
              SHOWING {startIndex + 1} TO{" "}
              {Math.min(endIndex, totalEntries)}{" "}
              OF {totalEntries} ENTRIES
            </>

          )}

        </div>


        {/* PAGINATION */}

        <div className="cibil-pagination">


          {/* PREVIOUS */}

          <button
            type="button"
            className="cibil-page-prev"
            disabled={currentPage === 1}
            onClick={() =>
              goToPage(currentPage - 1)
            }
          >

            PREV

          </button>


          {/* PAGE NUMBERS */}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          )
            .slice(0, 5)
            .map((page) => (

              <button
                key={page}
                type="button"
                className={
                  currentPage === page
                    ? "cibil-page-active"
                    : "cibil-page-number"
                }
                onClick={() =>
                  goToPage(page)
                }
              >

                {page}

              </button>

            ))}


          {/* NEXT */}

          <button
            type="button"
            className="cibil-page-next"
            disabled={
              currentPage === totalPages
            }
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


export default CibilReportExperianTable;