import React, { useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import FundTransferForm from "./AccFundTransferForm";
import FundTransferTable from "./AccFundTransferTable";

import "./AccFundTransfer.css";

const AccFundTransfer = () => {
  const confirm = useConfirm();

  const [transfers, setTransfers] = useState([
    {
      id: 1,
      amount: "223355881126",
      ledger: "CASH",
      fromBranch: "LASKARHAT",
      toBranch: "LASKARHAT",
      date: "20-08-2026",
      status: "PENDING",
    },
    {
      id: 2,
      amount: "100000",
      ledger: "BANK A/C",
      fromBranch: "JAGATPURA",
      toBranch: "LASKARHAT",
      date: "01-08-2026",
      status: "APPROVED",
    },

  ]);

  const [editingTransfer, setEditingTransfer] = useState(null);

  // =========================================================
  // SAVE FUND TRANSFER
  // =========================================================

  const handleSave = (formData) => {
    if (editingTransfer) {
      setTransfers((prev) =>
        prev.map((item) =>
          item.id === editingTransfer.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

      setEditingTransfer(null);
      return;
    }

    const newTransfer = {
      id: Date.now(),
      amount: formData.amount,
      ledger: formData.fromBranchLedger,
      fromBranch: formData.fromBranch,
      toBranch: formData.toBranch,
      date: formData.date,
      status: "PENDING",
    };

    setTransfers((prev) => [
      newTransfer,
      ...prev,
    ]);
  };

  // =========================================================
  // CREATE ACTION
  // =========================================================

  const handleCreate = (transfer) => {
    setEditingTransfer(transfer);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE ACTION
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this fund transfer?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) {
      return;
    }

    setTransfers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "DELETED",
            }
          : item
      )
    );
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const handleCancelEdit = () => {
    setEditingTransfer(null);
  };

  return (
    <div className="fund-transfer-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="fund-transfer-page-header">

        <h2>
          FUNDTRANSFER
        </h2>

        <div className="fund-transfer-breadcrumb">

          <span>
            Dashboard
          </span>

          <span>
            ›
          </span>

          <strong>
            FUNDTRANSFER
          </strong>

        </div>

      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <FundTransferForm
        onSave={handleSave}
        editingTransfer={editingTransfer}
        onCancelEdit={handleCancelEdit}
      />

      {/* =====================================================
          TABLE
      ===================================================== */}

      <FundTransferTable
        data={transfers}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default AccFundTransfer;