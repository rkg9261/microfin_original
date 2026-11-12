import React, { useState } from "react";

import "./Bank.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import { AddButton } from "../../components/buttons";

import BankTable from "./BankTable";
import BankForm from "./BankForm";

const Bank = () => {

  const [showForm, setShowForm] =
    useState(false);

  const [editingBank, setEditingBank] =
    useState(null);


  
  // SAVE
  

  const handleSave = (formData) => {

    console.log(
      "BANK SAVED:",
      formData
    );

    setEditingBank(null);

    setShowForm(false);

  };


  
  // EDIT
  

  const handleEdit = (row) => {

    setEditingBank(row);

    setShowForm(true);

  };


  
  // DELETE


  const handleDelete = (id) => {

    console.log(
      "BANK DELETED:",
      id
    );

  };


  return (

    <div className="bank-page">

      {/* ================= Header ================= */}

      <div className="bank-header">

        <div>

          <h2>
            Bank Master
          </h2>

          <p>
            Manage Bank Master
          </p>

        </div>


        <AddButton

          text="Add New"

          onClick={() => {

            setEditingBank(null);

            setShowForm(true);

          }}

        />

      </div>


      {/* ================= Bank Table ================= */}

      <BankTable

        onEdit={handleEdit}

        onDelete={handleDelete}

      />


      {/* ================= Bank Form ================= */}

      {

        showForm && (

          <BankForm

            data={editingBank}

            onSave={handleSave}

            onClose={() => {

              setEditingBank(null);

              setShowForm(false);

            }}

          />

        )

      }

    </div>

  );

};

export default Bank;