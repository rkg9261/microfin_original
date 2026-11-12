import React, { useMemo, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import PaidEmiForm from "./PaidEmiForm";
import PaidEmiTable from "./PaidEmiTable";
import PaidEmiView from "./PaidEmiView";
import { toast } from "react-toastify";
import "./PaidEmi.css";

const PaidEmi = () => {
  const [filters, setFilters] = useState({
    branch: "",
    staff: "",
    member: "",
    collectionType: "",
    applicationNo: "",
    paymentStatus: "",
    date: "",
    paymentStartDate: "",
    paymentEndDate: "",
  });

  const { items: records, save } = useSwaggerEntity("paidEmi");


  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      staff: "",
      member: "",
      collectionType: "",
      applicationNo: "",
      paymentStatus: "",
      date: "",
      paymentStartDate: "",
      paymentEndDate: "",
    });
  };

  const handleGetRecord = () => {
    console.log("Filters:", filters);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseView = () => {
    setSelectedRecord(null);
  };

  const handleTask = async (record, action) => {
    try {
      await save(
        {
          ...record,
          paymentStatus: action === "approve" ? "Approved" : "Pending",
          status: action === "approve" ? "Approved" : "Pending",
        },
        record
      );
    } catch (error) {
      toast.error(error || "Unable to update EMI.");
    }
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((item) =>
        [
          item.loanId,
          item.memberCode,
          item.memberName,
          item.alias,
          item.mobile,
          item.branch,
          item.centerName,
          item.type,
          item.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue)
      );
    }

    if (filters.branch) {
      result = result.filter(
        (item) => item.branch === filters.branch
      );
    }

    if (filters.staff) {
      result = result.filter(
        (item) => item.receivedBy === filters.staff
      );
    }

    if (filters.member) {
      result = result.filter(
        (item) => item.memberName === filters.member
      );
    }

    if (filters.collectionType) {
      result = result.filter(
        (item) => item.type === filters.collectionType
      );
    }

    if (filters.applicationNo) {
      result = result.filter((item) =>
        item.loanId
          .toLowerCase()
          .includes(filters.applicationNo.toLowerCase())
      );
    }

    if (filters.paymentStatus) {
      result = result.filter(
        (item) => item.status === filters.paymentStatus
      );
    }

    return result;
  }, [records, search, filters]);

  return (
    <div className="paid-emi-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="paid-emi-page-header">

        <h2>SHOW COLLECTION</h2>

        <div className="paid-emi-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Paid EMI</strong>
        </div>

      </div>


      {/* =====================================================
          FILTER FORM
      ===================================================== */}

      <PaidEmiForm
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        onGetRecord={handleGetRecord}
      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <PaidEmiTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
        onTask={handleTask}
        onView={handleView}
      />


      {/* =====================================================
          VIEW POPUP
      ===================================================== */}

      {selectedRecord && (
        <PaidEmiView
          record={selectedRecord}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
};

export default PaidEmi;