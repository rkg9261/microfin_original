import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import { toast } from "react-toastify";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
  AddButton,
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import {
  getRelations,
  deleteRelation,
} from "../../api/relationApi";


const RelationTable = ({
  data,
  onAdd,
  onEdit,
}) => {
  const confirm = useConfirm();

  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState(5);

  const [relationList, setRelationList] = useState([]);


  // =====================================================
  // GET RELATIONS
  // =====================================================

  const fetchRelations = async () => {

    try {

      console.log("GET RELATIONS API");

      const response = await getRelations();

      console.log(
        "GET RELATIONS RESPONSE:",
        response
      );

      setRelationList(
        Array.isArray(response)
          ? response
          : []
      );

    } catch (error) {

      console.error(
        "GET RELATIONS ERROR:",
        error
      );

      toast.error(
        "Failed to load Relations."
      );

    }

  };


  // =====================================================
  // PAGE LOAD
  // =====================================================

  useEffect(() => {

    fetchRelations();

  }, []);


  // =====================================================
  // REFRESH AFTER UPDATE
  // =====================================================

  useEffect(() => {

    const handleRelationUpdated = () => {

      fetchRelations();

    };

    window.addEventListener(
      "relation-updated",
      handleRelationUpdated
    );

    return () => {

      window.removeEventListener(
        "relation-updated",
        handleRelationUpdated
      );

    };

  }, []);


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {

    if (
      !(await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this relation?",
      confirmText: "Delete",
      cancelText: "Cancel",
    }))
    ) {

      return;

    }


    try {

      console.log(
        "DELETE RELATION ID:",
        id
      );

      await deleteRelation(id);

      toast.success(
        "Relation deleted successfully!"
      );

      await fetchRelations();

    } catch (error) {

      console.error(
        "DELETE RELATION ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Failed to delete Relation."
      );

    }

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredData = useMemo(() => {

    return relationList.filter((item) => {

      const relation = String(
        item.relationName || item.relation || ""
      ).toLowerCase();

      const remark = String(item.remark || "").toLowerCase();

      const status = String(item.status ?? "").toLowerCase();

      const searchValue = search.toLowerCase();

      return (
        relation.includes(searchValue) ||
        remark.includes(searchValue) ||
        status.includes(searchValue)
      );

    });

  }, [
    relationList,
    search,
  ]);


  return (

    <div className="misc-card">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="misc-card-header">

        <h3>
          Relation Details
        </h3>

        <AddButton
          text="+"
          onClick={onAdd}
        />

      </div>


      {/* =================================================
          TOOLBAR
      ================================================= */}

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
              setSearch(e.target.value)
            }
          />

        </div>

      </div>


      {/* =================================================
          TABLE WRAPPER
          IMPORTANT FOR HORIZONTAL SCROLLBAR
      ================================================= */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th className="column-large">
                Relation
              </th>

              <th className="column-extra-large">
                Remark
              </th>

              <th className="column-medium">
                Status
              </th>

              <th className="action-column">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredData
              .slice(0, entries)
              .map((row) => (

                <tr key={row.id}>

                  {/* RELATION */}

                  <td>

                    {
                      row.relationName ||
                      row.relation ||
                      "-"
                    }

                  </td>


                  {/* REMARK */}

                  <td className="long-text">

                    {
                      row.remark ||
                      "-"
                    }

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={
                        `status ${
                          String(row.status ?? "").toUpperCase() === "ACTIVE"
                            ? "status-active"
                            : "status-inactive"
                        }`
                      }
                    >
                      {String(row.status ?? "").toUpperCase() || "-"}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="action-column">

                    <div className="action-cell">

                      <EditButton
                        text=""
                        onClick={() =>
                          onEdit(row)
                        }
                      />

                      <DeleteButton
                        text=""
                        onClick={() =>
                          handleDelete(row.id)
                        }
                      />

                    </div>

                  </td>

                </tr>

              ))}


            {/* NO RECORDS */}

            {filteredData.length === 0 && (

              <tr>

                <td
                  colSpan="4"
                  className="common-table-empty"
                >

                  No Records Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="common-table-footer">

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


        <div className="common-pagination">

          <button>
            Prev
          </button>

          <button className="active">
            1
          </button>

          <button>
            Next
          </button>

        </div>

      </div>

    </div>

  );

};


export default RelationTable;