import React, { useMemo, useState } from "react";
import "./FundTransfer.css";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import {
  FaChevronDown,
  FaSearch,
  FaCheck,
  FaTimes,
  FaTasks,
} from "react-icons/fa";

const FundTransfer = () => {
  // =========================================================
  // FILTER STATES
  // =========================================================

  const [branch, setBranch] = useState("");
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  // =========================================================
  // ONLY 2 RECORDS
  // =========================================================

  const [records, setRecords] = useState([
    {
      id: 1,
      srNo: "1-77",
      amount: "100000",
      ledger: "BANK A/C",
      fromBranch: "JAGATPURA",
      toBranch: "KALITAKUCHI",
      date: "20-08-2026",
      status: "PENDING",
    },
    {
      id: 2,
      srNo: "2-75",
      amount: "50000",
      ledger: "CASH",
      fromBranch: "LASKARHAT",
      toBranch: "RAMNAGAR",
      date: "18-08-2026",
      status: "PENDING",
    },
  ]);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredRecords = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return records;
    }

    return records.filter((item) => {
      return (
        item.srNo.toLowerCase().includes(value) ||
        item.amount.toLowerCase().includes(value) ||
        item.ledger.toLowerCase().includes(value) ||
        item.fromBranch.toLowerCase().includes(value) ||
        item.toBranch.toLowerCase().includes(value) ||
        item.date.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value)
      );
    });
  }, [search, records]);

  // =========================================================
  // APPROVE
  // =========================================================

  const handleApprove = (id) => {
    setRecords((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "APPROVED",
            }
          : item
      )
    );
  };

  // =========================================================
  // REJECT
  // =========================================================

  const handleReject = (id) => {
    setRecords((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "REJECTED",
            }
          : item
      )
    );
  };

  // =========================================================
  // FILTER BY BRANCH
  // =========================================================

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  // =========================================================
  // FILTERED BY BRANCH
  // =========================================================

  const finalRecords = useMemo(() => {
    if (!branch) {
      return filteredRecords;
    }

    return filteredRecords.filter(
      (item) =>
        item.fromBranch === branch ||
        item.toBranch === branch
    );
  }, [branch, filteredRecords]);

  return (
    <div className="fund-transfer-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="fund-transfer-page-header">
        <div>
          <h2>APPROVE FUND TRANSFER</h2>
        </div>

        <div className="fund-transfer-breadcrumb">
          <span>●</span>
          <span>DASHBOARD</span>
          <span>›</span>
          <strong>APPROVE FUND TRANSFER</strong>
        </div>
      </div>

      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

      <div className="fund-transfer-filter-card">

        <div className="fund-transfer-filter-title">
          SEARCH BY
        </div>

        <div className="fund-transfer-filter-row">

          {/* BRANCH */}

          <div className="fund-transfer-field">
            <label>BRANCH</label>

            <div className="fund-transfer-select-wrapper">
              <select
                value={branch}
                onChange={handleBranchChange}
              >
                <option value="">Select Branch</option>
                <option value="JAGATPURA">
                  JAGATPURA
                </option>
                <option value="LASKARHAT">
                  LASKARHAT
                </option>
                <option value="KALITAKUCHI">
                  KALITAKUCHI
                </option>
                <option value="RAMNAGAR">
                  RAMNAGAR
                </option>
              </select>

              <FaChevronDown className="fund-transfer-select-icon" />
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="fund-transfer-table-card">

        {/* TOP SECTION */}

        <div className="fund-transfer-table-top">

          <div className="fund-transfer-entry-info">
            SHOWING 1 TO {finalRecords.length} OF{" "}
            {finalRecords.length} ENTRIES
          </div>

          {/* SEARCH */}

          <div className="fund-transfer-search">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* ===================================================
            ENTRIES DROPDOWN
        =================================================== */}

        <div className="fund-transfer-table-controls">

          <EntriesDropdown
            value={entries}
            onChange={(e) =>
              setEntries(Number(e.target.value))
            }
            options={[10, 25, 50, 100]}
          />

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="common-table-wrapper">

          <table className="common-table">

            <thead>
              <tr>
                <th>SR. NO.</th>
                <th>AMOUNT</th>
                <th>LEDGER</th>
                <th>FROM BRANCH</th>
                <th>TO BRANCH</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {finalRecords.length > 0 ? (
                finalRecords
                  .slice(0, entries)
                  .map((item) => (
                    <tr key={item.id}>

                      <td>
                        <span className="fund-transfer-sr">
                          {item.srNo}
                        </span>
                      </td>

                      <td>
                        <strong className="fund-transfer-amount">
                          ₹{item.amount}
                        </strong>
                      </td>

                      <td>
                        <span className="fund-transfer-ledger">
                          {item.ledger}
                        </span>
                      </td>

                      <td>
                        {item.fromBranch}
                      </td>

                      <td>
                        {item.toBranch}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>

                        <span
                          className={`fund-transfer-status ${
                            item.status === "APPROVED"
                              ? "approved"
                              : item.status === "REJECTED"
                              ? "rejected"
                              : "pending"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="fund-transfer-actions">

                          {/* APPROVE */}

                          {item.status === "PENDING" && (
                            <button
                              type="button"
                              className="fund-transfer-action-btn approve"
                              title="Approve"
                              onClick={() =>
                                handleApprove(item.id)
                              }
                            >
                              <FaCheck />
                            </button>
                          )}

                          {/* REJECT */}

                          {item.status === "PENDING" && (
                            <button
                              type="button"
                              className="fund-transfer-action-btn reject"
                              title="Reject"
                              onClick={() =>
                                handleReject(item.id)
                              }
                            >
                              <FaTimes />
                            </button>
                          )}

                          {/* TASK */}

                          {item.status !== "PENDING" && (
                            <button
                              type="button"
                              className="fund-transfer-task-btn"
                            >
                              <FaTasks />
                              Task
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="common-table-empty"
                  >
                    NO DATA FOR TABLE
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div className="fund-transfer-table-footer">

          <div>
            SHOWING 1 TO {finalRecords.length} OF{" "}
            {finalRecords.length} ENTRIES
          </div>

          <div className="fund-transfer-pagination">

            <button disabled>
              ‹
            </button>

            <button className="active">
              1
            </button>

            <button disabled>
              ›
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FundTransfer;