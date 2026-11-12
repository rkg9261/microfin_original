import React, { useState } from "react";
import { useConfirm } from "../../../components/common/ConfirmModal";

import "./MemberAttendance.css";

import MemberAttendanceForm from "./MemberAttendanceForm";
import MemberAttendanceTable from "./MemberAttendanceTable";
import MemberAttendanceView from "./MemberAttendanceView";


const MemberAttendance = () => {
  const confirm = useConfirm();


  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
  });


  // =========================================================
  // VIEW STATE
  // =========================================================

  const [selectedMember, setSelectedMember] = useState(null);


  // =========================================================
  // MEMBER ATTENDANCE DATA
  // =========================================================

  const [attendanceData, setAttendanceData] = useState([

    {
      id: 1,

      name: "DIPU 1",

      memberCode: "01SLF9",

      date: "26-08-2026",

      attendance: "PRESENT",

      loanId: "438",

      loanApplicationNo: "114ANAND NAGAR3",

      remark: "AUTO MARKED",

      branch: "KOLKATA - DALHOUSIE",

      markedBy: "ADMIN",

    },

    {
      id: 2,

      name: "SANJU ROY",

      memberCode: "AM5EGM12",

      date: "25-08-2026",

      attendance: "PRESENT",

      loanId: "295",

      loanApplicationNo: "22AM5",

      remark: "AUTO MARKED",

      branch: "BRANCH M FINANCE",

      markedBy: "ADMIN",

    },



  ]);


  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = (formData) => {

    setFilters(formData);

  };


  // =========================================================
  // VIEW MEMBER
  // =========================================================

  const handleView = (member) => {

    setSelectedMember(member);

  };


  // =========================================================
  // CLOSE VIEW
  // =========================================================

  const handleCloseView = () => {

    setSelectedMember(null);

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {

    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this attendance record?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) {
      return;
    }


    setAttendanceData((previousData) =>
      previousData.filter(
        (item) => item.id !== id
      )
    );

  };


  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredAttendance = attendanceData.filter((item) => {

    if (!filters.branch) {
      return true;
    }

    return item.branch === filters.branch;

  });


  return (

    <div className="member-attendance-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="member-attendance-page-header">

        <div>

          <h2>
            MEMBER EMI PAYMENT ATTENDANCE
          </h2>

        </div>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <MemberAttendanceForm
        filters={filters}
        onGetRecord={handleGetRecord}
      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <MemberAttendanceTable
        data={filteredAttendance}
        onView={handleView}
        onDelete={handleDelete}
      />


      {/* =====================================================
          VIEW DETAILS
      ===================================================== */}

      {selectedMember && (

        <MemberAttendanceView
          member={selectedMember}
          onClose={handleCloseView}
        />

      )}

    </div>

  );

};


export default MemberAttendance;