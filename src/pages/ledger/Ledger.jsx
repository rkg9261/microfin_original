import React, { useState } from "react";
import LedgerTable from "./LedgerTable";
import LedgerForm from "./LedgerForm";
import "./Ledger.css";

const Ledger = () => {
  // Only 2 data records as requested
  const [ledgers, setLedgers] = useState([
    {
      id: 1,
      name: "DINESH 1",
      alias: "DINESH",
      group: "LOAN (LIABILITY)",
      status: "Active",
    },
    {
      id: 2,
      name: "MR AVINASH",
      alias: "AVI",
      group: "SUNDERY CREDITOR",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);

  // ============================================
  // OPEN ADD FORM
  // ============================================

  const handleAdd = () => {
    setSelectedLedger(null);
    setShowForm(true);
  };

  // ============================================
  // OPEN UPDATE FORM
  // ============================================

  const handleEdit = (ledger) => {
    setSelectedLedger(ledger);
    setShowForm(true);
  };

  // ============================================
  // CLOSE FORM
  // ============================================

  const handleCancel = () => {
    setShowForm(false);
    setSelectedLedger(null);
  };

  // ============================================
  // SAVE / UPDATE
  // ============================================

  const handleSave = (formData) => {
    // UPDATE
    if (selectedLedger) {
      setLedgers((previous) =>
        previous.map((item) =>
          item.id === selectedLedger.id
            ? {
                ...item,
                name: formData.name,
                alias: formData.alias,
                group: formData.group,
                status: formData.status,
              }
            : item
        )
      );
    }

    // ADD
    else {
      const newLedger = {
        id: Date.now(),
        name: formData.name,
        alias: formData.alias,
        group: formData.group,
        status: formData.status,
      };

      setLedgers((previous) => [
        ...previous,
        newLedger,
      ]);
    }

    setShowForm(false);
    setSelectedLedger(null);
  };

  return (
    <div className="ledger-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="ledger-page-header">

        <div className="ledger-page-title">
          LEDGER
        </div>

        <div className="ledger-breadcrumb">

          <span>Dashboard</span>

          <span className="ledger-breadcrumb-arrow">
            ›
          </span>

          <strong>LEDGER</strong>

        </div>

      </div>

      {/* BLUE LINE */}

      <div className="ledger-blue-line"></div>


      {/* ==========================================
          LEDGER SECTION
      ========================================== */}

      <div className="ledger-section">

        <div className="ledger-section-header">

          <h2>
            LEDGER LIST
          </h2>

          <button
            type="button"
            className="ledger-add-button"
            onClick={handleAdd}
            title="Add New Ledger"
          >
            +
          </button>

        </div>


        {/* TABLE */}

        <LedgerTable
          ledgers={ledgers}
          onEdit={handleEdit}
        />

      </div>


      {/* ==========================================
          FORM POPUP
      ========================================== */}

      {showForm && (
        <LedgerForm
          ledger={selectedLedger}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

    </div>
  );
};

export default Ledger;