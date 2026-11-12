import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";

import ProductSupplierTable from "./ProductSupplierTable";
import ProductSupplierForm from "./ProductSupplierForm";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./ProductSupplier.css";

const ProductSupplier = () => {
    const { save } = useSwaggerEntity("productSupplier");

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);

    const [refresh, setRefresh] = useState(0);


    // =====================================================
    // ADD
    // =====================================================

    const handleAdd = () => {

        setEditData(null);

        setShowForm(true);

    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (supplier) => {

        setEditData(supplier);

        setShowForm(true);

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleClose = () => {

        setShowForm(false);

        setEditData(null);

    };


    // =====================================================
    // SAVE SUCCESS
    // =====================================================

    const handleSaveSuccess = async (formData) => {
        try {
            await save(formData, editData);
            setShowForm(false);
            setEditData(null);
            setRefresh((prev) => prev + 1);
        } catch (error) {
            toast.error(error || "Unable to save product supplier.");
        }
    };


    return (

        <div className="product-supplier-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="product-supplier-page-header">

                <div>

                    <h1>
                        PRODUCT SUPPLIER
                    </h1>

                    <p>
                        Manage Product Supplier
                    </p>

                </div>

            </div>


            {/* =================================================
                LIST CARD
            ================================================= */}

            <div className="product-supplier-card">


                {/* CARD HEADER */}

                <div className="product-supplier-card-header">

                    <div>

                        <h2>
                            PRODUCT SUPPLIER LIST
                        </h2>

                    </div>


                    <AddButton
                        onClick={handleAdd}
                    />

                </div>
                  
                  <hr/>

                {/* TABLE */}

                <ProductSupplierTable
                    onEdit={handleEdit}
                    refresh={refresh}
                />

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <ProductSupplierForm

                    data={editData}

                    onClose={handleClose}

                    onSave={handleSaveSuccess}

                />

            )}

        </div>

    );

};

export default ProductSupplier;