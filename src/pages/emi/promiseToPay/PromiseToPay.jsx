import React, { useMemo, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import PromiseToPayForm from "./PromiseToPayForm";
import PromiseToPayTable from "./PromiseToPayTable";
import "./PromiseToPay.css";

const PromiseToPay = () => {
  const [filters, setFilters] = useState({
    branch: "",
    date: "",
  });

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  const { items: records, remove } = useSwaggerEntity("promiseToPay");


  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetRecord = () => {
    console.log("Promise To Pay Filters:", filters);
  };

  const handleClear = () => {
    setFilters({
      branch: "",
      date: "",
    });
  };

  const filteredRecords = useMemo(() => {
    let result = [...records];

    if (filters.branch) {
      result = result.filter(
        (item) => item.branch === filters.branch
      );
    }

    if (filters.date) {
      result = result.filter(
        (item) => item.promiseDate === filters.date
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
    }

    return result;
  }, [records, filters, search]);

  return (
    <div className="promise-to-pay-page">

      {/* PAGE HEADER */}

      <div className="promise-to-pay-page-header">

        <h2>PROMISETOPAY</h2>

        <div className="promise-to-pay-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>PROMISETOPAY</strong>
        </div>

      </div>

      {/* FILTER */}

      <PromiseToPayForm
        filters={filters}
        onChange={handleChange}
        onGetRecord={handleGetRecord}
        onClear={handleClear}
      />

      {/* TABLE */}

      <PromiseToPayTable
        data={filteredRecords}
        entries={entries}
        setEntries={setEntries}
        search={search}
        setSearch={setSearch}
      />

    </div>
  );
};

export default PromiseToPay;