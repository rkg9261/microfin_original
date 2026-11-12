import React, { useMemo, useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import {
  FaEye,
  FaTrash,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import "./LoanApproval.css";


const LoanApprovalTable = ({
  filters,
}) => {
  const confirm = useConfirm();



  // =========================================================
  // STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [selectedLoan, setSelectedLoan] = useState(null);

  const [showViewPopup, setShowViewPopup] =
    useState(false);


  // =========================================================
  // SAMPLE DATA
  // =========================================================

  const [loanData, setLoanData] = useState([

    {
      id: 1,

      planName: "NORMAL PLAN 12 EMI 36%",

      planType: "NORMAL",

      planAmount: 50000,

      disbursementAmount: 48000,

      createdAt: "2026-08-19 15:01:05",

      member: "DEEPAK",

      memberCode: "BRIAMSREM32",

      group: "SHREEJA GROUP",

      branchCenter: "SHREEJA CENTER",

      branch: "SHREEJA GROUP",

      staff: "ADMIN",

      applicationNo: "20201242",

      loanType: "INDIVIDUAL",

      interestType: "REDUCED",

      recoveryType: "MONTHLY",

      numberOfPayments: 12,

      emi: 5000,

      status: "PENDING",

    },


    {
      id: 2,

      planName: "NORMAL PLAN 12 EMI 30%",

      planType: "NORMAL",

      planAmount: 100000,

      disbursementAmount: 97500,

      createdAt: "2026-08-18 13:06:41",

      member: "AKSHAY GARG",

      memberCode: "BRI0N",

      group: "SHREEJA GROUP",

      branchCenter: "SHREEJA CENTER",

      branch: "SHREEJA GROUP",

      staff: "ADMIN",

      applicationNo: "20155384",

      loanType: "GROUP",

      interestType: "REDUCED",

      recoveryType: "MONTHLY",

      numberOfPayments: 12,

      emi: 10000,

      status: "PENDING",

    },



  ]);


  // =========================================================
  // SEARCH + FILTER
  // =========================================================

  const filteredData = useMemo(() => {

    let result = [...loanData];


    // -------------------------------------------------------
    // MEMBER FILTER
    // -------------------------------------------------------

    if (filters?.member) {

      result = result.filter((item) =>
        item.member
          .toLowerCase()
          .includes(
            filters.member.toLowerCase()
          )
      );

    }


    // -------------------------------------------------------
    // BRANCH FILTER
    // -------------------------------------------------------

    if (filters?.branch) {

      result = result.filter((item) =>
        item.branch === filters.branch
      );

    }


    // -------------------------------------------------------
    // STAFF FILTER
    // -------------------------------------------------------

    if (filters?.staff) {

      result = result.filter((item) =>
        item.staff === filters.staff
      );

    }


    // -------------------------------------------------------
    // GROUP FILTER
    // -------------------------------------------------------

    if (filters?.group) {

      result = result.filter((item) =>
        item.group === filters.group
      );

    }


    // -------------------------------------------------------
    // TABLE SEARCH
    // -------------------------------------------------------

    const searchValue =
      search.toLowerCase().trim();


    if (searchValue) {

      result = result.filter((item) =>

        item.planName
          .toLowerCase()
          .includes(searchValue)

        ||

        item.planType
          .toLowerCase()
          .includes(searchValue)

        ||

        item.member
          .toLowerCase()
          .includes(searchValue)

        ||

        item.applicationNo
          .toLowerCase()
          .includes(searchValue)

        ||

        item.group
          .toLowerCase()
          .includes(searchValue)

        ||

        item.branch
          .toLowerCase()
          .includes(searchValue)

        ||

        item.staff
          .toLowerCase()
          .includes(searchValue)

      );

    }


    return result;

  }, [
    loanData,
    filters,
    search,
  ]);


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (loan) => {

    setSelectedLoan(loan);

    setShowViewPopup(true);

  };


  // =========================================================
  // CLOSE POPUP
  // =========================================================

  const handleClosePopup = () => {

    setSelectedLoan(null);

    setShowViewPopup(false);

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (loan) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: `Are you sure you want to delete the loan approval of ${loan.member}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {
      return;
    }


    setLoanData((previousData) =>
      previousData.filter(
        (item) => item.id !== loan.id
      )
    );

  };


  return (

    <div className="loan-approval-list-card">


      {/* =====================================================
          LIST HEADER
      ===================================================== */}

      <div className="loan-approval-list-header">

        <h2>
          LIST FOR LOAN APPROVE
        </h2>


        <div className="loan-approval-pagination-top">

          <button disabled>
            ‹
          </button>

          <button className="active">
            1
          </button>

          <button disabled>
            ›
          </button>

        </div>

      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="loan-approval-table-toolbar">


        <div className="loan-approval-showing-top">

          Showing 1 to{" "}

          {Math.min(
            filteredData.length,
            entries
          )}

          {" "}of{" "}

          {filteredData.length}

          {" "}entries

        </div>


        <div className="loan-approval-toolbar-right">


          {/* ENTRY DROPDOWN */}

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />


          {/* SEARCH */}

          <div className="loan-approval-table-search">

            <input
              type="text"
              placeholder="Search by Application No."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button type="button">
              <FaSearch />
            </button>

          </div>

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
                SR.
              </th>

              <th>
                PL NAME
              </th>

              <th>
                PL EMI TYPE
              </th>

              <th>
                PLAN AMT
              </th>

              <th>
                DIS AMT
              </th>

              <th>
                CREATED AT
              </th>

              <th>
                MEMBER
              </th>

              <th>
                GROUP
              </th>

              <th>
                BRANCH CENTER
              </th>

              <th>
                BRANCH
              </th>

              <th>
                STAFF
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((item, index) => (

                <tr key={item.id}>


                  <td>
                    {index + 1}
                  </td>


                  <td>
                    {item.planName}
                  </td>


                  <td>
                    {item.planType}
                  </td>


                  <td>
                    ₹{item.planAmount.toLocaleString()}
                  </td>


                  <td>
                    ₹{item.disbursementAmount.toLocaleString()}
                  </td>


                  <td>
                    {item.createdAt}
                  </td>


                  <td>

                    <strong>
                      {item.member}
                    </strong>

                    <small>
                      ({item.memberCode})
                    </small>

                  </td>


                  <td>
                    {item.group}
                  </td>


                  <td>
                    {item.branchCenter}
                  </td>


                  <td>
                    {item.branch}
                  </td>


                  <td>
                    {item.staff}
                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td>

                    <div className="loan-approval-action-buttons">


                      {/* VIEW */}

                      <button
                        type="button"
                        className="loan-approval-view-button"
                        title="View"
                        onClick={() =>
                          handleView(item)
                        }
                      >

                        <FaEye />

                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="loan-approval-delete-button"
                        title="Delete"
                        onClick={() =>
                          handleDelete(item)
                        }
                      >

                        <FaTrash />

                      </button>


                    </div>

                  </td>

                </tr>

              ))}


            {/* =================================================
                EMPTY
            ================================================= */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="12"
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
          TABLE FOOTER
      ===================================================== */}

      <div className="loan-approval-table-footer">

        <div>

          Showing 1 to{" "}

          {Math.min(
            filteredData.length,
            entries
          )}

          {" "}of{" "}

          {filteredData.length}

          {" "}entries

        </div>


        <div className="loan-approval-pagination">

          <button disabled>
            PREV
          </button>

          <button className="active">
            1
          </button>

          <button disabled>
            NEXT
          </button>

        </div>

      </div>


      {/* =====================================================
          VIEW DETAILS POPUP
      ===================================================== */}

      {showViewPopup && selectedLoan && (

        <div
          className="loan-approval-popup-overlay"
          onClick={handleClosePopup}
        >

          <div
            className="loan-approval-details-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div className="loan-approval-popup-header">

              <h2>
                LOAN APPROVAL DETAILS
              </h2>


              <button
                type="button"
                onClick={handleClosePopup}
                className="loan-approval-popup-close"
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                POPUP BODY
            ================================================= */}

            <div className="loan-approval-popup-body">


              {/* LEFT */}

              <div className="loan-approval-detail-column">


                <div className="loan-approval-detail-section-title">
                  LOAN DETAILS
                </div>


                <DetailRow
                  label="LOAN APPLICATION NO."
                  value={
                    selectedLoan.applicationNo
                  }
                />


                <DetailRow
                  label="MEMBER NAME"
                  value={
                    selectedLoan.member
                  }
                />


                <DetailRow
                  label="MEMBER CODE"
                  value={
                    selectedLoan.memberCode
                  }
                />


                <DetailRow
                  label="LOAN TYPE"
                  value={
                    selectedLoan.loanType
                  }
                />


                <DetailRow
                  label="PLAN NAME"
                  value={
                    selectedLoan.planName
                  }
                />


                <DetailRow
                  label="PLAN TYPE"
                  value={
                    selectedLoan.planType
                  }
                />


                <DetailRow
                  label="INTEREST TYPE"
                  value={
                    selectedLoan.interestType
                  }
                />


                <DetailRow
                  label="RECOVERY TYPE"
                  value={
                    selectedLoan.recoveryType
                  }
                />


                <DetailRow
                  label="NUMBER OF PAYMENTS"
                  value={
                    selectedLoan.numberOfPayments
                  }
                />

              </div>


              {/* RIGHT */}

              <div className="loan-approval-detail-column">


                <div className="loan-approval-detail-section-title">
                  BRANCH & AMOUNT DETAILS
                </div>


                <DetailRow
                  label="GROUP"
                  value={
                    selectedLoan.group
                  }
                />


                <DetailRow
                  label="BRANCH CENTER"
                  value={
                    selectedLoan.branchCenter
                  }
                />


                <DetailRow
                  label="BRANCH"
                  value={
                    selectedLoan.branch
                  }
                />


                <DetailRow
                  label="STAFF"
                  value={
                    selectedLoan.staff
                  }
                />


                <DetailRow
                  label="PLAN AMOUNT"
                  value={
                    `₹${selectedLoan.planAmount.toLocaleString()}`
                  }
                />


                <DetailRow
                  label="DISBURSEMENT AMOUNT"
                  value={
                    `₹${selectedLoan.disbursementAmount.toLocaleString()}`
                  }
                />


                <DetailRow
                  label="EMI"
                  value={
                    `₹${selectedLoan.emi.toLocaleString()}`
                  }
                />


                <DetailRow
                  label="CREATED AT"
                  value={
                    selectedLoan.createdAt
                  }
                />


                <div className="loan-approval-detail-row">

                  <span>
                    STATUS
                  </span>

                  <strong className="loan-approval-status">
                    {selectedLoan.status}
                  </strong>

                </div>

              </div>

            </div>


            {/* =================================================
                POPUP FOOTER
            ================================================= */}

            <div className="loan-approval-popup-footer">


              <button
                type="button"
                className="loan-approval-popup-delete"
                onClick={() => {

                  handleDelete(selectedLoan);

                  handleClosePopup();

                }}
              >

                <FaTrash />

                Delete

              </button>


              <button
                type="button"
                className="loan-approval-popup-close-button"
                onClick={handleClosePopup}
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


// =============================================================
// DETAIL ROW COMPONENT
// =============================================================

const DetailRow = ({
  label,
  value,
}) => {

  return (

    <div className="loan-approval-detail-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );

};


export default LoanApprovalTable;