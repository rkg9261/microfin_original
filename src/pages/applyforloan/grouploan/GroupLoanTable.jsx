import React, { useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import AddButton from "../../../components/buttons/AddButton";
import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";
import "./GroupLoan.css";

const GroupLoanTable = ({
  branchSearch,
  onAddNew,
  onView,
  onEdit,
}) => {

  const [entries, setEntries] = useState(10);
  const [openTask, setOpenTask] = useState(null);
  const [tableSearch, setTableSearch] = useState("");

  /* =====================================================
     DEMO DATA
  ===================================================== */

  const { items: groupLoanData, remove } = useSwaggerEntity("groupLoan");



  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = groupLoanData.filter((item) => {

    const branchMatch =
      branchSearch.trim() === "" ||
      item.branch
        .toLowerCase()
        .includes(branchSearch.toLowerCase());

    const searchMatch =
      tableSearch.trim() === "" ||
      item.member
        .toLowerCase()
        .includes(tableSearch.toLowerCase()) ||
      item.plan
        .toLowerCase()
        .includes(tableSearch.toLowerCase()) ||
      item.group
        .toLowerCase()
        .includes(tableSearch.toLowerCase());

    return branchMatch && searchMatch;
  });


  /* =====================================================
     TASK DROPDOWN
  ===================================================== */

  const toggleTask = (id) => {

    setOpenTask(
      openTask === id ? null : id
    );

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
    <div className="group-loan-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="group-loan-list-header">

        <h2>
          GROUP LOAN LIST
        </h2>

        <AddButton onClick={onAddNew}>
          Add New
        </AddButton>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="group-loan-table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />


        <div className="group-loan-table-search">

          <input
            type="text"
            placeholder="Search"
            value={tableSearch}
            onChange={(e) =>
              setTableSearch(e.target.value)
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

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR.
              </th>

              <th>
                PLAN
                <br />
                <em>PENALTY NAME</em>
              </th>

              <th>
                PLEMI
                <br />
                TYPE
              </th>

              <th>
                PLAN
                <br />
                AMT
              </th>

              <th>
                MEMBER
              </th>

              <th>
                MEM CODE
              </th>

              <th>
                GROUP
              </th>

              <th>
                STAFF
              </th>

              <th>
                BRANCH
              </th>

              <th>
                BRANCH CENTER
              </th>

              <th>
                CENTER LEADER
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((loan, index) => (

                <tr key={loan.id}>

                  {/* SR */}

                  <td>
                    {index + 1}
                  </td>


                  {/* PLAN */}

                  <td>

                    <div className="group-loan-plan-cell">

                      <strong>
                        {loan.plan}
                      </strong>

                      <em>
                        {loan.penaltyName}
                      </em>

                    </div>

                  </td>


                  {/* EMI TYPE */}

                  <td>
                    {loan.emiType}
                  </td>


                  {/* PLAN AMOUNT */}

                  <td>
                    {loan.planAmount}
                  </td>


                  {/* MEMBER */}

                  <td>

                    <div className="group-loan-member-cell">

                      <strong>
                        {loan.member}
                      </strong>

                    </div>

                  </td>


                  {/* MEMBER CODE */}

                  <td>
                    {loan.memberCode}
                  </td>


                  {/* GROUP */}

                  <td>
                    {loan.group}
                  </td>


                  {/* STAFF */}

                  <td>
                    {loan.staff}
                  </td>


                  {/* BRANCH */}

                  <td>

                    {loan.branch}

                    <br />

                    <small>
                      ({loan.branchCode})
                    </small>

                  </td>


                  {/* BRANCH CENTER */}

                  <td>
                    {loan.branchCenter}
                  </td>


                  {/* CENTER LEADER */}

                  <td>
                    {loan.centerLeader}
                  </td>


                  {/* ACTION */}

                  <td className="group-loan-action-cell">

                    <button
                      type="button"
                      className="group-loan-task-button"
                      onClick={() =>
                        toggleTask(loan.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openTask === loan.id && (

                      <div className="group-loan-task-menu">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => {

                            setOpenTask(null);

                            onView(loan);

                          }}
                        >

                          <span>
                            👁
                          </span>

                          View

                        </button>


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() => {

                            setOpenTask(null);

                            onEdit(loan);

                          }}
                        >

                          <span>
                            ✎
                          </span>

                          Edit

                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(loan)
                          }
                        >

                          <span>
                            🗑
                          </span>

                          Delete

                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}


            {/* NO DATA */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="12"
                  className="group-loan-no-data"
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

export default GroupLoanTable;