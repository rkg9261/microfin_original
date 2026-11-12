const API = {
  LOGIN: "/Auth/login",
  REGISTER: "/Auth/register",
  FORGOT_PASSWORD: "/Auth/forgot-password",

  BANKS: "/Banks",
  BANK_BY_ID: (id) => `/Banks/${id}`,

  BRANCHES: "/Branches",
  BRANCH_BY_ID: (id) => `/Branches/${id}`,

  BRANCH_CENTERS: "/BranchCenters",
  BRANCH_CENTER_BY_ID: (id) => `/BranchCenters/${id}`,

  COUNTRIES: "/Countries",
  COUNTRY_BY_ID: (id) => `/Countries/${id}`,

  COMPANIES: "/Companies",
  COMPANY_BY_ID: (id) => `/Companies/${id}`,

  DISTRICTS: "/Districts",
  DISTRICTS_SPECIFIC: "/Districts/getspecific",
  DISTRICT_BY_ID: (id) => `/Districts/${id}`,

  STATES: "/States",
  STATE_BY_ID: (id) => `/States/${id}`,

  GROUPS: "/Groups",
  GROUP_BY_ID: (id) => `/Groups/${id}`,

  GROUP_MEMBERS: "/GroupMembers",
  GROUP_MEMBER_BY_ID: (id) => `/GroupMembers/${id}`,

  MEMBERS: "/Members",
  MEMBER_BY_ID: (id) => `/Members/${id}`,

  MEMBER_CGT_GRTS: "/MemberCgtGrts",
  MEMBER_CGT_GRT_BY_ID: (id) => `/MemberCgtGrts/${id}`,

  EMPLOYEES: "/Employees",
  EMPLOYEE_BY_ID: (id) => `/Employees/${id}`,

  STAFF_BRANCH_ASSIGNMENTS: "/StaffBranchAssignments",
  STAFF_BRANCH_ASSIGNMENT_BY_ID: (id) => `/StaffBranchAssignments/${id}`,

  LOAN_PLANS: "/LoanPlans",
  LOAN_PLAN_BY_ID: (id) => `/LoanPlans/${id}`,

  LOAN_TYPES: "/LoanTypes",
  LOAN_TYPE_BY_ID: (id) => `/LoanTypes/${id}`,

  RECOVERY_TYPES: "/Recoverytypes",
  RECOVERY_TYPE_BY_ID: (id) => `/Recoverytypes/${id}`,

  INSURANCE_TYPES: "/InsuranceTypes",
  INSURANCE_TYPE_BY_ID: (id) => `/InsuranceTypes/${id}`,

  PENALTY_SCHEMES: "/PenaltySchemes",
  PENALTY_SCHEME_BY_ID: (id) => `/PenaltySchemes/${id}`,

  LEAVES: "/Leaves",
  LEAVE_BY_ID: (id) => `/Leaves/${id}`,

  IDENTITIES: "/Identities",
  IDENTITY_BY_ID: (id) => `/Identities/${id}`,

  RELATIONS: "/Relations",
  RELATION_BY_ID: (id) => `/Relations/${id}`,

  SESSIONS: "/Sessions",
  SESSION_BY_ID: (id) => `/Sessions/${id}`,

  PRODUCT_CATEGORIES: "/ProductCategories",
  PRODUCT_CATEGORY_BY_ID: (id) => `/ProductCategories/${id}`,

  PRODUCT_BRANDS: "/ProductBrands",
  PRODUCT_BRAND_BY_ID: (id) => `/ProductBrands/${id}`,

  PRODUCTS: "/Products",
  PRODUCT_BY_ID: (id) => `/Products/${id}`,

  PRODUCT_VARIANTS: "/ProductVariants",
  PRODUCT_VARIANT_BY_ID: (id) => `/ProductVariants/${id}`,

  PRODUCT_SUPPLIERS: "/ProductSuppliers",
  PRODUCT_SUPPLIER_BY_ID: (id) => `/ProductSuppliers/${id}`,

  PRODUCT_LOANS: "/ProductLoans",
  PRODUCT_LOAN_BY_ID: (id) => `/ProductLoans/${id}`,

  INSURANCE_PARTIES: "/InsuranceParties",
  INSURANCE_PARTY_BY_ID: (id) => `/InsuranceParties/${id}`,

  INDIVIDUAL_LOANS: "/IndividualLoans",
  INDIVIDUAL_LOAN_BY_ID: (id) => `/IndividualLoans/${id}`,

  GROUP_LOANS: "/GroupLoans",
  GROUP_LOAN_BY_ID: (id) => `/GroupLoans/${id}`,

  LOAN_TOPUPS: "/LoanTopups",
  LOAN_TOPUP_BY_ID: (id) => `/LoanTopups/${id}`,

  LOAN_SUMMARIES: "/LoanSummaries",
  LOAN_SUMMARY_BY_ID: (id) => `/LoanSummaries/${id}`,

  DISBURSEMENTS: "/Disbursements",
  DISBURSEMENT_BY_ID: (id) => `/Disbursements/${id}`,

  GROUP_MEMBER_DISBURSEMENTS: "/GroupMemberDisbursements",
  GROUP_MEMBER_DISBURSEMENT_BY_ID: (id) => `/GroupMemberDisbursements/${id}`,

  ADVANCE_SECURITIES: "/AdvanceSecurities",
  ADVANCE_SECURITY_BY_ID: (id) => `/AdvanceSecurities/${id}`,

  PAID_EMIS: "/PaidEmis",
  PAID_EMI_BY_ID: (id) => `/PaidEmis/${id}`,

  DUE_EMIS: "/DueEmis",
  DUE_EMI_BY_ID: (id) => `/DueEmis/${id}`,

  FUTURE_DUE_EMIS: "/FutureDueEmis",
  FUTURE_DUE_EMI_BY_ID: (id) => `/FutureDueEmis/${id}`,

  PROMISE_TO_PAYS: "/PromiseToPays",
  PROMISE_TO_PAY_BY_ID: (id) => `/PromiseToPays/${id}`,

  GROUP_EMI_COLLECTIONS: "/GroupEmiCollections",
  GROUP_EMI_COLLECTION_BY_ID: (id) => `/GroupEmiCollections/${id}`,

  DUE_PENALTIES: "/DuePenalties",
  DUE_PENALTY_BY_ID: (id) => `/DuePenalties/${id}`,

  // Kept for older screens. These paths are not in the current Swagger spec.
  DESTINATION_MASTER: "/DestinationMasters",
  DESTINATION_MASTER_BY_ID: (id) => `/DestinationMasters/${id}`,

  DESIGNATIONS: "/Designations",
  DESIGNATION_BY_ID: (id) => `/Designations/${id}`,
  PURPOSE_MASTERS: "/PurposeMasters",
  PURPOSE_MASTER_BY_ID: (id) => `/PurposeMasters/${id}`,
  REGION_MASTERS: "/RegionMasters",
  REGION_MASTER_BY_ID: (id) => `/RegionMasters/${id}`,

  // Back-compat aliases used by existing API modules
  LOGIN_ALIAS: "/Auth/login",
  BANK_MASTER: "/Banks",
  BANK_MASTER_BY_ID: (id) => `/Banks/${id}`,
  BRANCH: "/Branches",
  BRANCH_BY_ID: (id) => `/Branches/${id}`,
  LOAN_PLAN: "/LoanPlans",
  LOAN_PLAN_BY_ID: (id) => `/LoanPlans/${id}`,
  PENALTY_SCHEME: "/PenaltySchemes",
  PENALTY_SCHEME_BY_ID: (id) => `/PenaltySchemes/${id}`,
  STATE: "/States",
  STATE_BY_ID: (id) => `/States/${id}`,
  LEAVE_MASTER: "/Leaves",
  LEAVE_MASTER_BY_ID: (id) => `/Leaves/${id}`,
  IDENTITY_PROOF_MASTER: "/Identities",
  IDENTITY_PROOF_MASTER_BY_ID: (id) => `/Identities/${id}`,
  RELATIONS_BY_ID: (id) => `/Relations/${id}`,
  SESSION_MASTERS: "/Sessions",
  SESSION_MASTER_BY_ID: (id) => `/Sessions/${id}`,
};

export default API;
