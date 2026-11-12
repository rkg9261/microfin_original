import React, { useState } from "react";
import AcGroupTable from "./AcGroupTable";
import AcGroupForm from "./AcGroupForm";
import "./AcGroup.css";

const AcGroup = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      group: "TPC",
      type: "DR",
      status: "Active",
    },
    {
      id: 2,
      group: "P C L",
      type: "DR",
      status: "Active",
    },

  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Open form for ADD
  const handleAdd = () => {
    setSelectedGroup(null);
    setShowForm(true);
  };

  // Open form for EDIT
  const handleEdit = (group) => {
    setSelectedGroup(group);
    setShowForm(true);
  };

  // Close popup
  const handleCancel = () => {
    setShowForm(false);
    setSelectedGroup(null);
  };

  // Add / Update
  const handleSave = (formData) => {
    if (selectedGroup) {
      // UPDATE EXISTING GROUP
      setGroups((prevGroups) =>
        prevGroups.map((item) =>
          item.id === selectedGroup.id
            ? {
                ...item,
                group: formData.group,
                type: formData.type,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      // ADD NEW GROUP
      const newGroup = {
        id: Date.now(),
        group: formData.group,
        type: formData.type,
        status: formData.status,
      };

      setGroups((prevGroups) => [...prevGroups, newGroup]);
    }

    setShowForm(false);
    setSelectedGroup(null);
  };

  return (
    <div className="acgroup-page">

      {/* PAGE HEADER */}
      <div className="acgroup-page-header">
        <div className="acgroup-page-title">
          ACGROUP
        </div>

        <div className="acgroup-breadcrumb">
          <span>Dashboard</span>
          <span className="acgroup-breadcrumb-arrow">
            ›
          </span>
          <strong>ACGROUP</strong>
        </div>
      </div>

      {/* BLUE LINE */}
      <div className="acgroup-blue-line"></div>

      {/* GROUP LIST */}
      <div className="acgroup-section">

        <div className="acgroup-section-header">
          <h2>GROUP LIST</h2>

          <button
            type="button"
            className="acgroup-add-button"
            onClick={handleAdd}
            title="Add Group"
          >
            +
          </button>
        </div>

        <AcGroupTable
          groups={groups}
          onEdit={handleEdit}
        />

      </div>

      {/* FORM POPUP */}
      {showForm && (
        <AcGroupForm
          group={selectedGroup}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AcGroup;