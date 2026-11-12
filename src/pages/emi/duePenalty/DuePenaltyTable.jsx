import React, { useMemo, useState } from "react";

const DuePenaltyTable = ({
  data = [],
  onPayNow,
  onWaiveOff,
}) => {

  const [search, setSearch] = useState("");
  const [openTask, setOpenTask] = useState(null);

  const filteredData = useMemo(() => {

    return data.filter((item) => {

      const searchText = `
        ${item.loanId}
        ${item.emiId}
        ${item.member}
        ${item.branch}
        ${item.group}
        ${item.status}
      `.toLowerCase();

      return searchText.includes(
        search.toLowerCase()
      );
    });

  }, [data, search]);

  const handleTask = (id) => {
    setOpenTask(
      openTask === id ? null : id
    );
  };

  return (
    <div className="due-penalty-table-card">

      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="due-penalty-table-header">

        <div className="due-penalty-title-area">

          <h2>
            EMI PENALTY LIST
          </h2>

          <div className="due-penalty-total">

            <select defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>

            <strong>
              PENALTY AMOUNT : ₹ 0
            </strong>

          </div>

        </div>

        {/* SEARCH */}

        <div className="due-penalty-table-search">

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

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>SELECT</th>
              <th>SR. NO.</th>
              <th>LOAN ID</th>
              <th>EMI ID</th>
              <th>EMI DATE</th>
              <th>EMI AMOUNT</th>
              <th>MEMBER</th>
              <th>MOBILE</th>
              <th>BRANCH</th>
              <th>GROUP</th>
              <th>PENALTY DATE</th>
              <th>PAYMENT DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>ACTION</th>

            </tr>

          </thead>

          <tbody>

            {filteredData.length === 0 ? (

              <tr>

                <td
                  colSpan="15"
                  className="due-penalty-no-data"
                >
                  NO DATA FOR TABLE
                </td>

              </tr>

            ) : (

              filteredData.map((item, index) => (

                <tr key={item.id}>

                  {/* CHECKBOX */}

                  <td>

                    <input
                      type="checkbox"
                      className="due-penalty-checkbox"
                    />

                  </td>

                  {/* SR */}

                  <td>
                    {index + 1}
                  </td>

                  {/* LOAN */}

                  <td>
                    {item.loanId}
                  </td>

                  {/* EMI */}

                  <td>
                    {item.emiId}
                  </td>

                  {/* EMI DATE */}

                  <td>
                    {item.emiDate}
                  </td>

                  {/* EMI AMOUNT */}

                  <td>
                    ₹ {item.emiAmount}
                  </td>

                  {/* MEMBER */}

                  <td className="due-penalty-member">
                    {item.member}
                  </td>

                  {/* MOBILE */}

                  <td>
                    {item.mobile}
                  </td>

                  {/* BRANCH */}

                  <td>
                    {item.branch}
                  </td>

                  {/* GROUP */}

                  <td>
                    {item.group}
                  </td>

                  {/* PENALTY DATE */}

                  <td>
                    {item.penaltyDate}
                  </td>

                  {/* PAYMENT DATE */}

                  <td>
                    {item.paymentDate}
                  </td>

                  {/* AMOUNT */}

                  <td className="due-penalty-amount">
                    ₹ {item.amount}
                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={
                        item.status === "Paid"
                          ? "due-penalty-status paid"
                          : item.status === "Waived"
                          ? "due-penalty-status waived"
                          : "due-penalty-status pending"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="due-penalty-action-cell">

                    <button
                      type="button"
                      className="due-penalty-task-btn"
                      onClick={() =>
                        handleTask(item.id)
                      }
                    >
                      Task ▾
                    </button>

                    {openTask === item.id && (

                      <div className="due-penalty-task-menu">

                        <button
                          type="button"
                          onClick={() => {
                            onPayNow(item);
                            setOpenTask(null);
                          }}
                        >
                          <span>
                            💳
                          </span>
                          PAY NOW
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onWaiveOff(item);
                            setOpenTask(null);
                          }}
                        >
                          <span>
                            ↪
                          </span>
                          WAIVE OFF
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="due-penalty-table-footer">

        <div>

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

        <div className="due-penalty-pagination">

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

export default DuePenaltyTable;