import React, { useState } from "react";
import "./Designation.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";
import { AddButton } from "../../components/buttons";
import { toast } from "react-toastify";
import DesignationTable from "./DesignationTable";
import DesignationForm from "./DesignationForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createDesignation,
  updateDesignation,
} from "../../store/slices/designationSlice";

const Designation = () => {
  const dispatch = useAppDispatch();
  const { saving } = useAppSelector((state) => state.designation);

  const [showForm, setShowForm] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState(null);

  const handleAddNew = () => {
    setEditingDesignation(null);
    setShowForm(true);
  };

  const handleEdit = (row) => {
    setEditingDesignation(row);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingDesignation(null);
    setShowForm(false);
  };

  const handleSave = async (formData) => {
    try {
      if (!editingDesignation) {
        const requestBody = {
          designationId: 0,
          designationName: formData.designationName.trim(),
          designationCode: formData.designationCode.trim(),
          isActive: formData.status === "ACTIVE",
          createdBy: 1,
          createdDate: new Date().toISOString(),
          modifiedBy: null,
          modifiedDate: null,
          isDeleted: false,
        };

        await dispatch(createDesignation(requestBody)).unwrap();
        toast.success("Designation saved successfully!");
      } else {
        const designationId = Number(
          editingDesignation.designationId ?? editingDesignation.id
        );
        const requestBody = {
          designationId,
          designationName: formData.designationName.trim(),
          designationCode: formData.designationCode.trim(),
          isActive: formData.status === "ACTIVE",
          createdBy: Number(editingDesignation.createdBy ?? 1),
          createdDate:
            editingDesignation.createdDate ?? new Date().toISOString(),
          modifiedBy: 1,
          modifiedDate: new Date().toISOString(),
          isDeleted: false,
        };

        await dispatch(
          updateDesignation({ id: designationId, data: requestBody })
        ).unwrap();
        toast.success("Designation updated successfully!");
      }

      handleCloseForm();
    } catch (error) {
      toast.error(error || "Unable to save designation.");
    }
  };

  return (
    <div className="designation-page">
      <div className="designation-header">
        <div>
          <h2>Designation Master</h2>
          <p>Manage Designation</p>
        </div>
        <AddButton text="Add New" onClick={handleAddNew} />
      </div>

      <DesignationTable onEdit={handleEdit} />

      {showForm && (
        <DesignationForm
          data={editingDesignation}
          onSave={handleSave}
          onClose={handleCloseForm}
          loading={saving}
        />
      )}
    </div>
  );
};

export default Designation;
