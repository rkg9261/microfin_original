import React, { useState } from "react";

import AddButton from "../../../components/buttons/AddButton";

import InsurancePartyTable from "./InsurancePartyTable";
import InsurancePartyForm from "./InsurancePartyForm";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./InsuranceParty.css";


const InsuranceParty = () => {
    const { save } = useSwaggerEntity("insuranceParty");

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

    const handleEdit = (party) => {

        setEditData(party);

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
    // SAVE SUCCESS
    // ==========================================

    const handleSaveSuccess = async (formData) => {
        try {
            await save(formData, editData);
            setShowForm(false);
            setEditData(null);
            setRefresh((prev) => prev + 1);
        } catch (error) {
            toast.error(error || "Unable to save insurance party.");
        }
    };


    return (

        <div className="insurance-party-page">


            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="insurance-party-page-header">

                <div>

                    <h1>
                        INSURANCE PARTY
                    </h1>

                    <p>
                        Manage Insurance Party
                    </p>

                </div>

            </div>


            {/* ==========================================
                LIST CARD
            ========================================== */}

            <div className="insurance-party-card">


                {/* CARD HEADER */}

                <div className="insurance-party-card-header">

                    <h2>
                        INSURANCE PARTY LIST
                    </h2>


                    <AddButton
                        onClick={handleAdd}
                    />

                </div>


                <hr />


                {/* TABLE */}

                <InsurancePartyTable
                    onEdit={handleEdit}
                    refresh={refresh}
                />

            </div>


            {/* ==========================================
                FORM
            ========================================== */}

            {showForm && (

                <InsurancePartyForm

                    data={editData}

                    onClose={handleClose}

                    onSaveSuccess={handleSaveSuccess}

                />

            )}

        </div>

    );

};


export default InsuranceParty;