import React, { useState } from "react";

import "./Leave.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";
import LeaveTable from "./LeaveTable";
import LeaveForm from "./LeaveForm";

const Leave = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setRefreshKey((prev) => prev + 1);
    setEditingLeave(null);
    setShowForm(false);
  };

  const handleEdit = (row) => {
    setEditingLeave(row);
    setShowForm(true);
  };

  const handleDelete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="leave-page">
      <div className="leave-header">
        <div>
          <h2>Leave Master</h2>
          <p>Manage Leave</p>
        </div>

        <AddButton
          text="Add New"
          onClick={() => {
            setEditingLeave(null);
            setShowForm(true);
          }}
        />
      </div>

      <LeaveTable
        refreshKey={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <LeaveForm
          data={editingLeave}
          onSave={handleSave}
          onClose={() => {
            setEditingLeave(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Leave;
