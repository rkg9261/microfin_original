import React, { useState } from "react";

import "./Miscellaneous.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import IdentityTable from "./IdentityTable";
import RelationTable from "./RelationTable";
import PurposeTable from "./PurposeTable";
import ReasonTable from "./RegionTable";

import IdentityForm from "./IdentityForm";
import RelationForm from "./RelationForm";
import PurposeForm from "./PurposeForm";
import ReasonForm from "./RegionForm";


const Miscellaneous = () => {


  // IDENTITY
const [showIdentityForm, setShowIdentityForm] = useState(false);
 const [editingIdentity, setEditingIdentity] =    useState(null);

  // RELATION
  const [showRelationForm, setShowRelationForm] = useState(false);
  const [editingRelation, setEditingRelation] =  useState(null);
  
  // PURPOSE
  const [showPurposeForm, setShowPurposeForm] =    useState(false);
  const [editingPurpose, setEditingPurpose] =  useState(null);
  const [purposes, setPurposes] = useState([]);
  
  // REASON
  const [showReasonForm, setShowReasonForm] = useState(false);
  const [editingReason, setEditingReason] = useState(null);
  const [regions, setRegions] = useState([]);
   


  return (

    <div className="misc-page">


      {/* 
          HEADER
       */}

      <div className="misc-header">

        <div>

          <h2>Miscellaneous Master</h2>
          <p> Manage Miscellaneous Master</p>
           
        </div>

      </div>


      {/*  MASTER TABLES */}
         
      

      <div className="misc-grid">


        {/* IDENTITY MASTER */}
            
        

        <IdentityTable

          onAdd={() => {

            setEditingIdentity(null);

            setShowIdentityForm(true);

          }}

          onEdit={(row) => {

            setEditingIdentity(row);

            setShowIdentityForm(true);

          }}

        />


        {/* RELATION MASTER  */}
            
       

        <RelationTable

          onAdd={() => {

            setEditingRelation(null);

            setShowRelationForm(true);

          }}

          onEdit={(row) => {

            setEditingRelation(row);

            setShowRelationForm(true);

          }}

        />


        {/*  PURPOSE MASTER*/}
           
         

        <PurposeTable

          data={purposes}

          onAdd={() => {

            setEditingPurpose(null);

            setShowPurposeForm(true);

          }}

          onEdit={(row) => {

            setEditingPurpose(row);

            setShowPurposeForm(true);

          }}

          onDelete={(id) => {
            setPurposes((previous) =>
              previous.filter((item) => item.id !== id)
            );
          }}

        />


        {/*    REASON MASTER*/}
         
         

        <ReasonTable

          data={regions}

          onAdd={() => {

            setEditingReason(null);

            setShowReasonForm(true);

          }}

          onEdit={(row) => {

            setEditingReason(row);

            setShowReasonForm(true);

          }}

          onDelete={(id) => {
            setRegions((previous) =>
              previous.filter((item) => item.id !== id)
            );
          }}

        />

      </div>


      {/* IDENTITY FORM  */}
          
     

      {showIdentityForm && (

        <IdentityForm

          data={editingIdentity}

          onSave={() => {

            setEditingIdentity(null);

            setShowIdentityForm(false);

          }}

          onClose={() => {

            setEditingIdentity(null);

            setShowIdentityForm(false);

          }}

        />

      )}


      {/*   RELATION FORM*/}
        
       

      {showRelationForm && (

        <RelationForm

          data={editingRelation}

          onSave={() => {

            setEditingRelation(null);

            setShowRelationForm(false);

          }}

          onClose={() => {

            setEditingRelation(null);

            setShowRelationForm(false);

          }}

        />

      )}


      {/*  PURPOSE FORM*/}
         
       

      {showPurposeForm && (

        <PurposeForm

          data={editingPurpose}

          onSave={(saved) => {
            if (editingPurpose) {
              setPurposes((previous) =>
                previous.map((item) =>
                  item.id === editingPurpose.id
                    ? { ...item, ...saved }
                    : item
                )
              );
            } else {
              setPurposes((previous) => [
                ...previous,
                { ...saved, id: Date.now() },
              ]);
            }

            setEditingPurpose(null);

            setShowPurposeForm(false);

          }}

          onClose={() => {

            setEditingPurpose(null);

            setShowPurposeForm(false);

          }}

        />

      )}


      {/*  REASON FORM*/}
         
       

      {showReasonForm && (

        <ReasonForm

          data={editingReason}

          onSave={(saved) => {
            if (editingReason) {
              setRegions((previous) =>
                previous.map((item) =>
                  item.id === editingReason.id
                    ? { ...item, ...saved }
                    : item
                )
              );
            } else {
              setRegions((previous) => [
                ...previous,
                { ...saved, id: Date.now() },
              ]);
            }

            setEditingReason(null);

            setShowReasonForm(false);

          }}

          onClose={() => {

            setEditingReason(null);

            setShowReasonForm(false);

          }}

        />

      )}

    </div>

  );

};


export default Miscellaneous;