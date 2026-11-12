import React, { useState } from "react";

import "./ProductCategory.css";

import "../../../components/common/Table.css";
import "../../../components/common/Search.css";
import "../../../components/common/CommonForm.css";

import ProductCategoryTable from "./ProductCategoryTable";
import ProductCategoryForm from "./ProductCategoryForm";
import ProductCategoryView from "./ProductCategoryView";


const ProductCategory = () => {

    const [showForm, setShowForm] =
        useState(false);

    const [showView, setShowView] =
        useState(false);

    const [editingData, setEditingData] =
        useState(null);

    const [viewData, setViewData] =
        useState(null);

    const [refreshKey, setRefreshKey] =
        useState(0);


    // ============================================================
    // ADD PRODUCT CATEGORY
    // ============================================================

    const handleAdd = () => {

        setEditingData(null);

        setShowForm(true);

    };


    // ============================================================
    // EDIT PRODUCT CATEGORY
    // ============================================================

    const handleEdit = (row) => {

        setEditingData(row);

        setShowForm(true);

    };


    // ============================================================
    // VIEW PRODUCT CATEGORY
    // ============================================================

    const handleView = (row) => {

        setViewData(row);

        setShowView(true);

    };


    // ============================================================
    // AFTER CREATE / UPDATE
    // ============================================================

    const handleSave = () => {

        setShowForm(false);

        setEditingData(null);

        // Refresh table from GET API
        setRefreshKey(
            (prev) => prev + 1
        );

    };


    // ============================================================
    // CLOSE FORM
    // ============================================================

    const handleFormClose = () => {

        setShowForm(false);

        setEditingData(null);

    };


    // ============================================================
    // CLOSE VIEW
    // ============================================================

    const handleViewClose = () => {

        setShowView(false);

        setViewData(null);

    };


    return (

        <div className="product-category-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="product-category-header">

                <div>

                    <h2>
                        PRODUCT CATEGORY
                    </h2>

                    <p>
                        Manage Product Category
                    </p>

                </div>

            </div>


            {/* ==================================================
                PRODUCT CATEGORY TABLE
                GET API IS HANDLED INSIDE TABLE
            ================================================== */}

            <ProductCategoryTable

                onAdd={handleAdd}

                onEdit={handleEdit}

                onView={handleView}

                refreshKey={refreshKey}

            />


            {/* ==================================================
                ADD / EDIT FORM
                POST / PUT API IS HANDLED INSIDE FORM
            ================================================== */}

            {showForm && (

                <ProductCategoryForm

                    data={editingData}

                    onSave={handleSave}

                    onClose={handleFormClose}

                />

            )}


            {/* ==================================================
                VIEW
            ================================================== */}

            {showView && (

                <ProductCategoryView

                    data={viewData}

                    onClose={handleViewClose}

                />

            )}


        </div>

    );

};


export default ProductCategory;