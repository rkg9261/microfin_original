import React, { useState } from "react";
import ApprovalSettlementTable from "./ApprovalSettlementTable";
import "./ApprovalSettlement.css";

const ApprovalSettlement = () => {
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");

  const [settlements, setSettlements] = useState([
    {
      id: 1,
      loanId: "LN-10001",
      memCode: "MEM-000101",
      memName: "Sangita Balu Khare",
      alias: "Sangita Khare",
      mobile: "9529386632",
      settlementDate: "20-08-2026",
      planAmount: "₹50,000",
      paidAmount: "₹38,000",
      dueAmount: "₹12,000",
      settlementAmount: "₹10,000",
      createdBy: "ADMIN",
      paymentMode: "CASH",
      status: "PENDING",
    },
    {
      id: 2,
      loanId: "LN-10002",
      memCode: "MEM-000102",
      memName: "Priya Sharma",
      alias: "Priya S.",
      mobile: "9876543210",
      settlementDate: "19-08-2026",
      planAmount: "₹75,000",
      paidAmount: "₹60,000",
      dueAmount: "₹15,000",
      settlementAmount: "₹12,000",
      createdBy: "ADMIN",
      paymentMode: "UPI",
      status: "PENDING",
    },
  ]);

  return (
    <div className="approval-settlement-page">

      {/* PAGE HEADER */}
      <div className="approval-settlement-page-header">

        <h2>APPROVE SETTLEMENT</h2>

        <div className="approval-settlement-breadcrumb">
          <span>⌂ DASHBOARD</span>
          <span>›</span>
          <strong>APPROVE SETTLEMENT</strong>
        </div>

      </div>

      {/* SEARCH/FILTER */}
      <div className="approval-settlement-filter-card">

        <div className="approval-settlement-filter-title">
          SEARCH BY
        </div>

        <div className="approval-settlement-filter-grid">

          {/* BRANCH */}
          <div className="approval-settlement-field">

            <label>BRANCH</label>

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">
                Select Branch
              </option>

              <option value="Kolkata">
                Kolkata
              </option>

              <option value="Delhi">
                Delhi
              </option>

              <option value="Mumbai">
                Mumbai
              </option>

              <option value="Vadodara">
                Vadodara
              </option>
            </select>

          </div>

          {/* DATE */}
          <div className="approval-settlement-field">

            <label>DATE</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

          </div>

        </div>

      </div>

      {/* TABLE COMPONENT */}
      <ApprovalSettlementTable
        settlements={settlements}
        setSettlements={setSettlements}
      />

    </div>
  );
};

export default ApprovalSettlement;