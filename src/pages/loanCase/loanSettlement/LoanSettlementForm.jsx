import React, { useState } from "react";

import {
  FaChevronDown,
  FaSearch,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";

import AddButton from "../../../components/buttons/AddButton";

const LoanSettlementForm = ({
  settlementData,
  onCreate,
  filters,
  onFilterChange,
}) => {

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    branch: "",
    planType: "",
    customer: "",
    customerLoan: "",
    reason: "",
    chargeType: "",
    paymentDate: "",
    remark: "",
    ledgerAccount: "",
  });

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE
  // =====================================================

  const handleSubmit = () => {
    onCreate(formData);
  };

  // =====================================================
  // DOWNLOAD
  // =====================================================

  const handleDownload = () => {

    const headers = [
      "Loan ID",
      "Member Name",
      "Branch",
      "Plan Amount",
      "Paid Amount",
      "Due Amount",
      "Settlement Amount",
      "Settlement Date",
      "Payment Mode",
      "Status",
    ];

    const rows = settlementData.map((item) => [
      item.loanId,
      item.memberName,
      item.branch,
      item.planAmount,
      item.paidAmount,
      item.dueAmount,
      item.settleAmount,
      item.settlementDate,
      item.paymentMode,
      item.settlementStatus,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "loan-settlement.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>

      {/* =================================================
          CREATE SETTLEMENT
      ================================================= */}

      <div className="loan-settlement-create-card">

        <div className="loan-settlement-section-header">

          <h2>SETTLEMENT CREATE</h2>

          <button
            type="button"
            className="loan-settlement-download-btn"
            onClick={handleDownload}
          >
            <FaDownload />
            DOWNLOAD EXCEL
          </button>

        </div>


        <div className="loan-settlement-create-grid">

          {/* BRANCH */}
          <div className="loan-settlement-form-field">

            <label>BRANCH</label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.branch}
                onChange={(e) =>
                  handleChange(
                    "branch",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="KOLKATA - DALHOUSIE">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="MAIN BRANCH">
                  MAIN BRANCH
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* PLAN TYPE */}
          <div className="loan-settlement-form-field">

            <label>PLAN TYPE</label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.planType}
                onChange={(e) =>
                  handleChange(
                    "planType",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select plan Type
                </option>

                <option value="INDIVIDUAL">
                  INDIVIDUAL
                </option>

                <option value="GROUP">
                  GROUP
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* CUSTOMER */}
          <div className="loan-settlement-form-field">

            <label>
              CUSTOMER (TYPE HERE)
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.customer}
                onChange={(e) =>
                  handleChange(
                    "customer",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Customer
                </option>

                {settlementData.map((item) => (
                  <option
                    key={item.id}
                    value={item.memberName}
                  >
                    {item.memberName}
                  </option>
                ))}

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* CUSTOMER LOAN */}
          <div className="loan-settlement-form-field loan-field-wide">

            <label>
              SELECT CUSTOMER LOAN
              <span>*</span>
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.customerLoan}
                onChange={(e) =>
                  handleChange(
                    "customerLoan",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Customer Loan
                </option>

                {settlementData.map((item) => (
                  <option
                    key={item.id}
                    value={item.loanId}
                  >
                    {item.loanId} -{" "}
                    {item.memberName}
                  </option>
                ))}

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* SEARCH LOAN */}
          <div className="loan-settlement-search-loan">

            <label>
              SEARCH BY LOAN NUMBER
            </label>

            <div className="loan-settlement-search-row">

              <input
                type="text"
                placeholder="Please Enter Application Number"
                value={filters.loanNumber}
                onChange={(e) =>
                  onFilterChange(
                    "loanNumber",
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="loan-settlement-search-btn"
              >
                <FaSearch />
                SEARCH
              </button>

            </div>

          </div>


          {/* REASON */}
          <div className="loan-settlement-form-field">

            <label>
              REASON <span>*</span>
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.reason}
                onChange={(e) =>
                  handleChange(
                    "reason",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Reason
                </option>

                <option value="PREPAYMENT">
                  PREPAYMENT
                </option>

                <option value="CUSTOMER REQUEST">
                  CUSTOMER REQUEST
                </option>

                <option value="OTHER">
                  OTHER
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* CHARGE TYPE */}
          <div className="loan-settlement-form-field">

            <label>
              LOAN PRE CLOSING CHARGE TYPE
              <span>*</span>
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.chargeType}
                onChange={(e) =>
                  handleChange(
                    "chargeType",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Type
                </option>

                <option value="FIXED">
                  FIXED
                </option>

                <option value="PERCENTAGE">
                  PERCENTAGE
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* PAYMENT DATE */}
          <div className="loan-settlement-form-field">

            <label>
              PAYMENT DATE
              <span>*</span>
            </label>

            <div className="loan-settlement-date-wrapper">

              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) =>
                  handleChange(
                    "paymentDate",
                    e.target.value
                  )
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* DUE PRINCIPAL */}
          <div className="loan-settlement-form-field">

            <label>
              DUE PRINCIPAL AMOUNT
            </label>

            <input
              type="number"
              value="0"
              readOnly
              className="loan-settlement-readonly"
            />

          </div>


          {/* REMARK */}
          <div className="loan-settlement-form-field">

            <label>REMARK</label>

            <input
              type="text"
              value={formData.remark}
              onChange={(e) =>
                handleChange(
                  "remark",
                  e.target.value
                )
              }
            />

          </div>


          {/* PRE CLOSING */}
          <div className="loan-settlement-form-field">

            <label>
              LOAN PRE CLOSING CHARGE
            </label>

            <input
              type="number"
              value="0"
              readOnly
              className="loan-settlement-readonly"
            />

          </div>


          {/* LEDGER */}
          <div className="loan-settlement-form-field">

            <label>
              SELECT LEDGER ACCOUNT
              <span>*</span>
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={formData.ledgerAccount}
                onChange={(e) =>
                  handleChange(
                    "ledgerAccount",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Ledger Account
                </option>

                <option value="CASH A/C">
                  CASH A/C
                </option>

                <option value="BANK A/C">
                  BANK A/C
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* DUE INTEREST */}
          <div className="loan-settlement-form-field">

            <label>
              DUE INTEREST AMOUNT
            </label>

            <input
              type="number"
              value="0"
              readOnly
              className="loan-settlement-readonly"
            />

          </div>


          {/* TOTAL DUE */}
          <div className="loan-settlement-form-field">

            <label>
              TOTAL DUE WITH PRE LOAN CLOSING
              CHARGE
            </label>

            <input
              type="number"
              value="0"
              readOnly
              className="loan-settlement-readonly"
            />

          </div>


          {/* SETTLEMENT */}
          <div className="loan-settlement-form-field">

            <label>
              SETTLEMENT AMOUNT
            </label>

            <input
              type="number"
              value="0"
              readOnly
              className="loan-settlement-readonly"
            />

          </div>

        </div>


        <div className="loan-settlement-create-action">

          <AddButton
            onClick={handleSubmit}
          >
            CREATE SETTLEMENT
          </AddButton>

        </div>

      </div>


      {/* =================================================
          SEARCH BY
      ================================================= */}

      <div className="loan-settlement-search-card">

        <div className="loan-settlement-filter-title">
          SEARCH BY
        </div>


        <div className="loan-settlement-search-grid">

          {/* BRANCH */}
          <div className="loan-settlement-form-field">

            <label>BRANCH</label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={filters.branch}
                onChange={(e) =>
                  onFilterChange(
                    "branch",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="KOLKATA - DALHOUSIE">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="MAIN BRANCH">
                  MAIN BRANCH
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* CUSTOMER */}
          <div className="loan-settlement-form-field">

            <label>
              CUSTOMER (TYPE HERE)
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={filters.customer}
                onChange={(e) =>
                  onFilterChange(
                    "customer",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Customer
                </option>

                {settlementData.map((item) => (
                  <option
                    key={item.id}
                    value={item.memberName}
                  >
                    {item.memberName}
                  </option>
                ))}

              </select>

              <FaChevronDown />

            </div>

          </div>


          {/* DATE */}
          <div className="loan-settlement-form-field">

            <label>DATE</label>

            <div className="loan-settlement-date-wrapper">

              <input
                type="date"
                value={filters.date}
                onChange={(e) =>
                  onFilterChange(
                    "date",
                    e.target.value
                  )
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* STATUS */}
          <div className="loan-settlement-form-field">

            <label>
              SELECT STATUS
              <span>*</span>
            </label>

            <div className="loan-settlement-select-wrapper">

              <select
                value={filters.status}
                onChange={(e) =>
                  onFilterChange(
                    "status",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Status
                </option>

                <option value="APPROVED">
                  APPROVED
                </option>

                <option value="PENDING">
                  PENDING
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>

        </div>


        <div className="loan-settlement-filter-buttons">

          <button
            type="button"
            className="loan-settlement-submit-btn"
          >
            SUBMIT
          </button>

          <button
            type="button"
            className="loan-settlement-reset-btn"
            onClick={() =>
              onFilterChange("branch", "")
            }
          >
            RESET
          </button>

        </div>

      </div>

    </>
  );
};

export default LoanSettlementForm;