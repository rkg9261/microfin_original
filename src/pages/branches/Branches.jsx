import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import "./Branches.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import BranchesTable
  from "./BranchesTable";

import BranchesForm
  from "./BranchesForm";

import {
  AddButton,
} from "../../components/buttons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteBranch,
  fetchBranches,
} from "../../store/slices/branchSlice";


const Branches = () => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { items: branches } = useAppSelector((state) => state.branch);


  
  // STATES
  

  const [
    search,
    setSearch,
  ] = useState("");


  const [
    openForm,
    setOpenForm,
  ] = useState(false);


  const [
    editingBranch,
    setEditingBranch,
  ] = useState(null);


  const [
    refreshTable,
    setRefreshTable,
  ] = useState(0);


  
  // TABLE REF
  

  

  const tableRef =
    useRef(null);


  
  // REFRESH
  

  const refreshBranchTable = () => {
    dispatch(fetchBranches());
    setRefreshTable((previous) => previous + 1);
  };

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch, refreshTable]);

  const handleDelete = async (item) => {
    const branchId = item?.branchId ?? item?.id;
    if (!branchId) {
      toast.error("Branch ID not found.");
      return;
    }

    const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this branch?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!confirmed) return;

    try {
      await dispatch(deleteBranch(branchId)).unwrap();
      toast.success("Branch deleted successfully.");
    } catch (error) {
      toast.error(error || "Unable to delete branch.");
    }
  };


  
  // FORM SAVE
  

  const handleFormSave =
    async (
      formData,
      operation
    ) => {



      if (
        operation === "POST"
      ) {

        refreshBranchTable();

        return;

      }


    
      // PUT


      if (
        operation === "PUT"
      ) {

        refreshBranchTable();

        setOpenForm(false);

        setEditingBranch(null);

        return;

      }

    };


  
  // EDIT
  

  const handleEdit = (
    branch
  ) => {

    console.log(
      "EDIT BRANCH:",
      branch
    );


    setEditingBranch(
      branch
    );


    setOpenForm(
      true
    );

  };


  
  // ADD
  

  const handleAdd = () => {

    setEditingBranch(
      null
    );

    setOpenForm(
      true
    );

  };


  
  // CLOSE
  

  const handleClose = () => {

    setOpenForm(
      false
    );

    setEditingBranch(
      null
    );

  };


  
  
  

  return (

    <div className="branches-page">


      {/* HEADER */}

      <div className="branches-header">

        <div>

          <h2>
            Branch List
          </h2>

          <p>
            Manage All Branches
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={
            handleAdd
          }
        />

      </div>


      {/* SEARCH */}

      <div className="common-search">

        <input
          type="text"
          placeholder="Search Branch..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      {/* TABLE */}

      <BranchesTable
        ref={tableRef}
        data={branches}
        search={search}
        refreshTable={refreshTable}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />


      {/* FORM */}

      {openForm && (

        <BranchesForm

          editingBranch={
            editingBranch
          }

          onClose={
            handleClose
          }

          onSave={
            handleFormSave
          }

        />

      )}

    </div>

  );

};


export default Branches;