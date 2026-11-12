import React from "react";

import "./AreaSummary.css";

const AreaSummaryView = ({
  area,
  onClose,
}) => {

  if (!area) return null;

  const Detail = ({
    label,
    value,
  }) => (
    <div className="area-summary-detail-row">

      <span className="area-summary-detail-label">
        {label}
      </span>

      <span className="area-summary-detail-colon">
        :
      </span>

      <span className="area-summary-detail-value">
        {value || "-"}
      </span>

    </div>
  );

  return (
    <div className="area-summary-modal-overlay">

      <div className="area-summary-view-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="area-summary-modal-header">

          <h2>
            AREA DETAILS
          </h2>

          <button
            type="button"
            className="area-summary-modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* =================================================
            DETAILS
        ================================================= */}

        <div className="area-summary-view-content">

          <div className="area-summary-view-grid">

            {/* LEFT */}

            <div className="area-summary-view-column">

              <Detail
                label="AREA NAME"
                value={area.areaName}
              />

              <Detail
                label="BRANCH"
                value={area.branch}
              />

              <Detail
                label="SURVEY DATE"
                value={area.surveyDate}
              />

              <Detail
                label="EMPLOYEE"
                value={area.employee}
              />

              <Detail
                label="DISTANCE FROM BRANCH"
                value={area.distanceFromBranch}
              />

              <Detail
                label="POSSIBLE CENTER"
                value={area.possibleCenter}
              />

              <Detail
                label="VILLAGE NAME"
                value={area.villageName}
              />

              <Detail
                label="POPULATION OF VILLAGES"
                value={area.populationOfVillages}
              />

              <Detail
                label="MAJOR OPERATION PEOPLE"
                value={area.majorOperationPeople}
              />

              <Detail
                label="POLITICAL SITUATION"
                value={area.politicalSituation}
              />

              <Detail
                label="ROAD STATUS"
                value={area.roadStatus}
              />

              <Detail
                label="LAW AND ORDER SITUATION"
                value={area.lawAndOrderSituation}
              />

            </div>


            {/* RIGHT */}

            <div className="area-summary-view-column">

              <Detail
                label="MFI WORKING"
                value={area.mfiWorking}
              />

              <Detail
                label="MFI NAME"
                value={area.mfiName}
              />

              <Detail
                label="HINDU RELIGION %"
                value={`${area.hinduReligionPercentage}%`}
              />

              <Detail
                label="MUSLIM RELIGION %"
                value={`${area.muslimReligionPercentage}%`}
              />

              <Detail
                label="SIKH RELIGION %"
                value={`${area.sikhReligionPercentage}%`}
              />

              <Detail
                label="CHRISTIAN RELIGION %"
                value={`${area.christianReligionPercentage}%`}
              />

              <Detail
                label="OTHER RELIGION %"
                value={`${area.otherReligionPercentage}%`}
              />

              <Detail
                label="GENERAL CASTE %"
                value={`${area.generalCastePercentage}%`}
              />

              <Detail
                label="OBC CASTE %"
                value={`${area.obcCastePercentage}%`}
              />

              <Detail
                label="SC CASTE %"
                value={`${area.scCastePercentage}%`}
              />

              <Detail
                label="ST CASTE %"
                value={`${area.stCastePercentage}%`}
              />

              <Detail
                label="OTHER CASTE %"
                value={`${area.otherCastePercentage}%`}
              />

              <Detail
                label="STATUS"
                value={area.status}
              />

            </div>

          </div>


          {/* =================================================
              REMARK
          ================================================= */}

          <div className="area-summary-view-remark">

            <strong>
              REMARK
            </strong>

            <p>
              {area.remark || "-"}
            </p>

          </div>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="area-summary-view-footer">

          <button
            type="button"
            onClick={onClose}
            className="area-summary-close-button"
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
};

export default AreaSummaryView;