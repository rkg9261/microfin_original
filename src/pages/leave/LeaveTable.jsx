import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown
  from "../../components/common/EntriesDropdown";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import {
  getLeaveMasters,
  deleteLeaveMaster,
} from "../../api/leaveApi";

import { toast } from "react-toastify";


const LeaveTable = ({
  refreshKey = 0,
  onEdit,
  onDelete,
}) => {
  const confirm = useConfirm();

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [leaveData, setLeaveData] = useState([]);

  const getLeaves = async () => {
    try {
      const response = await getLeaveMasters();
      if (Array.isArray(response)) {
        setLeaveData(response);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to load Leave Master."
      );
    }
  };

  useEffect(() => {
    getLeaves();
  }, [refreshKey]);


 
  // DELETE LEAVE MASTER
 

  const handleDelete = async (id) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this leave?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {

      return;

    }


    try {

      console.log(
        "DELETE LEAVE MASTER ID:",
        id
      );


      await deleteLeaveMaster(id);


      console.log(
        "DELETE LEAVE MASTER SUCCESS"
      );


   
      // REMOVE FROM TABLE
   

      setLeaveData((prev) =>

        prev.filter(
          (item) =>
            item.id !== id
        )

      );

   

      if (onDelete) {

        onDelete(id);

      }


      toast.success(
        "Leave Master deleted successfully."
      );


    } catch (error) {

      console.error(
        "DELETE LEAVE MASTER ERROR:",
        error
      );


      console.error(
        "STATUS:",
        error.response?.status
      );


      console.error(
        "ERROR DATA:",
        error.response?.data
      );


      toast.error(

        error.response?.data?.message ||

        error.response?.data?.title ||

        "Failed to delete Leave Master."

      );

    }

  };


 
  // SEARCH
 

  const filteredData =
    useMemo(() => {

      const value =
        search.toLowerCase();


      return leaveData.filter(
        (item) =>
          String(item.name || "")
            .toLowerCase()
            .includes(value) ||
          String(item.status ?? "")
            .toLowerCase()
            .includes(value)
      );

    }, [
      leaveData,
      search,
    ]);


 
  // TABLE
 

  return (

    <>

      {/* ================= Search ================= */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Leave..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      <div className="table-card">

        {/* ================= Toolbar ================= */}

        <div className="table-toolbar">

          <EntriesDropdown
            value={entries}
            onChange={setEntries}
          />

        </div>


        {/* ================= Table ================= */}

        <table className="common-table">

          <thead>

            <tr>

              <th>
                SR. NO.
              </th>

              <th>
                NAME
              </th>

              <th>
                STATUS
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>


          <tbody>

            {

              filteredData

                .slice(
                  0,
                  entries
                )

                .map(
                  (row, index) => (

                    <tr
                      key={row.id}
                    >

                      <td>

                        {index + 1}

                      </td>


                      <td>

                        {row.name}

                      </td>


                      <td>

                        <span
                          className={
                            String(row.status ?? "").toUpperCase() === "ACTIVE"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {String(row.status ?? "").toUpperCase() || "-"}
                        </span>

                      </td>


                      <td>

                        <div className="table-action">

                          {/* ================= Edit ================= */}

                          <EditButton
                            text="Edit"
                            onClick={() =>
                              onEdit(row)
                            }
                          />


                          {/* ================= Delete ================= */}

                          <DeleteButton
                            text="Delete"
                            onClick={() =>
                              handleDelete(
                                row.id
                              )
                            }
                          />

                        </div>

                      </td>

                    </tr>

                  )
                )

            }


            {/* ================= No Data ================= */}

            {

              filteredData.length ===
              0 && (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "25px",
                    }}
                  >

                    No Leave Found

                  </td>

                </tr>

              )

            }

          </tbody>

        </table>

      </div>

    </>

  );

};


export default LeaveTable;