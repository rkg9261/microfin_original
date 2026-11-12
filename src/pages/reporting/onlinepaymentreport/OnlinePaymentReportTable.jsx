import React, { useMemo, useState } from "react";

import {
  FaSearch,
} from "react-icons/fa";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "../../../components/common/Table.css";

import {
  ViewButton,
} from "../../../components/buttons";


const OnlinePaymentReportTable = ({
  data = [],
  onView,
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

    const searchValue = search
      .toLowerCase()
      .trim();


    if (!searchValue) {

      return data;

    }


    return data.filter((item) => {

      return (

        item.name
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.email
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.mobile
          ?.toLowerCase()
          .includes(searchValue)

        ||

        String(item.amount)
          .toLowerCase()
          .includes(searchValue)

        ||

        item.orderId
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.receivedBy
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.branch
          ?.toLowerCase()
          .includes(searchValue)

        ||

        item.status
          ?.toLowerCase()
          .includes(searchValue)

      );

    });

  }, [data, search]);


  // =========================================================
  // DISPLAY DATA
  // =========================================================

  const displayedData = filteredData.slice(
    0,
    Number(entries)
  );


  // =========================================================
  // TOTAL AMOUNT
  // =========================================================

  const totalAmount = data.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );


  return (

    <div className="online-payment-report-table-card">


      {/* =====================================================
          TABLE HEADER
      ===================================================== */}

      <div className="online-payment-report-table-heading">

        <h3>
          PAYTM COLLECTION REPORT
        </h3>

      </div>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="online-payment-report-toolbar">


        {/* =================================================
            ENTRIES DROPDOWN
        ================================================= */}

        <div className="online-payment-report-entries">

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

        <div className="online-payment-report-search">

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
                EMAIL
              </th>

              <th>
                MOBILE
              </th>

              <th>
                AMOUNT
              </th>

              <th>
                ORDER ID
              </th>

              <th>
                RECEIVED
                <br />
                BY
              </th>

              <th>
                DATE
              </th>

              <th>
                BRANCH
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


                  {/* NAME */}

                  <td className="online-payment-name">

                    {item.name}

                  </td>


                  {/* EMAIL */}

                  <td className="online-payment-email">

                    {item.email}

                  </td>


                  {/* MOBILE */}

                  <td>

                    {item.mobile}

                  </td>


                  {/* AMOUNT */}

                  <td className="online-payment-amount">

                    ₹ {Number(item.amount).toLocaleString("en-IN")}

                  </td>


                  {/* ORDER ID */}

                  <td>

                    {item.orderId}

                  </td>


                  {/* RECEIVED BY */}

                  <td>

                    {item.receivedBy}

                  </td>


                  {/* DATE */}

                  <td className="online-payment-date">

                    {item.date}

                  </td>


                  {/* BRANCH */}

                  <td>

                    {item.branch}

                  </td>


                  {/* STATUS */}

                  <td>

                    {/* STATUS CLASS NOT CHANGED */}

                    <span className="online-payment-success">

                      {item.status}

                    </span>

                  </td>


                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <td className="action-column">

                    <div className="action-cell">

                      <ViewButton
                        onClick={() =>
                          onView(item)
                        }
                      />

                    </div>

                  </td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="11"
                  className="common-table-empty"
                >

                  No payment records found

                </td>

              </tr>

            )}

          </tbody>


        </table>

      </div>


      {/* =====================================================
          TOTAL
      ===================================================== */}

      <div className="online-payment-report-total">

        TOTAL AMOUNT :

        <strong>
          ₹ {totalAmount.toLocaleString("en-IN")}
        </strong>

      </div>


    </div>

  );

};


export default OnlinePaymentReportTable;