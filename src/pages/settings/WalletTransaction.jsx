import React from "react";
import "./WalletTransaction.css";

const WalletTransaction = () => {

  // =====================================
  // STATIC WALLET DATA
  // =====================================

  const walletData = [
    {
      id: 1,
      api: "AADHARGENERATEOTP",
      amount: "2/-",
      balance: "1/-",
      createdAt: "2026-08-26 12:30:15",
      type: "AADHARGENERATEOTP",
      remark: "",
      status: "ACTIVE",
    },

    {
      id: 2,
      api: "AADHARVERIFYOTP",
      amount: "3/-",
      balance: "3/-",
      createdAt: "2026-08-26 11:45:20",
      type: "AADHARVERIFYOTP",
      remark: "",
      status: "ACTIVE",
    },

    {
      id: 3,
      api: "AADHARGENERATEOTP",
      amount: "2/-",
      balance: "5/-",
      createdAt: "2026-08-25 15:20:10",
      type: "AADHARGENERATEOTP",
      remark: "",
      status: "ACTIVE",
    },


  ];


  // =====================================
  // CALCULATE TOTAL REMAINING BALANCE
  // =====================================

  const totalRemainingBalance = walletData.reduce(
    (total, item) => {

      // Remove "/-" and convert to number

      const balance = parseFloat(
        item.balance.replace("/-", "")
      );

      return total + balance;

    },
    0
  );


  // =====================================
  // FORMAT TOTAL
  // =====================================

  const formattedBalance =
    `${totalRemainingBalance}/-`;


  return (
    <div className="wallet-card">


      {/* =================================
          HEADER
      ================================= */}

      <div className="wallet-header">

        <div>

          <h3>
            Wallet Transaction
          </h3>

          <p>
            Showing 1 to {walletData.length} of{" "}
            {walletData.length} entries
          </p>

        </div>


        {/* =================================
            AUTOMATIC BALANCE CALCULATOR
        ================================= */}

        <div className="wallet-balance">

          <span>
            REMAINING BALANCE
          </span>

          <strong>
            ₹{formattedBalance}
          </strong>

        </div>

      </div>


      {/* =================================
          TABLE
      ================================= */}

      <div className="wallet-table-wrapper">

        <table className="wallet-table">

          <thead>

            <tr>

              <th>
                SR.
              </th>

              <th>
                API
              </th>

              <th>
                AMT
              </th>

              <th>
                REMAINING BALANCE
              </th>

              <th>
                CREATE AT
              </th>

              <th>
                TYPE
              </th>

              <th>
                REMARK
              </th>

              <th>
                STATUS
              </th>

            </tr>

          </thead>


          <tbody>

            {walletData.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.id}
                </td>


                <td className="wallet-api">
                  {item.api}
                </td>


                <td>
                  {item.amount}
                </td>


                <td className="remaining-balance">
                  {item.balance}
                </td>


                <td>
                  {item.createdAt}
                </td>


                <td>
                  {item.type}
                </td>


                <td>
                  {item.remark || "-"}
                </td>


                <td>

                  <span className="wallet-status">
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}


            {/* =================================
                TOTAL ROW
            ================================= */}

            <tr className="wallet-total-row">

              <td
                colSpan="3"
                className="wallet-total-label"
              >
                TOTAL REMAINING BALANCE
              </td>


              <td className="wallet-total-value">

                ₹{formattedBalance}

              </td>


              <td
                colSpan="4"
              ></td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default WalletTransaction;