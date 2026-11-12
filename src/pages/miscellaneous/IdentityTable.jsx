import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import { toast } from "react-toastify";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown
  from "../../components/common/EntriesDropdown";

import {
  EditButton,
  AddButton,
  DeleteButton,
} from "../../components/buttons";

import {
  getIdentityProofs,
  deleteIdentityProof,
} from "../../api/identityProofApi";


const IdentityTable = ({
  data,
  onAdd,
  onEdit,
}) => {
  const confirm = useConfirm();

  const [search, setSearch] =
    useState("");


  const [entries, setEntries] =
    useState(5);


  const [identityData, setIdentityData] =
    useState([]);


  
  // GET API
  

  const getIdentityData = async () => {

    try {

      console.log(
        "GET IDENTITY PROOF API"
      );


      const response =
        await getIdentityProofs();


      console.log(
        "GET IDENTITY PROOF RESPONSE:",
        response
      );


      if (Array.isArray(response)) {

        setIdentityData(response);

      }

    } catch (error) {

      console.error(
        "GET IDENTITY PROOF ERROR:",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Failed to load Identity Proof."
      );

    }

  };


  
  // GET API WHEN TABLE LOADS
  

  useEffect(() => {

    getIdentityData();

  }, []);


  
  // UPDATE TABLE IF PARENT DATA CHANGES
  

  useEffect(() => {

    if (
      Array.isArray(data) &&
      data.length > 0
    ) {

      setIdentityData(data);

    }

  }, [data]);


  
  // DELETE API
  

  const handleDelete = async (id) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this identity proof?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {

      return;

    }


    try {

      console.log(
        "DELETE IDENTITY PROOF ID:",
        id
      );


      await deleteIdentityProof(id);


      // Remove row from table

      setIdentityData((prev) =>

        prev.filter(
          (item) =>
            item.id !== id
        )

      );


      toast.success(
        "Identity Proof deleted successfully!"
      );


    } catch (error) {

      console.error(
        "DELETE IDENTITY PROOF ERROR:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        error.response?.data?.title ||

        "Failed to delete Identity Proof."

      );

    }

  };


  
  // SEARCH
  

  const filteredData = useMemo(() => {

    const value =
      search.toLowerCase();


    return identityData.filter(
      (item) =>
        String(item.identity || "")
          .toLowerCase()
          .includes(value) ||
        String(item.status ?? "")
          .toLowerCase()
          .includes(value)
    );

  }, [
    identityData,
    search,
  ]);


  return (

    <div className="misc-card">

      {/* ================= Header ================= */}

      <div className="misc-card-header">

        <h3>

          Identity Proof Details List

        </h3>


        <AddButton

          text="+"

          onClick={onAdd}

        />

      </div>


      {/* ================= Toolbar ================= */}

      <div className="table-toolbar">

        <EntriesDropdown

          value={entries}

          onChange={setEntries}

        />


        <div className="table-search">

          <input

            type="text"

            placeholder="Search Table"

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

          />

        </div>

      </div>


      {/* ================= Table ================= */}

      <table className="common-table">

        <thead>

          <tr>

            <th>

              Identity

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

          {

            filteredData

              .slice(0, entries)

              .map((row) => (

                <tr
                  key={row.id}
                >

                  <td>

                    {row.identity}

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

                      <EditButton

                        text=""

                        onClick={() =>
                          onEdit(row)
                        }

                      />


                      <DeleteButton

                        text=""

                        onClick={() =>
                          handleDelete(
                            row.id
                          )
                        }

                      />

                    </div>

                  </td>

                </tr>

              ))

          }


          {

            filteredData.length === 0 && (

              <tr>

                <td

                  colSpan="3"

                  style={{

                    textAlign:
                      "center",

                    padding:
                      "20px",

                  }}

                >

                  No Records Found

                </td>

              </tr>

            )

          }

        </tbody>

      </table>


      {/* ================= Footer ================= */}

      <div className="table-footer">

        <span>

          Showing 1 to{" "}

          {
            Math.min(
              entries,
              filteredData.length
            )
          }{" "}

          of {filteredData.length}

        </span>


        <div className="pagination">

          <button className="page-btn">

            Prev

          </button>


          <button className="page-btn active">

            1

          </button>


          <button className="page-btn">

            Next

          </button>

        </div>

      </div>

    </div>

  );

};


export default IdentityTable;