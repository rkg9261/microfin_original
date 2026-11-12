import React, { useState } from "react";
import "./AdvanceSecurity.css";

import AdvanceSecurityForm from "./AdvanceSecurityForm";
import AdvanceSecurityTable from "./AdvanceSecurityTable";
import AdvanceSecurityView from "./AdvanceSecurityView";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

const AdvanceSecurity = () => {
  const { items: records, remove } = useSwaggerEntity("advanceSecurity");

  const [filters, setFilters] = useState({
    branch: "",
    paymentStatus: "Pending",
    date: "",
    paymentStartDate: "",
    paymentEndDate: "",
  });

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const [selectedRecord, setSelectedRecord] = useState(null);

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredRecords = records.filter((record) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      String(record.loanId || "").toLowerCase().includes(searchValue) ||
      String(record.memberName || "").toLowerCase().includes(searchValue) ||
      String(record.alias || "").toLowerCase().includes(searchValue) ||
      String(record.mobile || "").includes(searchValue);

    const matchesBranch =
      !filters.branch ||
      record.branch === filters.branch;

    const matchesStatus =
      !filters.paymentStatus ||
      filters.paymentStatus === "All" ||
      record.status === filters.paymentStatus;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesStatus
    );
  });

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (id) => {
    try {
      await remove(id);
    } catch (error) {
      toast.error(error || "Unable to delete record.");
    }
  };

  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const closeView = () => {
    setSelectedRecord(null);
  };

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     CLEAR FILTER
  ===================================================== */

  const handleClear = () => {
    setFilters({
      branch: "",
      paymentStatus: "Pending",
      date: "",
      paymentStartDate: "",
      paymentEndDate: "",
    });

    setSearch("");
  };

  return (
    <div className="advance-security-page">

      {/* ================================================
          PAGE HEADER
      ================================================= */}

      <div className="advance-security-page-header">

        <h2>ADVANCE SECURITY</h2>

        <div className="advance-security-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Advance Security</strong>
        </div>

      </div>


      {/* ================================================
          FILTER FORM
      ================================================= */}

      <AdvanceSecurityForm
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />


      {/* ================================================
          TABLE
      ================================================= */}

      <AdvanceSecurityTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* ================================================
          VIEW POPUP
      ================================================= */}

      {selectedRecord && (
        <AdvanceSecurityView
          record={selectedRecord}
          onClose={closeView}
        />
      )}

    </div>
  );
};

export default AdvanceSecurity;