import { useConfirm } from "../../components/common/ConfirmModal";
import React, {
  useState,
} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";

import EntriesDropdown
  from "../../components/common/EntriesDropdown";


const BranchesTable = ({
  data = [],
  search = "",
  onEdit,
  onDelete,
}) => {
  const confirm = useConfirm();




  // ENTRIES


  const [
    entries,
    setEntries,
  ] = useState(10);



  // SEARCH


  const searchText =
    String(search)
      .trim()
      .toLowerCase();


  const filteredBranches =
    data.filter((item) => {


      const branchName =
        String(
          item.branchName || ""
        ).toLowerCase();


      const branchCode =
        String(
          item.branchCode ||
          item.code ||
          ""
        ).toLowerCase();


      const city =
        String(
          item.city || ""
        ).toLowerCase();


      const phone =
        String(
          item.contactNumber ||
          item.phone ||
          ""
        ).toLowerCase();


      const stateName =
        String(
          item.stateName ||
          item.state?.stateName ||
          ""
        ).toLowerCase();


      const districtName =
        String(
          item.districtName ||
          item.district?.districtName ||
          ""
        ).toLowerCase();


      // No search

      if (!searchText) {

        return true;

      }


      return (

        branchName.includes(
          searchText
        )

        ||

        branchCode.includes(
          searchText
        )

        ||

        city.includes(
          searchText
        )

        ||

        phone.includes(
          searchText
        )

        ||

        stateName.includes(
          searchText
        )

        ||

        districtName.includes(
          searchText
        )

      );

    });



  // DATE FORMAT


  const formatDate = (date) => {

    if (!date) {

      return "-";

    }


    const parsedDate =
      new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return date;

    }


    return parsedDate.toLocaleDateString(
      "en-IN"
    );

  };



  // DELETE


  const handleDelete = async (item) => {

    const branchId =
      item.branchId ??
      item.id;


    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: `Are you sure you want to delete "${item.branchName}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {

      return;

    }


 

    if (onDelete) {

      onDelete(item);

    }

  };



  // EDIT


  const handleEdit = (item) => {

    console.log(
      "EDIT BRANCH:",
      item
    );



    if (onEdit) {

      onEdit(item);

    }

  };



  // TABLE


  return (

    <div className="table-wrapper">


      {/* ====================================================
          ENTRIES
      ==================================================== */}

      <EntriesDropdown

        value={entries}

        onChange={setEntries}

      />


      {/* ====================================================
          TABLE
      ==================================================== */}

      <table className="common-table">


        {/* ==================================================
            HEADER
        ================================================== */}

        <thead>

          <tr>

            <th>
              Sr. No.
            </th>

            <th>
              Branch Name
            </th>

            <th>
              Code
            </th>

            <th>
              Phone
            </th>

            <th>
              City
            </th>

            <th>
              State
            </th>

            <th>
              District
            </th>

            <th>
              Opening Date
            </th>

            <th>
              Status
            </th>

            <th width="170">
              Action
            </th>

          </tr>

        </thead>


        {/* ==================================================
            BODY
        ================================================== */}

        <tbody>

          {filteredBranches.length > 0 ? (

            filteredBranches

              .slice(
                0,
                Number(entries)
              )

              .map(
                (item, index) => {


                  const branchId =
                    item.branchId ??
                    item.id;


                  // =========================================
                  // STATE NAME
                  // =========================================

                  const stateName =
                    item.stateName ||
                    item.state?.stateName ||
                    "-";


                  // =========================================
                  // DISTRICT NAME
                  // =========================================

                  const districtName =
                    item.districtName ||
                    item.district?.districtName ||
                    "-";


                  // =========================================
                  // STATUS
                  // =========================================

                  const isActive =
                    item.isActive === true ||
                    String(
                      item.status || ""
                    ).toUpperCase() ===
                    "ACTIVE";


                  return (

                    <tr
                      key={
                        branchId ??
                        index
                      }
                    >


                      {/* SR NO */}

                      <td>
                        {index + 1}
                      </td>


                      {/* BRANCH NAME */}

                      <td>
                        {item.branchName ||
                          "-"}
                      </td>


                      {/* CODE */}

                      <td>
                        {item.branchCode ||
                          item.code ||
                          "-"}
                      </td>


                      {/* PHONE */}

                      <td>
                        {item.contactNumber ||
                          item.phone ||
                          "-"}
                      </td>


                      {/* CITY */}

                      <td>
                        {item.city ||
                          "-"}
                      </td>


                      {/* STATE */}

                      <td>
                        {stateName}
                      </td>


                      {/* DISTRICT */}

                      <td>
                        {districtName}
                      </td>


                      {/* OPENING DATE */}

                      <td>
                        {formatDate(
                          item.openingDate
                        )}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`table-status ${
                            isActive
                              ? "active"
                              : "inactive"
                          }`}
                        >

                          {isActive
                            ? "ACTIVE"
                            : "INACTIVE"}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div className="table-action">


                          {/* EDIT */}

                          <EditButton
                            onClick={() =>
                              handleEdit(item)
                            }
                          />


                          {/* DELETE */}

                          <DeleteButton
                            onClick={() =>
                              handleDelete(item)
                            }
                          />


                        </div>

                      </td>

                    </tr>

                  );

                }

              )

          ) : (

            <tr>

              <td
                colSpan="10"
                className="table-empty"
              >

                No Branch Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};


export default BranchesTable;