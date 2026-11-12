import React, { useMemo, useState } from "react";
import {
  FaEye,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const ProductLoanApprovalTable = ({
  data,
  search,
  setSearch,
  onView,
  onDelete,
}) => {

  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------------------------------------------------------
  // PAGINATION
  // ---------------------------------------------------------

  const totalPages = Math.ceil(
    data.length / entries
  );

  const displayedData = useMemo(() => {

    const start =
      (currentPage - 1) * entries;

    const end =
      start + entries;

    return data.slice(start, end);

  }, [data, currentPage, entries]);


  // ---------------------------------------------------------
  // ENTRY CHANGE
  // ---------------------------------------------------------

  const handleEntriesChange = (e) => {

    setEntries(Number(e.target.value));

    setCurrentPage(1);
  };


  return (

    <div className="product-loan-approval-table-card">

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="product-loan-approval-table-heading">

        <span>
          PRODUCT LOAN LIST FOR APPROVED
        </span>

      </div>


      {/* =====================================================
          TABLE TOP
      ===================================================== */}

      <div className="product-loan-approval-table-top">

        {/* ENTRIES */}

        <div className="product-loan-approval-entries">

          <select
            value={entries}
            onChange={handleEntriesChange}
          >

            <option value={10}>
              10
            </option>

            <option value={25}>
              25
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>

          </select>

        </div>


        {/* SEARCH */}

        <div className="product-loan-approval-table-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <FaSearch />

        </div>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR.<br />NO.
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                MEM<br />NAME
              </th>

              <th>
                MOBILE
              </th>

              <th>
                BRANCH
              </th>

              <th>
                BRANCH<br />CENTER
              </th>

              <th>
                GROUP NAME
              </th>

              <th>
                PRODUCT
              </th>

              <th>
                DISBURSEMENT<br />DATE
              </th>

              <th>
                EMI<br />START<br />DATE
              </th>

              <th>
                EMI LAST<br />DATE
              </th>

              <th>
                INSURER
              </th>

              <th>
                TOTAL<br />PRICE
              </th>

              <th>
                DOWN<br />PAYMENT
              </th>

              <th>
                LOAN<br />AMOUNT
              </th>

              <th>
                STATUS
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {displayedData.length > 0 ? (

              displayedData.map(
                (loan, index) => (

                  <tr key={loan.id}>

                    <td>
                      {(currentPage - 1) *
                        entries +
                        index +
                        1}
                    </td>

                    <td>
                      {loan.loanId}
                    </td>

                    <td>
                      {loan.memName}
                    </td>

                    <td>
                      {loan.mobile}
                    </td>

                    <td>
                      {loan.branch}
                    </td>

                    <td>
                      {loan.branchCenter}
                    </td>

                    <td>
                      {loan.groupName}
                    </td>

                    <td>
                      {loan.product}
                    </td>

                    <td>
                      {loan.disbursementDate}
                    </td>

                    <td>
                      {loan.emiStartDate}
                    </td>

                    <td>
                      {loan.emiLastDate}
                    </td>

                    <td>
                      {loan.insurer}
                    </td>

                    <td>
                      {loan.totalPrice}
                    </td>

                    <td>
                      {loan.downPayment}
                    </td>

                    <td>
                      {loan.loanAmount}
                    </td>

                    <td>

                      <span className="product-loan-approval-status">

                        {loan.status}

                      </span>

                    </td>

                    <td>

                      <div className="product-loan-approval-actions">

                        {/* VIEW */}

                        <button
                          type="button"
                          className="product-loan-approval-view"
                          title="View"
                          onClick={() =>
                            onView(loan)
                          }
                        >
                          <FaEye />
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          className="product-loan-approval-delete"
                          title="Delete"
                          onClick={() =>
                            onDelete(loan.id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="17"
                  className="common-table-empty"
                >
                  Showing 0 to 0 of 0 entries
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="product-loan-approval-table-footer">

        <span>

          Showing{" "}
          {data.length === 0
            ? 0
            : (currentPage - 1) *
                entries +
              1}{" "}

          to{" "}

          {Math.min(
            currentPage * entries,
            data.length
          )}{" "}

          of{" "}
          {data.length} entries

        </span>


        {/* PAGINATION */}

        <div className="product-loan-approval-pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            PREV
          </button>


          <button className="active">
            {currentPage}
          </button>


          <button
            disabled={
              currentPage >= totalPages ||
              totalPages === 0
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
  );
};

export default ProductLoanApprovalTable;