import React, { useMemo, useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import {
  FaEye,
  FaTrash,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import "./SalaryApproval.css";

const SalaryApprovalTable = ({ filters }) => {
  const confirm = useConfirm();


  // =========================================================
  // STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [salaryData, setSalaryData] = useState([
    {
      id: 1,
      name: "DEEPAK KUMAR",
      mobile: "9876543210",
      branch: "SHREEJA GROUP",
      salary: 25000,
      paymentMode: "BANK",
      transactionDate: "2026-08-19",
      chequeDate: "2026-08-19",
      remark: "Salary approved",
    },

    {
      id: 2,
      name: "AKSHAY GARG",
      mobile: "9876501234",
      branch: "SHREEJA GROUP",
      salary: 28000,
      paymentMode: "CASH",
      transactionDate: "2026-08-18",
      chequeDate: "-",
      remark: "Monthly salary",
    },

    {
      id: 3,
      name: "KOYEL SARKAR",
      mobile: "9876512345",
      branch: "BRANCH M FINANCE",
      salary: 22000,
      paymentMode: "BANK",
      transactionDate: "2026-08-17",
      chequeDate: "2026-08-17",
      remark: "Salary approved",
    },

    {
      id: 4,
      name: "PRIYA SHARMA",
      mobile: "9876523456",
      branch: "JAGATAPURA",
      salary: 30000,
      paymentMode: "BANK",
      transactionDate: "2026-08-16",
      chequeDate: "2026-08-16",
      remark: "Salary approved",
    },

    {
      id: 5,
      name: "RAHUL KUMAR",
      mobile: "9876534567",
      branch: "VADODARA",
      salary: 26000,
      paymentMode: "CASH",
      transactionDate: "2026-08-15",
      chequeDate: "-",
      remark: "Monthly salary",
    },
  ]);


  // =========================================================
  // VIEW POPUP
  // =========================================================

  const [selectedSalary, setSelectedSalary] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);


  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredData = useMemo(() => {

    let result = [...salaryData];


    // -------------------------------------------------------
    // BRANCH FILTER
    // -------------------------------------------------------

    if (filters?.branch) {

      result = result.filter(
        (item) =>
          item.branch === filters.branch
      );

    }


    // -------------------------------------------------------
    // DATE FILTER
    // -------------------------------------------------------

    if (filters?.date) {

      result = result.filter(
        (item) =>
          item.transactionDate === filters.date
      );

    }


    // -------------------------------------------------------
    // SEARCH
    // -------------------------------------------------------

    if (search.trim()) {

      const value =
        search.toLowerCase().trim();

      result = result.filter((item) =>

        item.name
          .toLowerCase()
          .includes(value)

        ||

        item.mobile
          .toLowerCase()
          .includes(value)

        ||

        item.branch
          .toLowerCase()
          .includes(value)

        ||

        item.paymentMode
          .toLowerCase()
          .includes(value)

        ||

        item.remark
          .toLowerCase()
          .includes(value)

      );

    }


    return result;

  }, [
    salaryData,
    filters,
    search,
  ]);


  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (salary) => {

    setSelectedSalary(salary);

    setShowDetails(true);

  };


  // =========================================================
  // CLOSE VIEW
  // =========================================================

  const handleClose = () => {

    setSelectedSalary(null);

    setShowDetails(false);

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (salary) => {

    const confirmed = await confirm({
      title: "Confirm Delete",
      message: `Are you sure you want to delete salary record of ${salary.name}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    setSalaryData((previous) =>
      previous.filter(
        (item) => item.id !== salary.id
      )
    );

  };


  return (
    <div className="salary-approval-list-card">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="salary-approval-list-header">

        <h2>
          SALARY LIST FOR APPROVED
        </h2>

      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="salary-approval-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />


        <div className="salary-approval-search">

          <input
            type="text"
            placeholder="Search"
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


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR. NO.
              </th>

              <th>
                NAME
              </th>

              <th>
                MOBILE
              </th>

              <th>
                BRANCH
              </th>

              <th>
                SALARY
              </th>

              <th>
                PAYMENT MODE
              </th>

              <th>
                TRANSACTION DATE
              </th>

              <th>
                CHEQUE DATE
              </th>

              <th>
                REMARK
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((salary, index) => (

                <tr key={salary.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    <strong>
                      {salary.name}
                    </strong>
                  </td>

                  <td>
                    {salary.mobile}
                  </td>

                  <td>
                    {salary.branch}
                  </td>

                  <td>
                    ₹{salary.salary.toLocaleString("en-IN")}
                  </td>

                  <td>
                    {salary.paymentMode}
                  </td>

                  <td>
                    {salary.transactionDate}
                  </td>

                  <td>
                    {salary.chequeDate}
                  </td>

                  <td>
                    {salary.remark}
                  </td>

                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td>

                    <div className="salary-approval-action-buttons">

                      <button
                        type="button"
                        className="salary-approval-view-btn"
                        title="View"
                        onClick={() =>
                          handleView(salary)
                        }
                      >
                        <FaEye />
                      </button>


                      <button
                        type="button"
                        className="salary-approval-delete-btn"
                        title="Delete"
                        onClick={() =>
                          handleDelete(salary)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}


            {/* =================================================
                NO DATA
            ================================================= */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="10"
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

      <div className="salary-approval-footer">

        <span>

          Showing 1 to{" "}

          {Math.min(
            filteredData.length,
            entries
          )}

          {" "}of{" "}

          {filteredData.length}

          {" "}entries

        </span>


        <div className="salary-approval-pagination">

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

      {showDetails && selectedSalary && (

        <div
          className="salary-approval-overlay"
          onClick={handleClose}
        >

          <div
            className="salary-approval-details-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                POPUP HEADER
            ================================================= */}

            <div className="salary-approval-popup-header">

              <h2>
                SALARY DETAILS
              </h2>

              <button
                type="button"
                onClick={handleClose}
                className="salary-approval-popup-close"
              >
                <FaTimes />
              </button>

            </div>


            {/* =================================================
                POPUP BODY
            ================================================= */}

            <div className="salary-approval-popup-body">


              {/* LEFT */}

              <div className="salary-approval-detail-column">

                <h3>
                  EMPLOYEE DETAILS
                </h3>


                <SalaryDetail
                  label="NAME"
                  value={selectedSalary.name}
                />


                <SalaryDetail
                  label="MOBILE"
                  value={selectedSalary.mobile}
                />


                <SalaryDetail
                  label="BRANCH"
                  value={selectedSalary.branch}
                />


                <SalaryDetail
                  label="SALARY"
                  value={
                    `₹${selectedSalary.salary.toLocaleString("en-IN")}`
                  }
                />

              </div>


              {/* RIGHT */}

              <div className="salary-approval-detail-column">

                <h3>
                  PAYMENT DETAILS
                </h3>


                <SalaryDetail
                  label="PAYMENT MODE"
                  value={
                    selectedSalary.paymentMode
                  }
                />


                <SalaryDetail
                  label="TRANSACTION DATE"
                  value={
                    selectedSalary.transactionDate
                  }
                />


                <SalaryDetail
                  label="CHEQUE DATE"
                  value={
                    selectedSalary.chequeDate
                  }
                />


                <SalaryDetail
                  label="REMARK"
                  value={
                    selectedSalary.remark
                  }
                />

              </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="salary-approval-popup-footer">

              <button
                type="button"
                className="salary-approval-popup-delete"
                onClick={() => {

                  handleDelete(selectedSalary);

                  handleClose();

                }}
              >

                <FaTrash />

                Delete

              </button>


              <button
                type="button"
                className="salary-approval-popup-close-btn"
                onClick={handleClose}
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
// DETAIL COMPONENT
// =============================================================

const SalaryDetail = ({
  label,
  value,
}) => {

  return (
    <div className="salary-approval-detail-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );

};


export default SalaryApprovalTable;