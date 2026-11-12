import React, {
  useState,
} from "react";

import PenaltySchemeTable
  from "./PenaltySchemeTable";

import PenaltySchemeForm
  from "./PenaltySchemeForm";

import { AddButton } from "../../components/buttons";


const PenaltyScheme = () => {

  const [showForm, setShowForm] =
    useState(false);

  const [editData, setEditData] =
    useState(null);

  const [refresh, setRefresh] =
    useState(0);



  // ADD


  const handleAddNew = () => {

    setEditData(null);

    setShowForm(true);

  };



  // EDIT


  const handleEdit = (item) => {

    console.log(
      "EDIT ITEM:",
      item
    );

    setEditData(item);

    setShowForm(true);

  };



  // SAVE COMPLETE


  const handleSave = async () => {

    console.log(
      "REFRESH TABLE"
    );


    setRefresh(
      previous => previous + 1
    );

  };



  // CLOSE


  const handleClose = () => {

    setShowForm(false);

    setEditData(null);

  };


  return (

    <div className="penalty-page">

      <div className="penalty-header">

        <div>

          <h2>
            Penalty Scheme
          </h2>

          <p>
            Manage Penalty Schemes
          </p>

        </div>


        <AddButton
          text="Add New"
          onClick={handleAddNew}
        />

      </div>


      {/* TABLE */}

      <PenaltySchemeTable

        onEdit={handleEdit}

        refresh={refresh}

      />


      {/* FORM */}

      {showForm && (

        <PenaltySchemeForm

          editData={editData}

          onClose={handleClose}

          onSave={handleSave}

        />

      )}

    </div>

  );

};


export default PenaltyScheme;