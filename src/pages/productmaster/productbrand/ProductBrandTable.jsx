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
    getProductBrands,
    deleteProductBrand,
} from "../../../api/productBrandApi";

import { toast } from "react-toastify";


const ProductBrandTable = ({
    onAdd,
    onEdit,
    onView,
    refreshKey,
}) => {
  const confirm = useConfirm();


 

    const [data, setData] =  useState([]);
      


  
    // SEARCH
  

    const [search, setSearch] =
        useState("");


  
    // ENTRIES
  

    const [entries, setEntries] =  useState(10);
      


  
    // LOADING
  

    const [loading, setLoading] = useState(false);
       


  
    // GET PRODUCT BRANDS
  

    const fetchProductBrands = async () => {

        try {

            setLoading(true);


            const result =
                await getProductBrands();


            console.log(
                "PRODUCT BRAND LIST:",
                result
            );


           
            // API RESPONSE
           

            if (Array.isArray(result)) {

                setData(result);

            }

            else if (
                result &&
                Array.isArray(result.data)
            ) {

                setData(result.data);

            }

            else {

                setData([]);

            }

        }

        catch (error) {

            console.error(
                "GET PRODUCT BRAND ERROR:",
                error
            );


            toast.error(
                "Failed to load Product Brands."
            );

        }

        finally {

            setLoading(false);

        }

    };


  
    // GET API ON PAGE LOAD
  

    useEffect(() => {

        fetchProductBrands();

    }, [refreshKey]);


  
    // DELETE PRODUCT BRAND
  

    const handleDelete = async (id) => {


       
        // CONFIRM DELETE
       

        const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Product Brand?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteProductBrand(id);


            console.log(
                "PRODUCT BRAND DELETED:",
                id
            );


           
            // SUCCESS TOAST
           

            toast.success(
                "Product Brand deleted successfully!"
            );


           
            // GET UPDATED LIST
           

            fetchProductBrands();

        }

        catch (error) {

            console.error(
                "DELETE PRODUCT BRAND ERROR:",
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
                "Failed to delete Product Brand."
            );

        }

    };


  
    // SEARCH FILTER
  

    const filteredData = useMemo(() => {

        const searchValue =
            search.toLowerCase();


        return data.filter((item) => {


            const brand =
                String(
                    item.brand || ""
                ).toLowerCase();


            const code =
                String(
                    item.code || ""
                ).toLowerCase();


            const remark =
                String(
                    item.remark || ""
                ).toLowerCase();


            const status =
                String(
                    item.status || ""
                ).toLowerCase();


            return (

                brand.includes(searchValue) ||

                code.includes(searchValue) ||

                remark.includes(searchValue) ||

                status.includes(searchValue)

            );

        });

    }, [data, search]);


    return (

        <div className="product-brand-card">


            {/*  HEADER*/}
              
            

            <div className="product-brand-card-header">

                <h3>

                    PRODUCT BRAND LIST

                </h3>


                <AddButton
                    text="Add New"
                    onClick={onAdd}
                />

            </div>


            {/* TOOLBAR */}
               
           

            <div className="table-toolbar">


                <EntriesDropdown
                    value={entries}
                    onChange={setEntries}
                />


                <div className="table-search">

                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


            </div>


            {/*    TABLE */}
            
           

            <table className="common-table">


                <thead>

                    <tr>

                        <th>
                            SR. NO.
                        </th>

                        <th>
                            BRAND
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


                    {/*
                        LOADING
                    */}

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


                    {/* DATA*/}
                       
                    

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


                                        {/* SR NO */}

                                        <td>

                                            {
                                                index +
                                                1
                                            }

                                        </td>


                                        {/* BRAND */}

                                        <td>

                                            {
                                                row.brand
                                            }

                                        </td>


                                        {/* CODE */}

                                        <td>

                                            {
                                                row.code
                                            }

                                        </td>


                                        {/* REMARK */}

                                        <td>

                                            {
                                                row.remark
                                            }

                                        </td>


                                        {/* CREATED AT */}

                                        <td>

                                            {
                                                row.createdAt
                                                    ? new Date(
                                                        row.createdAt
                                                    ).toLocaleString(
                                                        "en-GB"
                                                    )
                                                    : "-"
                                            }

                                        </td>


                                        {/* STATUS */}

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


                                        {/* ACTION */}

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


                    {/*
                        NO RECORDS
                    */}

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


            {/*FOOTER */}
                
           

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


export default ProductBrandTable;