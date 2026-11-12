import React, { useMemo, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import DueEmiForm from "./DueEmiForm";
import DueEmiTable from "./DueEmiTable";
import DueEmiView from "./DueEmiView";
import "./DueEmi.css";

const DueEmi = () => {
  const [filters, setFilters] = useState({
    branch: "",
    designation: "",
    collectionDay: "EveryDay",
    staff: "",
    date: "",
    emiFromDate: "",
    emiToDate: "",
    type: "",
    city: "",
    recoveryType: "",
    sortBy: "",
    paymentStatus: "Due",
  });

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { items: records, remove } = useSwaggerEntity("dueEmi");


  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      designation: "",
      collectionDay: "EveryDay",
      staff: "",
      date: "",
      emiFromDate: "",
      emiToDate: "",
      type: "",
      city: "",
      recoveryType: "",
      sortBy: "",
      paymentStatus: "Due",
    });
  };

  const handleGetRecord = () => {
    console.log("Due EMI Filters:", filters);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseView = () => {
    setSelectedRecord(null);
  };

  const handlePayNow = (record) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
              ...item,
              status: "Paid",
              duesEmi: 0,
            }
          : item
      )
    );

    setSelectedRecord(null);
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((item) =>
        [
          item.loanId,
          item.memberName,
          item.memberCode,
          item.alias,
          item.mobile,
          item.branch,
          item.staff,
          item.centerName,
          item.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(value)
      );
    }

    if (filters.branch) {
      result = result.filter(
        (item) => item.branch === filters.branch
      );
    }

    if (filters.staff) {
      result = result.filter(
        (item) => item.staff === filters.staff
      );
    }

    if (filters.type) {
      result = result.filter(
        (item) => item.type === filters.type
      );
    }

    if (filters.recoveryType) {
      result = result.filter(
        (item) => item.recoveryType === filters.recoveryType
      );
    }

    if (filters.paymentStatus) {
      if (filters.paymentStatus === "Due") {
        result = result.filter(
          (item) =>
            item.status === "Pending" ||
            item.status === "Partial"
        );
      } else {
        result = result.filter(
          (item) => item.status === filters.paymentStatus
        );
      }
    }

    return result;
  }, [records, search, filters]);

  const totalEmi = filteredRecords.reduce(
    (sum, item) => sum + item.duesEmi,
    0
  );

  const totalAmount = filteredRecords.reduce(
    (sum, item) => sum + item.duesEmi + item.penalty,
    0
  );

  return (
    <div className="due-emi-page">

      <div className="due-emi-page-title">
        <h2>EMI COLLECTION</h2>

        <div className="due-emi-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Due EMI</strong>
        </div>
      </div>

      <DueEmiForm
        filters={filters}
        onChange={handleChange}
        onClear={handleClear}
        onGetRecord={handleGetRecord}
      />

      <DueEmiTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
        totalEmi={totalEmi}
        totalAmount={totalAmount}
        onView={handleView}
        onPayNow={handlePayNow}
      />

      {selectedRecord && (
        <DueEmiView
          record={selectedRecord}
          onClose={handleCloseView}
          onPayNow={handlePayNow}
        />
      )}
    </div>
  );
};

export default DueEmi;