import React, { useState } from "react";
import "./District.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";
import { AddButton } from "../../components/buttons";
import { toast } from "react-toastify";
import DistrictTable from "./DistrictTable";
import DistrictForm from "./DistrictForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createDistrict,
  updateDistrict,
} from "../../store/slices/districtSlice";

const District = () => {
  const dispatch = useAppDispatch();
  const { saving } = useAppSelector((state) => state.districtMaster);

  const [showForm, setShowForm] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState(null);

  const handleAddNew = () => {
    setEditingDistrict(null);
    setShowForm(true);
  };

  const handleEdit = (row) => {
    setEditingDistrict(row);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDistrict(null);
  };

  const handleSave = async (formData) => {
    try {
      if (!editingDistrict) {
        const requestBody = {
          districtId: 0,
          districtName: formData.districtName,
          districtCode: formData.districtCode,
          stateId: Number(formData.stateId),
          isActive: formData.status === "ACTIVE",
          createdBy: 0,
          createdDate: new Date().toISOString(),
          modifiedBy: 0,
          modifiedDate: new Date().toISOString(),
          isDeleted: false,
        };

        await dispatch(createDistrict(requestBody)).unwrap();
        toast.success("District saved successfully!");
      } else {
        const districtId = Number(
          editingDistrict.districtId ?? editingDistrict.id
        );
        const requestBody = {
          districtId,
          districtName: formData.districtName,
          districtCode: formData.districtCode,
          stateId: Number(formData.stateId),
          isActive: formData.status === "ACTIVE",
          createdBy: Number(editingDistrict.createdBy ?? 0),
          createdDate:
            editingDistrict.createdDate ?? new Date().toISOString(),
          modifiedBy: 0,
          modifiedDate: new Date().toISOString(),
          isDeleted: false,
        };

        await dispatch(
          updateDistrict({ id: districtId, data: requestBody })
        ).unwrap();
        toast.success("District updated successfully!");
      }

      setShowForm(false);
      setEditingDistrict(null);
    } catch (error) {
      toast.error(error || "Unable to save district.");
    }
  };

  return (
    <div className="district-page">
      <div className="district-header">
        <div>
          <h2>District Master</h2>
          <p>Manage Districts</p>
        </div>
        <AddButton text="Add New" onClick={handleAddNew} />
      </div>

      <DistrictTable onEdit={handleEdit} />

      {showForm && (
        <DistrictForm
          data={editingDistrict}
          onSave={handleSave}
          onClose={handleCloseForm}
          loading={saving}
        />
      )}
    </div>
  );
};

export default District;
