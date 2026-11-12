import React, { useMemo, useState } from "react";

import {
  FaSearch,
} from "react-icons/fa";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";

import {
  ViewButton,
  DeleteButton,
} from "../../../components/buttons";


const MemberAttendanceTable = ({
  data = [],
  onView,
  onDelete,
}) => {

  // =========================================================
  // SEARCH
  // =========================================================

  const [search, setSearch] = useState("");


  // =========================================================
  // ENTRIES
  // =========================================================

  const [entries, setEntries] = useState(10);


  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredData = useMemo(() => {

    const value = search
      .toLowerCase()
      .trim();


    if (!value) {
      return data;
    }


    return data.filter((item) => {

      return (

        item.name
          ?.toLowerCase()
          .includes(value)

        ||

        item.memberCode
          ?.toLowerCase()
          .includes(value)

        ||

        item.loanId
          ?.toLowerCase()
          .includes(value)

        ||

        item.loanApplicationNo
          ?.toLowerCase()
          .includes(value)

        ||

        item.branch
          ?.toLowerCase()
          .includes(value)

        ||

        item.markedBy
          ?.toLowerCase()
          .includes(value)

      );

    });

  }, [data, search]);


  // =========================================================
  // ENTRY DATA
  // =========================================================

  const displayedData = filteredData.slice(
    0,
    Number(entries)
  );


  return (

    <div className="member-attendance-table-card">


      {/* =====================================================
          TABLE TITLE
      ===================================================== */}

      <div className="member-attendance-table-title">

        MEMBER EMI PAYMENT ATTENDANCE RECORDS

      </div>


      {/* =====================================================
          TABLE TOOLBAR
      ===================================================== */}

      <div className="member-attendance-table-toolbar">


        {/* =================================================
            ENTRIES DROPDOWN
        ================================================= */}

        <div className="member-attendance-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="member-attendance-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <FaSearch />

        </div>


      </div>


      {/* =====================================================
          COMMON TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">


          <thead>

            <tr>

              <th>
                SR.
                <br />
                NO.
              </th>

              <th>
                NAME
              </th>

              <th>
                DATE
              </th>

              <th>
                ATTENDANCE
              </th>

              <th>
                LOAN
                <br />
                ID
              </th>

              <th>
                LOAN APPLICATION
                <br />
                NO
              </th>

              <th>
                REMARK
              </th>

              <th>
                BRANCH
              </th>

              <th>
                MARKED
                <br />
                BY
              </th>

              <th className="action-column">
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>


            {displayedData.length > 0 ? (

              displayedData.map((item, index) => (

                <tr key={item.id}>


                  {/* SR NO */}

                  <td>
                    {index + 1}
                  </td>


                  {/* NAME */}

                  <td className="member-attendance-name">

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      ({item.memberCode})
                    </span>

                  </td>


                  {/* DATE */}

                  <td>
                    {item.date}
                  </td>


                  {/* ATTENDANCE */}

                  <td>

                    {/* Attendance class NOT changed */}

                    <span
                      className={
                        item.attendance === "PRESENT"
                          ? "attendance-present"
                          : "attendance-absent"
                      }
                    >

                      {item.attendance}

                    </span>

                  </td>


                  {/* LOAN ID */}

                  <td>
                    {item.loanId}
                  </td>


                  {/* APPLICATION */}

                  <td>
                    {item.loanApplicationNo}
                  </td>


                  {/* REMARK */}

                  <td>
                    {item.remark}
                  </td>


                  {/* BRANCH */}

                  <td>
                    {item.branch}
                  </td>


                  {/* MARKED BY */}

                  <td>
                    {item.markedBy}
                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td className="action-column">

                    <div className="action-cell">


                      {/* VIEW */}

                      <ViewButton
                        onClick={() =>
                          onView(item)
                        }
                      />


                      {/* DELETE */}

                      <DeleteButton
                        onClick={() =>
                          onDelete(item.id)
                        }
                      />


                    </div>

                  </td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="10"
                  className="common-table-empty"
                >

                  No attendance records found

                </td>

              </tr>

            )}


          </tbody>


        </table>

      </div>


    </div>

  );

};


export default MemberAttendanceTable;