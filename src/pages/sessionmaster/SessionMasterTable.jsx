import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import "../../components/common/Table.css";
import "../../components/common/Search.css";

import EntriesDropdown from "../../components/common/EntriesDropdown";

import {
    AddButton,
    EditButton,
} from "../../components/buttons";

import {
    getSessions,
} from "../../api/sessionMasterApi";

import { toast } from "react-toastify";


const SessionMasterTable = ({
    onAdd,
    onEdit,
}) => {

    
    // STATE
    

    const [data, setData] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [entries, setEntries] =
        useState(10);

    const [loading, setLoading] =
        useState(false);


    
    // GET SESSION LIST
    

    const fetchSessions = async () => {

        try {

            setLoading(true);


            const result =
                await getSessions();


            console.log(
                "SESSION LIST:",
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
                "GET SESSION API ERROR:",
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
                "Failed to load session list."
            );

        }

        finally {

            setLoading(false);

        }

    };


    
    // CALL GET API ON PAGE LOAD
    

    useEffect(() => {

        fetchSessions();

    }, []);


    
    // SEARCH
    

    const filteredData = useMemo(() => {

        const searchText =
            search.toLowerCase().trim();


        return data.filter((item) => {

            return (

                String(
                    item.session || ""
                )
                    .toLowerCase()
                    .includes(searchText)


                ||

                String(
                    item.startYear || ""
                )
                    .toLowerCase()
                    .includes(searchText)


                ||

                String(
                    item.endYear || ""
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


    
    // FORMAT DATE
    

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }


        return String(date)
            .split("T")[0];

    };


    return (

        <div className="session-card">


            {/*HEADER*/}
                
            

            <div className="session-card-header">

                <h3>

                    SESSION LIST

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


            {/*TABLE*/}
                
            

            <table className="common-table">


                <thead>

                    <tr>

                        <th>
                            SR. NO.
                        </th>

                        <th>
                            SESSION
                        </th>

                        <th>
                            START DATE
                        </th>

                        <th>
                            END DATE
                        </th>

                        <th>
                            START YEAR
                        </th>

                        <th>
                            END YEAR
                        </th>

                        <th>
                            REMARK
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


                    {/*LOADING */}
                        
                   

                    {loading && (

                        <tr>

                            <td
                                colSpan="9"
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


                    {/*  DATA */}
                      
                   

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
                                                row.session
                                            }

                                        </td>


                                        <td>

                                            {
                                                formatDate(
                                                    row.startDate
                                                )
                                            }

                                        </td>


                                        <td>

                                            {
                                                formatDate(
                                                    row.endDate
                                                )
                                            }

                                        </td>


                                        <td>

                                            {
                                                row.startYear
                                            }

                                        </td>


                                        <td>

                                            {
                                                row.endYear
                                            }

                                        </td>


                                        <td>

                                            {
                                                row.remark
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


                                        <td>

                                            <EditButton
                                                text=""
                                                onClick={() =>
                                                    onEdit(
                                                        row
                                                    )
                                                }
                                            />

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
                                    colSpan="9"
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


            {/* FOOTER*/}
               
            

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


export default SessionMasterTable;