import React from "react";

import "../../components/common/Table.css";

import { EditButton } from "../../components/buttons";

const SoftwareTimingTable = ({
    data,
    onEdit,
}) => {

    const formatTime = (time) => {

        if (!time) return "-";

        const [hour, minute] = time.split(":");

        return `${hour}:${minute}:00`;

    };

    return (

        <div className="software-card">

            <div className="software-card-header">

                <h3>

                    SOFTWARE TIMING

                </h3>

                <EditButton
                    text=""
                    onClick={onEdit}
                />

            </div>

            <table className="common-table">

                <tbody>

                    <tr>

                        <th
                            style={{
                                width: "50%",
                            }}
                        >

                            SOFTWARE TIME IN

                        </th>

                        <td>

                            {formatTime(
                                data.timeIn
                            )}

                        </td>

                    </tr>

                    <tr>

                        <th>

                            SOFTWARE TIME OUT

                        </th>

                        <td>

                            {formatTime(
                                data.timeOut
                            )}

                        </td>

                    </tr>

                    <tr>

                        <th>

                            STATUS

                        </th>

                        <td>

                            <span
                                className={
                                    data.status ===
                                    "ACTIVE"
                                        ? "status-active"
                                        : "status-inactive"
                                }
                            >

                                {data.status}

                            </span>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

};

export default SoftwareTimingTable;