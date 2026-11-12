import React, { useState } from "react";

import "./SessionMaster.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import SessionMasterTable from "./SessionMasterTable";
import SessionMasterForm from "./SessionMasterForm";

const SessionMaster = () => {

    const [showForm, setShowForm] =
        useState(false);

    const [editingData, setEditingData] =
        useState(null);


   
    // ADD NEW SESSION
   

    const handleAdd = () => {

        setEditingData(null);

        setShowForm(true);

    };


   
    // EDIT SESSION
   

    const handleEdit = (row) => {

        setEditingData(row);

        setShowForm(true);

    };


   
    // AFTER API SAVE
   

    const handleSave = () => {

        setEditingData(null);

        setShowForm(false);

    };


   
    // CLOSE FORM
   

    const handleClose = () => {

        setEditingData(null);

        setShowForm(false);

    };


    return (

        <div className="session-master-page">


            {/*     HEADER*/}
            
            

            <div className="session-master-header">

                <h2>

                    SESSION LIST

                </h2>

            </div>


            {/*  SESSION TABLE */}
               
               
           

            <SessionMasterTable

                onAdd={handleAdd}

                onEdit={handleEdit}

            />


            {/*  SESSION FORM*/}
               
                
            

            {showForm && (

                <SessionMasterForm

                    data={editingData}

                    onSave={handleSave}

                    onClose={handleClose}

                />

            )}


        </div>

    );

};

export default SessionMaster;