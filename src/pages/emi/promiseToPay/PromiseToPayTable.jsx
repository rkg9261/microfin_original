import React from "react";

const PromiseToPayTable = ({
  data,
  entries,
  setEntries,
  search,
  setSearch,
}) => {
  const visibleData = data.slice(
    0,
    Number(entries)
  );

  return (
    <div className="promise-to-pay-table-card">

      {/* TABLE HEADER */}

      <div className="promise-to-pay-table-header">

        <h3>PROMISE TO PAY</h3>

      </div>

      {/* TABLE TOP */}

      <div className="promise-to-pay-table-top">

        {/* ENTRIES */}

        <div className="promise-to-pay-entries">

          <select
            value={entries}
            onChange={(e) =>
              setEntries(
                Number(e.target.value)
              )
            }
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

        </div>

        {/* SEARCH */}

        <div className="promise-to-pay-search">

          <input
            type="text"
            placeholder="Search by Name"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <span>⌕</span>

        </div>

      </div>

      {/* TABLE */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR.<br />
                NO.
              </th>

              <th>
                LOAN ID
              </th>

              <th>
                NAME
              </th>

              <th>
                GROUP
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                GEO LOCATION
              </th>

              <th>
                PROMISE DATE
              </th>

              <th>
                PROMISE NOTE
              </th>

              <th>
                BRANCH
              </th>

              <th>
                STATUS
              </th>

            </tr>

          </thead>

          <tbody>

            {visibleData.length === 0 ? (

              <tr>

                <td
                  colSpan="10"
                  className="promise-to-pay-no-data"
                >
                  NO DATA FOUND
                </td>

              </tr>

            ) : (

              visibleData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.loanId}
                    </td>

                    <td>
                      <div className="promise-to-pay-name">

                        <strong>
                          {item.name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      {item.group}
                    </td>

                    <td>
                      <strong className="promise-to-pay-amount">
                        {item.amount}
                      </strong>
                    </td>

                    <td>
                      {item.geoLocation}
                    </td>

                    <td>
                      {item.promiseDate}
                    </td>

                    <td>
                      <span className="promise-to-pay-note">
                        {item.promiseNote}
                      </span>
                    </td>

                    <td>
                      {item.branch}
                    </td>

                    <td>

                      <span
                        className={
                          item.status === "PAID"
                            ? "promise-to-pay-status paid"
                            : "promise-to-pay-status pending"
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="promise-to-pay-footer">

        <span>
          SHOWING{" "}
          {visibleData.length > 0
            ? 1
            : 0}
          {" "}TO{" "}
          {visibleData.length}
          {" "}OF{" "}
          {data.length}
          {" "}ENTRIES
        </span>

        <div className="promise-to-pay-pagination">

          <button>
            ‹
          </button>

          <button className="active">
            1
          </button>

          <button>
            ›
          </button>

        </div>

      </div>

    </div>
  );
};

export default PromiseToPayTable;