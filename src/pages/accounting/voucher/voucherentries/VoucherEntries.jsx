import React, { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaFileExcel,
  FaPrint,
} from "react-icons/fa";

import VoucherEntriesTable from "./VoucherEntriesTable";
import "./VoucherEntries.css";

const VoucherEntries = () => {

  const [filters, setFilters] = useState({
    date: "",
    startDate: "",
    endDate: "",
    voucher: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Voucher Search:", filters);
  };

  return (
    <div className="voucher-entry-page">

      {/* ================= HEADER ================= */}

      <div className="voucher-entry-heading">

        <h2>VOUCHER</h2>

        <div className="voucher-entry-breadcrumb">
          <span>DASHBOARD</span>
          <span>›</span>
          <strong>VOUCHER</strong>
        </div>

      </div>

      <div className="voucher-entry-line"></div>


      {/* ================= VOUCHER BUTTONS ================= */}

      <div className="voucher-entry-actions">

        <button
          className="voucher-action-btn payment"
          onClick={() =>
            window.location.href = "/payment"
          }
        >
          <FaPlus />
          PAYMENT
        </button>

        <button
          className="voucher-action-btn receipt"
          onClick={() =>
            window.location.href = "/receipt"
          }
        >
          <FaPlus />
          RECEIPT
        </button>

        <button
          className="voucher-action-btn contra"
          onClick={() =>
            window.location.href = "/contra"
          }
        >
          <FaPlus />
          CONTRA
        </button>

        <button
          className="voucher-action-btn journal"
          onClick={() =>
            window.location.href = "/journal"
          }
        >
          <FaPlus />
          JOURNAL
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="voucher-search-card">

        <div className="voucher-search-row">

          {/* DATE */}

          <div className="voucher-search-field">

            <label>DATE</label>

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
            />

          </div>


          {/* START DATE */}

          <div className="voucher-search-field">

            <label>START DATE</label>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />

          </div>


          {/* END DATE */}

          <div className="voucher-search-field">

            <label>END DATE</label>

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />

          </div>


          {/* VOUCHER */}

          <div className="voucher-search-field">

            <label>VOUCHER TYPE</label>

            <select
              name="voucher"
              value={filters.voucher}
              onChange={handleChange}
            >

              <option value="">
                Select Voucher
              </option>

              <option value="PAYMENT">
                PAYMENT
              </option>

              <option value="RECEIPT">
                RECEIPT
              </option>

              <option value="CONTRA">
                CONTRA
              </option>

              <option value="JOURNAL">
                JOURNAL
              </option>

            </select>

          </div>


          {/* SEARCH BUTTON */}

          <button
            className="voucher-get-record-btn"
            onClick={handleSearch}
          >
            <FaSearch />
            GET RECORDS
          </button>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <VoucherEntriesTable
        filters={filters}
      />

    </div>
  );
};

export default VoucherEntries;