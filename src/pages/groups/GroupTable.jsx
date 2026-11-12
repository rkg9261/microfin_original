import React, { useMemo, useState } from "react";

import {  EditButton, DeleteButton,} from "../../components/buttons";
import EntriesDropdown from "../../components/common/EntriesDropdown";

const GroupTable = ({ data, onEdit,onDelete,}) => {

  const [search, setSearch] =  useState("");
  const [entries, setEntries] =  useState(10);
  

  const filteredData = useMemo(() => {

    return data.filter((item) => {

      const value = search.toLowerCase();

      return (

        item.code
          .toLowerCase()
          .includes(value) ||

        item.groupName
          .toLowerCase()
          .includes(value) ||

        item.city
          .toLowerCase()
          .includes(value) ||

        item.branch
          .toLowerCase()
          .includes(value) ||

        item.centerLeader
          .toLowerCase()
          .includes(value)

      );

    });

  }, [data, search]);

  return (

    <>  
    
     <div className="common-search">

          <input type="text"
           placeholder="Search groups..."
           value={search}
          onChange={(e) =>setSearch(e.target.value)} />
            </div>

          <div className="table-wrapper">

      {/* ================= Header ================= */}

        {/* Entry list dropdown */}

      <EntriesDropdown
  value={entries}
  onChange={setEntries}
/>


      {/* ================= Table ================= */}

      <table className="common-table">

        <thead>

          <tr>

            <th>SR.</th>

            <th>CODE</th>

            <th>GROUP NAME</th>

            <th>CITY / VILLAGE</th>

            <th>BRANCH</th>

            <th>CENTER LEADER</th>

            <th>DAY</th>

            <th>TIME</th>

            <th>STATUS</th>

            <th>ACTION</th>

          </tr>

        </thead>

        <tbody>

          {filteredData
            .slice(0, entries)
            .map((row, index) => (

              <tr key={row.id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {row.code}
                </td>

                <td>
                  {row.groupName}
                </td>

                <td>
                  {row.city}
                </td>

                <td>
                  {row.branch}
                </td>

                <td>
                  {row.centerLeader}
                </td>

                <td>
                  {row.collectionDay}
                </td>

                <td>
                  {row.collectionTime}
                </td>

                <td>

                  <span

                    className={
                      row.status ===
                      "ACTIVE"
                        ? "status-active"
                        : "status-inactive"
                    }

                  >

                    {row.status}

                  </span>

                </td>

                <td>

             <EditButton onClick={() => onEdit(row)}  />
          
             <DeleteButton onClick={() => onDelete(row.id)}/>
 


                </td>

              </tr>

            ))}

          {filteredData.length ===
            0 && (

            <tr>

              <td
                colSpan="10"
                style={{
                  textAlign:
                    "center",
                  padding: 20,
                }}
              >

                No Groups Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
</>
  );

};

export default GroupTable;
