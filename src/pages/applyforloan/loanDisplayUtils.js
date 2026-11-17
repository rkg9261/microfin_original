const text = (...values) => {
  const found = values.find(
    (value) => value !== undefined && value !== null && value !== ""
  );
  return found === undefined || found === null ? "" : String(found);
};

const hasValidId = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
};

const displayOrDash = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  return value;
};

export const getEmployeeLabel = (employee) => {
  if (!employee) return "";
  const name = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return name || employee.employeeCode || "";
};

const sumFees = (plan) => {
  if (!plan) return null;
  const fileCharge = Number(plan.fileCharge) || 0;
  const processing = Number(plan.processingFeeAmount) || 0;
  const insurance = Number(plan.insuranceAmount ?? plan.insuranceFeeAmount) || 0;
  const total = fileCharge + processing + insurance;
  return total > 0 ? total : null;
};

export const enrichIndividualLoanRow = (item, lookups) => {
  const {
    branches = [],
    loanPlans = [],
    members = [],
    employees = [],
    branchCenters = [],
    penaltySchemes = [],
  } = lookups;

  const branch = hasValidId(item.branchId)
    ? branches.find((b) => String(b.branchId ?? b.id) === String(item.branchId))
    : null;
  const plan = hasValidId(item.planId)
    ? loanPlans.find((p) => String(p.id) === String(item.planId))
    : null;
  const member = hasValidId(item.memberId)
    ? members.find((m) => String(m.memberId ?? m.id) === String(item.memberId))
    : null;
  const staff = hasValidId(item.staffId)
    ? employees.find(
        (e) => String(e.employeeId ?? e.id) === String(item.staffId)
      )
    : null;
  const center = hasValidId(item.branchCenterId)
    ? branchCenters.find((c) => String(c.id) === String(item.branchCenterId))
    : null;
  const penalty = hasValidId(item.penaltySchemeId)
    ? penaltySchemes.find(
        (p) =>
          String(p.penaltySchemeId ?? p.id) === String(item.penaltySchemeId)
      )
    : null;

  const date =
    item.date && item.date !== "-"
      ? item.date
      : text(item.createdDate).slice(0, 10) || "-";

  return {
    ...item,
    planName: plan?.planName || item.planName || (hasValidId(item.planId) ? `Plan #${item.planId}` : "-"),
    penaltyName:
      penalty?.schemeName ||
      penalty?.penaltySchemeName ||
      item.penaltyName ||
      "-",
    member:
      member?.memberName ||
      item.member ||
      (hasValidId(item.memberId) ? `Member #${item.memberId}` : "-"),
    memberCode: member?.memberCode || item.memberCode || "-",
    staff:
      getEmployeeLabel(staff) ||
      item.staff ||
      (hasValidId(item.staffId) ? `Staff #${item.staffId}` : "-"),
    branchName:
      branch?.branchName ||
      item.branchName ||
      item.branch ||
      (hasValidId(item.branchId) ? `Branch #${item.branchId}` : "-"),
    branchCode: branch?.branchCode || item.branchCode || "",
    branchCenter:
      center?.name ||
      item.branchCenter ||
      (hasValidId(item.branchCenterId) ? `Center #${item.branchCenterId}` : "-"),
    emi: displayOrDash(plan?.numberOfEmi ?? plan?.numberOfEMI ?? item.emi),
    loanAmount: displayOrDash(plan?.planAmount ?? item.loanAmount),
    disAmount: displayOrDash(item.disAmount),
    fcPfIf: displayOrDash(sumFees(plan) ?? item.fcPfIf),
    payMode: displayOrDash(item.payMode),
    description: displayOrDash(item.description),
    date,
  };
};

export const enrichGroupLoanRow = (item, lookups) => {
  const {
    branches = [],
    loanPlans = [],
    members = [],
    groups = [],
    employees = [],
    branchCenters = [],
    penaltySchemes = [],
  } = lookups;

  const branch = hasValidId(item.branchId)
    ? branches.find((b) => String(b.branchId ?? b.id) === String(item.branchId))
    : null;
  const plan = hasValidId(item.planId)
    ? loanPlans.find((p) => String(p.id) === String(item.planId))
    : null;
  const member = hasValidId(item.memberId)
    ? members.find((m) => String(m.memberId ?? m.id) === String(item.memberId))
    : null;
  const group = hasValidId(item.groupId)
    ? groups.find((g) => String(g.id) === String(item.groupId))
    : null;
  const agent = hasValidId(item.agentId)
    ? employees.find(
        (e) => String(e.employeeId ?? e.id) === String(item.agentId)
      )
    : null;
  const leader = hasValidId(item.groupLeaderId)
    ? members.find(
        (m) => String(m.memberId ?? m.id) === String(item.groupLeaderId)
      )
    : null;
  const center = hasValidId(item.branchCenterId)
    ? branchCenters.find((c) => String(c.id) === String(item.branchCenterId))
    : null;
  const penalty = hasValidId(item.penaltySchemeId)
    ? penaltySchemes.find(
        (p) =>
          String(p.penaltySchemeId ?? p.id) === String(item.penaltySchemeId)
      )
    : null;

  return {
    ...item,
    plan: plan?.planName || item.plan || (hasValidId(item.planId) ? `Plan #${item.planId}` : "-"),
    penaltyName:
      penalty?.schemeName ||
      penalty?.penaltySchemeName ||
      item.penaltyName ||
      "-",
    member:
      member?.memberName ||
      item.member ||
      (hasValidId(item.memberId) ? `Member #${item.memberId}` : "-"),
    memberCode: member?.memberCode || item.memberCode || "-",
    group:
      group?.groupName ||
      item.group ||
      (hasValidId(item.groupId) ? `Group #${item.groupId}` : "-"),
    staff:
      getEmployeeLabel(agent) ||
      item.staff ||
      (hasValidId(item.agentId) ? `Agent #${item.agentId}` : "-"),
    branch:
      branch?.branchName ||
      item.branch ||
      item.branchName ||
      (hasValidId(item.branchId) ? `Branch #${item.branchId}` : "-"),
    branchCode: branch?.branchCode || item.branchCode || "",
    branchCenter:
      center?.name ||
      item.branchCenter ||
      (hasValidId(item.branchCenterId) ? `Center #${item.branchCenterId}` : "-"),
    centerLeader:
      leader?.memberName ||
      item.centerLeader ||
      item.groupLeader ||
      (hasValidId(item.groupLeaderId) ? `Leader #${item.groupLeaderId}` : "-"),
    emiType: displayOrDash(item.emiType || item.loanType),
    planAmount: displayOrDash(plan?.planAmount ?? item.planAmount),
  };
};

export const formatBranchCell = (name, code) => {
  const label = displayOrDash(name);
  if (!code) return label;
  return `${label} (${code})`;
};
