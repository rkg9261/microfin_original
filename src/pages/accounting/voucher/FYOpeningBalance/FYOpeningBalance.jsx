import React, { useMemo, useState } from "react";
import { useConfirm } from "../../../../components/common/ConfirmModal";
import "./FYOpeningBalance.css";

import EntriesDropdown from "../../../../components/common/EntriesDropdown";

import {
  AddButton,
  EditButton,
  DeleteButton,
  CloseButton,
  CancelButton,
  SaveButton,
} from "../../../../components/buttons";

import FYOpeningBalanceManualForm from "./FYOpeningBalanceManualForm.jsx";
import FYOpeningBalanceAutomaticForm from "./FYOpeningBalanceAutomaticForm.jsx";
import FYOpeningBalanceEditForm from "./FYOpeningBalanceEditForm.jsx";

import {
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaBalanceScale,
} from "react-icons/fa";

const FYOpeningBalance = () => {
  const confirm = useConfirm();


  /* =====================================================
     FILTER STATE
  ===================================================== */

  const [filters, setFilters] = useState({
    session: "",
    branch: "",
  });

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  /* =====================================================
     MODAL STATE
  ===================================================== */

  const [showManual, setShowManual] = useState(false);
  const [showAutomatic, setShowAutomatic] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);

  /* =====================================================
     SAMPLE DATA
  ===================================================== */

  const [openingBalances, setOpeningBalances] = useState([
    {
      id: 1,
      session: "2026-2027",
      branch: "LASKARHAT",
      ledger: "AJAY",
      group: "CASH IN HAND",
      openingBalance: 0,
    },
    {
      id: 2,
      session: "2026-2027",
      branch: "LASKARHAT",
      ledger: "NEHA SINGH - INVESTOR",
      group: "CURRENT LIABILITY",
      openingBalance: 0,
    },
  ]);

  /* =====================================================
     SESSION OPTIONS
  ===================================================== */

  const sessions = [
    "2026-2027",
    "2025-2026",
    "2024-2025",
  ];

  /* =====================================================
     BRANCH OPTIONS
  ===================================================== */

  const branches = [
    "LASKARHAT",
    "BRANCH M FINANCE",
    "MAIN BRANCH",
    "BRANCH SORAN",
  ];

  /* =====================================================
     HANDLE FILTER
  ===================================================== */

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     RESET FILTER
  ===================================================== */

  const resetFilters = () => {
    setFilters({
      session: "",
      branch: "",
    });

    setSearch("");
  };

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredData = useMemo(() => {
    return openingBalances.filter((item) => {

      const sessionMatch =
        !filters.session ||
        item.session === filters.session;

      const branchMatch =
        !filters.branch ||
        item.branch === filters.branch;

      const searchValue = search
        .trim()
        .toLowerCase();

      const searchMatch =
        !searchValue ||
        item.ledger
          .toLowerCase()
          .includes(searchValue) ||
        item.branch
          .toLowerCase()
          .includes(searchValue) ||
        item.group
          .toLowerCase()
          .includes(searchValue) ||
        item.session
          .toLowerCase()
          .includes(searchValue);

      return (
        sessionMatch &&
        branchMatch &&
        searchMatch
      );
    });
  }, [
    openingBalances,
    filters,
    search,
  ]);

  /* =====================================================
     DISPLAY DATA
  ===================================================== */

  const displayedData = filteredData.slice(
    0,
    Number(entries)
  );

  /* =====================================================
     FORMAT AMOUNT
  ===================================================== */

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );
  };

  /* =====================================================
     OPEN MANUAL
  ===================================================== */

  const openManualForm = () => {
    setShowManual(true);
  };

  /* =====================================================
     OPEN AUTOMATIC
  ===================================================== */

  const openAutomaticForm = () => {
    setShowAutomatic(true);
  };

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const openEditForm = (record) => {
    setSelectedRecord(record);
    setShowEdit(true);
  };

  /* =====================================================
     ADD MANUAL RECORD
  ===================================================== */

  const handleManualCreate = (newRecords) => {

    const recordsWithIds = newRecords.map(
      (item, index) => ({
        ...item,
        id:
          Date.now() +
          index,
        openingBalance: Number(
          item.openingBalance || 0
        ),
      })
    );

    setOpeningBalances((previous) => [
      ...recordsWithIds,
      ...previous,
    ]);

    setShowManual(false);
  };

  /* =====================================================
     ADD AUTOMATIC RECORDS
  ===================================================== */

  const handleAutomaticCreate = (
    automaticRecords
  ) => {

    const recordsWithIds =
      automaticRecords.map(
        (item, index) => ({
          ...item,
          id:
            Date.now() +
            index,
          openingBalance: Number(
            item.openingBalance || 0
          ),
        })
      );

    setOpeningBalances((previous) => [
      ...recordsWithIds,
      ...previous,
    ]);

    setShowAutomatic(false);
  };

  /* =====================================================
     UPDATE RECORD
  ===================================================== */

  const handleUpdate = (updatedRecord) => {

    setOpeningBalances((previous) =>
      previous.map((item) =>
        item.id === updatedRecord.id
          ? {
              ...item,
              ...updatedRecord,
              openingBalance: Number(
                updatedRecord.openingBalance || 0
              ),
            }
          : item
      )
    );

    setShowEdit(false);
    setSelectedRecord(null);
  };

  /* =====================================================
     DELETE RECORD
  ===================================================== */

  const handleDelete = async (id) => {

    const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this opening balance?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    setOpeningBalances((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =====================================================
     CLOSE ALL MODALS
  ===================================================== */

  const closeAllModals = () => {

    setShowManual(false);
    setShowAutomatic(false);
    setShowEdit(false);
    setSelectedRecord(null);

  };

  return (

    <div className="fy-opening-balance-page">

      {/* =================================================
          PAGE TOP
      ================================================= */}

      <div className="fy-opening-page-top">

        <div className="fy-opening-page-title">

          <div className="fy-opening-title-icon">
            <FaBalanceScale />
          </div>

          <div>

            <h1>
              FY OPENING BALANCE
            </h1>

            <p>
              Financial year opening ledger management
            </p>

          </div>

        </div>

        <div className="fy-opening-breadcrumb">

          <span>
            DASHBOARD
          </span>

          <b>
            ›
          </b>

          <strong>
            FY OPENING BALANCE
          </strong>

        </div>

      </div>


      {/* =================================================
          FILTER CARD
      ================================================= */}

      <section className="fy-opening-filter-card">

        <div className="fy-opening-section-heading">
          FILTER BY
        </div>

        <div className="fy-opening-filter-row">

          {/* SESSION */}

          <div className="fy-opening-filter-field">

            <label>
              SESSION
            </label>

            <div className="fy-opening-select-box">

              <select
                value={filters.session}
                onChange={(e) =>
                  handleFilterChange(
                    "session",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Session
                </option>

                {sessions.map((session) => (

                  <option
                    key={session}
                    value={session}
                  >
                    {session}
                  </option>

                ))}

              </select>

              {filters.session && (

                <button
                  type="button"
                  className="fy-opening-clear-select"
                  onClick={() =>
                    handleFilterChange(
                      "session",
                      ""
                    )
                  }
                >
                  <FaTimes />
                </button>

              )}

              <FaChevronDown />

            </div>

          </div>


          {/* BRANCH */}

          <div className="fy-opening-filter-field">

            <label>
              BRANCH
            </label>

            <div className="fy-opening-select-box">

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
                  Select Branch
                </option>

                {branches.map((branch) => (

                  <option
                    key={branch}
                    value={branch}
                  >
                    {branch}
                  </option>

                ))}

              </select>

              {filters.branch && (

                <button
                  type="button"
                  className="fy-opening-clear-select"
                  onClick={() =>
                    handleFilterChange(
                      "branch",
                      ""
                    )
                  }
                >
                  <FaTimes />
                </button>

              )}

              <FaChevronDown />

            </div>

          </div>


          {/* GET RECORD */}

          <button
            type="button"
            className="fy-opening-get-record-btn"
          >

            <FaSearch />

            GET RECORDS

          </button>


          {/* RESET */}

          <button
            type="button"
            className="fy-opening-reset-btn"
            onClick={resetFilters}
          >
            RESET
          </button>

        </div>

      </section>


      {/* =================================================
          MAIN TABLE CARD
      ================================================= */}

      <section className="fy-opening-table-card">

        {/* TABLE HEADER */}

        <div className="fy-opening-table-header">

          <div>

            <h2>
              FY OPENING BALANCE
            </h2>

            <span>
              Manage financial year ledger opening balances
            </span>

          </div>


          <div className="fy-opening-header-actions">

            <AddButton
              text="Add New Manual"
              onClick={openManualForm}
            />

            <AddButton
              text="Add New Automatic"
              onClick={openAutomaticForm}
            />

          </div>

        </div>


        {/* TABLE TOOLBAR */}

        <div className="fy-opening-toolbar">

          <div className="fy-opening-entries">

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


          <div className="fy-opening-search">

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <FaTimes />
              </button>

            )}

            <FaSearch />

          </div>

        </div>


        {/* =================================================
            COMMON TABLE
        ================================================= */}

        <div className="common-table-wrapper">

          <table className="common-table">

            <thead>

              <tr>

                <th>
                  SR. NO.
                </th>

                <th>
                  FINANCIAL YEAR
                </th>

                <th>
                  BRANCH
                </th>

                <th>
                  LEDGER
                </th>

                <th>
                  GROUP
                </th>

                <th className="amount-column">
                  OPENING BALANCE
                </th>

                <th className="action-column">
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {displayedData.length > 0 ? (

                displayedData.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>

                        <span className="fy-opening-number">
                          {index}
                        </span>

                      </td>

                      <td>

                        <strong className="fy-opening-year">
                          {item.session}
                        </strong>

                      </td>

                      <td>
                        {item.branch}
                      </td>

                      <td>

                        <strong className="fy-opening-ledger">
                          {item.ledger}
                        </strong>

                      </td>

                      <td>

                        <span className="fy-opening-group">
                          {item.group}
                        </span>

                      </td>

                      <td className="fy-opening-amount">

                        ₹{" "}

                        {formatAmount(
                          item.openingBalance
                        )}

                      </td>

                      <td>

                        <div className="fy-opening-actions">

                          <EditButton
                            onClick={() =>
                              openEditForm(item)
                            }
                          />

                          <DeleteButton
                            onClick={() =>
                              handleDelete(item.id)
                            }
                          />

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="common-table-empty"
                  >

                    <FaBalanceScale />

                    <strong>
                      No opening balance found
                    </strong>

                    <span>
                      Try changing your filter or search.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="fy-opening-table-footer">

          <span>

            Showing{" "}

            <strong>
              {displayedData.length}
            </strong>

            {" "}of{" "}

            <strong>
              {filteredData.length}
            </strong>

            {" "}entries

          </span>

          <span>
            FY 2026 - 2027
          </span>

        </div>

      </section>


      {/* =================================================
          MANUAL MODAL
      ================================================= */}

      {showManual && (

        <FYOpeningBalanceManualForm
          onClose={() =>
            setShowManual(false)
          }
          onCreate={handleManualCreate}
          sessions={sessions}
          branches={branches}
        />

      )}


      {/* =================================================
          AUTOMATIC MODAL
      ================================================= */}

      {showAutomatic && (

        <FYOpeningBalanceAutomaticForm
          onClose={() =>
            setShowAutomatic(false)
          }
          onCreate={handleAutomaticCreate}
          sessions={sessions}
          branches={branches}
        />

      )}


      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {showEdit && selectedRecord && (

        <FYOpeningBalanceEditForm
          record={selectedRecord}
          onClose={closeAllModals}
          onUpdate={handleUpdate}
          sessions={sessions}
          branches={branches}
        />

      )}

    </div>

  );
};

export default FYOpeningBalance;