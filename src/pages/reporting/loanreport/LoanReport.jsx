import React, { useMemo, useState } from "react";
import "./LoanReport.css";

import EntriesDropdown from "../../../components/common/EntriesDropdown";

import { FaSearch, FaCalendarAlt, FaFileExcel, FaPaperPlane } from "react-icons/fa";

import { validateRequired } from "../../../utils/validation";


const LoanReport = () => {

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    branch: "",
    type: "",
    member: "",

    disbursementFrom: "",
    disbursementTo: "",

    disbursementDate: "",

    emiStartDate: "",
    emiEndDate: "",

    loanCloseStartDate: "",
    loanCloseEndDate: "",

    lastEmiStartDate: "",
    lastEmiEndDate: "",

    status: "",
  });


  // =========================================================
  // VALIDATION
  // =========================================================

  const [errors, setErrors] = useState({});


  // =========================================================
  // TABLE STATES
  // =========================================================

  const [entries, setEntries] = useState(10);

  const [search, setSearch] = useState("");


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    // Remove error after user selects/types
    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };


  // =========================================================
  // SAMPLE LOAN REPORT DATA
  // =========================================================

  const [loanData] = useState([

    {
      id: 1,
      loanId: "LN10001",
      memberName: "AJAY KUMAR",
      memberAlias: "AJAY",
      mobile: "9876543210",
      branch: "LASKARHAT",
      groupName: "GROUP A",
      disbursementDate: "08/01/2026",
      emiStartDate: "09/01/2026",
      emiEndDate: "08/01/2027",
      loanCloseDate: "",
      planType: "MONTHLY",
      planAmt: "50000",
      disbAmt: "48000",
      totalAmount: "60000",
      receivedAmount: "15000",
      receivedPenalty: "500",
      status: "ACTIVE",
    },

    {
      id: 2,
      loanId: "LN10002",
      memberName: "RAJESH SHARMA",
      memberAlias: "RAJESH",
      mobile: "9876543211",
      branch: "LASKARHAT",
      groupName: "GROUP B",
      disbursementDate: "10/01/2026",
      emiStartDate: "11/01/2026",
      emiEndDate: "10/01/2027",
      loanCloseDate: "",
      planType: "MONTHLY",
      planAmt: "70000",
      disbAmt: "68000",
      totalAmount: "84000",
      receivedAmount: "21000",
      receivedPenalty: "750",
      status: "ACTIVE",
    },


  ]);


  // =========================================================
  // FILTERED TABLE DATA
  // =========================================================

  const filteredData = useMemo(() => {

    const searchValue = search
      .toLowerCase()
      .trim();


    return loanData.filter((item) => {

      const matchesSearch =
        !searchValue ||

        item.loanId
          .toLowerCase()
          .includes(searchValue) ||

        item.memberName
          .toLowerCase()
          .includes(searchValue) ||

        item.memberAlias
          .toLowerCase()
          .includes(searchValue) ||

        item.mobile
          .toLowerCase()
          .includes(searchValue) ||

        item.branch
          .toLowerCase()
          .includes(searchValue) ||

        item.groupName
          .toLowerCase()
          .includes(searchValue);


      const matchesBranch =
        !formData.branch ||
        item.branch === formData.branch;


      const matchesType =
        !formData.type ||
        item.planType === formData.type;


      const matchesMember =
        !formData.member ||
        item.memberName
          .toLowerCase()
          .includes(
            formData.member.toLowerCase()
          ) ||

        item.memberAlias
          .toLowerCase()
          .includes(
            formData.member.toLowerCase()
          ) ||

        item.mobile.includes(
          formData.member
        );


      const matchesStatus =
        !formData.status ||
        item.status === formData.status;


      return (
        matchesSearch &&
        matchesBranch &&
        matchesType &&
        matchesMember &&
        matchesStatus
      );

    });

  }, [
    search,
    loanData,
    formData.branch,
    formData.type,
    formData.member,
    formData.status,
  ]);


  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = (e) => {

    e.preventDefault();


    const requiredErrors = validateRequired(
      formData,
      [
        {
          name: "branch",
          label: "Branch",
        },

        {
          name: "status",
          label: "Status",
        },
      ]
    );


    setErrors(requiredErrors);


    if (Object.keys(requiredErrors).length > 0) {
      return;
    }


    console.log(
      "Loan Report Search:",
      formData
    );

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    setFormData({
      branch: "",
      type: "",
      member: "",

      disbursementFrom: "",
      disbursementTo: "",

      disbursementDate: "",

      emiStartDate: "",
      emiEndDate: "",

      loanCloseStartDate: "",
      loanCloseEndDate: "",

      lastEmiStartDate: "",
      lastEmiEndDate: "",

      status: "",
    });


    setErrors({});

  };


  // =========================================================
  // DOWNLOAD EXCEL
  // =========================================================

  const handleDownloadExcel = () => {

    const headers = [
      "SR. NO.",
      "LOANID",
      "MEMBER NAME",
      "(C/O) ALIAS MEMBER ALIAS",
      "MOBILE",
      "BRANCH",
      "GROUPNAME",
      "DISBURSEMENT DATE",
      "EMISTARTDATE",
      "EMIENDDATE",
      "LOAN CLOSE DATE",
      "PLAN TYPE",
      "PLAN AMT",
      "DISB AMT",
      "TOTAL AMOUNT",
      "REC. AMOUNT",
      "RECEIVED PENALTY",
      "STATUS",
    ];


    const rows = filteredData.map(
      (item, index) => [
        index + 1,
        item.loanId,
        item.memberName,
        item.memberAlias,
        item.mobile,
        item.branch,
        item.groupName,
        item.disbursementDate,
        item.emiStartDate,
        item.emiEndDate,
        item.loanCloseDate,
        item.planType,
        item.planAmt,
        item.disbAmt,
        item.totalAmount,
        item.receivedAmount,
        item.receivedPenalty,
        item.status,
      ]
    );


    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");


    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "loan-report.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="loan-report-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="loan-report-header">

        <div>

          <h2>
            LOANREPORT
          </h2>

          <p>
            Loan reporting and search
          </p>

        </div>

      </div>


      {/* =====================================================
          SEARCH SECTION
      ===================================================== */}

      <form
        className="loan-report-search-card"
        onSubmit={handleGetRecord}
      >

        <div className="loan-report-section-title">
          SEARCH BY
        </div>


        <div className="loan-report-form-grid">


          {/* =================================================
              BRANCH
          ================================================= */}

          <div className="loan-report-field">

            <label>
              BRANCH <span>*</span>
            </label>

            <div className="loan-report-select-wrapper">

              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={
                  errors.branch
                    ? "loan-report-input-error"
                    : ""
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="LASKARHAT">
                  LASKARHAT
                </option>

                <option value="DELHI">
                  DELHI
                </option>

                <option value="JAIPUR">
                  JAIPUR
                </option>

                <option value="LUCKNOW">
                  LUCKNOW
                </option>

              </select>

            </div>

            {errors.branch && (
              <small className="loan-report-error">
                {errors.branch}
              </small>
            )}

          </div>


          {/* =================================================
              TYPE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              TYPE
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >

              <option value="">
                Select plan Type
              </option>

              <option value="MONTHLY">
                MONTHLY
              </option>

              <option value="WEEKLY">
                WEEKLY
              </option>

              <option value="DAILY">
                DAILY
              </option>

            </select>

          </div>


          {/* =================================================
              MEMBER
          ================================================= */}

          <div className="loan-report-field">

            <label>
              MEMBER (TYPE HERE)
            </label>

            <input
              type="text"
              name="member"
              value={formData.member}
              onChange={handleChange}
              placeholder="Type Member"
            />

          </div>


          {/* =================================================
              DISBURSEMENT DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              DISBURSEMENT DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="disbursementDate"
                value={formData.disbursementDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              DISBURSEMENT FROM
          ================================================= */}

          <div className="loan-report-field">

            <label>
              DISBURSEMENT FROM
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="disbursementFrom"
                value={formData.disbursementFrom}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              DISBURSEMENT TO
          ================================================= */}

          <div className="loan-report-field">

            <label>
              DISBURSEMENT TO
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="disbursementTo"
                value={formData.disbursementTo}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              EMI START DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              EMI START DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="emiStartDate"
                value={formData.emiStartDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              EMI END DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              EMI END DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="emiEndDate"
                value={formData.emiEndDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              LOAN CLOSE START DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              LOAN CLOSE START DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="loanCloseStartDate"
                value={formData.loanCloseStartDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              LOAN CLOSE END DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              LOAN CLOSE END DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="loanCloseEndDate"
                value={formData.loanCloseEndDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              LAST EMI START DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              LAST EMI START DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="lastEmiStartDate"
                value={formData.lastEmiStartDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              LAST EMI END DATE
          ================================================= */}

          <div className="loan-report-field">

            <label>
              LAST EMI END DATE
            </label>

            <div className="loan-report-date-wrapper">

              <input
                type="date"
                name="lastEmiEndDate"
                value={formData.lastEmiEndDate}
                onChange={handleChange}
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              STATUS
          ================================================= */}

          <div className="loan-report-field">

            <label>
              SELECT STATUS <span>*</span>
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={
                errors.status
                  ? "loan-report-input-error"
                  : ""
              }
            >

              <option value="">
                Select Status
              </option>

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="PENDING">
                PENDING
              </option>

              <option value="CLOSED">
                CLOSED
              </option>

            </select>

            {errors.status && (
              <small className="loan-report-error">
                {errors.status}
              </small>
            )}

          </div>


        </div>


        {/* =====================================================
            BUTTONS
        ===================================================== */}

        <div className="loan-report-button-row">

          <button
            type="submit"
            className="loan-report-get-record-btn"
          >

            <FaPaperPlane />

            GET RECORD

          </button>


          <button
            type="button"
            className="loan-report-reset-btn"
            onClick={handleReset}
          >
            RESET
          </button>

        </div>

      </form>


      {/* =====================================================
          REPORT TABLE CARD
      ===================================================== */}

      <div className="loan-report-table-card">


        {/* =================================================
            TABLE HEADER
        ================================================= */}

     {/* =====================================================
    TABLE
===================================================== */}

<div className="common-table-wrapper">

  <table className="common-table">

    <thead>

      <tr>

        <th>
          SR.<br />NO.
        </th>

        <th>
          LOANID
        </th>

        <th>
          MEMBER<br />NAME
        </th>

        <th>
          (C/O) ALIAS<br />MEMBER ALIAS
        </th>

        <th>
          MOBILE
        </th>

        <th>
          BRANCH
        </th>

        <th>
          GROUPNAME
        </th>

        <th>
          DISBURSEMENT<br />DATE
        </th>

        <th>
          EMI<br />START DATE
        </th>

        <th>
          EMI<br />END DATE
        </th>

        <th>
          LOAN<br />CLOSE<br />DATE
        </th>

        <th>
          PLAN<br />TYPE
        </th>

        <th>
          PLAN<br />AMT
        </th>

        <th>
          DISB<br />AMT
        </th>

        <th>
          TOTAL<br />AMOUNT
        </th>

        <th>
          REC.<br />AMOUNT
        </th>

        <th>
          RECEIVED<br />PENALTY
        </th>

        <th>
          STATUS
        </th>

        <th className="action-column">
          ACTION
        </th>

      </tr>

    </thead>


    <tbody>

      {filteredData.length > 0 ? (

        filteredData
          .slice(0, entries)
          .map((item, index) => (

            <tr key={item.id}>

              <td>
                {index + 1}
              </td>

              <td>
                {item.loanId}
              </td>

              <td>
                {item.memberName}
              </td>

              <td>
                {item.memberAlias}
              </td>

              <td>
                {item.mobile}
              </td>

              <td>
                {item.branch}
              </td>

              <td>
                {item.groupName}
              </td>

              <td>
                {item.disbursementDate}
              </td>

              <td>
                {item.emiStartDate}
              </td>

              <td>
                {item.emiEndDate}
              </td>

              <td>
                {item.loanCloseDate || "-"}
              </td>

              <td>
                {item.planType}
              </td>

              <td>
                ₹{Number(item.planAmt || 0).toLocaleString()}
              </td>

              <td>
                ₹{Number(item.disbAmt || 0).toLocaleString()}
              </td>

              <td>
                ₹{Number(item.totalAmount || 0).toLocaleString()}
              </td>

              <td>
                ₹{Number(item.receivedAmount || 0).toLocaleString()}
              </td>

              <td>
                ₹{Number(item.receivedPenalty || 0).toLocaleString()}
              </td>

              <td>

                <span
                  className={
                    item.status === "ACTIVE"
                      ? "status status-approved"
                      : item.status === "PENDING"
                      ? "status status-pending"
                      : "status status-overdue"
                  }
                >
                  {item.status}
                </span>

              </td>


              {/* ACTION */}

              <td className="action-column">

                <div className="action-cell">

                  <button
                    type="button"
                    className="loan-report-action-btn"
                  >
                    VIEW
                  </button>

                </div>

              </td>

            </tr>

          ))

      ) : (

        <tr>

          <td
            colSpan="19"
            className="common-table-empty"
          >
            No records found
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>


      </div>

    </div>

  );

};


export default LoanReport;