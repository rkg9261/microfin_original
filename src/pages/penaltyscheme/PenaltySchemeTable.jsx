import React, {
  useEffect,
  useState,
} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import EntriesDropdown
  from "../../components/common/EntriesDropdown";

import {
  getPenaltySchemes,
  deletePenaltyScheme,
} from "../../api/penaltySchemeApi";

import { useConfirm } from "../../components/common/ConfirmModal";
import { toast } from "react-toastify";


const PenaltySchemeTable = ({
  onEdit,
  refresh,
}) => {
  const confirm = useConfirm();

 
  // DATA
 

  const [data, setData] =  useState([]);

  // LOADING
 

  const [loading, setLoading] =  useState(false);

  // ERROR
 

  const [error, setError] =  useState("");

  // ENTRIES
 

  const [entries, setEntries] = useState(10);
   


 
  // GET DATA
 

  const fetchPenaltySchemes =
    async () => {

      try {

        setLoading(true);

        setError("");


        console.log(
          "GET /PenaltySchemes"
        );


        const result =
          await getPenaltySchemes();


        console.log(
          "GET RESPONSE:",
          result
        );


        let apiData = [];


        // Array response

        if (
          Array.isArray(result)
        ) {

          apiData = result;

        }


       

        else if (
          Array.isArray(result?.data)
        ) {

          apiData =
            result.data;

        }


       

        else if (
          Array.isArray(result?.result)
        ) {

          apiData =
            result.result;

        }


      

        else if (
          Array.isArray(result?.$values)
        ) {

          apiData =
            result.$values;

        }


      
        // FORMAT
      

        const formattedData =
          apiData.map(
            (item, index) => ({

              id:
                item.penaltySchemeId ??
                item.PenaltySchemeId ??
                index + 1,

              penaltySchemeId:
                item.penaltySchemeId ??
                item.PenaltySchemeId ??
                index + 1,

              schemeName:
                item.schemeName ??
                item.penaltySchemeName ??
                item.SchemeName ??
                "",

              penaltyType:
                item.penaltyType ??
                item.PenaltyType ??
                "",

              amount:
                item.amount ??
                item.amountPercentage ??
                item.Amount ??
                0,

              minimumAmount:
                item.minimumAmount ??
                item.minimumDueAmount ??
                item.MinimumAmount ??
                0,

              gracePeriod:
                item.gracePeriod ??
                item.gracePeriodDays ??
                item.GracePeriod ??
                0,

              penaltyMode:
                item.penaltyMode ??
                item.PenaltyMode ??
                "",

              recurring:
                item.recurring ??
                item.Recurring ??
                "",

              status:
                item.status ??
                item.Status ??
                "",

              createdBy:
                item.createdBy ??
                item.CreatedBy ??
                0,

              createdDate:
                item.createdDate ??
                item.CreatedDate ??
                null,

              modifiedBy:
                item.modifiedBy ??
                item.ModifiedBy ??
                null,

              modifiedDate:
                item.modifiedDate ??
                item.ModifiedDate ??
                null,

            })
          );


        console.log(
          "FORMATTED DATA:",
          formattedData
        );


        setData(
          formattedData
        );

      }

      catch (error) {

        console.error(
          "GET PENALTY SCHEME ERROR:",
          error
        );


        console.error(
          "STATUS:",
          error.response?.status
        );


        console.error(
          "RESPONSE:",
          error.response?.data
        );


        setError(

          error.response?.data?.message ||

          error.response?.data?.title ||

          error.message ||

          "Failed to load penalty schemes."

        );

      }

      finally {

        setLoading(false);

      }

    };


 
  // LOAD
 

  useEffect(() => {

    fetchPenaltySchemes();

  }, [refresh]);


 
  // EDIT
 

  const handleEdit = (item) => {

    console.log(
      "EDIT PENALTY SCHEME:",
      item
    );


    onEdit(item);

  };


 
  // DELETE
 

  const handleDelete = async (
    penaltySchemeId
  ) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this penalty scheme?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {

      return;

    }


    try {

      setLoading(true);


      console.log(
        "DELETE ID:",
        penaltySchemeId
      );


      await deletePenaltyScheme(
        penaltySchemeId
      );


      toast.success(
        "Penalty Scheme deleted successfully!"
      );


      // GET AGAIN

      await fetchPenaltySchemes();

    }

    catch (error) {

      console.error(
        "DELETE ERROR:",
        error
      );


      alert(
        error.response?.status === 405
          ? "Unable to delete penalty scheme (method not allowed)."
          : error.response?.data?.message ||
            error.response?.data?.title ||
            error.message ||
            "Failed to delete penalty scheme."
      );

    }

    finally {

      setLoading(false);

    }

  };


 
  // JSX
 

  return (

    <div className="table-wrapper">

      <EntriesDropdown
        value={entries}
        onChange={setEntries}
      />


      {error && (

        <div
          style={{
            padding: "12px",
            marginBottom: "15px",
            color: "#b42318",
            background: "#fee4e2",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>

      )}


      {loading ? (

        <div
          style={{
            padding: "30px",
            textAlign: "center",
          }}
        >
          Loading Penalty Schemes...
        </div>

      ) : (

        <table className="common-table">

          <thead>

            <tr>

              <th>
                Sr. No.
              </th>

              <th>
                Penalty Scheme
              </th>

              <th>
                Type
              </th>

              <th>
                Amount / Percentage
              </th>

              <th>
                Minimum Amount
              </th>

              <th>
                Grace Period
              </th>

              <th>
                Penalty Mode
              </th>

              <th>
                Recurring
              </th>

              <th>
                Created At
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {data.length > 0 ? (

              data
                .slice(0, Number(entries))
                .map((item, index) => (

                  <tr
                    key={
                      item.penaltySchemeId
                    }
                  >

                    <td>
                      {index + 1}
                    </td>


                    <td>
                      {item.schemeName || "-"}
                    </td>


                    <td>
                      {item.penaltyType || "-"}
                    </td>


                    <td>
                      {item.amount !== null &&
                      item.amount !== undefined
                        ? `₹${item.amount}`
                        : "-"}
                    </td>


                    <td>
                      {item.minimumAmount !== null &&
                      item.minimumAmount !== undefined
                        ? `₹${item.minimumAmount}`
                        : "-"}
                    </td>


                    <td>
                      {item.gracePeriod ?? "-"} Days
                    </td>


                    <td>
                      {item.penaltyMode || "-"}
                    </td>


                    <td>
                      {item.recurring || "-"}
                    </td>


                    <td>
                      {item.createdDate
                        ? new Date(
                            item.createdDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>


                    <td>

                      <span
                        className={`table-status ${
                          String(
                            item.status
                          ).toUpperCase() ===
                          "ACTIVE"
                            ? "active"
                            : "inactive"
                        }`}
                      >

                        {item.status || "-"}

                      </span>

                    </td>


                    <td>

                      <div className="table-action">

                        <EditButton
                          text="Edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        />


                        <DeleteButton
                          text="Delete"
                          onClick={() =>
                            handleDelete(
                              item.penaltySchemeId
                            )
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
                  className="table-empty"
                >
                  No Penalty Scheme Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      )}

    </div>

  );

};


export default PenaltySchemeTable;