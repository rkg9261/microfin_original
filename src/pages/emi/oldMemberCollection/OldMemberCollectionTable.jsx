import React from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

const OldMemberCollectionTable = ({ data = [] }) => {
  return (
    <div className="old-member-table-section">

      {/* GREEN LINE */}
      <div className="old-member-green-line" />

      {/* HEADER */}
      <div className="old-member-table-header">

        <h2>MEMBER COLLECTION</h2>

        <div className="old-member-summary">

          <div>
            <strong>STATUS:</strong>
          </div>

          <div>
            <strong>RECEIVED AMOUNT:</strong>
          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="old-member-table-top">

        <div className="old-member-search">

          <input
            type="text"
            placeholder="Search data"
          />

          <span>⌕</span>

        </div>

      </div>

      {/* TABLE */}
      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>PAYMENT DATE</th>

              <th>AMOUNT</th>

              <th>TYPE</th>

              <th>RECEIVED BY</th>

              <th>PAYMENT MODE</th>

              <th>STATUS</th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="old-member-no-data"
                >
                  NO DATA FOR TABLE
                </td>

              </tr>

            ) : (

              data.map((item, index) => (

                <tr key={item.id || index}>

                  <td>
                    {item.paymentDate}
                  </td>

                  <td>
                    ₹ {item.amount}
                  </td>

                  <td>
                    {item.type}
                  </td>

                  <td>
                    {item.receivedBy}
                  </td>

                  <td>
                    {item.paymentMode}
                  </td>

                  <td>

                    <span
                      className={
                        item.status === "Approved"
                          ? "old-member-status-approved"
                          : "old-member-status-pending"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}
      <div className="old-member-table-footer">

        <div className="old-member-entries">

          <span>ROWS PER PAGE</span>

          <EntriesDropdown
            value={10}
            options={[10, 25, 50]}
            onChange={() => {}}
          />

        </div>

        <div className="old-member-pagination">

          <span>‹ PREV</span>

          <span>
            {data.length === 0
              ? "0 - 0 OF 0"
              : `1 - ${data.length} OF ${data.length}`}
          </span>

          <span>NEXT ›</span>

        </div>

      </div>

    </div>
  );
};

export default OldMemberCollectionTable;