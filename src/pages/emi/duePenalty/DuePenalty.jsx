import React, { useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import DuePenaltyForm from "./DuePenaltyForm";
import DuePenaltyTable from "./DuePenaltyTable";
import PenaltyPaymentForm from "./PenaltyPaymentForm";
import PenaltyWaiveForm from "./PenaltyWaiveForm";

import "./DuePenalty.css";

const DuePenalty = () => {
  const [selectedPenalty, setSelectedPenalty] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showWaiveModal, setShowWaiveModal] = useState(false);

  const { items: records, remove } = useSwaggerEntity("duePenalty");


  // =========================================================
  // PAY NOW
  // =========================================================

  const handlePayNow = (record) => {
    setSelectedPenalty(record);
    setShowPaymentModal(true);
    setShowWaiveModal(false);
  };

  // =========================================================
  // WAIVE OFF
  // =========================================================

  const handleWaiveOff = (record) => {
    setSelectedPenalty(record);
    setShowWaiveModal(true);
    setShowPaymentModal(false);
  };

  // =========================================================
  // CLOSE MODALS
  // =========================================================

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPenalty(null);
  };

  const closeWaiveModal = () => {
    setShowWaiveModal(false);
    setSelectedPenalty(null);
  };

  // =========================================================
  // PAYMENT CREATE
  // =========================================================

  const handlePaymentCreate = (paymentData) => {
    console.log("Penalty Payment:", paymentData);

    if (selectedPenalty) {
      setRecords((prev) =>
        prev.map((item) =>
          item.id === selectedPenalty.id
            ? {
                ...item,
                status: "Paid",
                paymentDate: paymentData.paymentDate,
              }
            : item
        )
      );
    }

    closePaymentModal();
  };

  // =========================================================
  // WAIVE CREATE
  // =========================================================

  const handleWaiveCreate = (waiveData) => {
    console.log("Penalty Waived:", waiveData);

    if (selectedPenalty) {
      setRecords((prev) =>
        prev.map((item) =>
          item.id === selectedPenalty.id
            ? {
                ...item,
                status: "Waived",
              }
            : item
        )
      );
    }

    closeWaiveModal();
  };

  return (
    <div className="due-penalty-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="due-penalty-page-header">
        <h2>DUE PENALTY</h2>

        <div className="due-penalty-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>DUE PENALTY</strong>
        </div>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <DuePenaltyForm />

      {/* =====================================================
          TABLE
      ===================================================== */}

      <DuePenaltyTable
        data={records}
        onPayNow={handlePayNow}
        onWaiveOff={handleWaiveOff}
      />

      {/* =====================================================
          PAYMENT MODAL
      ===================================================== */}

      {showPaymentModal && selectedPenalty && (
        <PenaltyPaymentForm
          data={selectedPenalty}
          onClose={closePaymentModal}
          onCreate={handlePaymentCreate}
        />
      )}

      {/* =====================================================
          WAIVE MODAL
      ===================================================== */}

      {showWaiveModal && selectedPenalty && (
        <PenaltyWaiveForm
          data={selectedPenalty}
          onClose={closeWaiveModal}
          onCreate={handleWaiveCreate}
        />
      )}

    </div>
  );
};

export default DuePenalty;