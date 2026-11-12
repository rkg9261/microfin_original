import React, { useState } from "react";

import "./State.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";
import {toast} from "react-toastify";

import StateTable from "./StateTable";
import StateForm from "./StateForm";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createState,
  updateState,
} from "../../store/slices/stateSlice";



// STATE PAGE


const State = () => {
  const dispatch = useAppDispatch();
  const { saving } = useAppSelector((state) => state.stateMaster);



  const [showForm, setShowForm] = useState(false);



  // EDITING STATE


  const [editingState, setEditingState] = useState(null);
  



  // ADD NEW


  const handleAddNew = () => {

    console.log(
      "OPEN ADD STATE FORM"
    );

    setEditingState(null);

    setShowForm(true);
  };



  // EDIT


  const handleEdit = (row) => {

   
    console.log(
      "EDIT STATE"
    );

    console.log(
      "SELECTED STATE:",
      row
    );

  

    setEditingState(row);

    setShowForm(true);
  };



  // CLOSE FORM


  const handleCloseForm = () => {

    setShowForm(false);

    setEditingState(null);
  };



  // SAVE / UPDATE


  const handleSave = async (formData) => {

   

    console.log(
      "STATE FORM DATA:"
    );

    console.log(
      formData
    );

  


    try {
      if (!editingState) {
        const requestBody = {
          stateId: 0,
          stateCode: formData.stateCode,
          stateName: formData.stateName,
          countryId: Number(formData.countryId || 0),
          isActive: formData.status === "ACTIVE",
          createdBy: 0,
          createdDate: new Date().toISOString(),
          modifiedBy: 0,
          modifiedDate: new Date().toISOString(),
        };

        await dispatch(createState(requestBody)).unwrap();
        toast.success("State saved successfully!");
      } else {
        const requestBody = {
          stateId: Number(editingState.stateId ?? editingState.id),
          stateCode: formData.stateCode,
          stateName: formData.stateName,
          countryId: Number(
            formData.countryId ?? editingState.countryId ?? 0
          ),
          isActive: formData.status === "ACTIVE",
          createdBy: Number(editingState.createdBy ?? 0),
          createdDate:
            editingState.createdDate ?? new Date().toISOString(),
          modifiedBy: 0,
          modifiedDate: new Date().toISOString(),
        };

        const stateId = Number(editingState.stateId ?? editingState.id);

        await dispatch(
          updateState({ id: stateId, data: requestBody })
        ).unwrap();

        toast.success("State updated successfully!");
      }

      setShowForm(false);
      setEditingState(null);
    } catch (error) {
      toast.error(error || "Unable to save state.");
    }

  };



  return (

    <div className="state-page">


      {/* HEADER*/}
         
   

      <div className="state-header">

        <div>

          <h2>
            State Master
          </h2>

          <p>
            Manage States
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={handleAddNew}
        />

      </div>


      {/*TABLE*/}
          
   

      <StateTable
        onEdit={handleEdit}
      />


      {/*FORM */}
          
    

      {showForm && (

        <StateForm

          data={editingState}

          onSave={handleSave}

          onClose={handleCloseForm}

          loading={saving}

        />

      )}

    </div>

  );

};


export default State;