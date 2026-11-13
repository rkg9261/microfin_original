import React, { useMemo, useState } from "react";
import "./FyTrialBalance.css";

import EntriesDropdown from "../../../../components/common/EntriesDropdown";

import {
  FaFileExport,
  FaChevronDown,
} from "react-icons/fa";

const FyTrialBalance = () => {

  // =========================================================
  // STATES
  // =========================================================

  const [selectedBranch, setSelectedBranch] = useState("");
  const [entries, setEntries] = useState(10);


  // =========================================================
  // FY TRIAL BALANCE DATA
  // =========================================================

  const fyTrialBalanceData = [

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
  // FILTER DATA BY BRANCH
  // =========================================================

  const filteredData = useMemo(() => {

    if (selectedBranch === "") {
      return fyTrialBalanceData;
    }

    return fyTrialBalanceData.filter(
      (item) =>
        item.branch === selectedBranch
    );

  }, [selectedBranch]);


  // =========================================================
  // ENTRIES
  // =========================================================

  const displayedData = filteredData.slice(
    0,
    Number(entries)
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
  // FORMAT AMOUNT
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
      "fy-trial-balance.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  };


  // =========================================================
  // HANDLE ENTRIES CHANGE
  // =========================================================

  const handleEntriesChange = (value) => {

    if (
      typeof value === "object" &&
      value?.target
    ) {

      setEntries(
        Number(value.target.value)
      );

      return;
    }

    setEntries(
      Number(value)
    );

  };


  // =========================================================
  // JSX
  // =========================================================

  return (

    <div className="fy-trial-balance-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="fy-trial-balance-header">

        <h1>
          FY TRIAL BALANCE
        </h1>


        <div className="fy-trial-balance-breadcrumb">

          <span>
            DASHBOARD
          </span>

          <span>
            ›
          </span>

          <strong>
            FY TRIAL BALANCE
          </strong>

        </div>

      </div>


      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="fy-trial-balance-filter-card">

        <div className="fy-filter-title">
          FILTER BY
        </div>


        <div className="fy-trial-balance-filter-row">


          {/* BRANCH */}

          <div className="fy-trial-balance-field">

            <label>
              BRANCH
            </label>


            <div className="fy-branch-select-wrapper">

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

      <div className="fy-trial-balance-card">


        {/* ===================================================
            TABLE TITLE
        =================================================== */}

        <div className="fy-trial-balance-table-header">

          <h2>
            LATEST ORDERS
          </h2>


          <button
            type="button"
            className="fy-trial-balance-export-btn"
            onClick={handleExport}
          >

            <FaFileExport />

            <span>
              EXPORT
            </span>

          </button>

        </div>


        {/* ===================================================
            ENTRIES DROPDOWN
        =================================================== */}

        <div className="fy-trial-balance-controls">

          <EntriesDropdown
            value={entries}
            onChange={handleEntriesChange}
          />

        </div>


        {/* ===================================================
            TABLE
        =================================================== */}

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

                      <td className="fy-particular-cell">

                        {item.particulars}

                      </td>


                      <td>

                        {formatAmount(
                          item.opening
                        )}

                      </td>


                      <td className="fy-debit-cell">

                        {formatAmount(
                          item.debit
                        )}

                      </td>


                      <td className="fy-credit-cell">

                        {formatAmount(
                          item.credit
                        )}

                      </td>


                      <td
                        className={
                          item.closing < 0
                            ? "fy-closing-negative"
                            : "fy-closing-positive"
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
                    className="fy-no-data"
                  >

                    NO RECORDS FOUND

                  </td>

                </tr>

              )}

            </tbody>


            {/* =================================================
                TOTAL
            ================================================= */}

            {filteredData.length > 0 && (

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

            )}

          </table>

        </div>


        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="fy-trial-balance-footer">

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

export default FyTrialBalance;