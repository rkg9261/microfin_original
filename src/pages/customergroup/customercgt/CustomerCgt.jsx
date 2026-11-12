import React, {
    useEffect,
    useState,
} from "react";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";

import "./CustomerCgt.css";

import CustomerCgtForm from "./CustomerCgtForm";
import CustomerCgtTable from "./CustomerCgtTable";
import { toast } from "react-toastify";


const CustomerCgt = () => {
    const dispatch = useAppDispatch();
    const { items: branches, loading: branchesLoading } = useAppSelector(
        (state) => state.branch
    );

    useEffect(() => {
        dispatch(fetchBranches());
    }, [dispatch]);


    // =====================================================
    // FORM MODAL
    // =====================================================

    const [showForm, setShowForm] =
        useState(false);


    // =====================================================
    // EDIT DATA
    // =====================================================

    const [editData, setEditData] =
        useState(null);


    // =====================================================
    // FILTER DATA
    // =====================================================

    const [filters, setFilters] =
        useState({

            branch: "",
            collectionCenter: "",
            member: "",
            cgtStaff: "",
            grtStaff: "",
            cgtDate: "",
            grtDate: "",
            status: "All",

        });


    // =====================================================
    // APPLIED FILTERS
    // =====================================================

    const [appliedFilters, setAppliedFilters] =
        useState({});


    // =====================================================
    // INITIAL DATA
    // =====================================================

    const { items: records, remove, save } = useSwaggerEntity("memberCgt");



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

    const handleEdit = (record) => {

        setEditData(record);

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
    // SAVE
    // =====================================================

    const handleSave = async (formData) => {
        try {
            await save(formData, editData);
            handleClose();
        } catch (error) {
            toast.error(error || "Unable to save CGT record.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(id);
        } catch (error) {
            toast.error(error || "Unable to delete CGT record.");
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

        setFilters((prev) => ({

            ...prev,

            [name]: value,

        }));

    };


    // =====================================================
    // APPLY FILTER
    // =====================================================

    const handleApplyFilters = () => {

        setAppliedFilters({
            ...filters,
        });

    };


    // =====================================================
    // RESET FILTER
    // =====================================================

    const handleResetFilters = () => {

        const resetData = {

            branch: "",
            collectionCenter: "",
            member: "",
            cgtStaff: "",
            grtStaff: "",
            cgtDate: "",
            grtDate: "",
            status: "All",

        };

        setFilters(resetData);

        setAppliedFilters({});

    };


    // =====================================================
    // FILTER RECORDS
    // =====================================================

    const filteredRecords =
        records.filter((record) => {

            const branchMatch =
                !appliedFilters.branch ||
                String(record.branchId ?? "") ===
                    String(appliedFilters.branch) ||
                String(record.branch || "")
                    .toLowerCase()
                    .includes(
                        String(appliedFilters.branch).toLowerCase()
                    );


            const centerMatch =
                !appliedFilters.collectionCenter ||
                String(record.collectionCenter || "")
                    .toLowerCase()
                    .includes(
                        String(appliedFilters.collectionCenter).toLowerCase()
                    );


            const memberMatch =
                !appliedFilters.member ||
                record.memberName
                    .toLowerCase()
                    .includes(
                        appliedFilters.member
                            .toLowerCase()
                    );


            const cgtStaffMatch =
                !appliedFilters.cgtStaff ||
                record.cgtStaff
                    .toLowerCase()
                    .includes(
                        appliedFilters.cgtStaff
                            .toLowerCase()
                    );


            const grtStaffMatch =
                !appliedFilters.grtStaff ||
                record.grtStaff
                    .toLowerCase()
                    .includes(
                        appliedFilters.grtStaff
                            .toLowerCase()
                    );


            const cgtDateMatch =
                !appliedFilters.cgtDate ||
                record.cgtDate ===
                    appliedFilters.cgtDate;


            const grtDateMatch =
                !appliedFilters.grtDate ||
                record.grtDate ===
                    appliedFilters.grtDate;


            const statusMatch =
                !appliedFilters.status ||
                appliedFilters.status === "All" ||
                record.status ===
                    appliedFilters.status;


            return (
                branchMatch &&
                centerMatch &&
                memberMatch &&
                cgtStaffMatch &&
                grtStaffMatch &&
                cgtDateMatch &&
                grtDateMatch &&
                statusMatch
            );

        });


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="customer-cgt-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="customer-cgt-page-header">

                <div>

                    <h1>
                        CUSTOMERCGT
                    </h1>

                    <p>
                        Customer CGT & GRT Records
                    </p>

                </div>

            </div>


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <div className="customer-cgt-filter-card">


                <div className="customer-cgt-filter-header">

                    <h2>
                        🔎 SEARCH FILTERS
                    </h2>

                </div>


                <div className="customer-cgt-filter-grid">


                    {/* BRANCH */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            🏢 BRANCH
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


                    {/* COLLECTION CENTER */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            🏢 COLLECTION CENTER
                        </label>

                        <select
                            name="collectionCenter"
                            value={filters.collectionCenter}
                            onChange={handleFilterChange}
                        >

                            <option value="">
                                Select Collection Center
                            </option>

                            <option value="DEVAS">
                                DEVAS
                            </option>

                            <option value="TULSI">
                                TULSI
                            </option>

                            <option value="PARSHURAMPUR">
                                PARSHURAMPUR
                            </option>

                        </select>

                    </div>


                    {/* MEMBER */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            👤 MEMBER (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="member"
                            placeholder="Search Member"
                            value={filters.member}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* CGT STAFF */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            👤 CGT STAFF (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="cgtStaff"
                            placeholder="Search CGT Staff"
                            value={filters.cgtStaff}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* GRT STAFF */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            👤 GRT STAFF (TYPE HERE)
                        </label>

                        <input
                            type="text"
                            name="grtStaff"
                            placeholder="Search GRT Staff"
                            value={filters.grtStaff}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* CGT DATE */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            📅 CGT DATE
                        </label>

                        <input
                            type="date"
                            name="cgtDate"
                            value={filters.cgtDate}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* GRT DATE */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            📅 GRT DATE
                        </label>

                        <input
                            type="date"
                            name="grtDate"
                            value={filters.grtDate}
                            onChange={handleFilterChange}
                        />

                    </div>


                    {/* STATUS */}

                    <div className="customer-cgt-filter-group">

                        <label>
                            ℹ STATUS
                        </label>

                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >

                            <option value="All">
                                All
                            </option>

                            <option value="PASSED">
                                Passed
                            </option>

                            <option value="REJECT">
                                Reject
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                        </select>

                    </div>


                </div>


                {/* FILTER BUTTONS */}

                <div className="customer-cgt-filter-buttons">

                    <button
                        type="button"
                        className="customer-cgt-apply-btn"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </button>

                    <button
                        type="button"
                        className="customer-cgt-reset-btn"
                        onClick={handleResetFilters}
                    >
                        Reset
                    </button>

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <CustomerCgtTable

                records={filteredRecords}

                onAdd={handleAdd}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />


            {/* =================================================
                FORM
            ================================================= */}

            {showForm && (

                <CustomerCgtForm

                    data={editData}

                    onSave={handleSave}

                    onClose={handleClose}

                />

            )}

        </div>

    );

};


export default CustomerCgt;