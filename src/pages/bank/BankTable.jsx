import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";
import {
  fetchBanks,
  deleteBankMaster,
} from "../../store/slices/bankSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import { toast } from "react-toastify";
import EntriesDropdown
  from "../../components/common/EntriesDropdown";


const BankTable = ({
  data,
  onEdit,
  onDelete,
}) => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { items: bankData } = useAppSelector((state) => state.bank);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);


 
  // DELETE BANK MASTER
 

  const handleDelete = async (
    id
  ) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this bank?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {

      return;

    }


    try {

      console.log(
        "DELETE BANK MASTER ID:",
        id
      );


      await dispatch(deleteBankMaster(id)).unwrap();

      toast.success("Bank Deleted Successfully");




      if (onDelete) {

        onDelete(id);

      }


    } catch (error) {

      console.error(
        "DELETE BANK MASTER ERROR:"
      );

      console.error(
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

        "Failed to delete Bank Master."

      );

    }

  };


 
  // SEARCH
 

  const filteredData =
    useMemo(() => {

      return bankData.filter(
        (item) => {

          const value =
            search.toLowerCase();


          return (

            (item.name || "")
              .toLowerCase()
              .includes(value)

            ||

            (item.shortName || "")
              .toLowerCase()
              .includes(value)

            ||

            (item.status || "")
              .toLowerCase()
              .includes(value)

          );

        }

      );

    }, [

      bankData,

      search,

    ]);


  return (

    <>


      {/* ================= Search ================= */}

      <div className="common-search">

        <input

          type="text"

          placeholder="Search Bank..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

        />

      </div>


      <div className="table-card">


        {/* ================= Entries ================= */}

        <EntriesDropdown

          value={entries}

          onChange={setEntries}

        />


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
                SHORT NAME
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


            {filteredData

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

                      {row.shortName}

                    </td>


                    <td>

                      <span

                        className={

                          row.status
                            ?.toUpperCase() ===
                          "ACTIVE"

                            ? "status-active"

                            : "status-inactive"

                        }

                      >

                        {
                          row.status
                            ?.toUpperCase()
                        }

                      </span>

                    </td>


                    <td>

                      <div className="table-action">


                        {/* ================= EDIT ================= */}

                        <EditButton

                          text="Edit"

                          onClick={() =>
                            onEdit(row)
                          }

                        />


                        {/* ================= DELETE ================= */}

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

              )}


            {filteredData.length ===
              0 && (

                <tr>

                  <td

                    colSpan="5"

                    style={{

                      textAlign:
                        "center",

                      padding:
                        "25px",

                    }}

                  >

                    No Bank Found

                  </td>

                </tr>

              )}


          </tbody>


        </table>


      </div>

    </>

  );

};


export default BankTable;