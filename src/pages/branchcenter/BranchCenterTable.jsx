import React, {useState} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";
import EntriesDropdown from "../../components/common/EntriesDropdown";

const BranchCenterTable = ({ data, onEdit, onDelete }) => {
   const [entries, setEntries] = useState(10);

  return (

    <div className="table-wrapper">

             {/* Entry list dropdown */}
      <EntriesDropdown value={entries} onChange={setEntries}/>

      <table className="common-table">

        <thead>

          <tr>

            <th>SR. NO.</th>

            <th>CODE</th>

            <th>NAME</th>

            <th>BRANCH</th>

            <th>STATUS</th>

            <th width="170">
              ACTION
            </th>

          </tr>

        </thead>

        <tbody>

          {data.length > 0 ? (

            data.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.code}</td>

                <td>{item.name}</td>

                <td>{item.branch}</td>

                <td>

                  <span
                    className={`table-status ${
                      item.status === "ACTIVE"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="table-action">

                    <EditButton
                      onClick={() => onEdit?.(item)}
                    />

                    <DeleteButton
                      onClick={() => onDelete?.(item.id)}
                    />

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="table-empty"
              >
                No Branch Center Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default BranchCenterTable;