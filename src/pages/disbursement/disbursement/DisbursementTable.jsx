import React, { useEffect, useMemo, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { AddButton } from "../../../components/buttons";
import {
  enrichDisbursementRow,
  inDateRange,
} from "../disbursementDisplayUtils";
import "./Disbursement.css";

const DisbursementTable = ({ filters, onAdd, onEdit }) => {
  const dispatch = useAppDispatch();
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [taskOpen, setTaskOpen] = useState(null);

  const { items: disbursementData, remove } = useSwaggerEntity("disbursement");
  const { items: members } = useSwaggerEntity("member");
  const { items: individualLoans } = useSwaggerEntity("individualLoan");
  const { items: branches } = useAppSelector((state) => state.branch);
  const { items: employees } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const enrichedData = useMemo(
    () =>
      disbursementData.map((item) =>
        enrichDisbursementRow(item, {
          branches,
          employees,
          members,
          individualLoans,
        })
      ),
    [disbursementData, branches, employees, members, individualLoans]
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

    result = result.filter((item) =>
      inDateRange(
        item.disbursementDate,
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
    <div className="disbursement-table-card">
      <div className="disbursement-table-title-row">
        <h2>INDIVIDUAL DISBURSEMENT LIST</h2>
        {onAdd && <AddButton onClick={onAdd}>Add New</AddButton>}
      </div>

      <div className="disbursement-table-controls">
        <div className="disbursement-entries">
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="disbursement-table-search">
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
              <th>LOAN ID</th>
              <th>
                PL NAME &<br />
                <span>PENALTY NAME</span>
              </th>
              <th>
                PL<br />CATEGORY
              </th>
              <th>
                PL EMI<br />TYPE
              </th>
              <th>
                PLAN<br />AMT
              </th>
              <th>
                DIS<br />AMT
              </th>
              <th>
                DISBURSEMENT<br />DT
              </th>
              <th>EMI START DATE</th>
              <th>EMI END DATE</th>
              <th>MEMBER</th>
              <th>ALIAS</th>
              <th>STAFF</th>
              <th>
                BRANCH<br />CENTER
              </th>
              <th>BRANCH</th>
              <th>
                PAY<br />MODE
              </th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.loanId}</td>
                  <td className="disbursement-loan-name">
                    <strong>{item.plName}</strong>
                    <br />
                    <span>{item.penaltyName}</span>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.emiType}</td>
                  <td>{item.planAmount === "-" ? "-" : `₹${item.planAmount}`}</td>
                  <td>{item.disAmount === "-" ? "-" : `₹${item.disAmount}`}</td>
                  <td>{item.disbursementDate}</td>
                  <td>{item.emiStartDate}</td>
                  <td>{item.emiEndDate}</td>
                  <td className="disbursement-member">{item.member}</td>
                  <td>{item.alias}</td>
                  <td>{item.staff}</td>
                  <td>{item.branchCenter}</td>
                  <td>{item.branch}</td>
                  <td>{item.payMode}</td>
                  <td className="disbursement-action-cell">
                    <div className="disbursement-task-wrap">
                      <button
                        type="button"
                        className="disbursement-task"
                        onClick={() =>
                          setTaskOpen(taskOpen === item.id ? null : item.id)
                        }
                      >
                        Task ▾
                      </button>
                      {taskOpen === item.id && (
                        <div className="disbursement-task-menu">
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
                <td colSpan="17" className="disbursement-no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="disbursement-table-footer">
        <div className="disbursement-showing">
          Showing{" "}
          {filteredData.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="disbursement-pagination">
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
                type="button"
                key={page}
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
    </div>
  );
};

export default DisbursementTable;
