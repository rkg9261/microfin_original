import React, { useMemo } from "react";

import "./CashBook.css";

const CashBookTable = ({ filters }) => {

  // =========================================================
  // CASH RECORDS
  // =========================================================

  const cashRecords = [
    {
      id: 1,
      date: "2026-08-13",
      type: "DEBIT",
      particulars: "LOAN DISBURSEMENT",
      amount: 25000,
    },

    {
      id: 2,
      date: "2026-08-13",
      type: "DEBIT",
      particulars: "OFFICE EXPENSE",
      amount: 1500,
    },

    {
      id: 3,
      date: "2026-08-13",
      type: "CREDIT",
      particulars: "EMI COLLECTION",
      amount: 4500,
    },

    {
      id: 4,
      date: "2026-08-13",
      type: "CREDIT",
      particulars: "MEMBER PAYMENT",
      amount: 3200,
    },

    {
      id: 5,
      date: "2026-08-13",
      type: "CREDIT",
      particulars: "PENALTY COLLECTION",
      amount: 800,
    },
  ];


  // =========================================================
  // BANK RECORDS
  // =========================================================

  const bankRecords = [
    {
      id: 1,
      date: "2026-08-13",
      type: "DEBIT",
      particulars: "BANK LOAN DISBURSEMENT",
      amount: 30000,
    },

    {
      id: 2,
      date: "2026-08-13",
      type: "DEBIT",
      particulars: "BANK CHARGES",
      amount: 500,
    },


  ];


  // =========================================================
  // DATE FILTER
  // =========================================================

  const selectedDate = filters?.date
    ? filters.date.split("-").reverse().join("-")
    : "2026-08-13";


  const filteredCashRecords = useMemo(() => {

    return cashRecords.filter(
      (item) =>
        item.date === selectedDate
    );

  }, [selectedDate]);


  const filteredBankRecords = useMemo(() => {

    return bankRecords.filter(
      (item) =>
        item.date === selectedDate
    );

  }, [selectedDate]);


  // =========================================================
  // CASH DEBIT
  // =========================================================

  const cashDebit = filteredCashRecords
    .filter(
      (item) => item.type === "DEBIT"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );


  // =========================================================
  // CASH CREDIT
  // =========================================================

  const cashCredit = filteredCashRecords
    .filter(
      (item) => item.type === "CREDIT"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );


  // =========================================================
  // BANK DEBIT
  // =========================================================

  const bankDebit = filteredBankRecords
    .filter(
      (item) => item.type === "DEBIT"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );


  // =========================================================
  // BANK CREDIT
  // =========================================================

  const bankCredit = filteredBankRecords
    .filter(
      (item) => item.type === "CREDIT"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );


  // =========================================================
  // FORMAT MONEY
  // =========================================================

  const formatAmount = (amount) => {

    if (!amount) {
      return "0";
    }

    return amount.toLocaleString(
      "en-IN"
    );

  };


  // =========================================================
  // CLOSING BALANCE
  // =========================================================

  const cashClosing =
    cashCredit - cashDebit;


  const bankClosing =
    bankCredit - bankDebit;


  return (

    <div className="cashbook-records-container">


      {/* =====================================================
          CASH RECORDS
      ===================================================== */}

      <div className="cashbook-record-card">

        <table className="cashbook-record-table">

          <thead>

            {/* TOP HEADER */}

            <tr>

              <th
                colSpan="2"
                className="cashbook-main-heading"
              >
                CASH RECORDS
              </th>

              <th
                colSpan="2"
                className="cashbook-date-heading"
              >
                DATE - {selectedDate}
              </th>

            </tr>


            {/* DEBIT / CREDIT */}

            <tr>

              <th
                colSpan="2"
                className="cashbook-side-heading"
              >
                DEBIT
              </th>

              <th
                colSpan="2"
                className="cashbook-side-heading"
              >
                CREDIT
              </th>

            </tr>


            {/* PARTICULARS */}

            <tr>

              <th>
                PARTICULARS
              </th>

              <th className="cashbook-amount-header">
                DR
              </th>

              <th>
                PARTICULARS
              </th>

              <th className="cashbook-amount-header">
                CR
              </th>

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>

                {filteredCashRecords
                  .filter(
                    (item) =>
                      item.type === "DEBIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-particular"
                      key={item.id}
                    >
                      {item.particulars}
                    </div>
                  ))}

              </td>


              <td className="cashbook-dr-column">

                {filteredCashRecords
                  .filter(
                    (item) =>
                      item.type === "DEBIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-amount"
                      key={item.id}
                    >
                      ₹{formatAmount(item.amount)}
                    </div>
                  ))}

              </td>


              <td>

                {filteredCashRecords
                  .filter(
                    (item) =>
                      item.type === "CREDIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-particular"
                      key={item.id}
                    >
                      {item.particulars}
                    </div>
                  ))}

              </td>


              <td className="cashbook-cr-column">

                {filteredCashRecords
                  .filter(
                    (item) =>
                      item.type === "CREDIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-amount"
                      key={item.id}
                    >
                      ₹{formatAmount(item.amount)}
                    </div>
                  ))}

              </td>

            </tr>


            {/* TOTAL */}

            <tr>

              <td className="cashbook-total-label">
                TOTAL
              </td>

              <td className="cashbook-total-value">
                ₹{formatAmount(cashDebit)}
              </td>

              <td className="cashbook-total-label">
                TOTAL
              </td>

              <td className="cashbook-total-value">
                ₹{formatAmount(cashCredit)}
              </td>

            </tr>


            {/* CLOSING BALANCE */}

            <tr>

              <td
                colSpan="4"
                className="cashbook-closing"
              >
                CLOSING BALANCE{" "}
                ₹{formatAmount(cashClosing)} (0)
              </td>

            </tr>

          </tbody>

        </table>

      </div>


      {/* =====================================================
          BANK RECORDS
      ===================================================== */}

      <div className="cashbook-record-card">

        <table className="cashbook-record-table">

          <thead>

            {/* TOP HEADER */}

            <tr>

              <th
                colSpan="2"
                className="cashbook-main-heading"
              >
                BANK RECORDS
              </th>

              <th
                colSpan="2"
                className="cashbook-date-heading"
              >
                DATE - {selectedDate}
              </th>

            </tr>


            {/* DEBIT / CREDIT */}

            <tr>

              <th
                colSpan="2"
                className="cashbook-side-heading"
              >
                DEBIT
              </th>

              <th
                colSpan="2"
                className="cashbook-side-heading"
              >
                CREDIT
              </th>

            </tr>


            {/* PARTICULARS */}

            <tr>

              <th>
                PARTICULARS
              </th>

              <th className="cashbook-amount-header">
                DR
              </th>

              <th>
                PARTICULARS
              </th>

              <th className="cashbook-amount-header">
                CR
              </th>

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>

                {filteredBankRecords
                  .filter(
                    (item) =>
                      item.type === "DEBIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-particular"
                      key={item.id}
                    >
                      {item.particulars}
                    </div>
                  ))}

              </td>


              <td className="cashbook-dr-column">

                {filteredBankRecords
                  .filter(
                    (item) =>
                      item.type === "DEBIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-amount"
                      key={item.id}
                    >
                      ₹{formatAmount(item.amount)}
                    </div>
                  ))}

              </td>


              <td>

                {filteredBankRecords
                  .filter(
                    (item) =>
                      item.type === "CREDIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-particular"
                      key={item.id}
                    >
                      {item.particulars}
                    </div>
                  ))}

              </td>


              <td className="cashbook-cr-column">

                {filteredBankRecords
                  .filter(
                    (item) =>
                      item.type === "CREDIT"
                  )
                  .map((item) => (
                    <div
                      className="cashbook-amount"
                      key={item.id}
                    >
                      ₹{formatAmount(item.amount)}
                    </div>
                  ))}

              </td>

            </tr>


            {/* TOTAL */}

            <tr>

              <td className="cashbook-total-label">
                TOTAL
              </td>

              <td className="cashbook-total-value">
                ₹{formatAmount(bankDebit)}
              </td>

              <td className="cashbook-total-label">
                TOTAL
              </td>

              <td className="cashbook-total-value">
                ₹{formatAmount(bankCredit)}
              </td>

            </tr>


            {/* CLOSING BALANCE */}

            <tr>

              <td
                colSpan="4"
                className="cashbook-closing"
              >
                CLOSING BALANCE{" "}
                ₹{formatAmount(bankClosing)} (0)
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CashBookTable;