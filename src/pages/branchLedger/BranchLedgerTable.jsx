import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const BranchLedgerTable = ({
  data,
}) => {

  const [search, setSearch] = useState("");


  // ============================================
  // SEARCH
  // ============================================

  const filteredData = data.filter((item) => {

    const value = search.toLowerCase();

    return (
      item.branch
        .toLowerCase()
        .includes(value) ||

      item.ledger
        .toLowerCase()
        .includes(value) ||

      item.remark
        .toLowerCase()
        .includes(value)
    );

  });


  return (
    <div className="branch-ledger-table-area">


      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="branch-ledger-search">

        <FaSearch className="branch-ledger-search-icon" />

        <input
          type="text"
          placeholder="Search Table"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ========================================
          TABLE
      ======================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th className="branch-ledger-number">
               S No
              </th>

              <th>
                BRANCH
              </th>

              <th>
                LEDGER
              </th>

              <th>
                REMARK
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData.length > 0 ? (

              filteredData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td className="branch-ledger-number">
                      {index + 1}
                    </td>

                    <td className="branch-ledger-branch">
                      {item.branch}
                    </td>

                    <td className="branch-ledger-ledger">
                      {item.ledger}
                    </td>

                    <td className="branch-ledger-remark">
                      {item.remark || "-"}
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="common-table-empty"
                >
                  NO DATA FOUND
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* ========================================
          TABLE FOOTER
      ======================================== */}

      <div className="branch-ledger-footer">

        <span>
          Showing 1 to {filteredData.length} of{" "}
          {filteredData.length} entries
        </span>

        <div className="branch-ledger-pagination">

          <button disabled>
            ‹
          </button>

          <button className="active">
            1
          </button>

          <button disabled>
            ›
          </button>

        </div>

      </div>

    </div>
  );
};

export default BranchLedgerTable;