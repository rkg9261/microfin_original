import React, { useState } from "react";

import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";

const ApprovalSettlementTable = ({
  settlements,
  setSettlements,
}) => {

  const [search, setSearch] = useState("");

  const [selectedSettlement, setSelectedSettlement] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showApproveModal, setShowApproveModal] =
    useState(false);

  const [showRejectModal, setShowRejectModal] =
    useState(false);

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredSettlements = settlements.filter((item) => {

    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return true;
    }

    return (
      item.loanId
        .toLowerCase()
        .includes(value) ||

      item.memCode
        .toLowerCase()
        .includes(value) ||

      item.memName
        .toLowerCase()
        .includes(value) ||

      item.mobile.includes(value)
    );
  });

  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (item) => {

    setSelectedSettlement(item);

    setShowViewModal(true);
  };

  /* =====================================================
     APPROVE
  ===================================================== */

  const handleApproveClick = (item) => {

    setSelectedSettlement(item);

    setShowApproveModal(true);
  };

  const approveSettlement = () => {

    if (!selectedSettlement) {
      return;
    }

    setSettlements((prev) =>
      prev.map((item) =>
        item.id === selectedSettlement.id
          ? {
              ...item,
              status: "APPROVED",
            }
          : item
      )
    );

    closeModals();
  };

  /* =====================================================
     REJECT
  ===================================================== */

  const handleRejectClick = (item) => {

    setSelectedSettlement(item);

    setShowRejectModal(true);
  };

  const rejectSettlement = () => {

    if (!selectedSettlement) {
      return;
    }

    setSettlements((prev) =>
      prev.map((item) =>
        item.id === selectedSettlement.id
          ? {
              ...item,
              status: "REJECTED",
            }
          : item
      )
    );

    closeModals();
  };

  /* =====================================================
     CLOSE MODALS
  ===================================================== */

  const closeModals = () => {

    setShowViewModal(false);

    setShowApproveModal(false);

    setShowRejectModal(false);

    setSelectedSettlement(null);
  };

  return (
    <>
      {/* =================================================
          TABLE CARD
      ================================================= */}

      <div className="approval-settlement-table-card">

        {/* HEADER */}

        <div className="approval-settlement-table-header">

          <h3>
            APPROVE LOAN SETTLEMENT
          </h3>

          <div className="approval-settlement-search">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <FaSearch />

          </div>

        </div>

        {/* TABLE */}

        <div className="common-table-wrapper">

          <table className="common-table">

            <thead>

              <tr>

                <th>SR. NO.</th>

                <th>LOAN ID</th>

                <th>MEM CODE</th>

                <th>MEM NAME</th>

                <th>(C/O) ALIAS</th>

                <th>MEM MOB</th>

                <th>SETTLEMENT DATE</th>

                <th>PLAN AMT</th>

                <th>PAID AMT</th>

                <th>DUE AMT</th>

                <th>SETTLEMENT AMT</th>

                <th>CREATED BY</th>

                <th>PAY MODE</th>

                <th>STATUS</th>

                <th>ACTION</th>

              </tr>

            </thead>

            <tbody>

              {filteredSettlements.length === 0 ? (

                <tr>

                  <td
                    colSpan="15"
                    className="common-table-empty"
                  >
                    NO DATA FOR TABLE
                  </td>

                </tr>

              ) : (

                filteredSettlements.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {item.loanId}
                        </strong>
                      </td>

                      <td>
                        {item.memCode}
                      </td>

                      <td>
                        <strong>
                          {item.memName}
                        </strong>
                      </td>

                      <td>
                        {item.alias}
                      </td>

                      <td>
                        {item.mobile}
                      </td>

                      <td>
                        {item.settlementDate}
                      </td>

                      <td>
                        {item.planAmount}
                      </td>

                      <td>
                        {item.paidAmount}
                      </td>

                      <td className="due-amount">
                        {item.dueAmount}
                      </td>

                      <td className="settlement-amount">
                        {item.settlementAmount}
                      </td>

                      <td>
                        {item.createdBy}
                      </td>

                      <td>

                        <span className="payment-mode">
                          {item.paymentMode}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`settlement-status ${
                            item.status.toLowerCase()
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="settlement-action-buttons">

                          {/* VIEW */}

                          <button
                            type="button"
                            className="settlement-view-btn"
                            title="View"
                            onClick={() =>
                              handleView(item)
                            }
                          >
                            <FaEye />
                          </button>

                          {/* APPROVE */}

                          {item.status ===
                            "PENDING" && (

                            <button
                              type="button"
                              className="settlement-approve-btn"
                              title="Approve"
                              onClick={() =>
                                handleApproveClick(item)
                              }
                            >
                              <FaCheck />
                            </button>

                          )}

                          {/* REJECT */}

                          {item.status ===
                            "PENDING" && (

                            <button
                              type="button"
                              className="settlement-reject-btn"
                              title="Reject"
                              onClick={() =>
                                handleRejectClick(item)
                              }
                            >
                              <FaTimesCircle />
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="approval-settlement-table-footer">

          <span>
            ROWS PER PAGE
          </span>

          <select defaultValue="10">

            <option value="10">
              10
            </option>

            <option value="25">
              25
            </option>

            <option value="50">
              50
            </option>

            <option value="100">
              100
            </option>

          </select>

          <span className="approval-settlement-count">

            SHOWING{" "}
            {filteredSettlements.length}{" "}
            TO{" "}
            {filteredSettlements.length}{" "}
            OF{" "}
            {filteredSettlements.length}{" "}
            ENTRIES

          </span>

        </div>

      </div>

      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {showViewModal &&
        selectedSettlement && (

          <div
            className="approval-settlement-modal-overlay"
            onClick={closeModals}
          >

            <div
              className="approval-settlement-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="approval-settlement-modal-header">

                <h3>
                  SETTLEMENT DETAILS
                </h3>

                <button
                  type="button"
                  onClick={closeModals}
                >
                  <FaTimes />
                </button>

              </div>

              <div className="approval-settlement-details-grid">

                <div>
                  <label>LOAN ID</label>
                  <strong>
                    {selectedSettlement.loanId}
                  </strong>
                </div>

                <div>
                  <label>MEMBER CODE</label>
                  <strong>
                    {selectedSettlement.memCode}
                  </strong>
                </div>

                <div>
                  <label>MEMBER NAME</label>
                  <strong>
                    {selectedSettlement.memName}
                  </strong>
                </div>

                <div>
                  <label>ALIAS</label>
                  <strong>
                    {selectedSettlement.alias}
                  </strong>
                </div>

                <div>
                  <label>MOBILE</label>
                  <strong>
                    {selectedSettlement.mobile}
                  </strong>
                </div>

                <div>
                  <label>SETTLEMENT DATE</label>
                  <strong>
                    {selectedSettlement.settlementDate}
                  </strong>
                </div>

                <div>
                  <label>PLAN AMOUNT</label>
                  <strong>
                    {selectedSettlement.planAmount}
                  </strong>
                </div>

                <div>
                  <label>PAID AMOUNT</label>
                  <strong>
                    {selectedSettlement.paidAmount}
                  </strong>
                </div>

                <div>
                  <label>DUE AMOUNT</label>
                  <strong>
                    {selectedSettlement.dueAmount}
                  </strong>
                </div>

                <div>
                  <label>SETTLEMENT AMOUNT</label>
                  <strong>
                    {selectedSettlement.settlementAmount}
                  </strong>
                </div>

                <div>
                  <label>CREATED BY</label>
                  <strong>
                    {selectedSettlement.createdBy}
                  </strong>
                </div>

                <div>
                  <label>PAYMENT MODE</label>
                  <strong>
                    {selectedSettlement.paymentMode}
                  </strong>
                </div>

                <div>
                  <label>STATUS</label>

                  <span
                    className={`settlement-status ${
                      selectedSettlement.status.toLowerCase()
                    }`}
                  >
                    {selectedSettlement.status}
                  </span>

                </div>

              </div>

              <div className="approval-settlement-modal-footer">

                <button
                  type="button"
                  className="settlement-close-btn"
                  onClick={closeModals}
                >
                  CLOSE
                </button>

              </div>

            </div>

          </div>

        )}

      {/* =================================================
          APPROVE MODAL
      ================================================= */}

      {showApproveModal &&
        selectedSettlement && (

          <div className="approval-settlement-modal-overlay">

            <div className="approval-settlement-confirm-modal">

              <div className="confirm-icon approve">
                <FaCheck />
              </div>

              <h3>
                Approve Settlement?
              </h3>

              <p>
                Are you sure you want to approve
                settlement{" "}
                <strong>
                  {selectedSettlement.loanId}
                </strong>
                ?
              </p>

              <div className="confirm-buttons">

                <button
                  type="button"
                  className="confirm-cancel"
                  onClick={closeModals}
                >
                  CANCEL
                </button>

                <button
                  type="button"
                  className="confirm-approve"
                  onClick={approveSettlement}
                >
                  APPROVE
                </button>

              </div>

            </div>

          </div>

        )}

      {/* =================================================
          REJECT MODAL
      ================================================= */}

      {showRejectModal &&
        selectedSettlement && (

          <div className="approval-settlement-modal-overlay">

            <div className="approval-settlement-confirm-modal">

              <div className="confirm-icon reject">
                <FaTimesCircle />
              </div>

              <h3>
                Reject Settlement?
              </h3>

              <p>
                Are you sure you want to reject
                settlement{" "}
                <strong>
                  {selectedSettlement.loanId}
                </strong>
                ?
              </p>

              <div className="confirm-buttons">

                <button
                  type="button"
                  className="confirm-cancel"
                  onClick={closeModals}
                >
                  CANCEL
                </button>

                <button
                  type="button"
                  className="confirm-reject"
                  onClick={rejectSettlement}
                >
                  REJECT
                </button>

              </div>

            </div>

          </div>

        )}

    </>
  );
};

export default ApprovalSettlementTable;