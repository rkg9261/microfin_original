import React, { useState } from "react";

import "../../../components/common/CommonView.css";

import { CloseButton, CancelButton,} from "../../../components/buttons";
import profileImage from "../../../assets/profile.png";

const ProductBrandView = ({
  data,
  onClose,
}) => {

  const [preview, setPreview] =
    useState(profileImage);

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setPreview(
        URL.createObjectURL(file)
      );

    }

  };

  if (!data) return null;

  return (

    <div className="common-view-overlay">

      <div className="common-view-modal">

        {/* Header */}

        <div className="common-view-header">

          <h2>PRODUCT BRAND DETAILS</h2>


          <CloseButton
            onClick={onClose}
          />

        </div>

        {/* Body */}

        <div className="common-view-body">

          {/* Left */}

          <div className="common-view-image">

            <img
              src={preview}
              alt="Profile"
            />

            <input
              type="file"
              onChange={handleImage}
            />

          </div>

          {/* Right */}

          <div className="common-view-details">

            <table className="common-view-table">

              <tbody>

                <tr>

                  <td className="common-view-label">

                    BRAND NAME :

                  </td>

                  <td className="common-view-value">

                    {data.brand}

                  </td>

                </tr>

                <tr>

                  <td className="common-view-label">

                    BRAND CODE :

                  </td>

                  <td className="common-view-value">

                    {data.code}

                  </td>

                </tr>

                <tr>

                  <td className="common-view-label">

                    REMARK :

                  </td>

                  <td className="common-view-value">

                    {data.remark}

                  </td>

                </tr>

                <tr>

                  <td className="common-view-label">

                    CREATED AT :

                  </td>

                  <td className="common-view-value">

                    {data.createdAt}

                  </td>

                </tr>

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

        {/* Footer */}

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

export default ProductBrandView;