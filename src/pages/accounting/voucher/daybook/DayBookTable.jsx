import React, {
  useMemo,
  useState,
} from "react";

import "./DayBook.css";

const DayBookTable = ({ filters }) => {

  // =========================================================
  // STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);


  // =========================================================
  // DAY BOOK DATA
  // =========================================================

  const dayBookData = [

    {
      id: 1,
      date: "13-08-2026",
      loanId: "LN001",
      voucher: "RECEIPT",
      narration: "EMI PAYMENT",
      particular: "AMBEY",
      dr: 0,
      cr: 2500,
    },

    {
      id: 2,
      date: "13-08-2026",
      loanId: "LN002",
      voucher: "PAYMENT",
      narration: "LOAN DISBURSEMENT",
      particular: "KIRAN DEVI",
      dr: 25000,
      cr: 0,
    },



  ];


  // =========================================================
  // FILTER
  // =========================================================

  const filteredData = useMemo(() => {

    let result = [...dayBookData];


    // DATE

    if (filters?.date) {

      result = result.filter(
        (item) =>
          item.date === filters.date
      );

    }


    // VOUCHER

    if (filters?.voucher) {

      result = result.filter(
        (item) =>
          item.voucher === filters.voucher
      );

    }


    // LOAN ID

    if (filters?.loanId) {

      const selectedLoan =
        filters.loanId
          .split(" - ")[0]
          .toLowerCase();

      result = result.filter(
        (item) =>
          item.loanId
            .toLowerCase()
            .includes(selectedLoan)
      );

    }


    // SEARCH

    if (search.trim()) {

      const value =
        search.toLowerCase();

      result = result.filter(
        (item) =>

          item.date
            .toLowerCase()
            .includes(value) ||

          item.loanId
            .toLowerCase()
            .includes(value) ||

          item.voucher
            .toLowerCase()
            .includes(value) ||

          item.narration
            .toLowerCase()
            .includes(value) ||

          item.particular
            .toLowerCase()
            .includes(value)

      );

    }


    return result;

  }, [filters, search]);


  // =========================================================
  // TOTAL
  // =========================================================

  const totalDr = filteredData.reduce(
    (total, item) =>
      total + item.dr,
    0
  );

  const totalCr = filteredData.reduce(
    (total, item) =>
      total + item.cr,
    0
  );


  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length / entries
    )
  );

  const startIndex =
    (currentPage - 1) * entries;

  const paginatedData =
    filteredData.slice(
      startIndex,
      startIndex + entries
    );


  // =========================================================
  // FORMAT MONEY
  // =========================================================

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN");
  };


  // =========================================================
  // ENTRIES
  // =========================================================

  const handleEntriesChange = (e) => {

    setEntries(
      Number(e.target.value)
    );

    setCurrentPage(1);

  };


  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (e) => {

    setSearch(
      e.target.value
    );

    setCurrentPage(1);

  };


  // =========================================================
  // PAGE
  // =========================================================

  const handlePageChange = (page) => {

    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }

  };


  return (

    <div className="daybook-table-container">


      {/* =====================================================
          TABLE CONTROLS
      ===================================================== */}

      <div className="daybook-table-controls">

        <select
          value={entries}
          onChange={handleEntriesChange}
        >

          <option value={10}>
            10
          </option>

          <option value={25}>
            25
          </option>

          <option value={50}>
            50
          </option>

          <option value={100}>
            100
          </option>

        </select>


        <div className="daybook-table-search">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />

        </div>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="daybook-table-wrapper">

        <table className="daybook-table">

          <thead>

            <tr>

              <th>
                SN
              </th>

              <th>
                DATE
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                VOUCHER
              </th>

              <th>
                NARRATION
              </th>

              <th>
                PARTICULAR
              </th>

              <th>
                AMOUNT
                <div className="daybook-amount-heading">
                  DR
                </div>
              </th>

              <th>
                AMOUNT
                <div className="daybook-amount-heading">
                  CR
                </div>
              </th>

            </tr>

          </thead>


          <tbody>

            {paginatedData.length > 0 ? (

              paginatedData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>
                      {startIndex + index + 1}
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td className="daybook-loan-id">
                      {item.loanId}
                    </td>

                    <td>

                      <span
                        className={
                          `daybook-voucher-badge ${
                            item.voucher
                              .toLowerCase()
                              .replace(
                                / /g,
                                "-"
                              )
                          }`
                        }
                      >
                        {item.voucher}
                      </span>

                    </td>

                    <td>
                      {item.narration}
                    </td>

                    <td>
                      {item.particular}
                    </td>

                    <td className="daybook-dr">

                      {item.dr > 0
                        ? `₹${formatAmount(
                            item.dr
                          )}`
                        : "0"}

                    </td>

                    <td className="daybook-cr">

                      {item.cr > 0
                        ? `₹${formatAmount(
                            item.cr
                          )}`
                        : "0"}

                    </td>

                  </tr>

                )

              )

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="daybook-no-data"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>


          {/* =================================================
              TOTAL
          ================================================= */}

          <tfoot>

            <tr>

              <td
                colSpan="6"
                className="daybook-total-label"
              >
                TOTAL AMOUNT
              </td>

              <td className="daybook-total-dr">
                {formatAmount(totalDr)}
              </td>

              <td className="daybook-total-cr">
                {formatAmount(totalCr)}
              </td>

            </tr>

          </tfoot>

        </table>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="daybook-table-footer">

        <div className="daybook-showing">

          Showing{" "}

          {filteredData.length === 0
            ? 0
            : startIndex + 1}

          {" "}to{" "}

          {Math.min(
            startIndex + entries,
            filteredData.length
          )}

          {" "}of{" "}

          {filteredData.length}

          {" "}entries

        </div>


        <div className="daybook-pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(
                currentPage - 1
              )
            }
          >
            PREV
          </button>


          {Array.from(
            {
              length: totalPages,
            },
            (_, index) =>
              index + 1
          )
            .slice(0, 5)
            .map((page) => (

              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handlePageChange(page)
                }
              >
                {page}
              </button>

            ))}


          <button
            type="button"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              handlePageChange(
                currentPage + 1
              )
            }
          >
            NEXT
          </button>

        </div>

      </div>

    </div>
  );
};

export default DayBookTable;