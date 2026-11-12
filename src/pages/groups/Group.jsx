import React, { useState } from "react";

import "./Group.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import { AddButton } from "../../components/buttons";
import { toast } from "react-toastify";

import GroupTable from "./GroupTable";
import GroupForm from "./GroupForm";
import { useSwaggerEntity } from "../../store/useSwaggerEntity";

const Group = () => {
  const { items: groups, loading, error, save, remove } = useSwaggerEntity("group");
  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  const handleSave = async (data) => {
    try {
      await save(data, editingGroup);
      setEditingGroup(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err || "Unable to save group.");
    }
  };

  const handleEdit = (row) => {
    setEditingGroup(row);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
    } catch (err) {
      toast.error(err || "Unable to delete group.");
    }
  };

  return (
    <div className="group-page">
      <div className="group-header">
        <div>
          <h2>Group Master</h2>
          <p>Manage Group Master</p>
        </div>
        <AddButton
          text="Add New"
          onClick={() => {
            setEditingGroup(null);
            setShowForm(true);
          }}
        />
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading groups...</p>}

      <GroupTable data={groups} onEdit={handleEdit} onDelete={handleDelete} />

      {showForm && (
        <GroupForm
          data={editingGroup}
          onSave={handleSave}
          onClose={() => {
            setEditingGroup(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Group;
