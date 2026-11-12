import React from "react";

import {
  CloseButton,
} from "../../../components/buttons";


const DeathMemberDetails = ({
  member,
  onClose,
}) => {

  return (

    <div className="death-modal-overlay">


      <div className="death-details-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="death-modal-header">

          <h2>
            DEATH MEMBER DETAILS
          </h2>

          <button
            type="button"
            className="death-modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* =================================================
            DETAILS
        ================================================= */}

        <div className="death-details-body">


          {/* LEFT */}

          <div className="death-details-column">


            <div className="death-detail-row">

              <span>
                BRANCH NAME
              </span>

              <strong>
                {member.branch}
              </strong>

            </div>


            <div className="death-detail-row">

              <span>
                MEMBER NAME
              </span>

              <strong>
                {member.memberName}
              </strong>

            </div>


            <div className="death-detail-row">

              <span>
                DEATH DATE
              </span>

              <strong>
                {member.deathDate}
              </strong>

            </div>


            <div className="death-detail-row">

              <span>
                CAUSE
              </span>

              <strong>
                {member.deathCause}
              </strong>

            </div>

          </div>


          {/* RIGHT */}

          <div className="death-details-column">


            <div className="death-detail-row">

              <span>
                DEATH TIME
              </span>

              <strong>
                {member.deathTime || "-"}
              </strong>

            </div>


            <div className="death-detail-row">

              <span>
                VERIFIED BY
              </span>

              <strong>
                {member.verifiedBy}
              </strong>

            </div>


            <div className="death-detail-row">

              <span>
                MOBILE
              </span>

              <strong>
                {member.mobile}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            CLOSE
        ================================================= */}

        <div className="death-details-footer">

          <CloseButton
            onClick={onClose}
          />

        </div>

      </div>

    </div>

  );

};


export default DeathMemberDetails;