import React, { useMemo, useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import ViewButton from "../../../components/buttons/ViewButton";
import EditButton from "../../../components/buttons/EditButton";
import DeleteButton from "../../../components/buttons/DeleteButton";
import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "./ProductVariant.css";

const ProductVariantTable = ({
    onEdit,
    refresh
}) => {
  const confirm = useConfirm();

    const [search, setSearch] = useState("");

    const [entries, setEntries] = useState(10);

    const [viewData, setViewData] = useState(null);


    // =====================================================
    // SAMPLE DATA
    // =====================================================

const { items: variants, remove } = useSwaggerEntity("productVariant");



    // =====================================================
    // SEARCH
    // =====================================================

    const filteredVariants = useMemo(() => {

        const value = search.toLowerCase().trim();

        return variants.filter((item) => {

            return (

                item.name
                    .toLowerCase()
                    .includes(value)

                ||

                item.code
                    .toLowerCase()
                    .includes(value)

                ||

                item.remark
                    .toLowerCase()
                    .includes(value)

                ||

                item.createdAt
                    .toLowerCase()
                    .includes(value)

                ||

                item.status
                    .toLowerCase()
                    .includes(value)

            );

        });

    }, [variants, search, refresh]);


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Product Variant?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

        if (!confirmDelete) {
            return;
        }

        remove(id);

    };


    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (variant) => {

        setViewData(variant);

    };


    return (

        <>

            {/* =================================================
                TOP CONTROLS
            ================================================= */}

            <div className="product-variant-controls">

                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product Variant..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="table-wrapper">

                <table className="common-table">

                    {/* ================= HEADER ================= */}

                    <thead>

                        <tr>

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                VARIANT
                            </th>

                            <th>
                                CODE
                            </th>

                            <th>
                                REMARK
                            </th>

                            <th>
                                CREATED AT
                            </th>

                            <th>
                                STATUS
                            </th>

                            <th>
                                ACTION
                            </th>

                        </tr>

                    </thead>


                    {/* ================= BODY ================= */}

                    <tbody>

                        {filteredVariants
                            .slice(0, entries)
                            .map((variant, index) => (

                                <tr key={variant.id}>

                                    {/* SR NO */}

                                    <td>
                                        {index + 1}
                                    </td>


                                    {/* VARIANT */}

                                    <td>
                                        {variant.name}
                                    </td>


                                    {/* CODE */}

                                    <td>
                                        {variant.code}
                                    </td>


                                    {/* REMARK */}

                                    <td>
                                        {variant.remark}
                                    </td>


                                    {/* CREATED */}

                                    <td>
                                        {variant.createdAt}
                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        <span
                                            className={`table-status ${
                                                variant.status.toLowerCase()
                                            }`}
                                        >
                                            {variant.status}
                                        </span>

                                    </td>


                                    {/* ACTION */}

                                    <td>

                                        <div className="table-action">

                                            <ViewButton
                                                onClick={() =>
                                                    handleView(variant)
                                                }
                                            />

                                            <EditButton
                                                onClick={() =>
                                                    onEdit(variant)
                                                }
                                            />

                                            <DeleteButton
                                                onClick={() =>
                                                    handleDelete(
                                                        variant.id
                                                    )
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))}


                        {/* ================= EMPTY ================= */}

                        {filteredVariants.length === 0 && (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="table-empty"
                                >
                                    No Product Variant Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                TABLE FOOTER
            ================================================= */}

            <div className="product-variant-table-footer">

                <div className="product-variant-showing">

                    Showing{" "}

                    {filteredVariants.length === 0
                        ? 0
                        : 1}

                    {" "}to{" "}

                    {Math.min(
                        entries,
                        filteredVariants.length
                    )}

                    {" "}of{" "}

                    {filteredVariants.length}

                    {" "}entries

                </div>


                {/* <div className="product-variant-pagination">

                    <button>
                        Prev
                    </button>

                    <button className="active">
                        1
                    </button>

                    <button>
                        2
                    </button>

                    <button>
                        Next
                    </button>

                </div> */}

            </div>


            {/* =================================================
                VIEW MODAL
            ================================================= */}

            {viewData && (

                <div
                    className="common-view-overlay"
                    onClick={() => setViewData(null)}
                >

                    <div
                        className="common-view-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* ================= HEADER ================= */}

                        <div className="common-view-header">

                            <h2>
                                VARIANT DETAILS
                            </h2>

                            <button
                                type="button"
                                className="common-view-close"
                                onClick={() =>
                                    setViewData(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* ================= BODY ================= */}

                        <div className="common-view-body">


                            {/* ================= IMAGE ================= */}

                            <div className="common-view-image">

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="Variant"
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                />

                            </div>


                            {/* ================= DETAILS ================= */}

                            <div className="common-view-details">


                                {/* NAME */}

                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        VARIANT NAME
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.name}
                                    </div>

                                </div>


                                {/* CODE */}

                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        VARIANT CODE
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.code}
                                    </div>

                                </div>


                                {/* REMARK */}

                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        REMARK
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.remark}
                                    </div>

                                </div>


                                {/* CREATED */}

                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        CREATE AT
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.createdAt}
                                    </div>

                                </div>


                                {/* STATUS */}

                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        STATUS
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">

                                        <span
                                            className={`common-view-status ${
                                                viewData.status.toLowerCase()
                                            }`}
                                        >
                                            {viewData.status}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================= FOOTER ================= */}

                        <div className="common-view-footer">

                            <button
                                type="button"
                                className="product-variant-close-btn"
                                onClick={() =>
                                    setViewData(null)
                                }
                            >
                                CLOSE
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

};

export default ProductVariantTable;