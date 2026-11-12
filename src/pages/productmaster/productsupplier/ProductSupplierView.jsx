import React, { useState } from "react";

import "../../../components/common/CommonView.css";

import {
  CloseButton,
  CancelButton,
} from "../../../components/buttons";


import profileImage from "../../../assets/profile.png";


const ProductSupplierView = ({
    data,
    onClose,
}) => {

    const [preview, setPreview] =
        useState(profileImage);


    if (!data) return null;


    // IMAGE

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (file) {

            setPreview(
                URL.createObjectURL(file)
            );

        }

    };


    return (

        <div className="common-view-overlay">

            <div className="common-view-modal">

                {/* HEADER*/}
                    
                 

                <div className="common-view-header">

                    <h2>   SUPPLIER DETAILS</h2>

                      <CloseButton
                               onClick={onClose}
                             />
                   

                </div>


                {/* BODY */}
                
                    

                <div className="common-view-body">


                    {/* LEFT - IMAGE */}
                        
                    

                    <div className="common-view-image">

                        <img
                            src={preview}
                            alt="Supplier"
                        />


                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />

                    </div>


                    {/*  RIGHT - DETAILS*/}
                       
                     

                    <div className="common-view-details">

                        <table className="common-view-table">

                            <tbody>


                                {/* SUPPLIER NAME */}

                                <tr>

                                    <td className="common-view-label">

                                        SUPPLIER NAME :

                                    </td>

                                    <td className="common-view-value">

                                        {data.supplierName}

                                    </td>

                                </tr>


                                {/* SUPPLIER CODE */}

                                <tr>

                                    <td className="common-view-label">

                                        SUPPLIER CODE :

                                    </td>

                                    <td className="common-view-value">

                                        {data.supplierCode}

                                    </td>

                                </tr>


                                {/* MOBILE */}

                                <tr>

                                    <td className="common-view-label">

                                        MOBILE NO :

                                    </td>

                                    <td className="common-view-value">

                                        {data.mobile}

                                    </td>

                                </tr>


                                {/* PHONE */}

                                <tr>

                                    <td className="common-view-label">

                                        PHONE NO :

                                    </td>

                                    <td className="common-view-value">

                                        {data.phone || "-"}

                                    </td>

                                </tr>


                                {/* EMAIL */}

                                <tr>

                                    <td className="common-view-label">

                                        EMAIL :

                                    </td>

                                    <td className="common-view-value">

                                        {data.email}

                                    </td>

                                </tr>


                                {/* ORGANIZATION */}

                                <tr>

                                    <td className="common-view-label">

                                        ORGANIZATION :

                                    </td>

                                    <td className="common-view-value">

                                        {data.organization}

                                    </td>

                                </tr>


                                {/* GSTIN */}

                                <tr>

                                    <td className="common-view-label">

                                        GSTIN :

                                    </td>

                                    <td className="common-view-value">

                                        {data.gstin || "-"}

                                    </td>

                                </tr>


                                {/* ADDRESS */}

                                <tr>

                                    <td className="common-view-label">

                                        ADDRESS :

                                    </td>

                                    <td className="common-view-value">

                                        {data.address}

                                    </td>

                                </tr>


                                {/* CITY */}

                                <tr>

                                    <td className="common-view-label">

                                        CITY :

                                    </td>

                                    <td className="common-view-value">

                                        {data.city || "-"}

                                    </td>

                                </tr>


                                {/* STATE */}

                                <tr>

                                    <td className="common-view-label">

                                        STATE :

                                    </td>

                                    <td className="common-view-value">

                                        {data.state}

                                    </td>

                                </tr>


                                {/* PIN */}

                                <tr>

                                    <td className="common-view-label">

                                        PIN :

                                    </td>

                                    <td className="common-view-value">

                                        {data.pin}

                                    </td>

                                </tr>


                                {/* REMARK */}

                                <tr>

                                    <td className="common-view-label">

                                        REMARK :

                                    </td>

                                    <td className="common-view-value">

                                        {data.remark || "-"}

                                    </td>

                                </tr>


                                {/* CREATED AT */}

                                <tr>

                                    <td className="common-view-label">

                                        CREATED AT :

                                    </td>

                                    <td className="common-view-value">

                                        {data.createdAt || "-"}

                                    </td>

                                </tr>


                                {/* STATUS */}

                                <tr>

                                    <td className="common-view-label">

                                        STATUS :

                                    </td>

                                    <td className="common-view-value">

                                        <span
                                            className={`common-view-status ${
                                                data.status === "ACTIVE"
                                                    ? "active"
                                                    : "inactive"
                                            }`}
                                        >

                                            {data.status}

                                        </span>

                                    </td>

                                </tr>


                            </tbody>

                        </table>

                    </div>

                </div>


                {/* 
                    FOOTER
                 */}

                <div className="common-view-footer">

                     <CancelButton
                              text="Close"
                              onClick={onClose}
                            />
                  

                </div>


            </div>

        </div>

    );

};


export default ProductSupplierView;