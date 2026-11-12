import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";

import ProductLoanTable from "./ProductLoanTable";
import ProductLoanForm from "./ProductLoanForm";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./ProductLoan.css";


const ProductLoan = () => {
    const { save } = useSwaggerEntity("productLoan");

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

    const handleEdit = (loan) => {

        setEditData(loan);

        setShowForm(true);

    };


    // ==========================================
    // CLOSE FORM
    // ==========================================

    const handleClose = () => {

        setShowForm(false);

        setEditData(null);

    };


    // ==========================================
    // SAVE
    // ==========================================

    const handleSave = async (data) => {
        try {
            await save(data, editData);
            setShowForm(false);
            setEditData(null);
            setRefresh((prev) => prev + 1);
        } catch (error) {
            toast.error(error || "Unable to save product loan.");
        }
    };


    return (

        <div className="product-loan-page">


            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="product-loan-page-header">

                <div>

                    <h1>
                        PRODUCT MASTER LOAN
                    </h1>

                    <p>
                        Manage Product Loan Details
                    </p>

                </div>

            </div>


            {/* ==========================================
                SEARCH SECTION
            ========================================== */}

            <div className="product-loan-search-card">

                <h2>
                    SEARCH BY
                </h2>


                <div className="product-loan-search-grid">


                    {/* BRANCH */}

                    <div className="product-loan-search-group">

                        <label>
                            Branch
                        </label>

                        <select>

                            <option value="">
                                Select Branch
                            </option>

                            <option value="SHREEJA GROUP">
                                SHREEJA GROUP
                            </option>

                            <option value="LASKARHAT">
                                LASKARHAT
                            </option>

                        </select>

                    </div>


                    {/* CUSTOMER */}

                    <div className="product-loan-search-group">

                        <label>
                            Customer (Type Here)
                        </label>

                        <input
                            type="text"
                            placeholder="Customer Name"
                        />

                    </div>


                    {/* DATE */}

                    <div className="product-loan-search-group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                        />

                    </div>


                    {/* STATUS */}

                    <div className="product-loan-search-group">

                        <label>
                            Select Status
                            <span> *</span>
                        </label>

                        <select>

                            <option value="">
                                Select Status
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="DISBURSED">
                                Disbursed
                            </option>

                            <option value="DELETE">
                                Delete
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ==========================================
                LIST CARD
            ========================================== */}

            <div className="product-loan-card">


                {/* CARD HEADER */}

                <div className="product-loan-card-header">

                    <h2>
                        PRODUCT LOAN DETAILS
                    </h2>


                    <div className="product-loan-card-actions">

                        {/* <button
                            type="button"
                            className="product-loan-download-btn"
                        >
                            DOWNLOAD EXCEL
                        </button> */}


                        <AddButton
                            onClick={handleAdd}
                        />

                    </div>

                </div>


                <hr />


                {/* TABLE */}

                <ProductLoanTable
                    onEdit={handleEdit}
                    refresh={refresh}
                />

            </div>


            {/* ==========================================
                FORM
            ========================================== */}

            {showForm && (

                <ProductLoanForm

                    data={editData}

                    onClose={handleClose}

                    onSave={handleSave}

                />

            )}

        </div>

    );

};


export default ProductLoan;