import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import {
  GuestRoute,
  HomeRedirect,
  ProtectedRoute,
} from "./components/auth/ProtectedRoute";

import { Login, Register, ForgotPassword, } from "./pages/auth";

import LoanPlan from "./pages/loanplan/LoanPlan";
import Branches from "./pages/branches/Branches";
import BranchCenter from "./pages/branchcenter/BranchCenter";
import StaffBranches from "./pages/staffbranches/StaffBranches";
import PenaltyScheme from "./pages/penaltyscheme/PenaltyScheme";
import Group from "./pages/groups/Group";
import State from "./pages/state/State";
import District from "./pages/district/District";
import Bank from "./pages/bank/Bank";
import Designation from "./pages/designation/Designation";
import Leave from "./pages/leave/Leave";
import Miscellaneous from "./pages/miscellaneous/Miscellaneous";
import SoftwareTiming from "./pages/softwaretiming/SoftwareTiming";
import SessionMaster from "./pages/sessionmaster/SessionMaster";
import ProductCategory from "./pages/productmaster/productcategory/ProductCategory";
import ProductBrand from "./pages/productmaster/productbrand/ProductBrand";
import ProductVariant from "./pages/productmaster/productvariant/ProductVariant";
import ProductSupplier from "./pages/productmaster/productsupplier/ProductSupplier";
import Product from "./pages/productmaster/product/Product";
import ProductLoan from "./pages/productmaster/productloan/ProductLoan";
import InsuranceParty from "./pages/productmaster/insuranceparty/InsuranceParty";
import Employee from "./pages/hrm/employee/Employee";
import GroupMember from "./pages/customergroup/groupmember/GroupMember";
import CustomerCgt from "./pages/customergroup/customercgt/CustomerCgt";
import Member from "./pages/customergroup/member/Member";
import Disbursement from "./pages/disbursement/disbursement/Disbursement";
import GroupMemberDisbursement from "./pages/disbursement/groupdisbursement/GroupMemberDisbursement";
import DayBook from "./pages/accounting/voucher/daybook/DayBook";
import CashBook from "./pages/accounting/voucher/cashbook/CashBook";
import VoucherEntries from "./pages/accounting/voucher/voucherentries/VoucherEntries";
import Payment from "./pages/accounting/voucher/payment/Payment";
import LoanTopup from "./pages/applyforloan/loantopup/LoanTopup";
import IndividualLoan from "./pages/applyforloan/individualloan/IndividualLoan";
import GroupLoan from "./pages/applyforloan/grouploan/GroupLoan";
import LoanSummary from "./pages/loansummary/LoanSummary";
import AreaSummary from "./pages/areasummary/AreaSummary";
import LogsRecord from "./pages/logsrecord/LogsRecord";
import LoanHistory from "./pages/loanhistory/LoanHistory";
import LoanApproval from "./pages/approvals/loan/LoanApproval";
import SalaryApproval from "./pages/approvals/salary/SalaryApproval";
import Collection from "./pages/approvals/collection/Collection";
import ProductLoanApproval from "./pages/productloan/ProductLoanApproval";
import ApprovalSettlement from "./pages/approvals/settlement/ApprovalAettlement";
import FundTransfer from "./pages/approvals/fundtransfer/FundTransfer";
import AdvanceSecurity from "./pages/emi/advancesecurity/AdvanceSecurity";
import PaidEmi from "./pages/emi/paidemi/PaidEmi";
import DueEmi from "./pages/emi/dueemi/DueEmi";
import FutureDueEmi from "./pages/futureDueEmi/FutureDueEmi";
import PromiseToPay from "./pages/emi/promiseToPay/PromiseToPay";
import GroupEmiCollection from "./pages/emi/groupEmiCollection/GroupEmiCollection";
import OldMemberCollection from "./pages/emi/oldMemberCollection/OldMemberCollection";
import NewMemberCollection from "./pages/emi/newMemberCollection/NewMemberCollection";
import DuePenalty from "./pages/emi/duePenalty/DuePenalty";
import AccFundTransfer from "./pages/AccFundTransfer/AccFundTransfer";
import AcGroup from "./pages/acgroup/AcGroup";
import Ledger from "./pages/ledger/Ledger";
import BranchLedger from "./pages/branchLedger/BranchLedger";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import DeathMember from "./pages/loanCase/deathmember/DeathMember";
import TrialBalance from "./pages/accounting/voucher/trialbalance/TrialBalance";
import FYTrialBalance from "./pages/accounting/voucher/fyTrialBalance/FyTrialBalance";
import LoanSettlement from "./pages/loanCase/loanSettlement/LoanSettlement";
import FYVoucherStatement from "./pages/accounting/voucher/FYVoucherStatement/FYVoucherStatement";
import FYOpeningBalance from "./pages/accounting/voucher/FYOpeningBalance/FYOpeningBalance";
import LoanReport from "./pages/reporting/loanreport/LoanReport";
import DueEmiReport from "./pages/reporting/dueemireport/DueEmiReport";
import CollectionReport from "./pages/reporting/collectionReport/CollectionReport";
import DisbursementReport from "./pages/reporting/disbursementreport/DisbursementReport";
import SettlementReport from "./pages/reporting/settlementreport/SettlementReport";
import MemberAttendance from "./pages/reporting/memberattendance/MemberAttendance";
import OnlinePaymentReport from "./pages/reporting/onlinepaymentreport/OnlinePaymentReport";
import CibilReportExperian from "./pages/reporting/cibilreportexperian/CibilReportExperian";
import CibilReportEquifax from "./pages/reporting/cibilreportequifax/CibilReportEquifax";

import Dashboard from "./pages/dashboard/Dashboard1";
import MasterSettings from "./pages/masterSettings/MasterSettings";
import NotFound from "./pages/notFound/NotFound";



function App() {
  return (
    <Routes>

      {/* Authentication */}

      <Route path="/" element={<HomeRedirect />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />


        {/* MASTER FOLDER PAGES */}
        <Route path="/loan-plan" element={<Layout><LoanPlan /></Layout>} />
        <Route path="/penalty-scheme" element={<Layout><PenaltyScheme /></Layout>} />
        <Route path="/branches" element={<Layout><Branches /></Layout>} />
        <Route path="/staff-branch" element={<Layout><StaffBranches /></Layout>} />
        <Route path="/branch-center" element={<Layout><BranchCenter /></Layout>} />
        <Route path="/groups" element={<Layout><Group /></Layout>} />
        <Route path="/state" element={<Layout><State /></Layout>} />
        <Route path="/district" element={<Layout><District /></Layout>} />
        <Route path="/bank" element={<Layout><Bank /></Layout>} />
        <Route path="/designation" element={<Layout><Designation /></Layout>} />
        <Route path="/leave" element={<Layout><Leave /></Layout>} />
        <Route path="/miscellaneous" element={<Layout><Miscellaneous /></Layout>} />
        <Route path="/software-timing" element={<Layout><SoftwareTiming /></Layout>} />
        <Route path="/session" element={<Layout><SessionMaster /></Layout>} />
        <Route path="/setting-master" element={<Layout><MasterSettings /></Layout>} />


        {/* PRODUCT MASTER FOLDER PAGES */}
        <Route path="/product-category" element={<Layout><ProductCategory /></Layout>} />
        <Route path="/product-brand" element={<Layout><ProductBrand /></Layout>} />
        <Route path="/product-variant" element={<Layout><ProductVariant /></Layout>} />
        <Route path="/product-supplier" element={<Layout><ProductSupplier /></Layout>} />
        <Route path="/products" element={<Layout><Product /></Layout>} />
        <Route path="/product-loan" element={<Layout><ProductLoan /></Layout>} />
        <Route path="/insurance-party" element={<Layout><InsuranceParty /></Layout>} />

        {/* HRM */}
        <Route path="/employee" element={<Layout><Employee /></Layout>} />


        {/*Customer members folder pages */}
        <Route path="/group-member" element={<Layout><GroupMember /></Layout>} />
        <Route path="/memberCgt" element={<Layout><CustomerCgt /></Layout>} />
        <Route path="/members" element={<Layout><Member /></Layout>} />

        {/* Disbursement */}
        <Route path="/disbursement" element={<Layout><Disbursement /></Layout>} />
        <Route path="/group-disbursement" element={<Layout><GroupMemberDisbursement /></Layout>} />

        {/* Accounting/voucher pages */}
        <Route path="/day-book" element={<Layout><DayBook /></Layout>} />
        <Route path="/cash-book" element={<Layout><CashBook /></Layout>} />
        <Route path="/voucher-entries" element={<Layout><VoucherEntries /></Layout>} />
        <Route path="/payment" element={<Layout><Payment /></Layout>} />
        <Route path="/receipt" element={<Layout><Payment /></Layout>} />
        <Route path="/contra" element={<Layout><Payment /></Layout>} />
        <Route path="/journal" element={<Layout><Payment /></Layout>} />
        <Route path="/trial-balance" element={<Layout><TrialBalance /></Layout>} />
        <Route path="/fy-trial-balance" element={<Layout><FYTrialBalance /></Layout>} />
        <Route path="/fy-voucher-statement" element={<Layout><FYVoucherStatement /></Layout>} />
        <Route path="/fy-opening-balance" element={<Layout><FYOpeningBalance /></Layout>} />

        {/* Apply for loan pages */}
        <Route path="/loan-topup" element={<Layout><LoanTopup /></Layout>} />
        <Route path="/individual-loan" element={<Layout><IndividualLoan /></Layout>} />
        <Route path="/group-loan" element={<Layout><GroupLoan /></Layout>} />

        {/* Loan Summary */}
        <Route path="/loan-summary" element={<Layout><LoanSummary /></Layout>} />

        {/* Area survey */}
        <Route path="/area-survey" element={<Layout><AreaSummary /></Layout>} />

        {/* logs records */}
        <Route path="/log-records" element={<Layout><LogsRecord /></Layout>} />

        {/* loan history */}
        <Route path="/loan-history" element={<Layout><LoanHistory /></Layout>} />

        {/* APPROVALS */}

        <Route path="/approval-loan" element={<Layout><LoanApproval /></Layout>} />
        <Route path="/approval-salary" element={<Layout><SalaryApproval /></Layout>} />
        <Route path="/approval-collection" element={<Layout><Collection /></Layout>} />
        <Route path="/approve-product-loan" element={<Layout><ProductLoanApproval /></Layout>} />
        <Route path="/settlement" element={<Layout><ApprovalSettlement /></Layout>} />
        <Route path="/fund-transfer" element={<Layout><FundTransfer /></Layout>} />

        {/* EMI  RECORDS*/}

        <Route path="/emi-advance-security" element={<Layout><AdvanceSecurity /></Layout>} />
        <Route path="/paid-emi" element={<Layout><PaidEmi /></Layout>} />
        <Route path="/due-emi" element={<Layout><DueEmi /></Layout>} />
        <Route path="/future-due" element={<Layout><FutureDueEmi /></Layout>} />
        <Route path="/promise-pay" element={<Layout><PromiseToPay /></Layout>} />
        <Route path="/group-emi" element={<Layout><GroupEmiCollection /></Layout>} />
        <Route path="/memeber-collection(old)" element={<Layout><OldMemberCollection /></Layout>} />
        <Route path="/memeber-collection(new)" element={<Layout><NewMemberCollection /></Layout>} />
        <Route path="/penalty-due" element={<Layout><DuePenalty /></Layout>} />

        {/* Acconting section */}
        {/* Acc-Fund Transfer */}
        <Route path="/Acc-fund-transfer" element={<Layout><AccFundTransfer /></Layout>} />
        {/* Ac-Group */}
        <Route path="/acgroup" element={<Layout><AcGroup /></Layout>} />
        {/* Ledger */}
        <Route path="/ledger" element={<Layout><Ledger /></Layout>} />
        {/* Branch Ledger */}
        <Route path="/branch-ledger" element={<Layout><BranchLedger /></Layout>} />

        {/* loan case */}

        <Route path="/death-member-list" element={<Layout><DeathMember /></Layout>} />
        <Route path="/loan-settlement" element={<Layout><LoanSettlement /></Layout>} />



        {/* Reporting */}
        <Route path="/loan-report" element={<Layout><LoanReport /></Layout>} />
        <Route path="/due-emi-reporting" element={<Layout><DueEmiReport /></Layout>} />
        <Route path="/collection-reporting" element={<Layout><CollectionReport /></Layout>} />
        <Route path="/disbursement-reporting" element={<Layout><DisbursementReport /></Layout>} />
        <Route path="/settlement-reporting" element={<Layout><SettlementReport /></Layout>} />
        <Route path="/member-attendance" element={<Layout><MemberAttendance /></Layout>} />
        <Route path="/online-payment-reporting" element={<Layout><OnlinePaymentReport /></Layout>} />
        <Route path="/experian-cibil-report" element={<Layout><CibilReportExperian /></Layout>} />
        <Route path="/equifax-cibil-report" element={<Layout><CibilReportEquifax /></Layout>} />

        {/* Admin  */}
        {/* change Password */}
        <Route path="/change-password" element={<Layout><ChangePassword /></Layout>} />

        {/* pofile */}
        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        {/* setting */}
        <Route path="/setting" element={<Layout><Settings /></Layout>} />
        {/* Admin end */}

        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Route>
    </Routes>




  );
}

export default App;