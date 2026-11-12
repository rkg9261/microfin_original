import React from "react";
import "./ApiCharges.css";

const ApiCharges = () => {

  // =====================================
  // STATIC API DATA
  // =====================================

  const apiData = [
    {
      id: 1,
      api: "AADHARGENERATEOTP",
      amount: "2/-",
      remark: "",
      status: "TRUE",
    },
    {
      id: 2,
      api: "AADHARVERIFYOTP",
      amount: "3/-",
      remark: "",
      status: "TRUE",
    },

  ];


  return (
    <div className="api-charges-card">

      {/* ================================
          HEADER
      ================================= */}

      <div className="api-charges-header">

        <div>

          <h3>
            API Charges
          </h3>

          <p>
            API service charges and status
          </p>

        </div>

      </div>


      {/* ================================
          TABLE
      ================================= */}

      <div className="api-table-wrapper">

        <table className="api-table">

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
                REMARK
              </th>

              <th>
                STATUS
              </th>

            </tr>

          </thead>


          <tbody>

            {apiData.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.id}
                </td>

                <td className="api-name">
                  {item.api}
                </td>

                <td>
                  {item.amount}
                </td>

                <td>
                  {item.remark || "-"}
                </td>

                <td>

                  <span className="api-status">
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ApiCharges;