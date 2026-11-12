import React, {
    useState,
} from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import "./GroupMember.css";

import "../../../components/common/CommonForm.css";
import "../../../components/common/CommonView.css";
import "../../../utils/validation.css";

import GroupMemberForm from "./GroupMemberForm";
import GroupMemberTable from "./GroupMemberTable";
import GroupMemberView from "./GroupMemberView";

import {
    AddButton,
} from "../../../components/buttons";
import { toast } from "react-toastify";


const GroupMember = () => {

    // =====================================================
    // SAMPLE DATA
    // =====================================================

    const { items: groupMembers, remove, save } = useSwaggerEntity("groupMember");



    // =====================================================
    // MODAL STATES
    // =====================================================

    const [showForm, setShowForm] =
        useState(false);

    const [showView, setShowView] =
        useState(false);

    const [editData, setEditData] =
        useState(null);

    const [viewData, setViewData] =
        useState(null);


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

    const handleEdit = (item) => {

        setEditData(item);

        setShowForm(true);

    };


    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (item) => {

        setViewData(item);

        setShowView(true);

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {
        try {
            await remove(id);
        } catch (error) {
            toast.error(error || "Unable to delete group member.");
        }
    };

    const handleSave = async (formData) => {
        try {
            await save(formData, editData);
            setShowForm(false);
            setEditData(null);
        } catch (error) {
            toast.error(error || "Unable to save group member.");
        }
    };

    return (

        <div className="group-member-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="group-member-page-header">

                <div>

                    <h1>
                        GROUP MEMBER
                    </h1>

                    <p>
                        Manage group members
                    </p>

                </div>

            </div>


            {/* =================================================
                CARD
            ================================================= */}

            <div className="group-member-card">


                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <div className="group-member-card-header">

                    <h2>
                        GROUP MEMBER LIST
                    </h2>


                    <div className="group-member-card-actions">

                        <AddButton
                            onClick={handleAdd}
                        />

                    </div>

                </div>


                {/* =================================================
                    TABLE
                ================================================= */}

                <GroupMemberTable

                    data={groupMembers}

                    onView={handleView}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <GroupMemberForm

                    data={editData}

                    onSave={handleSave}

                    onClose={() => {

                        setShowForm(false);

                        setEditData(null);

                    }}

                />

            )}


            {/* =================================================
                VIEW
            ================================================= */}

            {showView && (

                <GroupMemberView

                    data={viewData}

                    onClose={() => {

                        setShowView(false);

                        setViewData(null);

                    }}

                />

            )}

        </div>

    );

};


export default GroupMember;