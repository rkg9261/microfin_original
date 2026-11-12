import React, {
  useMemo,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown
  from "../../components/common/EntriesDropdown";

import {
  AddButton,
  EditButton,
  DeleteButton,
} from "../../components/buttons";

const PurposeTable = ({
  data,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const confirm = useConfirm();

  const [search, setSearch] = useState("");

  const [entries, setEntries] = useState(5);

  const purposeList = data || [];

  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Purpose?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    if (onDelete) {
      onDelete(id);
    }
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredData = useMemo(() => {

    return purposeList.filter((item) => {

      const purpose =
        String(
          item.purpose || ""
        ).toLowerCase();

      const status =
        String(
          item.status || ""
        ).toLowerCase();

      const searchValue =
        search.toLowerCase();

      return (
        purpose.includes(searchValue) ||
        status.includes(searchValue)
      );

    });

  }, [
    purposeList,
    search,
  ]);


  return (

    <div className="misc-card">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="misc-card-header">

        <h3>
          Purpose Details
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
      ================================================= */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th className="column-large">
                Purpose
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

                  <tr
                    key={row.id}
                  >

                    {/* PURPOSE */}

                    <td>

                      {row.purpose || "-"}

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
                            handleDelete(
                              row.id
                            )
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
                    colSpan="3"
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


export default PurposeTable;