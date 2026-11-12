import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown  from "../../components/common/EntriesDropdown";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteState, fetchStates } from "../../store/slices/stateSlice";
import { swaggerActions } from "../../store/swaggerSlices";


// STATE TABLE


const StateTable = ({ onEdit }) => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { items: states, loading, error } = useAppSelector(
    (state) => state.stateMaster
  );
  const { items: countries } = useAppSelector(
    (state) => state.country || { items: [] }
  );

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  useEffect(() => {
    dispatch(fetchStates());
    if (swaggerActions.country?.fetchAll) {
      dispatch(swaggerActions.country.fetchAll());
    }
  }, [dispatch]);

  const countryNameById = useMemo(() => {
    const map = {};
    (countries || []).forEach((country) => {
      const id = country.countryId ?? country.id;
      if (id != null) {
        map[id] = country.countryName || country.name;
      }
    });
    return map;
  }, [countries]);

  const getCountryName = (row) =>
    row.countryName ||
    row.country?.countryName ||
    countryNameById[row.countryId] ||
    "-";

  const handleDelete = async (stateId) => {
    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this state?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteState(stateId)).unwrap();
      toast.success("State deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete state.");
    }
  };

   // SEARCH FILTER
 
  const filteredData = useMemo(() => {

    const value =
      search
        .trim()
        .toLowerCase();


    // NO SEARCH

    if (!value) {

      return states;

    }


    // FILTER

    return states.filter((item) => {

      const stateName =
        item.stateName
          ?.toString()
          .toLowerCase() || "";


      const stateCode =
        item.stateCode
          ?.toString()
          .toLowerCase() || "";

      const countryName = getCountryName(item).toString().toLowerCase();

      const status =
        item.isActive
          ? "active"
          : "inactive";


      return (

        stateName.includes(value) ||

        stateCode.includes(value) ||

        countryName.includes(value) ||

        status.includes(value)

      );

    });

  }, [states, search, countryNameById]);


 
  return (

    <>

      {/* ====================================================
          SEARCH
      ==================================================== */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search States..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && (

        <div
          style={{
            padding: "12px 15px",
            marginBottom: "15px",
            color: "#b42318",
            background: "#fee4e2",
            border: "1px solid #fecdca",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >

          {error}

        </div>

      )}


      {/* ====================================================
          TABLE CARD
      ==================================================== */}

      <div className="table-card">


        {/* ==================================================
            ENTRIES
        ================================================== */}

        <EntriesDropdown
          value={entries}
          onChange={setEntries}
        />


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >

            Loading States...

          </div>

        ) : (

          <table className="common-table">


            {/* =================================================
                HEADER
            ================================================= */}

            <thead>

              <tr>

                <th>
                  SR. NO.
                </th>

                <th>
                  STATE NAME
                </th>

                <th>
                  STATE CODE
                </th>

                <th>
                  COUNTRY
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            {/* =================================================
                BODY
            ================================================= */}

            <tbody>

              {filteredData
                .slice(
                  0,
                  Number(entries)
                )
                .map((row, index) => (

                  <tr
                    key={
                      row.stateId ??
                      row.id ??
                      index
                    }
                  >

                    {/* SR NO */}

                    <td>

                      {index + 1}

                    </td>


                    {/* STATE NAME */}

                    <td>

                      {row.stateName}

                    </td>


                    {/* STATE CODE */}

                    <td>

                      {row.stateCode}

                    </td>


                    {/* COUNTRY */}

                    <td>

                      {getCountryName(row)}

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          row.isActive
                            ? "status-active"
                            : "status-inactive"
                        }
                      >

                        {row.isActive
                          ? "ACTIVE"
                          : "INACTIVE"}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="table-action">

                        <EditButton
                          text="Edit"
                          onClick={() =>
                            onEdit(row)
                          }
                        />


                        <DeleteButton
                          text="Delete"
                          onClick={() =>
                            handleDelete(
                              row.stateId
                            )
                          }
                        />

                      </div>

                    </td>

                  </tr>

                ))}


              {/* =================================================
                  NO DATA
              ================================================= */}

              {filteredData.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                      fontSize: "14px",
                      color: "#777",
                    }}
                  >

                    No State Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

    </>

  );

};


export default StateTable;