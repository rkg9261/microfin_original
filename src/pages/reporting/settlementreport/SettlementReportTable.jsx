import React, { useMemo, useState } from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";
import "../../../components/common/Table.css";

import {
  ViewButton,
  DeleteButton,
} from "../../../components/buttons";

import {
  FaSearch,
  FaFileExcel,
} from "react-icons/fa";


const SettlementReportTable = ({
  data = [],
  onView,
  onDelete,
}) => {

  // =========================================================
  // STATE
  // =========================================================

  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState(10);


  // =========================================================
  // SEARCH
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

        item.loanId
          ?.toLowerCase()
          .includes(value)

        ||

        item.memberName
          ?.toLowerCase()
          .includes(value)

        ||

        item.alias
          ?.toLowerCase()
          .includes(value)

        ||

        item.groupName
          ?.toLowerCase()
          .includes(value)

        ||

        item.memberMobile
          ?.toLowerCase()
          .includes(value)

        ||

        item.status
          ?.toLowerCase()
          .includes(value)

      );

    });

  }, [data, search]);


  // =========================================================
  // ENTRIES
  // =========================================================

  const displayedData = filteredData.slice(
    0,
    Number(entries)
  );


  // =========================================================
  // TOTAL SETTLEMENT AMOUNT
  // =========================================================

  const totalSettlementAmount =
    filteredData.reduce(
      (total, item) =>
        total + Number(item.settlementAmount || 0),
      0
    );


  // =========================================================
  // DOWNLOAD EXCEL
  // =========================================================

  const handleDownloadExcel = () => {

    alert("Excel download will be connected with API.");

  };


  return (

    <div className="settlement-table-container">


      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="settlement-table-header">

        <h2>
          SETTLEMENT LIST
        </h2>


        <div className="settlement-table-header-right">


          {/* DOWNLOAD */}

          <button
            type="button"
            className="settlement-download-btn"
            onClick={handleDownloadExcel}
          >

            <FaFileExcel />

            DOWNLOAD EXCEL

          </button>


          {/* TOTAL */}

          <div className="settlement-total">

            SETTLEMENT AMT :

            <strong>
              ₹{" "}
              {totalSettlementAmount.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="settlement-table-toolbar">


        {/* ENTRIES */}

        <div className="settlement-entries">

          <EntriesDropdown
            value={entries}
            onChange={(value) =>
              setEntries(Number(value))
            }
          />

        </div>


        {/* SEARCH */}

        <div className="settlement-search">

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
                LOAN ID
              </th>

              <th>
                MEM NAME
              </th>

              <th>
                (C/O) ALIAS
              </th>

              <th>
                GROUP
                <br />
                NAME
              </th>

              <th>
                MEM MOB
              </th>

              <th>
                PLAN
                <br />
                AMT
              </th>

              <th>
                PAID
                <br />
                AMT
              </th>

              <th>
                DUE
                <br />
                AMT
              </th>

              <th>
                SETTLE
                <br />
                AMT
              </th>

              <th>
                SETTLE
                <br />
                DATE
              </th>

              <th>
                CREATED
                <br />
                BY
              </th>

              <th>
                PAY
                <br />
                MODE
              </th>

              <th>
                STATUS
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


                  {/* LOAN ID */}

                  <td>
                    {item.loanId}
                  </td>


                  {/* MEMBER */}

                  <td className="settlement-member-name">
                    {item.memberName}
                  </td>


                  {/* ALIAS */}

                  <td>
                    {item.alias}
                  </td>


                  {/* GROUP */}

                  <td>
                    {item.groupName}
                  </td>


                  {/* MOBILE */}

                  <td>
                    {item.memberMobile}
                  </td>


                  {/* PLAN AMOUNT */}

                  <td>
                    ₹{" "}
                    {Number(
                      item.planAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>


                  {/* PAID */}

                  <td>
                    ₹{" "}
                    {Number(
                      item.paidAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>


                  {/* DUE */}

                  <td>
                    ₹{" "}
                    {Number(
                      item.dueAmount || 0
                    ).toLocaleString("en-IN")}
                  </td>


                  {/* SETTLEMENT */}

                  <td className="settlement-bold-amount">

                    ₹{" "}
                    {Number(
                      item.settlementAmount || 0
                    ).toLocaleString("en-IN")}

                  </td>


                  {/* DATE */}

                  <td>
                    {item.settlementDate}
                  </td>


                  {/* CREATED */}

                  <td>
                    {item.createdBy}
                  </td>


                  {/* PAYMENT MODE */}

                  <td>
                    {item.payMode}
                  </td>


                  {/* STATUS */}

                  <td>

                    {/* STATUS CLASS NOT CHANGED */}

                    <span
                      className={
                        item.status === "APPROVED"
                          ? "settlement-status-approved"
                          : "settlement-status-other"
                      }
                    >
                      {item.status}
                    </span>

                  </td>


                  {/* =================================================
                      ACTION BUTTONS
                  ================================================= */}

                  <td className="action-column">

                    <div className="action-cell">


                      {/* VIEW BUTTON */}

                      <ViewButton
                        title="View"
                        onClick={() =>
                          onView(item)
                        }
                      />


                      {/* DELETE BUTTON */}

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
                  colSpan="15"
                  className="common-table-empty"
                >
                  No settlement records found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default SettlementReportTable;