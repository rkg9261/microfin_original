import React, { useMemo, useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  FaEye,
  FaTrash,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import "./LoanHistory.css";

const LoanHistoryTable = () => {
  const confirm = useConfirm();


  // =========================================================
  // STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [selectedLoan, setSelectedLoan] = useState(null);

  const [showViewPopup, setShowViewPopup] = useState(false);

  const [loanHistoryData, setLoanHistoryData] = useState([
    {
      id: 1,
      member: "DEEPAK",
      applicationNo: "20201242",
      method: "POST",
      relationType: "PAYMENT",
      title: "EMI PAYMENT",
      branch: "SHREEJA GROUP",
      createdAt: "2026-08-19 15:01:05",
    },

    {
      id: 2,
      member: "AKSHAY GARG",
      applicationNo: "20155384",
      method: "GET",
      relationType: "DISBURSEMENT",
      title: "LOAN DISBURSEMENT",
      branch: "SHREEJA GROUP",
      createdAt: "2026-08-19 13:06:41",
    },

  ]);


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredData = useMemo(() => {

    const searchValue = search
      .toLowerCase()
      .trim();

    if (!searchValue) {
      return loanHistoryData;
    }

    return loanHistoryData.filter((item) =>

      item.member
        .toLowerCase()
        .includes(searchValue)

      ||

      item.applicationNo
        .toLowerCase()
        .includes(searchValue)

      ||

      item.method
        .toLowerCase()
        .includes(searchValue)

      ||

      item.relationType
        .toLowerCase()
        .includes(searchValue)

      ||

      item.title
        .toLowerCase()
        .includes(searchValue)

      ||

      item.branch
        .toLowerCase()
        .includes(searchValue)

      ||

      item.createdAt
        .toLowerCase()
        .includes(searchValue)

    );

  }, [search, loanHistoryData]);


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (loan) => {

    setSelectedLoan(loan);

    setShowViewPopup(true);

  };


  // =========================================================
  // CLOSE VIEW POPUP
  // =========================================================

  const handleCloseView = () => {

    setSelectedLoan(null);

    setShowViewPopup(false);

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (loan) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: `Are you sure you want to delete the history of ${loan.member}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) {
      return;
    }

    setLoanHistoryData((previousData) =>
      previousData.filter(
        (item) => item.id !== loan.id
      )
    );

  };


  return (

    <div className="loan-history-list-card">

      {/* =====================================================
          TITLE
      ===================================================== */}

      <div className="loan-history-list-title">
        HISTORY
      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="loan-history-toolbar">

        <div className="loan-history-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

        </div>


        <div className="loan-history-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="button">
            <FaSearch />
          </button>

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
                MEMBER
              </th>

              <th>
                APPLICATION NO
              </th>

              <th>
                METHOD
              </th>

              <th>
                RELATION TYPE
              </th>

              <th>
                TITLE
              </th>

              <th>
                BRANCH
              </th>

              <th>
                CREATED AT
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((item, index) => (

                <tr key={item.id}>

                  <td>
                    {index + 1}
                  </td>


                  <td>

                    <strong>
                      {item.member}
                    </strong>

                  </td>


                  <td>
                    {item.applicationNo}
                  </td>


                  <td>

                    <span
                      className={
                        item.method === "POST"
                          ? "loan-history-method post"
                          : "loan-history-method get"
                      }
                    >
                      {item.method}
                    </span>

                  </td>


                  <td>
                    {item.relationType}
                  </td>


                  <td>
                    {item.title}
                  </td>


                  <td>
                    {item.branch}
                  </td>


                  <td>
                    {item.createdAt}
                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td>

                    <div className="loan-history-action-buttons">

                      {/* VIEW */}

                      <button
                        type="button"
                        className="loan-history-view-button"
                        title="View"
                        onClick={() =>
                          handleView(item)
                        }
                      >

                        <FaEye />

                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="loan-history-delete-button"
                        title="Delete"
                        onClick={() =>
                          handleDelete(item)
                        }
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}


            {/* =================================================
                NO DATA
            ================================================= */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="9"
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

      <div className="loan-history-footer">

        <div>

          Showing 1 to{" "}

          {Math.min(
            filteredData.length,
            entries
          )}

          {" "}of{" "}

          {filteredData.length}

          {" "}entries

        </div>


        <div className="loan-history-pagination">

          <button
            type="button"
            disabled
          >
            PREV
          </button>

          <button
            type="button"
            className="loan-history-page-active"
          >
            1
          </button>

          <button
            type="button"
            disabled
          >
            NEXT
          </button>

        </div>

      </div>


      {/* =====================================================
          VIEW DETAILS POPUP
      ===================================================== */}

      {showViewPopup && selectedLoan && (

        <div
          className="loan-history-popup-overlay"
          onClick={handleCloseView}
        >

          <div
            className="loan-history-view-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div className="loan-history-popup-header">

              <h2>
                LOAN HISTORY DETAILS
              </h2>

              <button
                type="button"
                className="loan-history-popup-close"
                onClick={handleCloseView}
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                POPUP BODY
            ================================================= */}

            <div className="loan-history-popup-body">


              {/* MEMBER */}

              <div className="loan-history-detail-row">

                <span>
                  MEMBER
                </span>

                <strong>
                  {selectedLoan.member}
                </strong>

              </div>


              {/* APPLICATION NUMBER */}

              <div className="loan-history-detail-row">

                <span>
                  APPLICATION NO
                </span>

                <strong>
                  {selectedLoan.applicationNo}
                </strong>

              </div>


              {/* METHOD */}

              <div className="loan-history-detail-row">

                <span>
                  METHOD
                </span>

                <strong
                  className={
                    selectedLoan.method === "POST"
                      ? "loan-history-popup-post"
                      : "loan-history-popup-get"
                  }
                >
                  {selectedLoan.method}
                </strong>

              </div>


              {/* RELATION TYPE */}

              <div className="loan-history-detail-row">

                <span>
                  RELATION TYPE
                </span>

                <strong>
                  {selectedLoan.relationType}
                </strong>

              </div>


              {/* TITLE */}

              <div className="loan-history-detail-row">

                <span>
                  TITLE
                </span>

                <strong>
                  {selectedLoan.title}
                </strong>

              </div>


              {/* BRANCH */}

              <div className="loan-history-detail-row">

                <span>
                  BRANCH
                </span>

                <strong>
                  {selectedLoan.branch}
                </strong>

              </div>


              {/* CREATED AT */}

              <div className="loan-history-detail-row">

                <span>
                  CREATED AT
                </span>

                <strong>
                  {selectedLoan.createdAt}
                </strong>

              </div>

            </div>


            {/* =================================================
                POPUP FOOTER
            ================================================= */}

            <div className="loan-history-popup-footer">

              <button
                type="button"
                className="loan-history-popup-delete"
                onClick={() => {

                  handleDelete(selectedLoan);

                  handleCloseView();

                }}
              >

                <FaTrash />

                Delete

              </button>


              <button
                type="button"
                className="loan-history-popup-close-button"
                onClick={handleCloseView}
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default LoanHistoryTable;