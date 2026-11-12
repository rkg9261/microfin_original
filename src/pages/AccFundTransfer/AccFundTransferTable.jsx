import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../components/common/EntriesDropdown";

const AccFundTransferTable = ({
  data = [],
  onCreate,
  onDelete,
}) => {
  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [openAction, setOpenAction] =
    useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const text = `
        ${item.amount}
        ${item.ledger}
        ${item.fromBranch}
        ${item.toBranch}
        ${item.date}
        ${item.status}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });
  }, [data, search]);

  const visibleData =
    filteredData.slice(
      0,
      rowsPerPage
    );

  const handleAction = (id) => {
    setOpenAction(
      openAction === id ? null : id
    );
  };

  return (
    <div className="fund-transfer-table-card">

      {/* =====================================================
          TABLE TOP
      ===================================================== */}

      <div className="fund-transfer-table-top">

        <div className="fund-transfer-showing">

          SHOWING 1 TO{" "}
          {visibleData.length} OF{" "}
          {filteredData.length} ENTRIES

        </div>

        <div className="fund-transfer-pagination">

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

      {/* =====================================================
          TABLE CONTROLS
      ===================================================== */}

      <div className="fund-transfer-table-controls">

        <div className="fund-transfer-entry-control">

          <EntriesDropdown
            value={rowsPerPage}
            onChange={(value) =>
              setRowsPerPage(
                Number(value)
              )
            }
            options={[
              10,
              25,
              50,
              100,
            ]}
          />

        </div>

        <div className="fund-transfer-search">

          <button
            type="button"
            onClick={() =>
              setSearch("")
            }
          >
            ↻
          </button>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <span>
            🔍
          </span>

        </div>

      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="fund-transfer-table-wrapper">

        <table className="fund-transfer-table">

          <thead>

            <tr>

              <th>
                SR. NO.
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                LEDGER
              </th>

              <th>
                FROM BRANCH
              </th>

              <th>
                TO BRANCH
              </th>

              <th>
                DATE
              </th>

              <th>
                STATUS
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>

          <tbody>

            {visibleData.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="fund-transfer-no-data"
                >
                  NO DATA FOR TABLE
                </td>

              </tr>

            ) : (

              visibleData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>
                      {index + 1}
                    </td>

                    <td className="fund-transfer-amount">
                      ₹{" "}
                      {Number(
                        item.amount
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      {item.ledger}
                    </td>

                    <td>
                      {item.fromBranch}
                    </td>

                    <td>
                      {item.toBranch}
                    </td>

                    <td>
                      {item.date}
                    </td>

                    <td>

                      <span
                        className={`fund-transfer-status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="fund-transfer-action">

                      <button
                        type="button"
                        className="fund-transfer-task-btn"
                        onClick={() =>
                          handleAction(
                            item.id
                          )
                        }
                      >
                        Task ▾
                      </button>

                      {openAction ===
                        item.id && (

                        <div className="fund-transfer-action-menu">

                          {/* CREATE */}

                          <button
                            type="button"
                            onClick={() => {
                              onCreate(item);
                              setOpenAction(
                                null
                              );
                            }}
                          >
                            <span>
                              ✎
                            </span>

                            Create

                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="delete-action"
                            onClick={() => {
                              onDelete(
                                item.id
                              );

                              setOpenAction(
                                null
                              );
                            }}
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

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AccFundTransferTable;