import React from "react";

const MasterSettingsTable = ({ companyData }) => {

  // =========================================================
  // LEFT TABLE DATA
  // =========================================================

  const leftData = [

    ["WEBSITE", companyData.website],

    ["NAME", companyData.name],

    ["SOFTWARE URL", companyData.softwareUrl],

    ["COMPANY NAME", companyData.companyName],

    ["SHORT NAME", companyData.shortName],

    ["UPI ID", companyData.upiId],

    ["ABOUT", companyData.about],

    ["CIN", companyData.cin],

    ["PAN", companyData.pan],

    ["TAN", companyData.tan],

    ["GST NO", companyData.gstNo],

    ["CATEGORY", companyData.category],

    ["CLASS", companyData.className],

    [
      "AUTHORIZED CAPITAL",
      companyData.authorizedCapital,
    ],

    [
      "PAID UP CAPITAL",
      companyData.paidUpCapital,
    ],

    [
      "SHARE NOMINAL VALUE",
      companyData.shareNominalValue,
    ],

    [
      "STATE OF REGISTRATION",
      companyData.stateOfRegistration,
    ],

    [
      "INCORPORATION COUNTRY",
      companyData.incorporationCountry,
    ],

    [
      "INCORPORATION DATE",
      companyData.incorporationDate,
    ],

    ["EMAIL", companyData.email],

    [
      "CONTACT NUMBER 1",
      companyData.contactNumber1,
    ],

    [
      "CONTACT NUMBER 2",
      companyData.contactNumber2,
    ],

    [
      "LANDLINE NO",
      companyData.landlineNo,
    ],

    ["ADDRESS", companyData.address],

    ["CITY", companyData.city],

    ["PINCODE", companyData.pincode],

    ["STATE", companyData.state],

    ["SESSION", companyData.session],

    [
      "SOFTWARE VERSION",
      companyData.softwareVersion,
    ],

    [
      "SOFTWARE VERSIONING DATE",
      companyData.softwareVersioningDate,
    ],

    [
      "LAST DAILY CRON DATE",
      companyData.lastDailyCronDate,
    ],

    [
      "LAST DAILY INTEREST CRON DATE",
      companyData.lastDailyInterestCronDate,
    ],

    [
      "CURRENCY SYMBOL",
      companyData.currencySymbol,
    ],

    [
      "DECIMAL PLACES",
      companyData.decimalPlaces,
    ],

    [
      "DECIMAL PLACES FOR AMT IN WORDS",
      companyData.decimalPlacesForAmtInWords,
    ],

    [
      "FINANCIAL YEAR BEGIN FROM",
      companyData.financialYearBeginFrom,
    ],

    [
      "FORMAL NAME",
      companyData.formalName,
    ],

    [
      "WORD REPRESENTING AMT AFTER DECIMAL",
      companyData.wordRepresentingAmtAfterDecimal,
    ],

    [
      "DISBURSEMENT AFTER APPROVAL STATUS",
      companyData.disbursementAfterApprovalStatus,
    ],

    [
      "AUTO APPROVE MEMBER COLLECTION STATUS",
      companyData.autoApproveMemberCollectionStatus,
    ],

    [
      "SHOW ALL MEMBERS",
      companyData.showAllMembers,
    ],

    [
      "DELETE PENDING EMI AFTER LOAN COMPLETE IN INTEREST PLANS LOAN",
      companyData.deletePendingEmiAfterLoanComplete,
    ],

  ];


  // =========================================================
  // RIGHT TABLE DATA
  // =========================================================

  const rightData = [

    [
      "CUSTOMER KYC STATUS",
      companyData.customerKycStatus,
    ],

    [
      "CUSTOMER LOAN AGE LIMIT OPTION",
      companyData.customerLoanAgeLimitOption,
    ],

    [
      "CUSTOMER MINIMUM AGE",
      companyData.customerMinimumAge,
    ],

    [
      "CUSTOMER MAXIMUM AGE",
      companyData.customerMaximumAge,
    ],

    [
      "BRANCH DISBURSEMENT FROM HEAD OFFICE",
      companyData.branchDisbursementFromHeadOffice,
    ],

    [
      "SEND SMS ON CUSTOMER REGISTRATION",
      companyData.sendSmsOnCustomerRegistration,
    ],

    [
      "SEND SMS ON PASSWORD RESET",
      companyData.sendSmsOnPasswordReset,
    ],

    [
      "DUE REMINDER SMS",
      companyData.dueReminderSms,
    ],

    [
      "OVERDUE REMINDER SMS",
      companyData.overdueReminderSms,
    ],

    [
      "MEMBER VERIFY OTP SMS",
      companyData.memberVerifyOtpSms,
    ],

    [
      "STAFF VERIFY OTP SMS",
      companyData.staffVerifyOtpSms,
    ],

    [
      "SALARY DISBURSEMENT SMS",
      companyData.salaryDisbursementSms,
    ],

    [
      "NO OF EMI REMINDER SMS DAYS",
      companyData.noOfEmiReminderSmsDays,
    ],

    [
      "OVERDUE REMINDER SMS DAYS",
      companyData.overdueReminderSmsDays,
    ],

    [
      "SEND SMS CUSTOMER LOAN DISBURSEMENT",
      companyData.sendSmsCustomerLoanDisbursement,
    ],

    [
      "SEND SMS ON EMI COLLECTED BY STAFF",
      companyData.sendSmsOnEmiCollectedByStaff,
    ],

    [
      "SEND SMS ON EMI APPROVAL",
      companyData.sendSmsOnEmiApproval,
    ],

    [
      "DOCUMENT VERIFICATION SMS",
      companyData.documentVerificationSms,
    ],

    [
      "CUSTOMER CREDENTIALS SMS",
      companyData.customerCredentialsSms,
    ],

    [
      "GUARANTOR VERIFY OTP SMS",
      companyData.guarantorVerifyOtpSms,
    ],

    [
      "LOGIN WITH OTP SMS",
      companyData.loginWithOtpSms,
    ],

    [
      "SETTLEMENT SMS",
      companyData.settlementSms,
    ],

    [
      "STAFF VERIFY SMS",
      companyData.staffVerifySms,
    ],

    [
      "SEND WHATSAPP SMS ON CUSTOMER REGISTRATION",
      companyData.sendWhatsappSmsOnCustomerRegistration,
    ],

    [
      "SEND WHATSAPP SMS ON PASSWORD RESET",
      companyData.sendWhatsappSmsOnPasswordReset,
    ],

    [
      "DUE REMINDER WHATSAPP SMS",
      companyData.dueReminderWhatsappSms,
    ],

    [
      "OVERDUE REMINDER WHATSAPP SMS",
      companyData.overdueReminderWhatsappSms,
    ],

    [
      "MEMBER VERIFY OTP WHATSAPP WHATSAPP SMS",
      companyData.memberVerifyOtpWhatsappSms,
    ],

    [
      "STAFF VERIFY OTP WHATSAPP SMS",
      companyData.staffVerifyOtpWhatsappSms,
    ],

    [
      "SALARY DISBURSEMENT WHATSAPP SMS",
      companyData.salaryDisbursementWhatsappSms,
    ],

    [
      "NO OF EMI REMINDER WHATSAPP SMS DAYS",
      companyData.noOfEmiReminderWhatsappSmsDays,
    ],

    [
      "OVERDUE REMINDER WHATSAPP SMS DAYS",
      companyData.overdueReminderWhatsappSmsDays,
    ],

    [
      "SEND WHATSAPP SMS CUSTOMER LOAN DISBURSEMENT",
      companyData.sendWhatsappSmsCustomerLoanDisbursement,
    ],

    [
      "SEND WHATSAPP SMS ON EMI COLLECTED BY STAFF",
      companyData.sendWhatsappSmsOnEmiCollectedByStaff,
    ],

    [
      "SEND WHATSAPP SMS ON EMI APPROVAL",
      companyData.sendWhatsappSmsOnEmiApproval,
    ],

    [
      "DOCUMENT VERIFICATION WHATSAPP SMS",
      companyData.documentVerificationWhatsappSms,
    ],

    [
      "CUSTOMER CREDENTIALS WHATSAPP SMS",
      companyData.customerCredentialsWhatsappSms,
    ],

    [
      "GUARANTOR VERIFY OTP WHATSAPP SMS",
      companyData.guarantorVerifyOtpWhatsappSms,
    ],

    [
      "LOGIN WITH OTP WHATSAPP SMS",
      companyData.loginWithOtpWhatsappSms,
    ],

    [
      "SETTLEMENT WHATSAPP SMS",
      companyData.settlementWhatsappSms,
    ],

    [
      "STAFF VERIFY WHATSAPP SMS",
      companyData.staffVerifyWhatsappSms,
    ],

  ];


  return (

    <div className="master-settings-table-container">

      <div className="master-settings-two-table">

        {/* ===================================================
            LEFT TABLE
        =================================================== */}

        <div className="master-settings-data-table">

          {leftData.map(
            ([label, value], index) => (

              <div
                className="master-settings-data-row"
                key={index}
              >

                <div className="master-settings-data-label">
                  {label}
                </div>

                <div className="master-settings-data-value">

                  {value || "-"}

                </div>

              </div>

            )
          )}

        </div>


        {/* ===================================================
            RIGHT TABLE
        =================================================== */}

        <div className="master-settings-data-table">

          {rightData.map(
            ([label, value], index) => (

              <div
                className="master-settings-data-row"
                key={index}
              >

                <div className="master-settings-data-label">
                  {label}
                </div>

                <div className="master-settings-data-value master-settings-right-value">

                  {value || "-"}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );
};

export default MasterSettingsTable;