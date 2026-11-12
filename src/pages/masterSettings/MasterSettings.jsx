import React, { useRef, useState } from "react";
import {
  FaPen,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

import MasterSettingsTable from "./MasterSettingsTable";
import MasterSettingsForm from "./MasterSettingsForm";

import "./MasterSettings.css";

const MasterSettings = () => {
  // =========================================================
  // IMAGE STATES
  // =========================================================

  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  // =========================================================
  // EDIT FORM
  // =========================================================

  const [isEditMode, setIsEditMode] = useState(false);

  // =========================================================
  // COMPANY PROFILE DATA
  // =========================================================

  const [companyData, setCompanyData] = useState({

    // -----------------------------------------
    // COMPANY INFORMATION
    // -----------------------------------------

    website: "NIL",

    name: "HEAD OFFICE",

    softwareUrl: "BANK.YBLORG.IN",

    companyName:
      " MICRO FINANCE ASSOCIATION LIMITED",

    shortName: "MICRO",

    upiId:
      "JANHITMICROFINANCE25@OKSBI",

    about:
      "SKYLINE FINANCE PVT LTD COMPANY",

    cin: "",

    pan: "",

    tan: "",

    gstNo: "",

    category: "FINANCIAL BANK",

    className: "SECTION 8",

    authorizedCapital: "0",

    paidUpCapital: "0",

    shareNominalValue: "",

    stateOfRegistration: "MADHYA PRADESH",

    incorporationCountry: "INDIA",

    incorporationDate: "2025-08-05",

    email: "CARE@YBLORG.IN",

    contactNumber1: "9826079465",

    contactNumber2: "18003139898",

    landlineNo:
      "REKHA SUNDAR PATTI, BIHAR",

    address:
      "DABOKA GANIPUR HOJAI NAGAON ASSAM 782440",

    city: "HOJAI",

    pincode: "782440",

    state: "ASSAM",

    session: "2026-2027",

    softwareVersion: "",

    softwareVersioningDate:
      "2026-01-10 21:26:30",

    lastDailyCronDate:
      "2026-08-29 05:00:13AM",

    lastDailyInterestCronDate:
      "2026-08-29 04:00:13AM",

    currencySymbol: "₹",

    decimalPlaces: "2",

    decimalPlacesForAmtInWords: "",

    financialYearBeginFrom: "2025-12-17",

    formalName:
      "VARDAN CO.OP PAITHAN",

    wordRepresentingAmtAfterDecimal:
      "",

    // -----------------------------------------
    // STATUS SETTINGS
    // -----------------------------------------

    customerKycStatus: "TRUE",

    customerLoanAgeLimitOption: "TRUE",

    customerMinimumAge: "20",

    customerMaximumAge: "60",

    branchDisbursementFromHeadOffice: "TRUE",

    sendSmsOnCustomerRegistration: "TRUE",

    sendSmsOnPasswordReset: "TRUE",

    dueReminderSms: "TRUE",

    overdueReminderSms: "TRUE",

    memberVerifyOtpSms: "FALSE",

    staffVerifyOtpSms: "TRUE",

    salaryDisbursementSms: "TRUE",

    noOfEmiReminderSmsDays: "2",

    overdueReminderSmsDays: "2",

    sendSmsCustomerLoanDisbursement: "TRUE",

    sendSmsOnEmiCollectedByStaff: "TRUE",

    sendSmsOnEmiApproval: "FALSE",

    documentVerificationSms: "TRUE",

    customerCredentialsSms: "FALSE",

    guarantorVerifyOtpSms: "FALSE",

    loginWithOtpSms: "TRUE",

    settlementSms: "TRUE",

    staffVerifySms: "TRUE",

    // -----------------------------------------
    // WHATSAPP SETTINGS
    // -----------------------------------------

    sendWhatsappSmsOnCustomerRegistration:
      "TRUE",

    sendWhatsappSmsOnPasswordReset:
      "TRUE",

    dueReminderWhatsappSms:
      "TRUE",

    overdueReminderWhatsappSms:
      "TRUE",

    memberVerifyOtpWhatsappSms:
      "TRUE",

    staffVerifyOtpWhatsappSms:
      "TRUE",

    salaryDisbursementWhatsappSms:
      "TRUE",

    noOfEmiReminderWhatsappSmsDays:
      "",

    overdueReminderWhatsappSmsDays:
      "",

    sendWhatsappSmsCustomerLoanDisbursement:
      "TRUE",

    sendWhatsappSmsOnEmiCollectedByStaff:
      "TRUE",

    sendWhatsappSmsOnEmiApproval:
      "TRUE",

    documentVerificationWhatsappSms:
      "TRUE",

    customerCredentialsWhatsappSms:
      "FALSE",

    guarantorVerifyOtpWhatsappSms:
      "FALSE",

    loginWithOtpWhatsappSms:
      "TRUE",

    settlementWhatsappSms:
      "TRUE",

    staffVerifyWhatsappSms:
      "TRUE",

    // -----------------------------------------
    // OTHER SETTINGS
    // -----------------------------------------

    disbursementAfterApprovalStatus:
      "FALSE",

    autoApproveMemberCollectionStatus:
      "FALSE",

    showAllMembers:
      "TRUE",

    deletePendingEmiAfterLoanComplete:
      "TRUE",

  });

  // =========================================================
  // FILE REFERENCES
  // =========================================================

  const logoInputRef = useRef(null);

  const faviconInputRef = useRef(null);

  const qrInputRef = useRef(null);

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageUpload = (event, setImage) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage({
      file: file,
      url: imageUrl,
      name: file.name,
    });
  };

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const removeImage = (image, setImage) => {

    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }

    setImage(null);
  };

  // =========================================================
  // EDIT BUTTON
  // =========================================================

  const handleEdit = () => {
    setIsEditMode(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  // =========================================================
  // SAVE FORM
  // =========================================================

  const handleSave = (updatedData) => {

    setCompanyData(updatedData);

    setIsEditMode(false);
  };

  return (
    <div className="master-settings-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="master-settings-page-header">

        <h2>SETTING</h2>

        <div className="master-settings-breadcrumb">

          <span>●</span>

          <span>DASHBOARD</span>

          <span>›</span>

          <strong>SETTING</strong>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="master-settings-content">

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="master-settings-left">

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="master-settings-upload-card">

            <div className="master-settings-upload-title">
              LOGO
            </div>

            <div className="master-settings-upload-body">

              <div className="master-settings-logo-preview">

                {logo ? (

                  <>
                    <img
                      src={logo.url}
                      alt="Logo"
                    />

                    <button
                      type="button"
                      className="master-settings-remove-image"
                      onClick={() =>
                        removeImage(
                          logo,
                          setLogo
                        )
                      }
                    >
                      <FaTimes />
                    </button>
                  </>

                ) : (

                  <div className="master-settings-empty-logo">
                    LOGO
                  </div>

                )}

              </div>


              <div className="master-settings-company-short-name">
                {companyData.shortName}
              </div>


              <div className="master-settings-company-name">
                {companyData.companyName}
              </div>


              <div className="master-settings-file-area">

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(
                      e,
                      setLogo
                    )
                  }
                  className="master-settings-file-input"
                />

                <button
                  type="button"
                  className="master-settings-choose-btn"
                  onClick={() =>
                    logoInputRef.current?.click()
                  }
                >
                  <FaUpload />

                  Choose File
                </button>

                <span className="master-settings-file-name">

                  {logo
                    ? logo.name
                    : "No file chosen"}

                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              FAVICON
          ================================================= */}

          <div className="master-settings-upload-card">

            <div className="master-settings-upload-title">
              FAVICON
            </div>

            <div className="master-settings-upload-body">

              <div className="master-settings-square-preview">

                {favicon ? (

                  <>
                    <img
                      src={favicon.url}
                      alt="Favicon"
                    />

                    <button
                      type="button"
                      className="master-settings-remove-image"
                      onClick={() =>
                        removeImage(
                          favicon,
                          setFavicon
                        )
                      }
                    >
                      <FaTimes />
                    </button>
                  </>

                ) : (

                  <div className="master-settings-empty-square">
                    <span>F</span>
                  </div>

                )}

              </div>


              <div className="master-settings-file-area">

                <input
                  ref={faviconInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(
                      e,
                      setFavicon
                    )
                  }
                  className="master-settings-file-input"
                />

                <button
                  type="button"
                  className="master-settings-choose-btn"
                  onClick={() =>
                    faviconInputRef.current?.click()
                  }
                >
                  <FaUpload />

                  Choose File
                </button>

                <span className="master-settings-file-name">

                  {favicon
                    ? favicon.name
                    : "No file chosen"}

                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              QR CODE
          ================================================= */}

          <div className="master-settings-upload-card">

            <div className="master-settings-upload-title">
              QRCODE
            </div>

            <div className="master-settings-upload-body">

              <div className="master-settings-square-preview qr">

                {qrCode ? (

                  <>
                    <img
                      src={qrCode.url}
                      alt="QR Code"
                    />

                    <button
                      type="button"
                      className="master-settings-remove-image"
                      onClick={() =>
                        removeImage(
                          qrCode,
                          setQrCode
                        )
                      }
                    >
                      <FaTimes />
                    </button>
                  </>

                ) : (

                  <div className="master-settings-empty-qr">
                    QR
                  </div>

                )}

              </div>


              <div className="master-settings-file-area">

                <input
                  ref={qrInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(
                      e,
                      setQrCode
                    )
                  }
                  className="master-settings-file-input"
                />

                <button
                  type="button"
                  className="master-settings-choose-btn"
                  onClick={() =>
                    qrInputRef.current?.click()
                  }
                >
                  <FaUpload />

                  Choose File
                </button>

                <span className="master-settings-file-name">

                  {qrCode
                    ? qrCode.name
                    : "No file chosen"}

                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div className="master-settings-right">

          {!isEditMode ? (

            <>
              {/* =============================================
                  PROFILE HEADER
              ============================================= */}

              <div className="master-settings-profile-header">

                <h2 className="master-settings-profile-title">

                  COMPANY PROFILE EDIT

                  <button
                    type="button"
                    className="master-settings-edit-btn"
                    onClick={handleEdit}
                    title="Edit Company Profile"
                  >
                    <FaPen />
                  </button>

                </h2>

              </div>


              {/* =============================================
                  TABLE
              ============================================= */}

              <MasterSettingsTable
                companyData={companyData}
              />

            </>

          ) : (

            <MasterSettingsForm
              companyData={companyData}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />

          )}

        </div>

      </div>

    </div>
  );
};

export default MasterSettings;