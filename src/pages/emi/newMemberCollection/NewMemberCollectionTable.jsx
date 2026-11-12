import React, { useState } from "react";

const NewMemberCollectionTable = ({ data = [] }) => {

  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) => {

    const text = `
      ${item.loanId || ""}
      ${item.memName || ""}
      ${item.memCode || ""}
      ${item.mobile || ""}
      ${item.branch || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());

  });

  return (
    <div className="new-member-table-card">

      {/* TOP BORDER */}
      <div className="new-member-table-line" />

      {/* HEADER */}
      <div className="new-member-table-heading">

        <h2>
          CUSTOMER LOAN DETAILS
        </h2>

        <div className="new-member-table-search">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <span>
            🔍
          </span>

        </div>

      </div>

      {/* ENTRIES */}
      <div className="new-member-entry-row">

        <select defaultValue="10">

          <option value="10">
            10
          </option>

          <option value="25">
            25
          </option>

          <option value="50">
            50
          </option>

        </select>

      </div>

      {/* TABLE */}
      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>SR. NO.</th>

              <th>LOAN ID</th>

              <th>MEM NAME</th>

              <th>MEM CODE</th>

              <th>MOBILE</th>

              <th>TYPE</th>

              <th>CENTERNAME</th>

              <th>BRANCH</th>

              <th>DISB DATE</th>

              <th>AMOUNT</th>

              <th>REC. AMOUNT</th>

              <th>STATUS</th>

              <th>ACTION</th>

            </tr>

          </thead>

          <tbody>

            {filteredData.length === 0 ? (

              <tr>

                <td
                  colSpan="13"
                  className="common-table-empty"
                >
                  NO DATA FOR TABLE
                </td>

              </tr>

            ) : (

              filteredData.map((item, index) => (

                <tr key={item.id || index}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {item.loanId}
                  </td>

                  <td>
                    {item.memName}
                  </td>

                  <td>
                    {item.memCode}
                  </td>

                  <td>
                    {item.mobile}
                  </td>

                  <td>
                    {item.type}
                  </td>

                  <td>
                    {item.centerName}
                  </td>

                  <td>
                    {item.branch}
                  </td>

                  <td>
                    {item.disbDate}
                  </td>

                  <td>
                    ₹ {item.amount}
                  </td>

                  <td>
                    ₹ {item.receivedAmount}
                  </td>

                  <td>

                    <span
                      className={
                        item.status === "Approved"
                          ? "new-member-approved"
                          : item.status === "Rejected"
                          ? "new-member-rejected"
                          : "new-member-pending"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="new-member-action-btn"
                      type="button"
                    >
                      Task ▾
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}
      <div className="new-member-table-footer">

        <div className="new-member-rows">

          <span>
            ROWS PER PAGE
          </span>

          <select defaultValue="10">

            <option value="10">
              10
            </option>

            <option value="25">
              25
            </option>

            <option value="50">
              50
            </option>

          </select>

        </div>

        <div className="new-member-pagination">

          <span>
            ‹ PREV
          </span>

          <span>
            {filteredData.length === 0
              ? "0 - 0 OF 0"
              : `1 - ${filteredData.length} OF ${filteredData.length}`}
          </span>

          <span>
            NEXT ›
          </span>

        </div>

      </div>

    </div>
  );
};

export default NewMemberCollectionTable;