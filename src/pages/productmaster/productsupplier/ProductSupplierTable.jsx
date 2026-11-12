import React, { useMemo, useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

import ViewButton from "../../../components/buttons/ViewButton";
import EditButton from "../../../components/buttons/EditButton";
import DeleteButton from "../../../components/buttons/DeleteButton";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import "./ProductSupplier.css";

const ProductSupplierTable = ({
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

const { items: suppliers, remove } = useSwaggerEntity("productSupplier");



    // =====================================================
    // SEARCH
    // =====================================================

    const filteredSuppliers = useMemo(() => {

        const value = search.toLowerCase().trim();

        return suppliers.filter((item) => {

            return (

                item.name.toLowerCase().includes(value)

                ||

                item.code.toLowerCase().includes(value)

                ||

                item.mobile.toLowerCase().includes(value)

                ||

                item.phone.toLowerCase().includes(value)

                ||

                item.address.toLowerCase().includes(value)

                ||

                item.city.toLowerCase().includes(value)

                ||

                item.state.toLowerCase().includes(value)

                ||

                item.organization.toLowerCase().includes(value)

                ||

                item.gstin.toLowerCase().includes(value)

                ||

                item.remark.toLowerCase().includes(value)

                ||

                item.status.toLowerCase().includes(value)

            );

        });

    }, [suppliers, search, refresh]);


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Product Supplier?",
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

    const handleView = (supplier) => {

        setViewData(supplier);

    };


    return (

        <>


            {/* =================================================
                TOP CONTROLS
            ================================================= */}

            <div className="product-supplier-controls">


                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product Supplier..."
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

                    <thead>

                        <tr>

                            <th>
                                SR. NO.
                            </th>

                            <th>
                                NAME
                            </th>

                            <th>
                                CODE
                            </th>

                            <th>
                                MOBILE
                            </th>

                            <th>
                                PHONE
                            </th>

                            <th>
                                ADDRESS
                            </th>

                            <th>
                                CITY
                            </th>

                            <th>
                                ORGANIZATION
                            </th>

                            <th>
                                GSTIN
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


                    <tbody>

                        {filteredSuppliers
                            .slice(0, entries)
                            .map((supplier, index) => (

                                <tr key={supplier.id}>


                                    {/* SR NO */}

                                    <td>
                                        {index + 1}
                                    </td>


                                    {/* NAME */}

                                    <td>
                                        {supplier.name}
                                    </td>


                                    {/* CODE */}

                                    <td>
                                        {supplier.code}
                                    </td>


                                    {/* MOBILE */}

                                    <td>
                                        {supplier.mobile}
                                    </td>


                                    {/* PHONE */}

                                    <td>
                                        {supplier.phone || "-"}
                                    </td>


                                    {/* ADDRESS */}

                                    <td>
                                        {supplier.address}
                                    </td>


                                    {/* CITY */}

                                    <td>
                                        {supplier.city}
                                    </td>


                                    {/* ORGANIZATION */}

                                    <td>
                                        {supplier.organization}
                                    </td>


                                    {/* GSTIN */}

                                    <td>
                                        {supplier.gstin || "-"}
                                    </td>


                                    {/* REMARK */}

                                    <td>
                                        {supplier.remark || "-"}
                                    </td>


                                    {/* CREATED */}

                                    <td>
                                        {supplier.createdAt}
                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        <span
                                            className={`table-status ${
                                                supplier.status.toLowerCase()
                                            }`}
                                        >
                                            {supplier.status}
                                        </span>

                                    </td>


                                    {/* ACTION */}

                                    <td>

                                        <div className="table-action">

                                            <ViewButton
                                                onClick={() =>
                                                    handleView(supplier)
                                                }
                                            />

                                            <EditButton
                                                onClick={() =>
                                                    onEdit(supplier)
                                                }
                                            />

                                            <DeleteButton
                                                onClick={() =>
                                                    handleDelete(
                                                        supplier.id
                                                    )
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))}


                        {filteredSuppliers.length === 0 && (

                            <tr>

                                <td
                                    colSpan="13"
                                    className="table-empty"
                                >
                                    No Product Supplier Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="product-supplier-table-footer">

                <div>

                    Showing{" "}

                    {filteredSuppliers.length === 0
                        ? 0
                        : 1}

                    {" "}to{" "}

                    {Math.min(
                        entries,
                        filteredSuppliers.length
                    )}

                    {" "}of{" "}

                    {filteredSuppliers.length}

                    {" "}entries

                </div>


                <div className="product-supplier-pagination">

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

                </div>

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
                        className="common-view-modal product-supplier-view-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* HEADER */}

                        <div className="common-view-header">

                            <h2>
                                SUPPLIER DETAILS
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


                        {/* BODY */}

                        <div className="common-view-body">


                            {/* =================================================
                                SUPPLIER IMAGES
                            ================================================= */}

                            <div className="common-view-image supplier-view-images">


                                <div className="supplier-image-block">

                                    <h4>
                                        SUPPLIER PHOTO
                                    </h4>

                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="Supplier"
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                    />

                                </div>


                                <div className="supplier-image-block">

                                    <h4>
                                        ORGANIZATION LOGO
                                    </h4>

                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="Organization"
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                DETAILS
                            ================================================= */}

                            <div className="common-view-details">


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        SUPPLIER NAME
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.name}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        SUPPLIER CODE
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.code}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        SUPPLIER MOBILE NO
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.mobile}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        SUPPLIER PHONE NO
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.phone || "-"}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        SUPPLIER EMAIL
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.email || "-"}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        ADDRESS
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.address}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        CITY
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.city}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        STATE
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.state}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        PIN CODE
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.pin}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        ORGANIZATION
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.organization}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        GSTIN
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.gstin || "-"}
                                    </div>

                                </div>


                                <div className="common-view-row">

                                    <div className="common-view-label">
                                        REMARK
                                    </div>

                                    <div>
                                        :
                                    </div>

                                    <div className="common-view-value">
                                        {viewData.remark || "-"}
                                    </div>

                                </div>


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


                        {/* FOOTER */}

                        <div className="common-view-footer">

                            <button
                                type="button"
                                className="product-supplier-close-btn"
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

export default ProductSupplierTable;