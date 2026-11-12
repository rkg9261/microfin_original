import React, {
  useMemo,
  useState,
} from "react";

import {
  FaSearch,
  FaFileExcel,
  FaPrint,
  FaEye,
} from "react-icons/fa";

import "./VoucherEntries.css";

const VoucherEntriesTable = ({ filters }) => {

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedVoucher, setSelectedVoucher] =
    useState(null);


  // =====================================================
  // DUMMY DATA
  // =====================================================

  const voucherData = [

    {
      id: 1,
      date: "13-08-2026",
      voucherNo: "PAY-001",
      type: "PAYMENT",
      particular: "OFFICE EXPENSE",
      debit: 5000,
      credit: 0,
      balance: 5000,
    },

    {
      id: 2,
      date: "13-08-2026",
      voucherNo: "REC-001",
      type: "RECEIPT",
      particular: "EMI COLLECTION",
      debit: 0,
      credit: 7500,
      balance: 7500,
    },


  ];


  // =====================================================
  // FILTER
  // =====================================================

  const filteredData = useMemo(() => {

    let result = [...voucherData];


    // VOUCHER TYPE

    if (filters?.voucher) {

      result = result.filter(
        (item) =>
          item.type === filters.voucher
      );

    }


    // DATE

    if (filters?.date) {

      const selectedDate =
        new Date(filters.date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-");

      result = result.filter(
        (item) =>
          item.date === selectedDate
      );

    }


    // SEARCH

    if (search.trim()) {

      const searchText =
        search.toLowerCase();

      result = result.filter((item) =>

        Object.values(item).some(
          (value) =>
            String(value)
              .toLowerCase()
              .includes(searchText)
        )

      );

    }

    return result;

  }, [filters, search]);


  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length / entries
    )
  );

  const startIndex =
    (currentPage - 1) * entries;

  const paginatedData =
    filteredData.slice(
      startIndex,
      startIndex + entries
    );


  // =====================================================
  // TYPE CLASS
  // =====================================================

  const getTypeClass = (type) => {

    switch (type) {

      case "PAYMENT":
        return "voucher-type-payment";

      case "RECEIPT":
        return "voucher-type-receipt";

      case "CONTRA":
        return "voucher-type-contra";

      case "JOURNAL":
        return "voucher-type-journal";

      default:
        return "";

    }

  };


  // =====================================================
  // VIEW
  // =====================================================

  const handleView = (voucher) => {

    setSelectedVoucher(voucher);

  };


  return (
    <>

      <div className="voucher-table-card">

        {/* ================= TITLE ================= */}

        <div className="voucher-table-header">

          <div>

            <h2>LEDGERS</h2>

            <p>
              VOUCHER ENTRIES
            </p>

          </div>


          <div className="voucher-table-header-actions">

            <button>
              <FaFileExcel />
              DOWNLOAD EXCEL
            </button>

            <button>
              <FaPrint />
              PRINT
            </button>

          </div>

        </div>


        {/* ================= CONTROLS ================= */}

        <div className="voucher-table-controls">

          <select
            value={entries}
            onChange={(e) => {

              setEntries(
                Number(e.target.value)
              );

              setCurrentPage(1);

            }}
          >

            <option value="10">
              10
            </option>

            <option value="25">
              25
            </option>

            <option value="50">
              50
            </option>

            <option value="100">
              100
            </option>

          </select>


          <div className="voucher-table-search">

            <input
              type="text"
              placeholder="Search by Voucher No."
              value={search}
              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setCurrentPage(1);

              }}
            />

            <button>
              <FaSearch />
            </button>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="voucher-table-wrapper">

          <table className="voucher-table">

            <thead>

              <tr>

                <th>SN</th>

                <th>DATE</th>

                <th>VOUCHER NO</th>

                <th>TYPE</th>

                <th>PARTICULAR</th>

                <th colSpan="2">
                  AMOUNT
                </th>

                <th>BALANCE</th>

                <th>VIEW</th>

              </tr>

              <tr className="voucher-sub-header">

                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <th>DR.</th>
                <th>CR.</th>

                <th></th>
                <th></th>

              </tr>

            </thead>


            <tbody>

              {paginatedData.length > 0 ? (

                paginatedData.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>
                        {startIndex + index + 1}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td className="voucher-number">
                        {item.voucherNo}
                      </td>

                      <td>

                        <span
                          className={`voucher-type ${getTypeClass(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>

                      </td>

                      <td className="voucher-particular">
                        {item.particular}
                      </td>

                      <td className="amount-dr">
                        {item.debit > 0
                          ? `₹${item.debit.toLocaleString()}`
                          : "0.00"}
                      </td>

                      <td className="amount-cr">
                        {item.credit > 0
                          ? `₹${item.credit.toLocaleString()}`
                          : "0.00"}
                      </td>

                      <td className="amount-balance">
                        ₹
                        {item.balance.toLocaleString()}
                      </td>

                      <td>

                        <button
                          className="voucher-view-btn"
                          onClick={() =>
                            handleView(item)
                          }
                          title="View"
                        >
                          <FaEye />
                        </button>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="voucher-no-data"
                  >
                    No records found
                  </td>

                </tr>

              )}

            </tbody>


            {/* ================= TOTAL ================= */}

            <tfoot>

              <tr>

                <td
                  colSpan="5"
                  className="voucher-total-label"
                >
                  TOTAL AMOUNT
                </td>

                <td className="voucher-total-dr">

                  ₹
                  {filteredData
                    .reduce(
                      (sum, item) =>
                        sum + item.debit,
                      0
                    )
                    .toLocaleString()}

                </td>

                <td className="voucher-total-cr">

                  ₹
                  {filteredData
                    .reduce(
                      (sum, item) =>
                        sum + item.credit,
                      0
                    )
                    .toLocaleString()}

                </td>

                <td
                  className="voucher-total-balance"
                >

                  ₹
                  {filteredData
                    .reduce(
                      (sum, item) =>
                        sum + item.balance,
                      0
                    )
                    .toLocaleString()}

                </td>

                <td></td>

              </tr>

            </tfoot>

          </table>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="voucher-table-footer">

          <div>

            Showing{" "}

            {filteredData.length === 0
              ? 0
              : startIndex + 1}

            {" "}to{" "}

            {Math.min(
              startIndex + entries,
              filteredData.length
            )}

            {" "}of{" "}

            {filteredData.length}

            {" "}entries

          </div>


          <div className="voucher-pagination">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              PREV
            </button>


            {Array.from(
              {
                length: totalPages,
              },
              (_, index) =>
                index + 1
            )
              .slice(0, 5)
              .map((page) => (

                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>

              ))}


            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              NEXT
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          VIEW POPUP
      ===================================================== */}

      {selectedVoucher && (

        <div
          className="voucher-view-overlay"
          onClick={() =>
            setSelectedVoucher(null)
          }
        >

          <div
            className="voucher-view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="voucher-view-modal-header">

              <div>

                <h3>
                  VOUCHER DETAILS
                </h3>

                <span>
                  {selectedVoucher.voucherNo}
                </span>

              </div>

              <button
                onClick={() =>
                  setSelectedVoucher(null)
                }
              >
                ×
              </button>

            </div>


            <div className="voucher-details-grid">

              <div>
                <label>DATE</label>
                <strong>
                  {selectedVoucher.date}
                </strong>
              </div>

              <div>
                <label>VOUCHER NO.</label>
                <strong>
                  {selectedVoucher.voucherNo}
                </strong>
              </div>

              <div>
                <label>TYPE</label>
                <strong>
                  {selectedVoucher.type}
                </strong>
              </div>

              <div>
                <label>PARTICULAR</label>
                <strong>
                  {selectedVoucher.particular}
                </strong>
              </div>

              <div>
                <label>DEBIT</label>
                <strong>
                  ₹
                  {selectedVoucher.debit.toLocaleString()}
                </strong>
              </div>

              <div>
                <label>CREDIT</label>
                <strong>
                  ₹
                  {selectedVoucher.credit.toLocaleString()}
                </strong>
              </div>

              <div>
                <label>BALANCE</label>
                <strong>
                  ₹
                  {selectedVoucher.balance.toLocaleString()}
                </strong>
              </div>

            </div>


            <button
              className="voucher-modal-close"
              onClick={() =>
                setSelectedVoucher(null)
              }
            >
              CLOSE
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default VoucherEntriesTable;