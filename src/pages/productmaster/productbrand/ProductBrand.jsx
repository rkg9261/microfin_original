import React, { useState } from "react";

import "./ProductBrand.css";

import ProductBrandTable from "./ProductBrandTable";
import ProductBrandForm from "./ProductBrandForm";
import ProductBrandView from "./ProductBrandView";

const ProductBrand = () => {

  const [showForm, setShowForm] = useState(false);

  const [editData, setEditData] = useState(null);

  const [showView, setShowView] = useState(false);

  const [viewData, setViewData] = useState(null);

  // Used to refresh table after POST / PUT
  const [refreshKey, setRefreshKey] = useState(0);


 
  // ADD
 

  const handleAdd = () => {

    setEditData(null);

    setShowForm(true);

  };


 
  // EDIT
 

  const handleEdit = (row) => {

    setEditData(row);

    setShowForm(true);

  };


 
  // VIEW
 

  const handleView = (row) => {

    setViewData(row);

    setShowView(true);

  };


 
  // AFTER SAVE
 

  const handleSave = () => {

    setShowForm(false);

    setEditData(null);

    // Refresh GET API
    setRefreshKey((prev) => prev + 1);

  };


 
  // CLOSE FORM
 

  const handleFormClose = () => {

    setShowForm(false);

    setEditData(null);

  };


 
  // CLOSE VIEW
 

  const handleViewClose = () => {

    setShowView(false);

    setViewData(null);

  };


  return (

    <div className="product-brand-page">


      {/* PAGE HEADER */}
         
     

      <div className="page-title">

        <h2>
          PRODUCT BRAND
        </h2>

        <p>
          Manage Product Brand
        </p>

      </div>


      {/*PRODUCT BRAND TABLE  */}
          
    

      <ProductBrandTable

        onAdd={handleAdd}

        onEdit={handleEdit}

        onView={handleView}

        refreshKey={refreshKey}

      />


      {/* PRODUCT BRAND FORM*/}
         
      

      {showForm && (

        <ProductBrandForm

          data={editData}

          onSave={handleSave}

          onClose={handleFormClose}

        />

      )}


      {/*  PRODUCT BRAND VIEW*/}
        
      

      {showView && (

        <ProductBrandView

          data={viewData}

          onClose={handleViewClose}

        />

      )}

    </div>

  );

};

export default ProductBrand;