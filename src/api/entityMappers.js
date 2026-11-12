const num = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const text = (...values) => {
  const found = values.find(
    (value) => value !== undefined && value !== null && value !== ""
  );
  return found === undefined || found === null ? "" : String(found);
};

const toTimeSpan = (value) => {
  const raw = text(value);
  if (/^\d{2}:\d{2}$/.test(raw)) return `${raw}:00`;
  if (/^\d{2}:\d{2}:\d{2}/.test(raw)) return raw.slice(0, 8);
  return raw;
};

const isActiveStatus = (value) =>
  value === true || String(value).toUpperCase() === "ACTIVE";

const yesNo = (value) => {
  if (value === true || value === false) return value;
  const raw = String(value || "").toLowerCase();
  return raw === "yes" || raw === "true" || raw === "1" || raw === "active";
};

const dateTime = (value) => {
  const raw = text(value);
  if (!raw) return new Date().toISOString();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T00:00:00`;
  return raw;
};

const dateTimeOrNull = (value) => {
  const raw = text(value);
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T00:00:00`;
  return raw;
};

const optionalText = (value) => {
  const raw = text(value);
  return raw || null;
};

const statusFrom = (item) => {
  if (item.isActive === false || item.status === false) return "INACTIVE";
  if (item.isActive === true || item.status === true) return "ACTIVE";
  return text(item.status, item.paymentStatus, "ACTIVE");
};

export const entityMappers = {
  advanceSecurity: (item) => ({
    ...item,
    id: item.id,
    branch: text(item.branch, item.branchId),
    status: text(item.paymentStatus, item.status, "Pending"),
    payDate: text(item.date, item.payDate),
    paymentStartDate: text(item.paymentStartDate),
    paymentEndDate: text(item.paymentEndDate),
    loanId: text(item.loanId, item.id),
    memberName: text(item.memberName),
    memberCode: text(item.memberCode),
    alias: text(item.alias),
    mobile: text(item.mobile),
    type: text(item.type, "EMI"),
    centerName: text(item.centerName),
    amount: item.amount ?? 0,
    receivedBy: text(item.receivedBy),
    createdAt: text(item.createdDate, item.createdAt),
  }),

  branchCenter: (item) => ({
    ...item,
    id: item.id,
    code: text(item.code, `BC${item.id}`),
    name: text(item.name),
    branchId: item.branchId ?? null,
    branch: text(item.branchName, item.branch, item.branchId),
    description: text(item.description),
    remark: text(item.remark),
    status: statusFrom(item),
  }),

  staffBranch: (item) => ({
    ...item,
    id: item.id,
    branchId: item.branchId ?? null,
    staffId: item.staffId ?? null,
    employeeCode: text(item.employeeCode, item.staffId),
    employeeName: text(
      item.employeeName,
      item.staffName,
      [item.firstName, item.lastName].filter(Boolean).join(" ").trim(),
      item.staffId
    ),
    branch: text(item.branchName, item.branch, item.branchId),
    remark: text(item.remark),
    status: statusFrom(item),
  }),

  group: (item) => ({
    ...item,
    id: item.id,
    code: text(item.code, `GRP${item.id}`),
    branchId: item.branchId ?? null,
    branch: text(item.branchName, item.branch, item.branchId),
    groupName: text(item.groupName),
    city: text(item.cityVillageName, item.city),
    collectionTime: text(item.collectionTime).slice(0, 5),
    collectionDay: text(item.collectionDay),
    centerLeader: text(item.centerLeader),
    address: text(item.address),
    status: statusFrom(item),
  }),

  groupMember: (item) => ({
    ...item,
    id: item.id,
    branchId: item.branchId ?? null,
    memberId: item.memberId ?? null,
    groupId: item.groupId ?? null,
    code: text(item.code, item.id),
    name: text(item.groupName, item.name, item.groupId),
    groupCity: text(item.groupCity, item.cityVillageName),
    memberName: text(item.memberName, item.memberId),
    memberCode: text(item.memberCode, item.memberId),
    mobile: text(item.mobile, item.mobileNumber1),
    branch: text(item.branchName, item.branch, item.branchId),
    branchCode: text(item.branchCode),
    createdAt: text(item.createdDate, item.createdAt),
    status: statusFrom(item),
  }),

  member: (item) => {
    const memberId = item.memberId ?? item.id;
    const dob = text(item.dob, item.dateOfBirth).slice(0, 10);
    return {
      ...item,
      id: memberId,
      memberId,
      memberName: text(item.memberName),
      fatherName: text(item.fatherName),
      fatherHusbandName: text(
        item.fatherName,
        item.husbandName,
        item.fatherHusbandName
      ),
      gender: text(item.gender),
      dateOfBirth: dob,
      dob,
      mobileNumber: text(item.mobileNumber1, item.mobileNumber, item.mobile),
      mobileNumber1: text(item.mobileNumber1, item.mobileNumber, item.mobile),
      address: text(item.address),
      city: text(item.city, item.villageCity),
      villageCity: text(item.city, item.villageCity),
      aadhaarNumber: text(item.aadhaarNumber),
      panNumber: text(item.panNumber),
      kycType: item.aadhaarNumber
        ? "Aadhaar"
        : item.panNumber
        ? "PAN"
        : text(item.kycType, "Aadhaar"),
      kycNumber: text(item.aadhaarNumber, item.panNumber, item.kycNumber),
      accountNumber: text(item.accountNumber),
      ifscCode: text(item.ifscCode),
      bankName: text(item.bankName),
      branchId: item.branchId ?? null,
      branch: text(item.branchName, item.branch, item.branchId),
      memberSince: text(item.createdDate, item.memberSince).slice(0, 10),
      status: item.isActive === false ? "INACTIVE" : "ACTIVE",
    };
  },

  memberCgt: (item) => ({
    ...item,
    id: item.id,
    branchId: item.branchId ?? null,
    memberId: item.memberId ?? null,
    groupId: item.groupId ?? null,
    cgtStaffId: item.cgtStaffId ?? null,
    grtStaffId: item.grtStaffId ?? null,
    memberName: text(item.memberName, item.memberId),
    memberCode: text(item.memberCode, item.memberId),
    branch: text(item.branchName, item.branch, item.branchId),
    collectionCenter: text(item.collectionCenter),
    groupName: text(item.groupName, item.groupId),
    cgtStaff: text(item.cgtStaffName, item.cgtStaff, item.cgtStaffId),
    grtStaff: text(item.grtStaffName, item.grtStaff, item.grtStaffId),
    createdAt: text(item.createdDate, item.createdAt),
    status: statusFrom(item),
  }),

  product: (item) => ({
    ...item,
    id: item.productId ?? item.id,
    productName: text(item.productName),
    productCode: text(item.productCode),
    variantName: text(item.productVariant, item.variantName),
    brandName: text(item.brandName),
    categoryName: text(item.categoryName),
    hsnSac: text(item.hsnSac),
    mrpPrice: text(item.mrpPrice),
    costPrice: text(item.costPrice),
    salePrice: text(item.salePriceWithoutGST, item.salePrice),
    discountAmount: text(item.discountAmount),
    gstPercentage: text(item.gstPercentage),
    gstAmount: text(item.gstAmount),
    total: text(item.total),
    remark: text(item.remark),
    createdAt: text(item.createdDate, item.createdAt),
    status: statusFrom(item),
  }),

  productVariant: (item) => ({
    ...item,
    id: item.variantId ?? item.id,
    name: text(item.variantName, item.name),
    code: text(item.variantCode, item.code),
    remark: text(item.remark),
    createdAt: text(item.createdDate, item.createdAt),
    status: item.isActive === false ? "Inactive" : "Active",
  }),

  productSupplier: (item) => ({
    ...item,
    id: item.supplierId ?? item.id,
    name: text(item.supplierName, item.name),
    code: text(item.supplierCode, item.code),
    mobile: text(item.mobileNo, item.mobile),
    phone: text(item.phoneNo, item.phone),
    email: text(item.email),
    organization: text(item.organization),
    address: text(item.address),
    city: text(item.city),
    state: text(item.state),
    pin: text(item.pin),
    createdAt: text(item.createdDate, item.createdAt),
    status: item.isActive === false ? "INACTIVE" : "ACTIVE",
  }),

  productLoan: (item) => ({
    ...item,
    id: item.productLoanId ?? item.id,
    loanId: text(item.loanId, item.productLoanId, item.id),
    productName: text(item.productName, item.productId),
    product: text(item.product, item.productName, item.productId),
    memberName: text(item.memberName, item.memberId),
    supplierName: text(item.supplierName),
    branch: text(item.branch, item.branchId),
    branchCenter: text(item.branchCenter),
    mfgDate: text(item.mfgDate),
    expireDate: text(item.expireDate),
    downPayment: item.downpayment ?? item.downPayment ?? 0,
    loanAmount: item.loanAmount ?? 0,
    totalAmount: item.totalAmount ?? 0,
    status: statusFrom(item),
  }),

  insuranceParty: (item) => ({
    ...item,
    id: item.insurancePartyId ?? item.id,
    name: text(item.insurancePartyName, item.name),
    code: text(item.insurancePartyCode, item.code),
    remark: text(item.remark),
    status: statusFrom(item),
  }),

  individualLoan: (item) => ({
    ...item,
    id: item.id,
    planName: text(item.planName, item.planId),
    planType: text(item.planType, item.loanType),
    member: text(item.member, item.memberId),
    memberCode: text(item.memberCode, item.memberId),
    staff: text(item.staff, item.staffId),
    branch: text(item.branch, item.branchId),
    loanType: text(item.loanType),
    description: text(item.description),
  }),

  groupLoan: (item) => ({
    ...item,
    id: item.id,
    plan: text(item.plan, item.planId),
    member: text(item.member, item.memberId),
    memberCode: text(item.memberCode, item.memberId),
    group: text(item.group, item.groupId),
    staff: text(item.staff, item.agentId),
    branch: text(item.branch, item.branchId),
    branchCode: text(item.branchCode),
    branchCenter: text(item.branchCenter, item.branchCenterId),
    loanType: text(item.loanType),
  }),

  loanTopup: (item) => ({
    ...item,
    id: item.id,
    member: text(item.member, item.memberId),
    memberCode: text(item.memberCode, item.memberId),
    branchName: text(item.branchName, item.branchId),
    applyLoanAmount: item.applyLoanAmount ?? 0,
  }),

  loanSummary: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanId, item.id),
    memberName: text(item.memberName, item.customerId),
    memberCode: text(item.memberCode, item.customerId),
    branch: text(item.branch, item.branchId),
    status: text(item.status, item.paymentStatus, "ACTIVE"),
    recoveryType: text(item.recoveryType),
    disbursementDate: text(item.disbursementDate, item.date),
    emiStartDate: text(item.emiStartDate, item.lastEmiStartDate),
    emiLastDate: text(item.emiLastDate, item.lastEmiEndDate),
  }),

  disbursement: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanId, item.id),
    member: text(item.member, item.memberId),
    staff: text(item.staff, item.staffId),
    branch: text(item.branch, item.branchId),
    disbursementDate: text(item.disbursementDate),
    emiStartDate: text(item.emiStartDate, item.disbursementDate),
    emiEndDate: text(item.emiEndDate),
  }),

  groupMemberDisbursement: (item) => ({
    ...item,
    id: item.id,
    member: text(item.member, item.memberId),
    staff: text(item.staff, item.staffId),
    branch: text(item.branch, item.branchId),
    group: text(item.group, item.groupId),
    disbursementDate: text(item.disbursementDate),
    emiEndDate: text(item.emiEndDate),
  }),

  paidEmi: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanId, item.applicationNo, item.id),
    memberName: text(item.memberName, item.memberId),
    memberCode: text(item.memberCode, item.memberId),
    alias: text(item.alias),
    mobile: text(item.mobile),
    type: text(item.collectionType, item.type, "EMI"),
    centerName: text(item.centerName),
    payDate: text(item.date, item.payDate),
    amount: item.emiAmount ?? item.amount ?? 0,
    branch: text(item.branch, item.branchId),
    receivedBy: text(item.receivedBy, item.staffId),
    status: text(item.paymentStatus, item.status, "Pending"),
    created: text(item.createdDate),
  }),

  dueEmi: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanId, item.id),
    memberName: text(item.memberName),
    memberCode: text(item.memberCode),
    staff: text(item.staff, item.staffId),
    branch: text(item.branch, item.branchId),
    status: text(item.paymentStatus, item.status, "Pending"),
    recoveryType: text(item.recoveryType),
    city: text(item.city),
    emiDate: text(item.date, item.emiDate),
    duesEmi: item.emiAmount ?? item.duesEmi ?? 0,
  }),

  futureDueEmi: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanId, item.id),
    memberName: text(item.memberName),
    memberCode: text(item.memberCode),
    mobile: text(item.mobile),
    branch: text(item.branch, item.branchId),
    status: text(item.paymentStatus, item.status, "Unpaid"),
    recoveryType: text(item.recoveryType),
    emiAmount: item.emiAmount ?? 0,
    emiDueDate: text(item.emiDueDate),
  }),

  promiseToPay: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanId, item.id),
    name: text(item.name),
    group: text(item.group),
    amount: item.amount ?? 0,
    promiseDate: text(item.date, item.promiseDate),
    branch: text(item.branch, item.branchId),
    status: text(item.status, "PENDING"),
  }),

  groupEmiCollection: (item) => ({
    ...item,
    id: item.id,
    memberCode: text(item.memberCode, item.id),
    memberName: text(item.memberName),
    alias: text(item.alias),
    mobile: text(item.mobile),
    branch: text(item.branch, item.branchId),
    group: text(item.group, item.groupId),
    emi: item.emiAmount ?? item.emi ?? 0,
    currentDue: item.emiAmount ?? item.currentDue ?? 0,
    emiDate: text(item.date, item.collectionDate, item.emiDate),
    status: text(item.paymentStatus, item.status, "Unpaid"),
  }),

  duePenalty: (item) => ({
    ...item,
    id: item.id,
    loanId: text(item.loanApplicationNo, item.loanId, item.id),
    member: text(item.member, item.memberId),
    branch: text(item.branch, item.branchId),
    amount: text(item.penaltyAmount, item.amount),
    status: text(item.paymentStatus, item.status, "Pending"),
    dueDate: text(item.dueDate),
  }),

  country: (item) => ({
    ...item,
    id: item.countryId ?? item.id,
    name: text(item.countryName, item.name),
  }),

  district: (item) => ({
    ...item,
    id: item.districtId ?? item.id,
    name: text(item.districtName, item.name),
    stateId: item.stateId,
  }),
};

export const toApi = {
  advanceSecurity: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    paymentStatus: text(form.paymentStatus, form.status, "Pending"),
    date: dateTimeOrNull(form.date || form.payDate),
    paymentStartDate: dateTimeOrNull(form.paymentStartDate),
    paymentEndDate: dateTimeOrNull(form.paymentEndDate),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  branchCenter: (form) => {
    const payload = {
      branchId: num(form.branchId || form.branch),
      name: text(form.name),
      remark: text(form.remark) || null,
      description: text(form.description) || null,
      status: isActiveStatus(form.status),
      createdDate: form.createdDate || new Date().toISOString(),
    };

    const id = num(form.id);
    if (id > 0) {
      payload.id = id;
    }

    return payload;
  },

  staffBranch: (form) => ({
    id: num(form.id),
    branchId: num(form.branchId || form.branch),
    staffId: num(form.staffId || form.employeeCode),
    remark: text(form.remark),
    status: isActiveStatus(form.status),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  group: (form) => ({
    id: num(form.id),
    branchId: num(form.branchId || form.branch),
    cityVillageName: text(form.cityVillageName, form.city),
    groupName: text(form.groupName),
    collectionTime: toTimeSpan(form.collectionTime),
    address: text(form.address),
    collectionDay: text(form.collectionDay),
    centerLeader: text(form.centerLeader),
    status: isActiveStatus(form.status),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  groupMember: (form) => {
    const payload = {
      branchId: num(form.branchId || form.branch),
      memberId: num(form.memberId || form.member),
      groupId: num(form.groupId || form.group || form.name),
      createdDate: form.createdDate || new Date().toISOString(),
    };
    const id = num(form.id);
    if (id > 0) payload.id = id;
    return payload;
  },

  member: (form) => {
    const kycType = text(form.kycType);
    const kycNumber = text(form.kycNumber);
    const payload = {
      memberName: text(form.memberName),
      gender: text(form.gender),
      dob: dateTimeOrNull(form.dob || form.dateOfBirth),
      fatherName: optionalText(form.fatherName || form.fatherHusbandName),
      motherName: optionalText(form.motherName),
      husbandName: optionalText(form.husbandName),
      address: optionalText(form.address),
      city: optionalText(form.city || form.villageCity),
      mobileNumber1: optionalText(form.mobileNumber1 || form.mobileNumber),
      mobileNumber2: optionalText(form.mobileNumber2),
      aadhaarNumber: optionalText(
        form.aadhaarNumber || (kycType === "Aadhaar" ? kycNumber : null)
      ),
      panNumber: optionalText(
        form.panNumber || (kycType === "PAN" ? kycNumber : null)
      ),
      husbandAadhaarNumber: optionalText(form.husbandAadhaarNumber),
      husbandPANNumber: optionalText(form.husbandPANNumber),
      isActive: isActiveStatus(form.status || form.isActive),
      accountNumber: optionalText(form.accountNumber) || "",
      ifscCode: optionalText(form.ifscCode) || "",
      bankName: optionalText(form.bankName) || "",
      createdDate: form.createdDate || new Date().toISOString(),
    };
    const memberId = num(form.memberId || form.id);
    if (memberId > 0) payload.memberId = memberId;
    return payload;
  },

  memberCgt: (form) => {
    const payload = {
      branchId: num(form.branchId || form.branch),
      memberId: num(form.memberId || form.member),
      groupId: text(form.groupId || form.group)
        ? num(form.groupId || form.group)
        : null,
      cgtStaffId: num(form.cgtStaffId || form.cgtStaff),
      grtStaffId: num(form.grtStaffId || form.grtStaff),
      createdDate: form.createdDate || new Date().toISOString(),
    };
    const id = num(form.id);
    if (id > 0) payload.id = id;
    return payload;
  },

  product: (form) => ({
    productId: num(form.productId || form.id),
    categoryName: text(form.categoryName),
    brandName: text(form.brandName),
    productVariant: text(form.productVariant, form.variantName),
    productName: text(form.productName),
    productCode: text(form.productCode),
    hsnSac: optionalText(form.hsnSac),
    about: optionalText(form.about),
    description: optionalText(form.description),
    remark: optionalText(form.remark),
    mrpPrice: num(form.mrpPrice),
    costPrice: text(form.costPrice) ? num(form.costPrice) : null,
    salePriceWithoutGST: num(form.salePriceWithoutGST || form.salePrice),
    discountAmount: num(form.discountAmount),
    gstAmount: num(form.gstAmount),
    gstPercentage: num(form.gstPercentage),
    total: num(form.total),
    tag: optionalText(form.tag),
    status: isActiveStatus(form.status),
    createdDate: form.createdDate || new Date().toISOString(),
    updatedDate: form.updatedDate || null,
  }),

  productVariant: (form) => ({
    variantId: num(form.variantId || form.id),
    variantName: text(form.variantName, form.name),
    variantCode: text(form.variantCode, form.code),
    remark: optionalText(form.remark),
    isActive: String(form.status || form.isActive || "Active").toLowerCase() !== "inactive"
      && form.isActive !== false,
    createdDate: form.createdDate || new Date().toISOString(),
    updatedDate: form.updatedDate || null,
  }),

  productSupplier: (form) => ({
    supplierId: num(form.supplierId || form.id),
    supplierName: text(form.supplierName, form.name),
    supplierCode: optionalText(form.supplierCode || form.code),
    mobileNo: text(form.mobileNo, form.mobile),
    phoneNo: optionalText(form.phoneNo || form.phone),
    email: text(form.email),
    organization: text(form.organization),
    gstin: optionalText(form.gstin),
    address: text(form.address),
    city: optionalText(form.city),
    state: text(form.state),
    pin: text(form.pin, form.pincode),
    remark: optionalText(form.remark),
    isActive: isActiveStatus(form.isActive ?? form.status),
    createdDate: form.createdDate || new Date().toISOString(),
    updatedDate: form.updatedDate || null,
  }),

  productLoan: (form) => ({
    productLoanId: num(form.productLoanId || form.id),
    branchId: num(form.branchId || form.branch),
    productId: num(form.productId),
    memberId: num(form.memberId || form.member),
    supplierName: optionalText(form.supplierName),
    branchCenter: optionalText(form.branchCenter),
    mfgDate: dateTimeOrNull(form.mfgDate),
    expireDate: dateTimeOrNull(form.expireDate),
    imeiNo1: optionalText(form.imeiNo1),
    imeiNo2: optionalText(form.imeiNo2),
    productName: optionalText(form.productName),
    serialNo: optionalText(form.serialNo),
    warranty: optionalText(form.warranty),
    productMRP: num(form.productMRP || form.productMrp),
    discountAmount: num(form.discountAmount),
    salePrice: num(form.salePrice),
    gstAmount: num(form.gstAmount),
    units: num(form.units),
    downpayment: num(form.downpayment || form.downPayment),
    loanAmount: num(form.loanAmount),
    disbursementAmount: num(form.disbursementAmount),
    totalAmount: num(form.totalAmount),
    isRefurbished: yesNo(form.isRefurbished),
    insuranceCompanyName: optionalText(form.insuranceCompanyName),
    insuranceNumber: optionalText(form.insuranceNumber),
    insuranceStartDate: dateTimeOrNull(form.insuranceStartDate),
    insuranceEndDate: dateTimeOrNull(form.insuranceEndDate),
    remark: optionalText(form.remark),
    description: optionalText(form.description),
    status: isActiveStatus(form.status),
    createdDate: form.createdDate || new Date().toISOString(),
    updatedDate: form.updatedDate || null,
  }),

  insuranceParty: (form) => ({
    insurancePartyId: num(form.insurancePartyId || form.id),
    insurancePartyName: text(form.insurancePartyName, form.name),
    insurancePartyCode: text(form.insurancePartyCode, form.code),
    remark: optionalText(form.remark),
    status: isActiveStatus(form.status),
    createdDate: form.createdDate || new Date().toISOString(),
    updatedDate: form.updatedDate || null,
  }),

  individualLoan: (form) => ({
    id: num(form.id),
    branchId: num(form.branchId || form.branch),
    planId: num(form.planId || form.plan),
    description: text(form.description, "-"),
    staffId: num(form.staffId || form.staff),
    memberId: num(form.memberId || form.member),
    purposeId: num(form.purposeId || form.purpose),
    branchCenterId: text(form.branchCenterId || form.branchCenter)
      ? num(form.branchCenterId || form.branchCenter)
      : null,
    guarantorId: text(form.guarantorId || form.guarantor)
      ? num(form.guarantorId || form.guarantor)
      : null,
    penaltySchemeId: text(form.penaltySchemeId || form.penaltyScheme)
      ? num(form.penaltySchemeId || form.penaltyScheme)
      : null,
    hideRateOfInterestInPrint: yesNo(
      form.hideRateOfInterestInPrint ?? form.hideRateInterest
    ),
    loanType: text(form.loanType, "INDIVIDUAL"),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  groupLoan: (form) => ({
    id: num(form.id),
    branchId: num(form.branchId || form.branch),
    planId: num(form.planId || form.plan),
    description: text(form.description, "-"),
    agentId: num(form.agentId || form.staff),
    memberId: num(form.memberId || form.member),
    groupLeaderId: num(form.groupLeaderId || form.groupLeader),
    purposeId: num(form.purposeId || form.purpose),
    branchCenterId: text(form.branchCenterId || form.branchCenter)
      ? num(form.branchCenterId || form.branchCenter)
      : null,
    groupId: text(form.groupId || form.group) ? num(form.groupId || form.group) : null,
    guarantorId: text(form.guarantorId || form.guarantor)
      ? num(form.guarantorId || form.guarantor)
      : null,
    penaltySchemeId: text(form.penaltySchemeId || form.penaltyScheme)
      ? num(form.penaltySchemeId || form.penaltyScheme)
      : null,
    hideRateOfInterestInPrint: yesNo(
      form.hideRateOfInterestInPrint ?? form.hideRateInterest
    ),
    loanType: text(form.loanType, "GROUP"),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  loanTopup: (form) => ({
    id: num(form.id),
    branchId: num(form.branchId || form.branch),
    memberId: num(form.memberId || form.member),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  loanSummary: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    staffId: text(form.staffId || form.staff) ? num(form.staffId || form.staff) : null,
    customerId: text(form.customerId || form.memberId) ? num(form.customerId || form.memberId) : null,
    loanPlanId: text(form.loanPlanId || form.planId) ? num(form.loanPlanId || form.planId) : null,
    planTypeId: text(form.planTypeId) ? num(form.planTypeId) : null,
    date: dateTimeOrNull(form.date),
    loanCloseStartDate: dateTimeOrNull(form.loanCloseStartDate),
    loanCloseEndDate: dateTimeOrNull(form.loanCloseEndDate),
    lastEmiStartDate: dateTimeOrNull(form.lastEmiStartDate),
    lastEmiEndDate: dateTimeOrNull(form.lastEmiEndDate),
    recoveryType: optionalText(form.recoveryType),
    status: optionalText(form.status),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  disbursement: (form) => ({
    id: num(form.id),
    memberId: num(form.memberId || form.member),
    branchId: num(form.branchId || form.branch),
    staffId: num(form.staffId || form.staff),
    disbursementDate: dateTime(form.disbursementDate),
    emiEndDate: dateTime(form.emiEndDate),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  groupMemberDisbursement: (form) => ({
    id: num(form.id),
    memberId: num(form.memberId || form.member),
    branchId: num(form.branchId || form.branch),
    staffId: num(form.staffId || form.staff),
    groupId: text(form.groupId || form.group) ? num(form.groupId || form.group) : null,
    disbursementDate: dateTime(form.disbursementDate),
    emiEndDate: dateTime(form.emiEndDate),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  paidEmi: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    staffId: text(form.staffId || form.staff) ? num(form.staffId || form.staff) : null,
    memberId: text(form.memberId || form.member) ? num(form.memberId || form.member) : null,
    collectionType: optionalText(form.collectionType),
    applicationNo: optionalText(form.applicationNo),
    paymentStatus: text(form.paymentStatus, form.status, "Paid"),
    date: dateTimeOrNull(form.date),
    paymentStartDate: dateTimeOrNull(form.paymentStartDate),
    paymentEndDate: dateTimeOrNull(form.paymentEndDate),
    emiAmount: text(form.emiAmount) ? num(form.emiAmount) : null,
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  dueEmi: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    designationId: text(form.designationId) ? num(form.designationId) : null,
    collectionDay: text(form.collectionDay, "EveryDay"),
    staffId: text(form.staffId || form.staff) ? num(form.staffId || form.staff) : null,
    date: dateTime(form.date),
    emiFromDate: dateTimeOrNull(form.emiFromDate),
    emiToDate: dateTimeOrNull(form.emiToDate),
    typeId: text(form.typeId) ? num(form.typeId) : null,
    city: optionalText(form.city),
    recoveryType: text(form.recoveryType, "Regular"),
    sortBy: optionalText(form.sortBy),
    paymentStatus: text(form.paymentStatus, "Pending"),
    emiAmount: text(form.emiAmount) ? num(form.emiAmount) : null,
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  futureDueEmi: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    recoveryType: text(form.recoveryType, "Regular"),
    designationId: text(form.designationId) ? num(form.designationId) : null,
    staffId: text(form.staffId || form.staff) ? num(form.staffId || form.staff) : null,
    date: dateTime(form.date),
    orderByEmiDate: optionalText(form.orderByEmiDate),
    orderByGroup: optionalText(form.orderByGroup),
    typeId: text(form.typeId) ? num(form.typeId) : null,
    city: optionalText(form.city),
    paymentStatus: text(form.paymentStatus, "Pending"),
    emiAmount: text(form.emiAmount) ? num(form.emiAmount) : null,
    emiDueDate: dateTimeOrNull(form.emiDueDate),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  promiseToPay: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    date: dateTime(form.date || form.promiseDate),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  groupEmiCollection: (form) => ({
    id: num(form.id),
    date: dateTime(form.date),
    paymentStatus: text(form.paymentStatus, "Unpaid"),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    groupId: text(form.groupId || form.group) ? num(form.groupId || form.group) : null,
    emiAmount: text(form.emiAmount) ? num(form.emiAmount) : null,
    collectionDate: dateTimeOrNull(form.collectionDate || form.date),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  duePenalty: (form) => ({
    id: num(form.id),
    branchId: text(form.branchId || form.branch) ? num(form.branchId || form.branch) : null,
    memberId: text(form.memberId || form.member) ? num(form.memberId || form.member) : null,
    paymentStatus: text(form.paymentStatus, form.status, "Pending"),
    mergeRecords: text(form.mergeRecords, "No"),
    loanApplicationNo: optionalText(form.loanApplicationNo || form.loanId),
    penaltyAmount: text(form.penaltyAmount || form.amount) ? num(form.penaltyAmount || form.amount) : null,
    dueDate: dateTimeOrNull(form.dueDate),
    createdDate: form.createdDate || new Date().toISOString(),
  }),

  country: (form) => ({
    countryId: num(form.countryId || form.id),
    countryName: text(form.countryName, form.name),
  }),

  district: (form) => ({
    districtId: num(form.districtId || form.id),
    districtName: text(form.districtName, form.name),
    stateId: num(form.stateId),
  }),
};
