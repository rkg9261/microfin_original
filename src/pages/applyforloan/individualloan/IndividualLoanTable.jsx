import React, { useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import AddButton from "../../../components/buttons/AddButton";
import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";
import "./IndividualLoan.css";

const IndividualLoanTable = ({
  branchSearch,
  onAddNew,
  onView,
  onEdit,
}) => {

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");

  const [openTask, setOpenTask] = useState(null);


  /* =====================================================
     DEMO DATA
  ===================================================== */

  const { items: individualLoanData, remove } = useSwaggerEntity("individualLoan");



  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = individualLoanData.filter((item) => {

    const branchMatch =
      branchSearch.trim() === "" ||
      item.branchName
        .toLowerCase()
        .includes(branchSearch.toLowerCase());


    const searchMatch =
      search.trim() === "" ||
      item.member
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.planName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.branchName
        .toLowerCase()
        .includes(search.toLowerCase());


    return branchMatch && searchMatch;
  });


  /* =====================================================
     TASK
  ===================================================== */

  const toggleTask = (id) => {

    setOpenTask(
      openTask === id ? null : id
    );

  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {

    setOpenTask(null);

    if (onView) {
      onView(loan);
    }

  };


  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (loan) => {

    setOpenTask(null);

    if (onEdit) {
      onEdit(loan);
    }

  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (loan) => {
    try {
      await remove(loan.id);
      setOpenTask(null);
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <div className="individual-loan-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="individual-loan-list-header">

        <h2>
          INDIVIDUAL LOAN LIST
        </h2>

        <AddButton onClick={onAddNew}>
          Add New
        </AddButton>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="individual-loan-table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />


        <div className="individual-loan-search-box">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <span>
            ⌕
          </span>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="common-table-wrapper">

        <table className="common-table ">

          <thead>

            <tr>

              <th>SR.</th>

              <th>
                PLAN
                <br />
                <em>PENALTY NAME</em>
              </th>

              <th>EMI</th>

              <th>LOAN AMT</th>

              <th>DIS AMT</th>

              <th>FC + PF + IF</th>

              <th>MEMBER</th>

              <th>STAFF</th>

              <th>BRANCH NAME</th>

              <th>BRANCH CENTER</th>

              <th>PAY MODE</th>

              <th>DESC</th>

              <th>DATE</th>

              <th>ACTION</th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((loan, index) => (

                <tr key={loan.id}>

                  <td>
                    {index + 1}
                  </td>


                  <td>

                    <div className="individual-loan-plan-cell">

                      <strong>
                        {loan.planName}
                      </strong>

                      <em>
                        {loan.penaltyName}
                      </em>

                    </div>

                  </td>


                  <td>
                    {loan.emi}
                  </td>


                  <td>
                    {loan.loanAmount}
                  </td>


                  <td>
                    {loan.disAmount}
                  </td>


                  <td>
                    {loan.fcPfIf}
                  </td>


                  <td>

                    <div className="individual-loan-member-cell">

                      <strong>
                        {loan.member}
                      </strong>

                      <small>
                        ({loan.memberCode})
                      </small>

                    </div>

                  </td>


                  <td>
                    {loan.staff}
                  </td>


                  <td>

                    {loan.branchName}

                    <br />

                    ({loan.branchCode})

                  </td>


                  <td>
                    {loan.branchCenter}
                  </td>


                  <td>
                    {loan.payMode}
                  </td>


                  <td>
                    {loan.description}
                  </td>


                  <td>
                    {loan.date}
                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td className="individual-loan-action-cell">

                    <button
                      type="button"
                      className="individual-loan-task-button"
                      onClick={() =>
                        toggleTask(loan.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openTask === loan.id && (

                      <div className="individual-loan-task-menu">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            handleView(loan)
                          }
                        >
                          <span>👁</span>
                          VIEW
                        </button>


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(loan)
                          }
                        >
                          <span>✎</span>
                          EDIT
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(loan)
                          }
                        >
                          <span>🗑</span>
                          DELETE
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}


            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="14"
                  className="individual-loan-no-data"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default IndividualLoanTable;