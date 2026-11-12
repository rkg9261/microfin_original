import React, {useState} from "react";

import {
  EditButton,
  DeleteButton,
} from "../../components/buttons";
import EntriesDropdown from "../../components/common/EntriesDropdown";

const StaffBranchesTable = ({ data, onEdit, onDelete }) => {
 const [entries, setEntries] = useState(10);


  return (

    <div className="table-wrapper">

          {/* Entry list dropdown */}

      <EntriesDropdown
  value={entries}
  onChange={setEntries}
/>


      <table className="common-table">

        <thead>

          <tr>

            <th>Sr. No.</th>

            <th>Employee Code</th>

            <th>Employee Name</th>

            <th>Branch</th>

            <th>Remark</th>

            <th>Status</th>

            <th width="170">Action</th>

          </tr>

        </thead>

        <tbody>

          {data.length > 0 ? (

            data.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.employeeCode}</td>

                <td>{item.employeeName}</td>

                <td>{item.branch}</td>

                <td>{item.remark}</td>

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
                colSpan="7"
                className="table-empty"
              >
                No Staff Branch Record Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default StaffBranchesTable;