import React, {
    useEffect,
    useMemo,
    useState,
} from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";

import "../../../components/common/Table.css";
import "../../../components/common/Search.css";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import {
    AddButton,
    EditButton,
    ViewButton,
    DeleteButton,
} from "../../../components/buttons";

import {
    getProductCategories,
    deleteProductCategory,
} from "../../../api/productCategoryApi";

import { toast } from "react-toastify";


const ProductCategoryTable = ({
    onAdd,
    onEdit,
    onView,
    refreshKey,
}) => {
  const confirm = useConfirm();

    // ============================================================
    // STATE
    // ============================================================

    const [data, setData] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [entries, setEntries] =
        useState(10);

    const [loading, setLoading] =
        useState(false);


    // ============================================================
    // GET PRODUCT CATEGORIES
    // ============================================================

    const fetchProductCategories = async () => {

        try {

            setLoading(true);


            const result =
                await getProductCategories();


            console.log(
                "PRODUCT CATEGORY LIST:",
                result
            );


            setData(
                Array.isArray(result)
                    ? result
                    : []
            );

        }

        catch (error) {

            console.error(
                "GET PRODUCT CATEGORY ERROR:",
                error
            );


            if (error.response) {

                console.error(
                    "STATUS:",
                    error.response.status
                );

                console.error(
                    "DATA:",
                    error.response.data
                );

            }


            toast.error(
                error?.response?.data?.message ||
                "Failed to load product categories."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ============================================================
    // GET API ON LOAD / AFTER SAVE
    // ============================================================

    useEffect(() => {

        fetchProductCategories();

    }, [refreshKey]);


    // ============================================================
    // DELETE
    // ============================================================

    const handleDelete = async (id) => {

        const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this product category?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


        if (!confirmed) {

            return;

        }


        try {

            await deleteProductCategory(id);


            toast.success(
                "Product category deleted successfully!"
            );


            // Refresh list
            await fetchProductCategories();

        }

        catch (error) {

            console.error(
                "DELETE PRODUCT CATEGORY ERROR:",
                error
            );


            if (error.response) {

                console.error(
                    "STATUS:",
                    error.response.status
                );

                console.error(
                    "DATA:",
                    error.response.data
                );

            }


            toast.error(
                error?.response?.data?.message ||
                "Failed to delete product category."
            );

        }

    };


    // ============================================================
    // SEARCH
    // ============================================================

    const filteredData = useMemo(() => {

        const searchText =
            search
                .toLowerCase()
                .trim();


        return data.filter((item) => {

            return (

                String(
                    item.category || ""
                )
                    .toLowerCase()
                    .includes(searchText)


                ||

                String(
                    item.code || ""
                )
                    .toLowerCase()
                    .includes(searchText)


                ||

                String(
                    item.remark || ""
                )
                    .toLowerCase()
                    .includes(searchText)


                ||

                String(
                    item.status || ""
                )
                    .toLowerCase()
                    .includes(searchText)

            );

        });

    }, [data, search]);


    // ============================================================
    // FORMAT CREATED DATE
    // ============================================================

    const formatDateTime = (date) => {

        if (!date) {

            return "-";

        }


        return new Date(date)
            .toLocaleString();

    };


    return (

        <div className="product-category-card">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="product-category-card-header">

                <h3>
                    PRODUCT CATEGORY LIST
                </h3>


                <AddButton
                    text="Add New"
                    onClick={onAdd}
                />

            </div>


            {/* ==================================================
                TOOLBAR
            ================================================== */}

            <div className="table-toolbar">

                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="common-search">

                    <input
                        type="text"
                        placeholder="Search Product Categ..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* ==================================================
                TABLE
            ================================================== */}

            <table className="common-table">

                <thead>

                    <tr>

                        <th>
                            SR. NO.
                        </th>

                        <th>
                            CATEGORY
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


                <tbody>


                    {/* ==================================================
                        LOADING
                    ================================================== */}

                    {loading && (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign:
                                        "center",
                                    padding:
                                        "20px",
                                }}
                            >

                                Loading...

                            </td>

                        </tr>

                    )}


                    {/* ==================================================
                        DATA
                    ================================================== */}

                    {!loading &&

                        filteredData
                            .slice(
                                0,
                                entries
                            )
                            .map(
                                (
                                    row,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            row.id
                                        }
                                    >


                                        <td>

                                            {
                                                index + 1
                                            }

                                        </td>


                                        <td>

                                            {
                                                row.category
                                            }

                                        </td>


                                        <td>

                                            {
                                                row.code
                                            }

                                        </td>


                                        <td>

                                            {
                                                row.remark
                                            }

                                        </td>


                                        <td>

                                            {
                                                formatDateTime(
                                                    row.createdAt
                                                )
                                            }

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    row.status ===
                                                    "ACTIVE"
                                                        ? "status-active"
                                                        : "status-inactive"
                                                }
                                            >

                                                {
                                                    row.status
                                                }

                                            </span>

                                        </td>


                                        {/* ==================================================
                                            ACTION BUTTONS
                                        ================================================== */}

                                        <td>

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    gap:
                                                        "8px",
                                                    alignItems:
                                                        "center",
                                                }}
                                            >


                                                {/* VIEW */}

                                                <ViewButton
                                                    onClick={() =>
                                                        onView(
                                                            row
                                                        )
                                                    }
                                                />


                                                {/* EDIT */}

                                                <EditButton
                                                    text=""
                                                    onClick={() =>
                                                        onEdit(
                                                            row
                                                        )
                                                    }
                                                />


                                                {/* DELETE */}

                                                <DeleteButton
                                                    text=""
                                                    onClick={() =>
                                                        handleDelete(
                                                            row.id
                                                        )
                                                    }
                                                />


                                            </div>

                                        </td>


                                    </tr>

                                )
                            )
                    }


                    {/* ==================================================
                        NO RECORD
                    ================================================== */}

                    {!loading &&
                        filteredData.length ===
                            0 && (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "20px",
                                    }}
                                >

                                    No Records Found

                                </td>

                            </tr>

                        )}


                </tbody>

            </table>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="table-footer">

                <span>

                    Showing 1 to{" "}

                    {
                        Math.min(
                            entries,
                            filteredData.length
                        )
                    }

                    {" "}of{" "}

                    {
                        filteredData.length
                    }

                </span>


                <div className="pagination">

                    <button
                        className="page-btn"
                    >

                        Prev

                    </button>


                    <button
                        className="page-btn active"
                    >

                        1

                    </button>


                    <button
                        className="page-btn"
                    >

                        Next

                    </button>


                </div>

            </div>


        </div>

    );

};


export default ProductCategoryTable;