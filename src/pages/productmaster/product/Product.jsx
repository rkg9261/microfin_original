import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";

import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./Product.css";

const Product = () => {
    const { save } = useSwaggerEntity("product");

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);

    const [refresh, setRefresh] = useState(0);


    // ==========================================
    // ADD
    // ==========================================

    const handleAdd = () => {

        setEditData(null);

        setShowForm(true);

    };


    // ==========================================
    // EDIT
    // ==========================================

    const handleEdit = (product) => {

        setEditData(product);

        setShowForm(true);

    };


    // ==========================================
    // CLOSE
    // ==========================================

    const handleClose = () => {

        setShowForm(false);

        setEditData(null);

    };


    // ==========================================
    // SAVE SUCCESS
    // ==========================================

    const handleSaveSuccess = async (formData) => {
        try {
            await save(formData, editData);
            setShowForm(false);
            setEditData(null);
            setRefresh((prev) => prev + 1);
        } catch (error) {
            toast.error(error || "Unable to save product.");
        }
    };


    return (

        <div className="product-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="product-page-header">

                <div>

                    <h1>
                        PRODUCT
                    </h1>

                    <p>
                        Manage Product
                    </p>

                </div>

            </div>


            {/* ==========================================
                PRODUCT CARD
            ========================================== */}

            <div className="product-card">

                <div className="product-card-header">

                    <h2>
                        PRODUCT LIST
                    </h2>

                    <AddButton
                        onClick={handleAdd}
                    />

                </div>

                <hr />


                {/* ==========================================
                    TABLE
                ========================================== */}

                <ProductTable
                    onEdit={handleEdit}
                    refresh={refresh}
                />

            </div>


            {/* ==========================================
                FORM
            ========================================== */}

            {showForm && (

                <ProductForm

                    data={editData}

                    onClose={handleClose}

                    onSave={handleSaveSuccess}

                />

            )}

        </div>

    );

};

export default Product;