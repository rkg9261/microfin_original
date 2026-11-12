import React, { useState } from "react";

import AddButton from "../../components/buttons/AddButton";
import EntriesDropdown from "../../components/common/EntriesDropdown";

import "../../components/common/Table.css";
import "./AreaSummary.css";

const AreaSummaryTable = ({
  branchSearch,
  onAddNew,
  onView,
  onEdit,
  onDelete,
}) => {

  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [openTask, setOpenTask] = useState(null);

  /* =====================================================
     DEMO DATA
  ===================================================== */

  const areaData = [
    {
      id: 1,

      areaName: "PHULBARIYA",

      branch: "KOLKATA - DALHOUSIE",

      surveyDate: "11-06-2026",

      employee: "ADMIN",

      status: "APPROVED",

      distanceFromBranch: "12 KM",

      possibleCenter: "YES",

      surveyAreaName: "PHULBARIYA",

      mfiWorking: "YES",

      mfiName: "UMANG MICRO FINANCE",

      villageName: "PHULBARIYA",

      populationOfVillages: "8500",

      majorOperationPeople: "FARMERS",

      politicalSituation: "NORMAL",

      roadStatus: "GOOD",

      lawAndOrderSituation: "GOOD",

      hinduReligionPercentage: "72",

      muslimReligionPercentage: "15",

      generalCastePercentage: "35",

      obcCastePercentage: "30",

      sikhReligionPercentage: "3",

      scCastePercentage: "18",

      christianReligionPercentage: "2",

      stCastePercentage: "8",

      otherReligionPercentage: "5",

      otherCastePercentage: "9",

      remark: "Suitable area for new center.",
    },


  ];

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = areaData.filter((item) => {

    const branchMatch =
      branchSearch.trim() === "" ||
      item.branch
        .toLowerCase()
        .includes(branchSearch.toLowerCase());

    const searchMatch =
      search.trim() === "" ||
      item.areaName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.branch
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.employee
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.status
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
     ACTION
  ===================================================== */

  const handleAction = (action, area) => {

    setOpenTask(null);

    if (action === "view") {
      onView(area);
    }

    if (action === "edit") {
      onEdit(area);
    }

    if (action === "delete") {
      onDelete(area);
    }
  };

  return (
    <div className="area-summary-list-container">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="area-summary-list-header">

        <h2>
          AREA SUMMARY LIST
        </h2>

        <AddButton onClick={onAddNew}>
          Add New
        </AddButton>

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="area-summary-table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={(value) =>
            setEntries(Number(value))
          }
        />

        <div className="area-summary-search">

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

        <table className="common-table area-summary-table">

          <thead>

            <tr>

              <th>SR. NO.</th>

              <th>AREA NAME</th>

              <th>BRANCH</th>

              <th>SURVEY DATE</th>

              <th>EMPLOYEE</th>

              <th>STATUS</th>

              <th>ACTION</th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((area, index) => (

                <tr key={area.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {area.areaName}
                  </td>

                  <td>
                    {area.branch}
                  </td>

                  <td>
                    {area.surveyDate}
                  </td>

                  <td>
                    {area.employee}
                  </td>

                  <td>

                    <span
                      className={
                        area.status === "APPROVED"
                          ? "area-summary-status approved"
                          : "area-summary-status pending"
                      }
                    >
                      {area.status}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="area-summary-action-cell">

                    <button
                      type="button"
                      className="area-summary-task-button"
                      onClick={() =>
                        toggleTask(area.id)
                      }
                    >
                      Task ▼
                    </button>


                    {openTask === area.id && (

                      <div className="area-summary-task-menu">

                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              "view",
                              area
                            )
                          }
                        >
                          <span>◉</span>
                          View
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              "edit",
                              area
                            )
                          }
                        >
                          <span>✎</span>
                          Edit
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              "delete",
                              area
                            )
                          }
                        >
                          <span>▥</span>
                          Delete
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}


            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="7"
                  className="area-summary-no-data"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="area-summary-table-footer">

        Showing 1 to {Math.min(
          filteredData.length,
          entries
        )} of {filteredData.length} entries

      </div>

    </div>
  );
};

export default AreaSummaryTable;