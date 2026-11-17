import React, { useEffect, useMemo, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { AddButton } from "../../../components/buttons";
import {
  enrichGroupDisbursementRow,
  inDateRange,
} from "../disbursementDisplayUtils";
import GroupMemberDisbursementView from "./GroupMemberDisbursementView";
import "./GroupMemberDisbursement.css";

const GroupMemberDisbursementTable = ({ filters, onAdd, onEdit }) => {
  const dispatch = useAppDispatch();
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [taskOpen, setTaskOpen] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const { items: groupDisbursementData, remove } = useSwaggerEntity(
    "groupMemberDisbursement"
  );
  const { items: members } = useSwaggerEntity("member");
  const { items: groups } = useSwaggerEntity("group");
  const { items: groupLoans } = useSwaggerEntity("groupLoan");
  const { items: branches } = useAppSelector((state) => state.branch);
  const { items: employees } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const enrichedData = useMemo(
    () =>
      groupDisbursementData.map((item) =>
        enrichGroupDisbursementRow(item, {
          branches,
          employees,
          members,
          groups,
          groupLoans,
        })
      ),
    [groupDisbursementData, branches, employees, members, groups, groupLoans]
  );

  const filteredData = useMemo(() => {
    let result = [...enrichedData];

    if (filters?.member) {
      const q = String(filters.member).toLowerCase();
      result = result.filter((item) =>
        String(item.member || "").toLowerCase().includes(q)
      );
    }

    if (filters?.branch) {
      result = result.filter(
        (item) => String(item.branchId ?? "") === String(filters.branch)
      );
    }

    if (filters?.staff) {
      result = result.filter(
        (item) => String(item.staffId ?? "") === String(filters.staff)
      );
    }

    if (filters?.group) {
      result = result.filter(
        (item) => String(item.groupId ?? "") === String(filters.group)
      );
    }

    result = result.filter((item) =>
      inDateRange(
        item.disDate || item.disbursementDate,
        filters?.disbursementDateFrom,
        filters?.disbursementDateTo
      )
    );

    result = result.filter((item) =>
      inDateRange(
        item.emiEndDate,
        filters?.emiEndDateFrom,
        filters?.emiEndDateTo
      )
    );

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value || "").toLowerCase().includes(q)
        )
      );
    }

    return result;
  }, [enrichedData, filters, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / entries));
  const startIndex = (currentPage - 1) * entries;
  const paginatedData = filteredData.slice(startIndex, startIndex + entries);

  const handleDelete = async (item) => {
    try {
      await remove(item.id);
      setTaskOpen(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group-disbursement-table-card">
      <div className="group-disbursement-table-title">
        <span>GROUP DISBURSEMENT LIST</span>
        {onAdd && <AddButton onClick={onAdd}>Add New</AddButton>}
      </div>

      <div className="group-disbursement-controls">
        <select
          value={entries}
          onChange={(e) => {
            setEntries(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <div className="group-disbursement-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="common-table-wrapper">
        <table className="common-table">
          <thead>
            <tr>
              <th>SR.</th>
              <th>APPLICATION NO</th>
              <th>
                PL NAME &<br />
                <span>PENALTY NAME</span>
              </th>
              <th>PL EMI TYPE</th>
              <th>PLAN AMT</th>
              <th>DIS AMT</th>
              <th>DIS DT</th>
              <th>EMI START DT</th>
              <th>EMI END DT</th>
              <th>MEMBER</th>
              <th>GROUP</th>
              <th>BRANCH CENTER</th>
              <th>BRANCH</th>
              <th>STAFF</th>
              <th>PAY MODE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.applicationNo}</td>
                  <td className="group-loan-name">
                    <strong>{item.plName}</strong>
                    <br />
                    <span>{item.penaltyName}</span>
                  </td>
                  <td>{item.emiType}</td>
                  <td>{item.planAmount === "-" ? "-" : `₹${item.planAmount}`}</td>
                  <td>{item.disAmount === "-" ? "-" : `₹${item.disAmount}`}</td>
                  <td>{item.disDate}</td>
                  <td>{item.emiStartDate}</td>
                  <td>{item.emiEndDate}</td>
                  <td className="group-member-name">{item.member}</td>
                  <td>{item.group}</td>
                  <td>{item.branchCenter}</td>
                  <td>{item.branch}</td>
                  <td>{item.staff}</td>
                  <td>
                    <span className="group-pay-mode">
                      {item.payMode}
                    </span>
                  </td>
                  <td className="group-action-cell">
                    <div className="group-task-wrapper">
                      <button
                        type="button"
                        className="group-task-button"
                        onClick={() =>
                          setTaskOpen(taskOpen === item.id ? null : item.id)
                        }
                      >
                        Task <span>▾</span>
                      </button>
                      {taskOpen === item.id && (
                        <div className="group-task-menu">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedData(item);
                              setTaskOpen(null);
                            }}
                          >
                            👁 View
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTaskOpen(null);
                              onEdit?.(item);
                            }}
                          >
                            ✎ Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="group-no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="group-disbursement-footer">
        <div>
          Showing {filteredData.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="group-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            PREV
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 5)
            .map((page) => (
              <button
                key={page}
                type="button"
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            NEXT
          </button>
        </div>
      </div>

      {selectedData && (
        <GroupMemberDisbursementView
          data={selectedData}
          onClose={() => setSelectedData(null)}
        />
      )}
    </div>
  );
};

export default GroupMemberDisbursementTable;
