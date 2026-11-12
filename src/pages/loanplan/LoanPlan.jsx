import React, { useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import "./LoanPlan.css";
import "../../components/common/Search.css";

import LoanPlanForm from "./LoanPlanForm";
import LoanPlanTable from "./LoanPlanTable";

import { AddButton } from "../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteLoanPlan, fetchLoanPlans } from "../../store/slices/loanPlanSlice";
import { toast } from "react-toastify";



// LOAN PLAN PAGE


const LoanPlan = () => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.loanPlan);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);

  // Selected record for edit
  const [editingLoanPlan, setEditingLoanPlan] = useState(null);



  // OPEN ADD FORM


  const openAddForm = () => {

    console.log(
      "Opening Add Loan Plan Form"
    );

    // Clear previous edit data
    setEditingLoanPlan(null);

    // Open form
    setShowForm(true);

  };



  // OPEN EDIT FORM


  const handleEdit = (item) => {

    console.log(
      "================================="
    );

    console.log(
      "EDIT LOAN PLAN"
    );

    console.log(
      "Selected Item:",
      item
    );

    console.log(
      "================================="
    );


    // Store selected API record
    setEditingLoanPlan(item);

    // Open form
    setShowForm(true);

  };



  // CLOSE FORM


  const closeForm = () => {

    setShowForm(false);

    setEditingLoanPlan(null);

  };



  // AFTER SAVE SUCCESS


  const handleSaveSuccess = async (response) => {

    console.log(
      "================================="
    );

    console.log(
      "SAVE SUCCESS"
    );

    console.log(
      "API RESPONSE:",
      response
    );

    console.log(
      "================================="
    );


    setShowForm(false);
    setEditingLoanPlan(null);
    dispatch(fetchLoanPlans());

  };



  // DELETE LOAN PLAN


  const handleDelete = async (id) => {

    console.log(
      "Delete Loan Plan ID:",
      id
    );


    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this loan plan?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


    if (!confirmDelete) {

      return;

    }


    try {
      await dispatch(deleteLoanPlan(id)).unwrap();
      toast.success("Loan Plan deleted successfully.");
    } catch (error) {
      toast.error(error || "Failed to delete loan plan.");
    }

  };



  // RENDER


  return (

    <div className="loan-plan-page">


      {/* HEADER  */}
    

      <div className="loan-plan-header">

        <div>

          <h2>
            Loan Plan
          </h2>

          <p>
            Manage Loan Plans
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={openAddForm}
        />

      </div>


      {/*SEARCH*/}
      

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Loan Plan..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>


      {/*ERROR*/}
      

      {error && (

        <div
          style={{
            padding: "12px 15px",
            marginBottom: "15px",
            color: "#b42318",
            background: "#fee4e2",
            border: "1px solid #fecdca",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >

          {error}

        </div>

      )}


      {/*  TABLE */}
          
         
     

      <LoanPlanTable

        onEdit={handleEdit}

        onDelete={handleDelete}

        searchTerm={searchTerm}

      />


      {/*ADD / EDIT FORM */}
     

      {showForm && (

        <LoanPlanForm

          onClose={closeForm}

          onSaveSuccess={handleSaveSuccess}

          initialData={editingLoanPlan}

        />

      )}

    </div>

  );

};


export default LoanPlan;