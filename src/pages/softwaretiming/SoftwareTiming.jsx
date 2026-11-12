import React, { useState } from "react";

import "./SoftwareTiming.css";

import "../../components/common/Table.css";
import "../../components/common/CommonForm.css";
import "../../utils/validation.css";

import SoftwareTimingTable from "./SoftwareTimingTable";
import SoftwareTimingForm from "./SoftwareTimingForm";

const SoftwareTiming = () => {

    const [showForm, setShowForm] =
        useState(false);

    const [timingData, setTimingData] =
        useState({

            timeIn: "07:00",

            timeOut: "19:00",

            status: "ACTIVE",

        });

    const handleSave = (data) => {

        setTimingData(data);

        setShowForm(false);

    };

    return (

        <div className="software-timing-page">

            <div className="software-timing-header">
<div>
                <h2>  SOFTWARE TIMING </h2>
                <p>manage Software Timing</p>
</div>
                  

               

            </div>

            <SoftwareTimingTable

                data={timingData}

                onEdit={() => setShowForm(true)}

            />

            {

                showForm && (

                    <SoftwareTimingForm

                        data={timingData}

                        onSave={handleSave}

                        onClose={() => setShowForm(false)}

                    />

                )

            }

        </div>

    );

};

export default SoftwareTiming;