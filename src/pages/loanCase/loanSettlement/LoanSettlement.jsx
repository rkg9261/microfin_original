import React, { useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";
import "./LoanSettlement.css";

import LoanSettlementForm from "./LoanSettlementForm";
import LoanSettlementTable from "./LoanSettlementTable";
import LoanSettlementView from "./LoanSettlementView";

const LoanSettlement = () => {
  const confirm = useConfirm();

  // =====================================================
  // SETTLEMENT DATA
  // =====================================================

  const [settlementData, setSettlementData] = useState([
    {
      id: 1,

      loanId: "10201230",

      memberName: "SUMIT - ANAND NAGAR",

      memberCode: "30115564",

      memberAlias: "SUMIT",

      memberMobile: "9407359196",

      memberEmail: "SUMITKANOUJIA10@GMAIL.COM",

      branch: "KOLKATA - DALHOUSIE",

      planType: "INDIVIDUAL",

      planAmount: 27000,

      paidAmount: 0,

      dueAmount: 27000,

      settleAmount: 27000,

      duePrincipalAmount: 20000,

      paidInterestAmount: 7000,

      totalAmountDueWithoutInterest: 20000,

      totalInstallmentPaid: 0,

      totalInstallmentDue: 25,

      loanEmiStartDate: "2025-12-05",

      loanEmiEndDate: "2026-05-22",

      loanPreClosingChargeType: "FIXED",

      loanPreClosingCharge: 0,

      reason: "PREPAYMENT",

      settlementDate: "2025-12-08",

      remark: "",

      loanSettledBy: "ADMIN",

      settlementStatus: "APPROVED",

      paymentMode: "BANK A/C",

      createdBy: "ADMIN",
    },

    {
      id: 2,

      loanId: "10201231",

      memberName: "MAKSUD ALAM",

      memberCode: "BRI0115596",

      memberAlias: "BABLU ALAM",

      memberMobile: "9801366083",

      memberEmail: "maksudalam@gmail.com",

      branch: "MAIN BRANCH",

      planType: "INDIVIDUAL",

      planAmount: 36779,

      paidAmount: 736,

      dueAmount: 36043,

      settleAmount: 36043,

      duePrincipalAmount: 30000,

      paidInterestAmount: 6043,

      totalAmountDueWithoutInterest: 30000,

      totalInstallmentPaid: 2,

      totalInstallmentDue: 23,

      loanEmiStartDate: "2025-11-15",

      loanEmiEndDate: "2026-06-15",

      loanPreClosingChargeType: "FIXED",

      loanPreClosingCharge: 0,

      reason: "PREPAYMENT",

      settlementDate: "2025-12-06",

      remark: "",

      loanSettledBy: "ADMIN",

      settlementStatus: "APPROVED",

      paymentMode: "CASH",

      createdBy: "ADMIN",
    },


  ]);

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [filters, setFilters] = useState({
    branch: "",
    customer: "",
    date: "",
    status: "",
    loanNumber: "",
  });

  // =====================================================
  // VIEW MODAL
  // =====================================================

  const [selectedSettlement, setSelectedSettlement] =
    useState(null);

  // =====================================================
  // HANDLE FILTER
  // =====================================================

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (item) => {
    setSelectedSettlement(item);
  };

  // =====================================================
  // CLOSE VIEW
  // =====================================================

  const handleCloseView = () => {
    setSelectedSettlement(null);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this settlement?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) {
      return;
    }

    setSettlementData((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // =====================================================
  // CREATE SETTLEMENT
  // =====================================================

  const handleCreateSettlement = (formData) => {
    console.log("Settlement Data:", formData);

    alert("Settlement created successfully!");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="loan-settlement-page">

      {/* PAGE HEADER */}
      <div className="loan-settlement-page-header">

        <h1>SETTLEMENT</h1>

        <div className="loan-settlement-breadcrumb">
          <span>DASHBOARD</span>
          <span>›</span>
          <strong>SETTLEMENT</strong>
        </div>

      </div>


      {/* CREATE FORM */}
      <LoanSettlementForm
        settlementData={settlementData}
        onCreate={handleCreateSettlement}
        filters={filters}
        onFilterChange={handleFilterChange}
      />


      {/* SETTLEMENT TABLE */}
      <LoanSettlementTable
        data={settlementData}
        filters={filters}
        onFilterChange={handleFilterChange}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* VIEW DETAILS */}
      {selectedSettlement && (
        <LoanSettlementView
          settlement={selectedSettlement}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
};

export default LoanSettlement;