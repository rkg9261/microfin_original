import React, { useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";
import { useSwaggerEntity } from "../../store/useSwaggerEntity";
import ProductLoanApprovalTable from "./ProductLoanApprovalTable";
import "./ProductLoanApproval.css";

const ProductLoanApproval = () => {
  const confirm = useConfirm();

  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");

  const [search, setSearch] = useState("");

  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // ---------------------------------------------------------
  // SAMPLE DATA
  // ---------------------------------------------------------

  const { items: productLoans } = useSwaggerEntity("productLoan");


  // ---------------------------------------------------------
  // FILTER
  // ---------------------------------------------------------

  const filteredLoans = productLoans.filter((loan) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      loan.loanId.toLowerCase().includes(searchValue) ||
      loan.memName.toLowerCase().includes(searchValue) ||
      loan.mobile.includes(searchValue) ||
      loan.product.toLowerCase().includes(searchValue);

    const matchesBranch =
      !branch || loan.branch === branch;

    const matchesDate =
      !date || loan.disbursementDate === date;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesDate
    );
  });

  // ---------------------------------------------------------
  // VIEW
  // ---------------------------------------------------------

  const handleView = (loan) => {
    setViewData(loan);
    setShowViewModal(true);
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------

  const handleDelete = async (id) => {
    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this product loan approval?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) return;

    // Demo only.
    // Replace with API delete call later.
    alert("Product loan approval deleted successfully.");
  };

  // ---------------------------------------------------------
  // SUBMIT
  // ---------------------------------------------------------

  const handleGetRecord = (e) => {
    e.preventDefault();

    console.log({
      branch,
      date,
    });
  };

  return (
    <div className="product-loan-approval-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="product-loan-approval-page-title">
        APPROVEPRODUCTLOAN
      </div>


      {/* =====================================================
          SEARCH CARD
      ===================================================== */}

      <div className="product-loan-approval-search-card">

        <div className="product-loan-approval-search-title">
          SEARCH BY
        </div>

        <form
          onSubmit={handleGetRecord}
          className="product-loan-approval-search-grid"
        >

          {/* BRANCH */}

          <div className="product-loan-approval-field">

            <label>
              BRANCH
            </label>

            <select
              value={branch}
              onChange={(e) =>
                setBranch(e.target.value)
              }
            >

              <option value="">
                Select Branch
              </option>

              <option value="KOLKATA">
                KOLKATA
              </option>

              <option value="DELHI">
                DELHI
              </option>

              <option value="MUMBAI">
                MUMBAI
              </option>

            </select>

          </div>


          {/* DATE */}

          <div className="product-loan-approval-field">

            <label>
              DATE
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>


          {/* BUTTON */}

          <div className="product-loan-approval-button-wrapper">

            <button
              type="submit"
              className="product-loan-approval-get-record"
            >
              GET RECORD
            </button>

          </div>

        </form>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <ProductLoanApprovalTable
        data={filteredLoans}
        search={search}
        setSearch={setSearch}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {showViewModal && viewData && (

        <div
          className="product-loan-approval-modal-overlay"
          onClick={() =>
            setShowViewModal(false)
          }
        >

          <div
            className="product-loan-approval-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="product-loan-approval-modal-header">

              <h3>
                PRODUCT LOAN DETAILS
              </h3>

              <button
                className="product-loan-approval-modal-close"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="product-loan-approval-details-grid">

              <Detail
                label="LOAN ID"
                value={viewData.loanId}
              />

              <Detail
                label="MEMBER NAME"
                value={viewData.memName}
              />

              <Detail
                label="MOBILE"
                value={viewData.mobile}
              />

              <Detail
                label="BRANCH"
                value={viewData.branch}
              />

              <Detail
                label="BRANCH CENTER"
                value={viewData.branchCenter}
              />

              <Detail
                label="GROUP NAME"
                value={viewData.groupName}
              />

              <Detail
                label="PRODUCT"
                value={viewData.product}
              />

              <Detail
                label="DISBURSEMENT DATE"
                value={viewData.disbursementDate}
              />

              <Detail
                label="EMI START DATE"
                value={viewData.emiStartDate}
              />

              <Detail
                label="EMI LAST DATE"
                value={viewData.emiLastDate}
              />

              <Detail
                label="INSURER"
                value={viewData.insurer}
              />

              <Detail
                label="TOTAL PRICE"
                value={viewData.totalPrice}
              />

              <Detail
                label="DOWN PAYMENT"
                value={viewData.downPayment}
              />

              <Detail
                label="LOAN AMOUNT"
                value={viewData.loanAmount}
              />

              <Detail
                label="STATUS"
                value={viewData.status}
              />

            </div>


            {/* MODAL FOOTER */}

            <div className="product-loan-approval-modal-footer">

              <button
                className="product-loan-approval-close-button"
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                CLOSE
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


// =========================================================
// DETAIL COMPONENT
// =========================================================

const Detail = ({ label, value }) => {
  return (
    <div className="product-loan-approval-detail">

      <span>
        {label}
      </span>

      <strong>
        {value || "-"}
      </strong>

    </div>
  );
};


export default ProductLoanApproval;