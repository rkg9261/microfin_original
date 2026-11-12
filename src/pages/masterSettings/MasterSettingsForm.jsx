import React, { useState } from "react";
import {
  FaTimes,
  FaSave,
  FaRegHandPointRight,
  FaCheck,
} from "react-icons/fa";

const MasterSettingsForm = ({
  companyData,
  onSave,
  onCancel,
}) => {
  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    ...companyData,

    // TOP COMPANY INFORMATION
    name: companyData.name || "Head Office",
    companyName:
      companyData.companyName ||
      " MICRO FINANCE ASSOCIATION LIMITED",
    shortName: companyData.shortName || "MICRO",
    upiId:
      companyData.upiId ||
      "janhitmicrofinance25@oksbi",

    enableBranchLoanDisbursement:
      companyData.enableBranchLoanDisbursement || "Active",

    website: companyData.website || "Nil",

    about:
      companyData.about ||
      "Skyline Finance Pvt ltd company",

    customerKycMandatory:
      companyData.customerKycMandatory || "Active",

    memberAgeLimitOption:
      companyData.memberAgeLimitOption || "Active",

    minimumAge: companyData.minimumAge || "20",

    maximumAge: companyData.maximumAge || "60",

    // REG OFFICE
    session: companyData.session || "2026-2027",

    gstNumber: companyData.gstNumber || "",

    formalName:
      companyData.formalName ||
      "VARDAN CO.OP PAITHAN",

    url:
      companyData.url ||
      companyData.softwareUrl ||
      "bank.ybl.org.in",

    companyClass:
      companyData.companyClass ||
      companyData.className ||
      "section 8",

    currencySymbol:
      companyData.currencySymbol || "₹",

    contactNumber1:
      companyData.contactNumber1 ||
      "9826079465",

    contactNumber2:
      companyData.contactNumber2 ||
      "18003139898",

    landlineNumber:
      companyData.landlineNumber ||
      companyData.landlineNo ||
      "REKHA SUNDAR PATTI,BIHAR",

    address:
      companyData.address ||
      "DABOKA GANIPUR HOJAI NAGAON ASSAM 782440",

    city: companyData.city || "HOJAI",

    pincode:
      companyData.pincode || "782440",

    selectState:
      companyData.selectState ||
      companyData.state ||
      "Assam",

    stateOfRegistration:
      companyData.stateOfRegistration ||
      "Madhya Pradesh",

    authorizedCapital:
      companyData.authorizedCapital || "0",

    cinNumber:
      companyData.cinNumber ||
      companyData.cin ||
      "",

    tanNumber:
      companyData.tanNumber ||
      companyData.tan ||
      "",

    decimalPlaces:
      companyData.decimalPlaces || "2",

    decimalPlacesForAmtInWords:
      companyData.decimalPlacesForAmtInWords || "",

    contactEmail:
      companyData.contactEmail ||
      companyData.email ||
      "care@ybl.org.in",

    incorporationDate:
      companyData.incorporationDate ||
      "2025-08-05",

    incorporationCountry:
      companyData.incorporationCountry ||
      "India",

    paidUpCapital:
      companyData.paidUpCapital || "0",

    shareNominalValue:
      companyData.shareNominalValue || "",

    faxNumber:
      companyData.faxNumber || "",

    panNumber:
      companyData.panNumber ||
      companyData.pan ||
      "",

    financialYearBeginFrom:
      companyData.financialYearBeginFrom ||
      "2025-12-17",

    // OTHER SETTINGS
    disbursementAfterApproval:
      companyData.disbursementAfterApproval ||
      companyData.disbursementAfterApprovalStatus ||
      "Inactive",

    autoApproveMemberCollection:
      companyData.autoApproveMemberCollection ||
      companyData.autoApproveMemberCollectionStatus ||
      "Inactive",

    interestPlanDeletePendingEmiLoanComplete:
      companyData.interestPlanDeletePendingEmiLoanComplete ||
      companyData.deletePendingEmiAfterLoanComplete ||
      "Active",

    showAllMembers:
      companyData.showAllMembers || "Active",

    enableEmailService:
      companyData.enableEmailService || "Inactive",

    singleCustomerMultipleDisbursement:
      companyData.singleCustomerMultipleDisbursement ||
      "Inactive",

    singleLoanMultipleCollection:
      companyData.singleLoanMultipleCollection ||
      "Active",

    // SMS
    smsService:
      companyData.smsService || "Inactive",

    staffDropoutSms:
      companyData.staffDropoutSms || "Active",

    staffCredentialSms:
      companyData.staffCredentialSms || "Active",

    sendSmsCustomerRegistration:
      companyData.sendSmsCustomerRegistration ||
      companyData.sendSmsOnCustomerRegistration ||
      "Active",

    sendSmsLoanDisbursement:
      companyData.sendSmsLoanDisbursement ||
      "Active",

    salaryDisbursementSms:
      companyData.salaryDisbursementSms ||
      "Active",

    sendSmsPasswordReset:
      companyData.sendSmsPasswordReset ||
      companyData.sendSmsOnPasswordReset ||
      "Active",

    sendSmsEmiApproval:
      companyData.sendSmsEmiApproval ||
      companyData.sendSmsOnEmiApproval ||
      "Active",

    settlementSms:
      companyData.settlementSms || "Active",

    dueReminderSms:
      companyData.dueReminderSms || "Active",

    sendSmsEmiCollection:
      companyData.sendSmsEmiCollection ||
      companyData.sendSmsOnEmiCollectedByStaff ||
      "Active",

    loginWithOtpSms:
      companyData.loginWithOtpSms || "Active",

    overdueReminderSms:
      companyData.overdueReminderSms || "Active",

    documentVerificationSms:
      companyData.documentVerificationSms ||
      "Active",

    memberVerifyOtpSms:
      companyData.memberVerifyOtpSms || "Inactive",

    customerCredentialsSms:
      companyData.customerCredentialsSms ||
      "Active",

    staffVerifyOtpSms:
      companyData.staffVerifyOtpSms || "Active",

    guarantorVerifyOtpSms:
      companyData.guarantorVerifyOtpSms || "Inactive",

    noOfEmiReminderSmsDays:
      companyData.noOfEmiReminderSmsDays || "2",

    overdueReminderSmsDays:
      companyData.overdueReminderSmsDays || "2",

    // WHATSAPP
    whatsappService:
      companyData.whatsappService || "Inactive",

    staffDropoutWhatsapp:
      companyData.staffDropoutWhatsapp || "Active",

    salaryDisbursementWhatsapp:
      companyData.salaryDisbursementWhatsapp || "Active",

    sendWhatsappCustomerRegistration:
      companyData.sendWhatsappCustomerRegistration ||
      "Active",

    sendWhatsappLoanDisbursement:
      companyData.sendWhatsappLoanDisbursement ||
      "Active",

    staffCredentialWhatsapp:
      companyData.staffCredentialWhatsapp || "Active",

    sendWhatsappPasswordReset:
      companyData.sendWhatsappPasswordReset ||
      "Active",

    sendWhatsappEmiApproval:
      companyData.sendWhatsappEmiApproval ||
      "Active",

    settlementWhatsapp:
      companyData.settlementWhatsapp || "Active",

    dueReminderWhatsapp:
      companyData.dueReminderWhatsapp || "Active",

    sendWhatsappEmiCollection:
      companyData.sendWhatsappEmiCollection ||
      "Active",

    loginWithOtpWhatsapp:
      companyData.loginWithOtpWhatsapp || "Active",

    overdueReminderWhatsapp:
      companyData.overdueReminderWhatsapp ||
      "Active",

    documentVerificationWhatsapp:
      companyData.documentVerificationWhatsapp ||
      "Active",

    memberVerifyOtpWhatsapp:
      companyData.memberVerifyOtpWhatsapp ||
      "Active",

    customerCredentialsWhatsapp:
      companyData.customerCredentialsWhatsapp ||
      "Inactive",

    staffVerifyOtpWhatsapp:
      companyData.staffVerifyOtpWhatsapp ||
      "Active",

    guarantorVerifyOtpWhatsapp:
      companyData.guarantorVerifyOtpWhatsapp ||
      "Active",

    noOfEmiReminderWhatsappDays:
      companyData.noOfEmiReminderWhatsappDays || "2",

    overdueReminderWhatsappDays:
      companyData.overdueReminderWhatsappDays || "2",
  });

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  // =========================================================
  // NORMAL INPUT
  // =========================================================

  const InputField = ({
    name,
    label,
    required = false,
    type = "text",
  }) => {
    return (
      <div className="ms-form-field">

        <label>
          {label}

          {required && (
            <span className="ms-required">*</span>
          )}
        </label>

        <input
          type={type}
          name={name}
          value={formData[name] ?? ""}
          onChange={handleChange}
        />

      </div>
    );
  };

  // =========================================================
  // SELECT
  // =========================================================

  const SelectField = ({
    name,
    label,
    required = false,
    options = ["Active", "Inactive"],
  }) => {
    return (
      <div className="ms-form-field">

        <label>
          {label}

          {required && (
            <span className="ms-required">*</span>
          )}
        </label>

        <select
          name={name}
          value={formData[name] ?? ""}
          onChange={handleChange}
        >
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>
    );
  };

  // =========================================================
  // SMS / WHATSAPP RADIO
  // =========================================================

  const ServiceField = ({
    name,
    label,
    required = false,
  }) => {
    return (
      <div className="ms-service-field">

        <div className="ms-service-label">

          <FaRegHandPointRight />

          <span>
            {label}

            {required && (
              <span className="ms-required">*</span>
            )}
          </span>

        </div>

        <div className="ms-radio-group">

          <label className="ms-radio-item">

            <input
              type="radio"
              name={name}
              value="Active"
              checked={formData[name] === "Active"}
              onChange={handleChange}
            />

            <span className="ms-radio-circle"></span>

            <FaCheck className="ms-check-icon" />

          </label>


          <label className="ms-radio-item">

            <input
              type="radio"
              name={name}
              value="Inactive"
              checked={formData[name] === "Inactive"}
              onChange={handleChange}
            />

            <span className="ms-radio-circle"></span>

            <span className="ms-cross-icon">
              ×
            </span>

          </label>

        </div>

      </div>
    );
  };

  return (
    <div className="ms-modal-overlay">

      <div className="ms-profile-modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="ms-modal-header">

          <h2>
            UPDATE COMPANY PROFILE
          </h2>

          <button
            type="button"
            className="ms-modal-close"
            onClick={onCancel}
          >
            <FaTimes />
          </button>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="ms-modal-form"
        >

          <div className="ms-modal-scroll">

            {/* =================================================
                TOP INFORMATION - 3 COLUMNS
            ================================================= */}

            <div className="ms-top-grid">

              {/* ================= COLUMN 1 ================= */}

              <div className="ms-form-column">

                <InputField
                  name="name"
                  label="NAME"
                  required
                />

                <InputField
                  name="companyName"
                  label="COMPANY NAME"
                  required
                />

                <InputField
                  name="shortName"
                  label="SHORT NAME"
                  required
                />

                <InputField
                  name="upiId"
                  label="UPI ID"
                  required
                />

              </div>


              {/* ================= COLUMN 2 ================= */}

              <div className="ms-form-column">

                <SelectField
                  name="enableBranchLoanDisbursement"
                  label="ENABLE BRANCH LOAN DISBURSEMENT FROM HEAD OFFICE"
                  required
                />

                <InputField
                  name="website"
                  label="WEBSITE"
                  required
                />

                <SelectField
                  name="customerKycMandatory"
                  label="CUSTOMER KYC MANDATORY"
                  required
                />

                <SelectField
                  name="memberAgeLimitOption"
                  label="MEMBER AGE LIMIT OPTION"
                  required
                />

              </div>


              {/* ================= COLUMN 3 ================= */}

              <div className="ms-form-column">

                <div className="ms-form-field">

                  <label>
                    ABOUT COMPANY
                    <span className="ms-required">*</span>
                  </label>

                  <textarea
                    name="about"
                    value={formData.about ?? ""}
                    onChange={handleChange}
                    rows="2"
                  />

                </div>

                <InputField
                  name="minimumAge"
                  label="MINIMUM AGE"
                  required
                />

                <InputField
                  name="maximumAge"
                  label="MAXIMUM AGE"
                  required
                />

              </div>

            </div>


            {/* =================================================
                REG OFFICE ADDRESS
            ================================================= */}

            <div className="ms-section-title">

              REG. OFFICE ADDRESS :

            </div>


            <div className="ms-three-column-grid">

              {/* ================= COLUMN 1 ================= */}

              <div className="ms-form-column">

                <InputField
                  name="session"
                  label="SESSION"
                />

                <InputField
                  name="url"
                  label="URL"
                  required
                />

                <InputField
                  name="contactNumber1"
                  label="CONTACT NUMBER 1"
                  required
                />

                <InputField
                  name="contactNumber2"
                  label="CONTACT NUMBER 2"
                  required
                />

                <InputField
                  name="landlineNumber"
                  label="LANDLINE NUMBER"
                />

                <InputField
                  name="address"
                  label="ADDRESS"
                />

                <InputField
                  name="city"
                  label="CITY"
                  required
                />

                <InputField
                  name="pincode"
                  label="PINCODE"
                  required
                />

                <SelectField
                  name="selectState"
                  label="SELECT STATE"
                  required
                  options={[
                    "Assam",
                    "Madhya Pradesh",
                    "Maharashtra",
                    "Bihar",
                    "Gujarat",
                    "Rajasthan",
                    "Delhi",
                    "Uttar Pradesh",
                  ]}
                />

                <InputField
                  name="contactEmail"
                  label="CONTACT EMAIL"
                  required
                  type="email"
                />

                <InputField
                  name="faxNumber"
                  label="FAX NUMBER"
                />

                <InputField
                  name="panNumber"
                  label="PAN NUMBER"
                />

              </div>


              {/* ================= COLUMN 2 ================= */}

              <div className="ms-form-column">

                <InputField
                  name="gstNumber"
                  label="GST NUMBER"
                />

                <InputField
                  name="companyClass"
                  label="COMPANY CLASS"
                  required
                />

                <SelectField
                  name="stateOfRegistration"
                  label="STATE OF REGISTRATION"
                  required
                  options={[
                    "Madhya Pradesh",
                    "Assam",
                    "Maharashtra",
                    "Bihar",
                    "Gujarat",
                    "Rajasthan",
                  ]}
                />

                <InputField
                  name="authorizedCapital"
                  label="AUTHORIZED CAPITAL"
                  required
                />

                <InputField
                  name="cinNumber"
                  label="CIN NUMBER"
                  required
                />

                <InputField
                  name="tanNumber"
                  label="TAN NUMBER"
                />

                <InputField
                  name="companyCategory"
                  label="COMPANY CATEGORY"
                />

                <InputField
                  name="incorporationDate"
                  label="INCORPORATION DATE"
                  required
                  type="date"
                />

                <InputField
                  name="incorporationCountry"
                  label="INCORPORATION COUNTRY"
                  required
                />

                <InputField
                  name="paidUpCapital"
                  label="PAID UP CAPITAL"
                  required
                />

                <InputField
                  name="shareNominalValue"
                  label="SHARE NOMINAL VALUE"
                />

                <InputField
                  name="financialYearBeginFrom"
                  label="FINANCIAL YEAR BEGIN FROM"
                  type="date"
                />

              </div>


              {/* ================= COLUMN 3 ================= */}

              <div className="ms-form-column">

                <InputField
                  name="formalName"
                  label="FORMAL NAME"
                />

                <InputField
                  name="currencySymbol"
                  label="CURRENCY SYMBOL"
                />

                <InputField
                  name="decimalPlaces"
                  label="DECIMAL PLACES"
                />

                <InputField
                  name="decimalPlacesForAmtInWords"
                  label="DECIMAL PLACES FOR AMT IN WORDS"
                />

                <InputField
                  name="wordRepresentingAmtAfterDecimal"
                  label="WORD REPRESENTING AMT AFTER DECIMAL"
                />

                <SelectField
                  name="disbursementAfterApproval"
                  label="DISBURSEMENT AFTER APPROVAL"
                  required
                />

                <SelectField
                  name="autoApproveMemberCollection"
                  label="AUTO APPROVE MEMBER COLLECTION"
                  required
                />

                <SelectField
                  name="interestPlanDeletePendingEmiLoanComplete"
                  label="INTEREST PLAN DELETE PENDING EMI LOAN COMPLETE"
                  required
                />

                <SelectField
                  name="showAllMembers"
                  label="SHOW ALL MEMBERS"
                  required
                />

                <SelectField
                  name="enableEmailService"
                  label="ENABLE EMAIL SERVICE"
                />

                <SelectField
                  name="singleCustomerMultipleDisbursement"
                  label="SINGLE CUSTOMER MULTIPLE DISBURSEMENT IN A DAY"
                  required
                />

                <SelectField
                  name="singleLoanMultipleCollection"
                  label="SINGLE LOAN MULTIPLE COLLECTION IN A DAY"
                  required
                />

              </div>

            </div>


            {/* =================================================
                SMS SETTINGS
            ================================================= */}

            <div className="ms-section-title">

              SMS SETTINGS :

            </div>


            <div className="ms-service-grid">

              {/* ================= COLUMN 1 ================= */}

              <div>

                <ServiceField
                  name="smsService"
                  label="SMS SERVICE"
                />

                <ServiceField
                  name="sendSmsCustomerRegistration"
                  label="SEND SMS CUSTOMER REGISTRATION"
                />

                <ServiceField
                  name="sendSmsPasswordReset"
                  label="SEND SMS ON PASSWORD RESET"
                />

                <ServiceField
                  name="dueReminderSms"
                  label="DUE REMINDER SMS"
                />

                <ServiceField
                  name="overdueReminderSms"
                  label="OVERDUE REMINDER SMS"
                />

                <ServiceField
                  name="memberVerifyOtpSms"
                  label="MEMBER VERIFY OTP SMS"
                />

                <ServiceField
                  name="staffVerifyOtpSms"
                  label="STAFF VERIFY OTP SMS"
                />

              </div>


              {/* ================= COLUMN 2 ================= */}

              <div>

                <ServiceField
                  name="staffDropoutSms"
                  label="STAFF DROPOUT SMS"
                />

                <ServiceField
                  name="sendSmsLoanDisbursement"
                  label="SEND SMS LOAN DISBURSEMENT"
                />

                <ServiceField
                  name="sendSmsEmiApproval"
                  label="SEND SMS ON EMI APPROVAL"
                />

                <ServiceField
                  name="sendSmsEmiCollection"
                  label="SEND SMS ON EMI COLLECTION"
                />

                <ServiceField
                  name="documentVerificationSms"
                  label="DOCUMENT VERIFICATION SMS"
                />

                <ServiceField
                  name="customerCredentialsSms"
                  label="CUSTOMER CREDENTIALS SMS"
                />

                <ServiceField
                  name="guarantorVerifyOtpSms"
                  label="GUARANTOR VERIFY OTP SMS"
                />

              </div>


              {/* ================= COLUMN 3 ================= */}

              <div>

                <ServiceField
                  name="staffCredentialSms"
                  label="STAFF CREDENTIAL SMS"
                />

                <ServiceField
                  name="salaryDisbursementSms"
                  label="SALARY DISBURSEMENT SMS"
                />

                <ServiceField
                  name="settlementSms"
                  label="SETTLEMENT SMS"
                />

                <ServiceField
                  name="loginWithOtpSms"
                  label="LOGIN WITH OTP SMS"
                />

                <div className="ms-form-field">

                  <label>
                    NO OF EMI REMAINDER SMS DAYS
                    <span className="ms-required">*</span>
                  </label>

                  <input
                    type="number"
                    name="noOfEmiReminderSmsDays"
                    value={
                      formData.noOfEmiReminderSmsDays
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="ms-form-field">

                  <label>
                    OVERDUE REMINDER SMS (NO OF DAYS)
                    <span className="ms-required">*</span>
                  </label>

                  <input
                    type="number"
                    name="overdueReminderSmsDays"
                    value={
                      formData.overdueReminderSmsDays
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                WHATSAPP SETTINGS
            ================================================= */}

            <div className="ms-section-title">

              WHATSAPP SETTINGS :

            </div>


            <div className="ms-service-grid">

              {/* ================= COLUMN 1 ================= */}

              <div>

                <ServiceField
                  name="whatsappService"
                  label="WHATSAPP SERVICE"
                />

                <ServiceField
                  name="sendWhatsappCustomerRegistration"
                  label="SEND WHATSAPP CUSTOMER REGISTRATION"
                />

                <ServiceField
                  name="sendWhatsappPasswordReset"
                  label="SEND WHATSAPP ON PASSWORD RESET"
                />

                <ServiceField
                  name="dueReminderWhatsapp"
                  label="DUE REMINDER WHATSAPP"
                />

                <ServiceField
                  name="overdueReminderWhatsapp"
                  label="OVERDUE REMINDER WHATSAPP"
                />

                <ServiceField
                  name="memberVerifyOtpWhatsapp"
                  label="MEMBER VERIFY OTP WHATSAPP"
                />

                <ServiceField
                  name="staffVerifyOtpWhatsapp"
                  label="STAFF VERIFY OTP WHATSAPP"
                />

              </div>


              {/* ================= COLUMN 2 ================= */}

              <div>

                <ServiceField
                  name="staffDropoutWhatsapp"
                  label="STAFF DROPOUT WHATSAPP"
                />

                <ServiceField
                  name="sendWhatsappLoanDisbursement"
                  label="SEND WHATSAPP LOAN DISBURSEMENT"
                />

                <ServiceField
                  name="sendWhatsappEmiApproval"
                  label="SEND WHATSAPP ON EMI APPROVAL"
                />

                <ServiceField
                  name="sendWhatsappEmiCollection"
                  label="SEND WHATSAPP ON EMI COLLECTION"
                />

                <ServiceField
                  name="documentVerificationWhatsapp"
                  label="DOCUMENT VERIFICATION WHATSAPP"
                />

                <ServiceField
                  name="customerCredentialsWhatsapp"
                  label="CUSTOMER CREDENTIALS WHATSAPP"
                />

                <ServiceField
                  name="guarantorVerifyOtpWhatsapp"
                  label="GUARANTOR VERIFY OTP WHATSAPP"
                />

              </div>


              {/* ================= COLUMN 3 ================= */}

              <div>

                <ServiceField
                  name="salaryDisbursementWhatsapp"
                  label="SALARY DISBURSEMENT WHATSAPP"
                />

                <ServiceField
                  name="staffCredentialWhatsapp"
                  label="STAFF CREDENTIAL WHATSAPP"
                />

                <ServiceField
                  name="settlementWhatsapp"
                  label="SETTLEMENT WHATSAPP"
                />

                <ServiceField
                  name="loginWithOtpWhatsapp"
                  label="LOGIN WITH OTP WHATSAPP"
                />

                <div className="ms-form-field">

                  <label>
                    NO OF EMI REMAINDER WHATSAPP DAYS
                    <span className="ms-required">*</span>
                  </label>

                  <input
                    type="number"
                    name="noOfEmiReminderWhatsappDays"
                    value={
                      formData.noOfEmiReminderWhatsappDays
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="ms-form-field">

                  <label>
                    OVERDUE REMINDER WHATSAPP (NO OF DAYS)
                    <span className="ms-required">*</span>
                  </label>

                  <input
                    type="number"
                    name="overdueReminderWhatsappDays"
                    value={
                      formData.overdueReminderWhatsappDays
                    }
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FOOTER BUTTONS
          ================================================= */}

          <div className="ms-modal-footer">

            <button
              type="button"
              className="ms-cancel-button"
              onClick={onCancel}
            >
              <FaTimes />
              CANCEL
            </button>

            <button
              type="submit"
              className="ms-save-button"
            >
              <FaSave />
              UPDATE
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default MasterSettingsForm;