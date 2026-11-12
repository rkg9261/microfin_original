import React, { useMemo, useState } from "react";
import "./FYVoucherStatement.css";

import EntriesDropdown from "../../../../components/common/EntriesDropdown";

import {
  FaSearch,
  FaFileExcel,
  FaCalendarAlt,
  FaChevronDown,
  FaTimes,
  FaFilter,
  FaSyncAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const FYVoucherStatement = () => {
  // =========================================================
  // STATES
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    member: "",
    voucherNo: "",
    voucherType: "",
    date: "",
  });

  const [entries, setEntries] = useState(10);

  // =========================================================
  // VOUCHER DATA
  // =========================================================

  const voucherData = [
    {
      id: 1,
      date: "2026-04-01",
      member: "SUMIT",
      voucherNo: "VCH-1001",
      type: "LOAN",
      particular: "LOAN DISBURSEMENT",
      debit: 27000,
      credit: 0,
      balance: 27000,
      branch: "MAIN BRANCH",
    },

    {
      id: 2,
      date: "2026-04-02",
      member: "MAKSUD ALAM",
      voucherNo: "VCH-1002",
      type: "EMI",
      particular: "EMI COLLECTION",
      debit: 0,
      credit: 736,
      balance: 26264,
      branch: "MAIN BRANCH",
    },
  ];

  // =========================================================
  // FILTER CHANGE
  // =========================================================

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setFilters({
      branch: "",
      member: "",
      voucherNo: "",
      voucherType: "",
      date: "",
    });
  };

  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredData = useMemo(() => {
    return voucherData.filter((item) => {
      const branchMatch =
        !filters.branch ||
        item.branch === filters.branch;

      const memberMatch =
        !filters.member ||
        item.member === filters.member;

      const voucherNoMatch =
        !filters.voucherNo ||
        item.voucherNo
          .toLowerCase()
          .includes(
            filters.voucherNo.toLowerCase()
          );

      const voucherTypeMatch =
        !filters.voucherType ||
        item.type === filters.voucherType;

      const dateMatch =
        !filters.date ||
        item.date === filters.date;

      return (
        branchMatch &&
        memberMatch &&
        voucherNoMatch &&
        voucherTypeMatch &&
        dateMatch
      );
    });
  }, [filters]);

  // =========================================================
  // DISPLAY DATA
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
        total.debit += Number(item.debit || 0);
        total.credit += Number(item.credit || 0);

        return total;
      },
      {
        debit: 0,
        credit: 0,
      }
    );
  }, [filteredData]);

  // =========================================================
  // FORMAT AMOUNT
  // =========================================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parts = date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  // =========================================================
  // EXPORT
  // =========================================================

  const handleExport = () => {
    const headers = [
      "SN",
      "DATE",
      "MEMBER",
      "VOUCHER NO",
      "TYPE",
      "PARTICULAR",
      "DEBIT",
      "CREDIT",
      "BALANCE",
      "BRANCH",
    ];

    const rows = filteredData.map(
      (item, index) => [
        index + 1,
        item.date,
        item.member,
        item.voucherNo,
        item.type,
        item.particular,
        item.debit,
        item.credit,
        item.balance,
        item.branch,
      ]
    );

    const csvContent = [
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
      "fy-voucher-statement.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="fy-voucher-statement-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="fy-voucher-statement-header">

        <div className="fy-voucher-title-area">

          <div className="fy-voucher-title-icon">
            <FaFileInvoiceDollar />
          </div>

          <div>

            <h1>
              FY VOUCHER STATEMENT
            </h1>

            <p>
              Financial year transaction overview
            </p>

          </div>

        </div>

        <div className="fy-voucher-breadcrumb">

          <span>
            DASHBOARD
          </span>

          <span className="fy-breadcrumb-arrow">
            /
          </span>

          <strong>
            FY VOUCHER STATEMENT
          </strong>

        </div>

      </div>


      {/* =====================================================
          FINANCIAL YEAR STRIP
      ===================================================== */}

      <div className="fy-voucher-financial-strip">

        <div className="fy-financial-left">

          <div className="fy-financial-icon">
            <FaCalendarAlt />
          </div>

          <div>

            <span>
              FINANCIAL YEAR
            </span>

            <strong>
              2026 - 2027
            </strong>

          </div>

        </div>


        <div className="fy-financial-summary">

          <div>

            <span>
              TOTAL ENTRIES
            </span>

            <strong>
              {filteredData.length}
            </strong>

          </div>


          <div>

            <span>
              DEBIT
            </span>

            <strong className="fy-strip-debit">
              ₹ {formatAmount(totals.debit)}
            </strong>

          </div>


          <div>

            <span>
              CREDIT
            </span>

            <strong className="fy-strip-credit">
              ₹ {formatAmount(totals.credit)}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="fy-voucher-filter-card">

        <div className="fy-voucher-filter-header">

          <div>

            <div className="fy-filter-heading">

              <FaFilter />

              <span>
                TRANSACTION FILTER
              </span>

            </div>

            <p>
              Select criteria to view voucher records
            </p>

          </div>


          <button
            type="button"
            className="fy-reset-filter-btn"
            onClick={handleReset}
          >

            <FaSyncAlt />

            RESET

          </button>

        </div>


        <div className="fy-voucher-filter-grid">

          {/* BRANCH */}

          <div className="fy-voucher-field">

            <label>
              BRANCH
            </label>

            <div className="fy-select-wrapper">

              <select
                value={filters.branch}
                onChange={(e) =>
                  handleFilterChange(
                    "branch",
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Branches
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


          {/* MEMBER */}

          <div className="fy-voucher-field">

            <label>
              MEMBER
            </label>

            <div className="fy-select-wrapper">

              <select
                value={filters.member}
                onChange={(e) =>
                  handleFilterChange(
                    "member",
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Members
                </option>

                {[
                  ...new Set(
                    voucherData.map(
                      (item) => item.member
                    )
                  ),
                ].map((member) => (

                  <option
                    key={member}
                    value={member}
                  >
                    {member}
                  </option>

                ))}

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* VOUCHER NUMBER */}

          <div className="fy-voucher-field">

            <label>
              VOUCHER NUMBER
            </label>

            <div className="fy-input-with-icon">

              <input
                type="text"
                placeholder="Search voucher no."
                value={filters.voucherNo}
                onChange={(e) =>
                  handleFilterChange(
                    "voucherNo",
                    e.target.value
                  )
                }
              />

              <FaSearch />

            </div>

          </div>


          {/* VOUCHER TYPE */}

          <div className="fy-voucher-field">

            <label>
              VOUCHER TYPE
            </label>

            <div className="fy-select-wrapper">

              <select
                value={filters.voucherType}
                onChange={(e) =>
                  handleFilterChange(
                    "voucherType",
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Types
                </option>

                <option value="LOAN">
                  LOAN
                </option>

                <option value="EMI">
                  EMI
                </option>

                <option value="REPAYMENT">
                  REPAYMENT
                </option>

                <option value="EXPENSE">
                  EXPENSE
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* DATE */}

          <div className="fy-voucher-field">

            <label>
              TRANSACTION DATE
            </label>

            <div className="fy-date-wrapper">

              <input
                type="date"
                value={filters.date}
                onChange={(e) =>
                  handleFilterChange(
                    "date",
                    e.target.value
                  )
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* SEARCH */}

          <div className="fy-voucher-filter-action">

            <button
              type="button"
              className="fy-get-record-btn"
            >

              <FaSearch />

              GET RECORDS

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          LEDGER CARD
      ===================================================== */}

      <div className="fy-voucher-ledger-card">

        {/* LEDGER HEADER */}

        <div className="fy-ledger-header">

          <div className="fy-ledger-title">

            <div className="fy-ledger-title-icon">
              <FaFileInvoiceDollar />
            </div>

            <div>

              <h2>
                LEDGER STATEMENT
              </h2>

              <span>
                Financial Year 2026 - 2027
              </span>

            </div>

          </div>


          <button
            type="button"
            className="fy-export-btn"
            onClick={handleExport}
          >

            <FaFileExcel />

            EXPORT EXCEL

          </button>

        </div>


        {/* =================================================
            TABLE CONTROLS
        ================================================= */}

        <div className="fy-table-controls">

          <div className="fy-entries-area">

            <span>
              SHOW
            </span>

            <EntriesDropdown
              value={entries}
              onChange={(value) =>
                setEntries(Number(value))
              }
            />

            <span>
              ENTRIES
            </span>

          </div>


          <div className="fy-record-count">

            <span>
              RECORDS FOUND
            </span>

            <strong>
              {filteredData.length}
            </strong>

          </div>

        </div>


        {/* =================================================
            COMMON TABLE
        ================================================= */}

        <div className="common-table-wrapper">

          <table className="common-table">

            <thead>

              <tr>

                <th rowSpan="2">
                  SN
                </th>

                <th rowSpan="2">
                  DATE
                </th>

                <th rowSpan="2">
                  MEMBER
                </th>

                <th rowSpan="2">
                  VOUCHER NO
                </th>

                <th rowSpan="2">
                  TYPE
                </th>

                <th rowSpan="2">
                  PARTICULAR
                </th>

                <th
                  colSpan="2"
                  className="amount-column"
                >
                  AMOUNT
                </th>

                <th rowSpan="2">
                  BALANCE
                </th>

              </tr>


              <tr>

                <th className="fy-debit-heading">
                  DR.
                </th>

                <th className="fy-credit-heading">
                  CR.
                </th>

              </tr>

            </thead>


            <tbody>

              {displayedData.length > 0 ? (

                displayedData.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>

                        <span className="fy-sn">
                          {index + 1}
                        </span>

                      </td>


                      <td>

                        <span className="fy-date">
                          {formatDate(item.date)}
                        </span>

                      </td>


                      <td>

                        <div className="fy-member-cell">

                          <strong>
                            {item.member}
                          </strong>

                          <small>
                            {item.branch}
                          </small>

                        </div>

                      </td>


                      <td>

                        <span className="fy-voucher-number">
                          {item.voucherNo}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`fy-type-badge fy-type-${item.type.toLowerCase()}`}
                        >
                          {item.type}
                        </span>

                      </td>


                      <td>

                        <span className="fy-particular">
                          {item.particular}
                        </span>

                      </td>


                      <td className="fy-debit-amount">

                        {item.debit > 0
                          ? `₹ ${formatAmount(
                              item.debit
                            )}`
                          : "-"}

                      </td>


                      <td className="fy-credit-amount">

                        {item.credit > 0
                          ? `₹ ${formatAmount(
                              item.credit
                            )}`
                          : "-"}

                      </td>


                      <td>

                        <span
                          className={
                            item.balance >= 0
                              ? "fy-balance-positive"
                              : "fy-balance-negative"
                          }
                        >

                          ₹{" "}

                          {formatAmount(
                            item.balance
                          )}

                        </span>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="common-table-empty"
                  >

                    <div>

                      <FaFileInvoiceDollar />

                      <strong>
                        No Voucher Records Found
                      </strong>

                      <span>
                        Try changing your filter criteria.
                      </span>

                    </div>

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
                  className="total-label"
                >
                  TOTAL
                </td>

                <td className="total-debit">

                  ₹{" "}

                  {formatAmount(
                    totals.debit
                  )}

                </td>

                <td className="total-credit">

                  ₹{" "}

                  {formatAmount(
                    totals.credit
                  )}

                </td>

                <td className="total-balance">

                  ₹{" "}

                  {formatAmount(
                    totals.debit -
                      totals.credit
                  )}

                </td>

              </tr>

            </tfoot>

          </table>

        </div>


        {/* =================================================
            TABLE FOOTER
        ================================================= */}

        <div className="fy-voucher-table-footer">

          <span>

            SHOWING{" "}

            <strong>
              {displayedData.length > 0 ? 1 : 0}
            </strong>

            {" "}TO{" "}

            <strong>
              {displayedData.length}
            </strong>

            {" "}OF{" "}

            <strong>
              {filteredData.length}
            </strong>

            {" "}ENTRIES

          </span>


          <span className="fy-footer-note">

            <span className="fy-footer-dot"></span>

            Financial year: 2026 - 2027

          </span>

        </div>

      </div>

    </div>
  );
};

export default FYVoucherStatement;