import React, { useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";
import "./SettlementReport.css";

import SettlementReportForm from "./SettlementReportForm";
import SettlementReportTable from "./SettlementReportTable";
import SettlementReportView from "./SettlementReportView";

const SettlementReport = () => {
  const confirm = useConfirm();


  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    loanType: "All",
    member: "",
    settlementDate: "",
    settlementFrom: "",
    settlementTo: "",
    ledgerAccount: "",
    status: "",
  });


  // =========================================================
  // SETTLEMENT DATA
  // =========================================================

  const [settlementData, setSettlementData] = useState([

    {
      id: 1,

      loanId: "10201230",

      memberName: "SUMIT - ANAND NAGAR30115564",

      alias: "SUMIT",

      groupName: "ANAND NAGAR",

      memberMobile: "9407359196",

      branchName: "KOLKATA - DALHOUSIE",

      planAmount: 27000,

      paidAmount: 0,

      dueAmount: 27000,

      settlementAmount: 27000,

      settlementDate: "08-12-2025",

      createdBy: "ADMIN",

      payMode: "BANK A/C",

      status: "APPROVED",

      // =====================================================
      // VIEW DETAILS
      // =====================================================

      amountDueWithoutInterest: 20000,

      totalAmountDue: 27000,

      totalInstallmentPaid: 0,

      totalInstallmentDue: 25,

      preClosingChargeType: "FIXED",

      preClosingCharge: 0,

      reason: "PREPAYMENT",

      memberCode: "ANAND NAGAR30115564",

      memberEmail: "sumitkanoujia10@gmail.com",

      loanApplicationNumber: "10201230",

      loanEmiStartDate: "2025-12-05",

      loanEmiEndDate: "2026-05-22",

      loanType: "INDIVIDUAL",

      totalPlanAmount: 27000,

      totalAmountPaid: 0,

      remark: "",

      loanSettledBy: "ADMIN",

      totalAmountPaidWithSettlement: 27000,

      settlementStatus: "APPROVED",
    },


    {
      id: 2,

      loanId: "10201231",

      memberName: "MAKSUD ALAM - BRI0115596",

      alias: "BABLU ALAM",

      groupName: "GROUP B",

      memberMobile: "9801366081",

      branchName: "KOLKATA - DALHOUSIE",

      planAmount: 36779,

      paidAmount: 736,

      dueAmount: 36043,

      settlementAmount: 36043,

      settlementDate: "06-12-2025",

      createdBy: "ADMIN",

      payMode: "CASH",

      status: "APPROVED",

      amountDueWithoutInterest: 30000,

      totalAmountDue: 36043,

      totalInstallmentPaid: 1,

      totalInstallmentDue: 24,

      preClosingChargeType: "FIXED",

      preClosingCharge: 0,

      reason: "PREPAYMENT",

      memberCode: "BRI0115596",

      memberEmail: "maksudalam@example.com",

      loanApplicationNumber: "10201231",

      loanEmiStartDate: "2025-06-12",

      loanEmiEndDate: "2026-05-12",

      loanType: "INDIVIDUAL",

      totalPlanAmount: 36779,

      totalAmountPaid: 736,

      remark: "",

      loanSettledBy: "ADMIN",

      totalAmountPaidWithSettlement: 36043,

      settlementStatus: "APPROVED",
    },


    {
      id: 3,

      loanId: "10201221",

      memberName: "RAJESH KUMAR",

      alias: "RAJESH",

      groupName: "GROUP C",

      memberMobile: "9876543210",

      branchName: "KOLKATA - DALHOUSIE",

      planAmount: 50000,

      paidAmount: 5000,

      dueAmount: 45000,

      settlementAmount: 45000,

      settlementDate: "07-15-2026",

      createdBy: "ADMIN",

      payMode: "BANK A/C",

      status: "APPROVED",

      amountDueWithoutInterest: 40000,

      totalAmountDue: 45000,

      totalInstallmentPaid: 5,

      totalInstallmentDue: 20,

      preClosingChargeType: "FIXED",

      preClosingCharge: 0,

      reason: "PREPAYMENT",

      memberCode: "MEM003",

      memberEmail: "rajesh@example.com",

      loanApplicationNumber: "10201221",

      loanEmiStartDate: "2026-01-15",

      loanEmiEndDate: "2027-01-15",

      loanType: "INDIVIDUAL",

      totalPlanAmount: 50000,

      totalAmountPaid: 5000,

      remark: "",

      loanSettledBy: "ADMIN",

      totalAmountPaidWithSettlement: 45000,

      settlementStatus: "APPROVED",
    },

  ]);


  // =========================================================
  // VIEW STATE
  // =========================================================

  const [selectedSettlement, setSelectedSettlement] = useState(null);


  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = (formData) => {

    setFilters(formData);

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    setFilters({
      branch: "",
      loanType: "All",
      member: "",
      settlementDate: "",
      settlementFrom: "",
      settlementTo: "",
      ledgerAccount: "",
      status: "",
    });

  };


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (settlement) => {

    setSelectedSettlement(settlement);

  };


  // =========================================================
  // CLOSE VIEW
  // =========================================================

  const handleCloseView = () => {

    setSelectedSettlement(null);

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {

    const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this settlement record?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }


    setSettlementData((previousData) =>
      previousData.filter(
        (item) => item.id !== id
      )
    );

  };


  return (

    <div className="settlement-report-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="settlement-report-header">

        <h2>
          SETTLEMENT REPORT
        </h2>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <SettlementReportForm
        filters={filters}
        onGetRecord={handleGetRecord}
        onReset={handleReset}
      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <SettlementReportTable
        data={settlementData}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* =====================================================
          VIEW DETAILS MODAL
      ===================================================== */}

      {selectedSettlement && (

        <SettlementReportView
          settlement={selectedSettlement}
          onClose={handleCloseView}
        />

      )}

    </div>

  );
};

export default SettlementReport;