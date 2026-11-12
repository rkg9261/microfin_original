import React from "react";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

const GroupEmiCollectionTable = ({
  data,
  onCollectPayment,
}) => {
  return (
    <div className="group-emi-table-card">

      {/* HEADER */}

      <div className="group-emi-table-heading">

        <h3>MEMBER LIST</h3>

        <div className="group-emi-total">
          TOTAL CURRENT DUE :
          <strong>42062</strong>
        </div>

      </div>

      {/* TABLE */}

      <div className="common-table-wrapper">

        <table className="common-table">

          <thead>

            <tr>

              <th>
                #
              </th>

              <th>
                MEMBER
                <br />
                CODE
              </th>

              <th>
                MEMBER
                <br />
                NAME
              </th>

              <th>
                (C/O)
                <br />
                ALIAS
              </th>

              <th>
                MEMBER
                <br />
                MOB
              </th>

              <th>
                LOAN
                <br />
                APPLICATION
                <br />
                NUMBER
              </th>

              <th>
                EMI
                <br />
                DATE
              </th>

              <th>
                EMI
                <br />
                NUMBER
              </th>

              <th>
                ADVANCE
              </th>

              <th>
                CURRENT
                <br />
                DUE
              </th>

              <th>
                EMI
              </th>

              <th>
                ACTION
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((member, index) => (

              <tr key={member.id}>

                <td>
                  {index + 1}
                </td>

                <td className="group-emi-code">
                  {member.memberCode}
                </td>

                <td className="group-emi-member-name">
                  {member.memberName}
                </td>

                <td>
                  {member.alias}
                </td>

                <td>
                  {member.mobile}
                </td>

                <td>
                  {member.loanApplication}
                </td>

                <td>
                  {member.emiDate}
                </td>

                <td>
                  {member.emiNumber}
                </td>

                <td>
                  {member.advance}
                </td>

                <td>
                  <strong>
                    {member.currentDue}
                  </strong>
                </td>

                <td>
                  {member.emi}
                </td>

                <td>

                  <button
                    type="button"
                    className="group-emi-collect-button"
                    onClick={() =>
                      onCollectPayment(member)
                    }
                  >
                    Collect Payment
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="group-emi-table-footer">

        <div className="group-emi-entries-wrapper">

          <span>
            ROWS PER PAGE
          </span>

          <EntriesDropdown
            value={10}
            options={[10, 25, 50, 100]}
            onChange={() => {}}
          />

        </div>

        <div className="group-emi-pagination">

          <span>
            ‹ PREV
          </span>

          <span>
            1 - {data.length} OF {data.length}
          </span>

          <span>
            NEXT ›
          </span>

        </div>

      </div>

    </div>
  );
};

export default GroupEmiCollectionTable;