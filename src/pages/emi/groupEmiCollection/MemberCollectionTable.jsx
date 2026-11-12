import React from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

const MemberCollectionTable = ({
  data,
}) => {
  return (
    <div className="member-collection-card">

      <div className="member-collection-line" />

      <div className="member-collection-header">

        <h3>
          MEMBER COLLECTION
        </h3>

      </div>

      <div className="member-collection-search-row">

        <div className="member-collection-search">

          <input
            type="text"
            placeholder="Search data"
          />

          <span>⌕</span>

        </div>

      </div>

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                PAYMENT DATE
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                RECEIVED BY
              </th>

              <th>
                PAYMENT MODE
              </th>

              <th>
                STATUS
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="member-collection-empty"
                >
                  NO DATA FOR TABLE
                </td>

              </tr>

            ) : (

              data.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.paymentDate}
                  </td>

                  <td>
                    {item.amount}
                  </td>

                  <td>
                    {item.receivedBy}
                  </td>

                  <td>
                    {item.paymentMode}
                  </td>

                  <td>

                    <span className="member-collection-status">
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <div className="member-collection-footer">

        <div className="member-collection-entries">

          <span>
            ROWS PER PAGE
          </span>

          <EntriesDropdown
            value={10}
            options={[10, 25, 50]}
            onChange={() => {}}
          />

        </div>

        <div className="member-collection-pagination">

          <span>
            ‹ PREV
          </span>

          <span>
            {data.length === 0
              ? "0 - 0 OF 0"
              : `1 - ${data.length} OF ${data.length}`}
          </span>

          <span>
            NEXT ›
          </span>

        </div>

      </div>

    </div>
  );
};

export default MemberCollectionTable;