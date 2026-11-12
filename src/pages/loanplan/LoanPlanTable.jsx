import React, {
  useEffect,
  useState,
} from "react";

import "../../components/common/Table.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLoanPlans } from "../../store/slices/loanPlanSlice";


const LoanPlanTable = ({
  onEdit,
  onDelete,
  searchTerm,
}) => {
  const dispatch = useAppDispatch();
  const { items: loanPlans, loading, error } = useAppSelector(
    (state) => state.loanPlan
  );

  const [entries, setEntries] = useState(10);

  useEffect(() => {
    dispatch(fetchLoanPlans());
  }, [dispatch]);



  // SEARCH


  const filteredLoanPlans =
    loanPlans.filter((item) => {

      const search =
        (searchTerm || "")
          .trim()
          .toLowerCase();


      if (!search) {

        return true;

      }


      return (

        item.planName
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.loanType
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.recoveryType
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.status
          ?.toString()
          .toLowerCase()
          .includes(search)

        ||

        item.planAmount
          ?.toString()
          .includes(search)

      );

    });



  // LOADING


  if (loading) {

    return (

      <div
        className="loan-plan-loading"
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#666",
        }}
      >

        Loading Loan Plans...

      </div>

    );

  }



  // ERROR


  if (error) {

    return (

      <div
        style={{
          padding: "15px",
          color: "#b42318",
          background: "#fee4e2",
          border: "1px solid #fecdca",
          borderRadius: "8px",
          marginTop: "15px",
        }}
      >

        {error}

      </div>

    );

  }



  // TABLE


  return (

    <div className="table-wrapper">


      {/*ENTRIES */}
      

      <div className="table-toolbar">

        <EntriesDropdown
          value={entries}
          onChange={setEntries}
        />

      </div>


      {/*TABLE*/}
       

      <table className="common-table">

        <thead>

          <tr>

            <th>
              S.No
            </th>

            <th>
              Plan Name
            </th>

            <th>
              Loan Type
            </th>

            <th>
              Plan Amount
            </th>

            <th>
              No. Of EMI
            </th>

            <th>
              Recovery Type
            </th>

            <th>
              Status
            </th>

            <th width="170">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {filteredLoanPlans.length > 0 ? (

            filteredLoanPlans
              .slice(0, entries)
              .map((item, index) => (

                <tr
                  key={item.id}
                >

                  {/* S.NO */}

                  <td>
                    {index + 1}
                  </td>


                  {/* PLAN NAME */}

                  <td>
                    {item.planName}
                  </td>


                  {/* LOAN TYPE */}

                  <td>
                    {item.loanType}
                  </td>


                  {/* PLAN AMOUNT */}

                  <td>
                    ₹
                    {Number(
                      item.planAmount || 0
                    ).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>


                  {/* NUMBER OF EMI */}

                  <td>
                    {item.numberOfEMI ?? item.numberOfEmi}
                  </td>


                  {/* RECOVERY TYPE */}

                  <td>
                    {item.recoveryType}
                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`table-status ${
                        item.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >

                      {item.status}

                    </span>

                  </td>


                  {/* ACTION */}

                  <td>

                    <div className="table-action">

                      {/* EDIT */}

                      <EditButton
                        onClick={() =>
                          onEdit(item)
                        }
                      />


                      {/* DELETE */}

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
                colSpan="8"
                className="table-empty"
              >

                No Loan Plan Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};


export default LoanPlanTable;