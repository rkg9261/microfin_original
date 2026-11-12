import React, { useState } from "react";

import ProductVariantTable from "./ProductVariantTable";
import ProductVariantForm from "./ProductVariantForm";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import AddButton from "../../../components/buttons/AddButton";

import "../../../components/common/CommonForm.css";
import "../../../components/common/CommonView.css";
import "../../../components/common/Search.css";
import "../../../components/common/Table.css";
import "../../../components/common/EntriesDropdown.css";

import "./ProductVariant.css";

const ProductVariant = () => {
    const { save } = useSwaggerEntity("productVariant");

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);

    const [refresh, setRefresh] = useState(0);

    // Open Add Form
    const handleAdd = () => {

        setEditData(null);

        setShowForm(true);

    };

    // Open Edit Form
    const handleEdit = (variant) => {

        setEditData(variant);

        setShowForm(true);

    };

    // Close Form
    const handleClose = () => {

        setShowForm(false);

        setEditData(null);

    };

    const handleSave = async (formData) => {
        try {
            await save(formData, editData);
            setShowForm(false);
            setEditData(null);
            setRefresh((prev) => prev + 1);
        } catch (error) {
            toast.error(error || "Unable to save product variant.");
        }
    };

    return (

        <div className="product-variant-page">

            {/* =================================
                PAGE HEADER
            ================================= */}

            <div className="product-variant-header">

                <div>

                    <h1>
                        Product Variant
                    </h1>

                    <p>
                        Manage Product Variants
                    </p>

                </div>

                <AddButton
                    onClick={handleAdd}
                />

            </div>


            {/* =================================
                TABLE
            ================================= */}

            <ProductVariantTable
                onEdit={handleEdit}
                refresh={refresh}
            />


            {/* =================================
                ADD / EDIT FORM
            ================================= */}

            {showForm && (

                <ProductVariantForm

                    editData={editData}

                    onClose={handleClose}

                    onSave={handleSave}

                />

            )}

        </div>

    );

};

export default ProductVariant;