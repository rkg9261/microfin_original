import React, { useEffect, useState } from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";

import "./Member.css";

import MemberForm from "./MemberForm";
import MemberTable from "./MemberTable";

import {
    AddButton,
    ViewButton,
    EditButton,
    DeleteButton,
    CloseButton,
} from "../../../components/buttons";
import { toast } from "react-toastify";


const Member = () => {
    const dispatch = useAppDispatch();
    const { items: branches, loading: branchesLoading } = useAppSelector(
        (state) => state.branch
    );

    useEffect(() => {
        dispatch(fetchBranches());
    }, [dispatch]);


    // =====================================================
    // FORM
    // =====================================================

    const [showForm, setShowForm] = useState(false);

    const [editData, setEditData] = useState(null);


    // =====================================================
    // VIEW
    // =====================================================

    const [showView, setShowView] = useState(false);

    const [viewData, setViewData] = useState(null);


    // =====================================================
    // FILTER
    // =====================================================

    const [filters, setFilters] = useState({
        branch: "",
        staff: "",
        loanExist: "All",
        status: "",
    });


    // =====================================================
    // APPLIED FILTER
    // =====================================================

    const [appliedFilters, setAppliedFilters] = useState({});


    // =====================================================
    // MEMBER DATA
    // =====================================================

    const { items: members, remove, save } = useSwaggerEntity("member");



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

    const handleEdit = (data) => {

        setEditData(data);

        setShowForm(true);

    };


    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (data) => {

        setViewData(data);

        setShowView(true);

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleCloseForm = () => {

        setShowForm(false);

        setEditData(null);

    };


    // =====================================================
    // CLOSE VIEW
    // =====================================================

    const handleCloseView = () => {

        setShowView(false);

        setViewData(null);

    };


    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = async (data) => {
        try {
            await save(data, editData);
            handleCloseForm();
        } catch (error) {
            toast.error(error || "Unable to save member.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(id);
        } catch (error) {
            toast.error(error || "Unable to delete member.");
        }
    };


    // =====================================================
    // FILTER CHANGE
    // =====================================================

    const handleFilterChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =====================================================
    // APPLY FILTER
    // =====================================================

    const handleApplyFilter = () => {

        setAppliedFilters({
            ...filters,
        });

    };


    // =====================================================
    // RESET FILTER
    // =====================================================

    const handleResetFilter = () => {

        const reset = {
            branch: "",
            staff: "",
            loanExist: "All",
            status: "",
        };

        setFilters(reset);

        setAppliedFilters({});

    };


    // =====================================================
    // FILTER DATA
    // =====================================================

    const filteredMembers =
        members.filter((member) => {

            const branchMatch =
                !appliedFilters.branch ||
                String(member.branchId ?? "") ===
                    String(appliedFilters.branch) ||
                String(member.branch || "")
                    .toLowerCase()
                    .includes(
                        String(appliedFilters.branch).toLowerCase()
                    );


            const staffMatch =
                !appliedFilters.staff ||
                String(member.staff || "")
                    .toLowerCase()
                    .includes(
                        String(appliedFilters.staff).toLowerCase()
                    );


            const loanMatch =
                !appliedFilters.loanExist ||
                appliedFilters.loanExist === "All" ||
                member.loanExist ===
                    appliedFilters.loanExist;


            const statusMatch =
                !appliedFilters.status ||
                member.status ===
                    appliedFilters.status;


            return (
                branchMatch &&
                staffMatch &&
                loanMatch &&
                statusMatch
            );

        });


    return (

        <div className="member-page">


            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <div className="member-page-title">

                <h1>
                    MEMBER
                </h1>

            </div>


            {/* =================================================
                SEARCH FILTER
            ================================================= */}

            <div className="member-filter-card">


                <div className="member-filter-title">

                    <span>
                        SEARCH BY
                    </span>

                </div>


                <div className="member-filter-grid">


                    {/* BRANCH */}

                    <div className="member-filter-group">

                        <label>
                            BRANCH
                        </label>

                        <select
                            name="branch"
                            value={filters.branch}
                            onChange={handleFilterChange}
                            disabled={branchesLoading}
                        >
                            <option value="">
                                {branchesLoading
                                    ? "Loading branches..."
                                    : "All Branches"}
                            </option>
                            {branches.map((branch) => {
                                const id = branch.branchId ?? branch.id;
                                return (
                                    <option key={id} value={String(id)}>
                                        {branch.branchName ||
                                            branch.name ||
                                            `Branch ${id}`}
                                    </option>
                                );
                            })}
                        </select>

                    </div>


                    {/* STAFF */}

                    <div className="member-filter-group">

                        <label>
                            STAFF (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="staff"
                            placeholder="Search Staff"
                            value={filters.staff}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* LOAN */}

                    <div className="member-filter-group">

                        <label>
                            LOAN EXIST <span>*</span>
                        </label>

                        <select
                            name="loanExist"
                            value={filters.loanExist}
                            onChange={handleFilterChange}
                        >

                            <option value="All">
                                All
                            </option>

                            <option value="Yes">
                                Yes
                            </option>

                            <option value="No">
                                No
                            </option>

                        </select>

                    </div>


                    {/* STATUS */}

                    <div className="member-filter-group">

                        <label>
                            SELECT STATUS <span>*</span>
                        </label>

                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>

                        </select>

                    </div>


                </div>


                {/* FILTER BUTTON */}

                <div className="member-filter-actions">

                    <button
                        type="button"
                        className="member-search-button"
                        onClick={handleApplyFilter}
                    >
                        🔍 Search
                    </button>

                    <button
                        type="button"
                        className="member-reset-button"
                        onClick={handleResetFilter}
                    >
                        Reset
                    </button>

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <MemberTable

                members={filteredMembers}

                onAdd={handleAdd}

                onView={handleView}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />


            {/* =================================================
                FORM MODAL
            ================================================= */}

            {showForm && (

                <MemberForm

                    data={editData}

                    onSave={handleSave}

                    onClose={handleCloseForm}

                />

            )}


            {/* =================================================
                VIEW MODAL
            ================================================= */}

            {showView && viewData && (

                <div
                    className="member-view-overlay"
                    onClick={handleCloseView}
                >

                    <div
                        className="member-view-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="member-view-header">

                            <h2>
                                MEMBER DETAILS
                            </h2>

                            <CloseButton
                                onClick={
                                    handleCloseView
                                }
                            />

                        </div>


                        <div className="member-view-body">

                            <div className="member-view-grid">

                                <div>
                                    <b>MEMBER ID</b>
                                    <span>
                                        {viewData.memberId}
                                    </span>
                                </div>

                                <div>
                                    <b>MEMBER NAME</b>
                                    <span>
                                        {viewData.memberName}
                                    </span>
                                </div>

                                <div>
                                    <b>FATHER / HUSBAND</b>
                                    <span>
                                        {viewData.fatherHusbandName}
                                    </span>
                                </div>

                                <div>
                                    <b>GENDER</b>
                                    <span>
                                        {viewData.gender}
                                    </span>
                                </div>

                                <div>
                                    <b>DATE OF BIRTH</b>
                                    <span>
                                        {viewData.dateOfBirth}
                                    </span>
                                </div>

                                <div>
                                    <b>MOBILE NUMBER</b>
                                    <span>
                                        {viewData.mobileNumber}
                                    </span>
                                </div>

                                <div>
                                    <b>ADDRESS</b>
                                    <span>
                                        {viewData.address}
                                    </span>
                                </div>

                                <div>
                                    <b>STATE</b>
                                    <span>
                                        {viewData.state}
                                    </span>
                                </div>

                                <div>
                                    <b>DISTRICT</b>
                                    <span>
                                        {viewData.district}
                                    </span>
                                </div>

                                <div>
                                    <b>VILLAGE / CITY</b>
                                    <span>
                                        {viewData.villageCity}
                                    </span>
                                </div>

                                <div>
                                    <b>BRANCH</b>
                                    <span>
                                        {viewData.branch}
                                    </span>
                                </div>

                                <div>
                                    <b>MEMBER SINCE</b>
                                    <span>
                                        {viewData.memberSince}
                                    </span>
                                </div>

                                <div>
                                    <b>OCCUPATION</b>
                                    <span>
                                        {viewData.occupation}
                                    </span>
                                </div>

                                <div>
                                    <b>KYC TYPE</b>
                                    <span>
                                        {viewData.kycType}
                                    </span>
                                </div>

                                <div>
                                    <b>KYC NUMBER</b>
                                    <span>
                                        {viewData.kycNumber}
                                    </span>
                                </div>

                                <div>
                                    <b>NOMINEE NAME</b>
                                    <span>
                                        {viewData.nomineeName}
                                    </span>
                                </div>

                                <div>
                                    <b>NOMINEE RELATION</b>
                                    <span>
                                        {viewData.nomineeRelation}
                                    </span>
                                </div>

                                <div>
                                    <b>STATUS</b>

                                    <span>

                                        <strong
                                            className={
                                                viewData.status ===
                                                "ACTIVE"
                                                    ? "member-active-status"
                                                    : "member-inactive-status"
                                            }
                                        >
                                            {viewData.status}
                                        </strong>

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};


export default Member;