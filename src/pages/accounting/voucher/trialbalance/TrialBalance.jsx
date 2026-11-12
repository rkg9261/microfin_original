import React, { useMemo, useState } from "react";
import "./TrialBalance.css";

import EntriesDropdown from "../../../../components/common/EntriesDropdown";

import { FaFileExport, FaChevronDown } from "react-icons/fa";


const TrialBalance = () => {

  // =========================================================
  // STATES
  // =========================================================

  const [selectedBranch, setSelectedBranch] = useState("");

  const [entries, setEntries] = useState(10);

  // =========================================================
  // STATIC DATA
  // =========================================================

  const trialBalanceData = [

    {
      id: 1,
      particulars: "BANK A/C",
      opening: 0,
      debit: 30450195.00,
      credit: 7455310.64,
      closing: 22994884.36,
      branch: "MAIN BRANCH",
    },

    {
      id: 2,
      particulars: "BANK A/C",
      opening: 0,
      debit: 3011939.00,
      credit: 13178897.64,
      closing: 17012441.36,
      branch: "MAIN BRANCH",
    },

    {
      id: 3,
      particulars: "INVEST",
      opening: 0,
      debit: 3000.00,
      credit: 1334.00,
      closing: 1666.00,
      branch: "MAIN BRANCH",
    },

  ];


  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredData = useMemo(() => {

    if (!selectedBranch) {
      return trialBalanceData;
    }

    return trialBalanceData.filter(
      (item) =>
        item.branch === selectedBranch
    );

  }, [selectedBranch]);


  // =========================================================
  // PAGINATION / ENTRIES
  // =========================================================

  const displayedData = filteredData.slice(
    0,
    entries
  );


  // =========================================================
  // TOTALS
  // =========================================================

  const totals = useMemo(() => {

    return filteredData.reduce(
      (total, item) => {

        total.opening += Number(item.opening);
        total.debit += Number(item.debit);
        total.credit += Number(item.credit);
        total.closing += Number(item.closing);

        return total;

      },
      {
        opening: 0,
        debit: 0,
        credit: 0,
        closing: 0,
      }
    );

  }, [filteredData]);


  // =========================================================
  // NUMBER FORMAT
  // =========================================================

  const formatAmount = (amount) => {

    return Number(amount).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  };


  // =========================================================
  // EXPORT
  // =========================================================

  const handleExport = () => {

    const headers = [
      "Particulars",
      "Opening",
      "Debit",
      "Credit",
      "Closing",
    ];

    const rows = filteredData.map(
      (item) => [
        item.particulars,
        item.opening,
        item.debit,
        item.credit,
        item.closing,
      ]
    );

    const csvContent = [
      headers.join(","),
      ...rows.map(
        (row) => row.join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
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
      "trial-balance.csv";

    link.click();

    URL.revokeObjectURL(url);
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="trial-balance-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="trial-balance-header">

        <div>

          <h1>
            TRIAL BALANCE
          </h1>

        </div>

        <div className="trial-balance-breadcrumb">

          <span>
            Dashboard
          </span>

          <span>
            ›
          </span>

          <strong>
            Trial Balance
          </strong>

        </div>

      </div>


      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="trial-balance-filter-card">

        <div className="filter-title">
          FILTER BY
        </div>


        <div className="trial-balance-filter-row">

          {/* BRANCH */}

          <div className="trial-balance-field">

            <label>
              BRANCH
            </label>

            <div className="branch-select-wrapper">

              <select
                value={selectedBranch}
                onChange={(e) =>
                  setSelectedBranch(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="MAIN BRANCH">
                  MAIN BRANCH
                </option>

                <option value="DELHI BRANCH">
                  DELHI BRANCH
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="trial-balance-card">

        {/* TABLE HEADER */}

        <div className="trial-balance-table-header">

          <h2>
            LATEST ORDERS
          </h2>

          <button
            className="trial-balance-export-btn"
            onClick={handleExport}
          >

            <FaFileExport />

            <span>
              EXPORT
            </span>

          </button>

        </div>


        {/* =================================================
            ENTRIES
        ================================================= */}

        <div className="trial-balance-controls">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(
                Number(value)
              )
            }
          />

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="common-table-wrapper">

          <table className="common-table">

            <thead>

              <tr>

                <th>
                  PARTICULARS
                </th>

                <th>
                  OPENING
                </th>

                <th>
                  DEBIT
                </th>

                <th>
                  CREDIT
                </th>

                <th>
                  CLOSING
                </th>

              </tr>

            </thead>


            <tbody>

              {displayedData.length > 0 ? (

                displayedData.map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      <td className="particular-cell">

                        {item.particulars}

                      </td>

                      <td>

                        {formatAmount(
                          item.opening
                        )}

                      </td>

                      <td className="debit-cell">

                        {formatAmount(
                          item.debit
                        )}

                      </td>

                      <td className="credit-cell">

                        {formatAmount(
                          item.credit
                        )}

                      </td>

                      <td
                        className={
                          item.closing < 0
                            ? "closing-negative"
                            : "closing-positive"
                        }
                      >

                        {formatAmount(
                          item.closing
                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="no-data"
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

                <td>
                  TOTAL
                </td>

                <td>
                  {formatAmount(
                    totals.opening
                  )}
                </td>

                <td>
                  {formatAmount(
                    totals.debit
                  )}
                </td>

                <td>
                  {formatAmount(
                    totals.credit
                  )}
                </td>

                <td>
                  {formatAmount(
                    totals.closing
                  )}
                </td>

              </tr>

            </tfoot>

          </table>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="trial-balance-footer">

          SHOWING{" "}
          {displayedData.length}{" "}
          TO{" "}
          {displayedData.length}{" "}
          OF{" "}
          {filteredData.length}{" "}
          ENTRIES

        </div>

      </div>

    </div>

  );
};

export default TrialBalance;