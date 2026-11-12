import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import "./LogsRecord.css";

const LogsRecordTable = ({ branch }) => {

  /* =====================================================
     ENTRIES
  ===================================================== */

  const [entries, setEntries] = useState(10);

  /* =====================================================
     SEARCH
  ===================================================== */

  const [search, setSearch] = useState("");


  /* =====================================================
     ONLY 2 LOG RECORDS
  ===================================================== */

  const logsData = [
    {
      id: 1,

      createdAt: "2026-08-19 15:58:19",

      ip: "171.61.20.11",

      method: "GET",

      user: "ADMIN (ADM01)",

      branch: "KOLKATA - DALHOUSIE",

      subject: "USER LOGGED-OUT SUCCESSFULLY.",
    },

    {
      id: 2,

      createdAt: "2026-08-19 15:01:05",

      ip: "152.59.87.69",

      method: "POST",

      user: "ADMIN (ADM01)",

      branch: "JAGATAPURA",

      subject: "USER LOGGED IN SUCCESSFULLY.",
    },
  ];


  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredLogs = useMemo(() => {

    return logsData.filter((log) => {

      const branchMatch =
        !branch ||
        log.branch
          .toLowerCase()
          .includes(branch.toLowerCase());


      const searchText =
        search.toLowerCase().trim();


      const searchMatch =
        !searchText ||
        log.createdAt
          .toLowerCase()
          .includes(searchText) ||

        log.ip
          .toLowerCase()
          .includes(searchText) ||

        log.method
          .toLowerCase()
          .includes(searchText) ||

        log.user
          .toLowerCase()
          .includes(searchText) ||

        log.subject
          .toLowerCase()
          .includes(searchText) ||

        log.branch
          .toLowerCase()
          .includes(searchText);


      return branchMatch && searchMatch;

    });

  }, [branch, search]);


  return (
    <div className="logs-list-card">

      {/* =====================================================
          LIST HEADER
      ===================================================== */}

      <div className="logs-list-title">
        LOG ACTIVITY LIST
      </div>


      {/* =====================================================
          TABLE TOOLBAR
      ===================================================== */}

      <div className="logs-table-toolbar">

        {/* ENTRIES DROPDOWN */}

        <div className="logs-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

        </div>


        {/* SEARCH */}

        <div className="logs-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button
            type="button"
            className="logs-search-button"
          >
            🔍
          </button>

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
                SR. NO.
              </th>

              <th>
                CREATED_AT
              </th>

              <th>
                IP
              </th>

              <th>
                METHOD
              </th>

              <th>
                USER
              </th>

              <th>
                SUBJECT
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredLogs
              .slice(0, entries)
              .map((log, index) => (

                <tr key={log.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {log.createdAt}
                  </td>

                  <td>
                    {log.ip}
                  </td>

                  <td>

                    <span
                      className={
                        log.method === "POST"
                          ? "logs-method logs-post"
                          : "logs-method logs-get"
                      }
                    >
                      {log.method}
                    </span>

                  </td>

                  <td>
                    <strong>
                      {log.user}
                    </strong>
                  </td>

                  <td>
                    {log.subject}
                  </td>

                </tr>

              ))}


            {/* =================================================
                NO DATA
            ================================================= */}

            {filteredLogs.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  className="common-table-empty"
                >
                  No records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          TABLE FOOTER
      ===================================================== */}

      <div className="logs-table-footer">

        <span>
          Showing 1 to{" "}
          {Math.min(
            filteredLogs.length,
            entries
          )}{" "}
          of {filteredLogs.length} entries
        </span>


        {/* PAGINATION */}

        <div className="logs-pagination">

          <button
            type="button"
            disabled
          >
            ‹
          </button>

          <button
            type="button"
            className="logs-page-active"
          >
            1
          </button>

          <button
            type="button"
            disabled
            
          >
            ›
          </button>

        </div>

      </div>

    </div>
  );
};

export default LogsRecordTable;