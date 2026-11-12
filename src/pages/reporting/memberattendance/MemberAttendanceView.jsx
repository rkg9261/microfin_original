import React from "react";

import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaBuilding,
  FaIdCard,
  FaClipboardCheck,
} from "react-icons/fa";


const MemberAttendanceView = ({
  member,
  onClose,
}) => {

  if (!member) {
    return null;
  }


  return (

    <div
      className="member-attendance-view-overlay"
      onClick={onClose}
    >


      <div
        className="member-attendance-view-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="member-attendance-view-header">

          <div>

            <h2>
              ATTENDANCE DETAILS
            </h2>

            <p>
              Member EMI payment attendance
            </p>

          </div>


          <button
            type="button"
            className="member-attendance-view-close"
            onClick={onClose}
          >

            <FaTimes />

          </button>

        </div>


        {/* =====================================================
            DETAILS
        ===================================================== */}

        <div className="member-attendance-details">


          {/* =================================================
              MEMBER
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaUser />
            </div>

            <div>

              <label>
                MEMBER NAME
              </label>

              <strong>
                {member.name}
              </strong>

            </div>

          </div>


          {/* =================================================
              MEMBER CODE
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaIdCard />
            </div>

            <div>

              <label>
                MEMBER CODE
              </label>

              <strong>
                {member.memberCode}
              </strong>

            </div>

          </div>


          {/* =================================================
              DATE
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaCalendarAlt />
            </div>

            <div>

              <label>
                DATE
              </label>

              <strong>
                {member.date}
              </strong>

            </div>

          </div>


          {/* =================================================
              ATTENDANCE
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaClipboardCheck />
            </div>

            <div>

              <label>
                ATTENDANCE
              </label>

              <strong
                className={
                  member.attendance === "PRESENT"
                    ? "detail-present"
                    : "detail-absent"
                }
              >
                {member.attendance}
              </strong>

            </div>

          </div>


          {/* =================================================
              LOAN ID
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaIdCard />
            </div>

            <div>

              <label>
                LOAN ID
              </label>

              <strong>
                {member.loanId}
              </strong>

            </div>

          </div>


          {/* =================================================
              LOAN APPLICATION
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaIdCard />
            </div>

            <div>

              <label>
                LOAN APPLICATION NO
              </label>

              <strong>
                {member.loanApplicationNo}
              </strong>

            </div>

          </div>


          {/* =================================================
              REMARK
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaClipboardCheck />
            </div>

            <div>

              <label>
                REMARK
              </label>

              <strong>
                {member.remark}
              </strong>

            </div>

          </div>


          {/* =================================================
              BRANCH
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaBuilding />
            </div>

            <div>

              <label>
                BRANCH
              </label>

              <strong>
                {member.branch}
              </strong>

            </div>

          </div>


          {/* =================================================
              MARKED BY
          ================================================= */}

          <div className="member-attendance-detail-item">

            <div className="member-attendance-detail-icon">
              <FaUser />
            </div>

            <div>

              <label>
                MARKED BY
              </label>

              <strong>
                {member.markedBy}
              </strong>

            </div>

          </div>


        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="member-attendance-view-footer">

          <button
            type="button"
            className="member-attendance-close-btn"
            onClick={onClose}
          >

            CLOSE

          </button>

        </div>


      </div>

    </div>

  );

};


export default MemberAttendanceView;