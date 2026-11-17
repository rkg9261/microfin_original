const hasValidId = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
};

const dash = (value) =>
  value === null || value === undefined || value === "" ? "-" : value;

const money = (value) => {
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

export const enrichDisbursementRow = (item, lookups = {}) => {
  const {
    branches = [],
    employees = [],
    members = [],
    individualLoans = [],
  } = lookups;

  const branch = hasValidId(item.branchId)
    ? branches.find((b) => String(b.branchId ?? b.id) === String(item.branchId))
    : null;
  const staff = hasValidId(item.staffId)
    ? employees.find(
        (e) => String(e.employeeId ?? e.id) === String(item.staffId)
      )
    : null;
  const member = hasValidId(item.memberId)
    ? members.find(
        (m) => String(m.memberId ?? m.id) === String(item.memberId)
      )
    : null;
  const loan = hasValidId(item.memberId)
    ? individualLoans.find(
        (l) => String(l.memberId) === String(item.memberId)
      )
    : null;

  const disDate = String(item.disbursementDate || item.disDate || "").slice(0, 10);
  const emiEndDate = String(item.emiEndDate || "").slice(0, 10);

  return {
    ...item,
    loanId: dash(item.loanId || item.id),
    plName: dash(loan?.planName || loan?.plan || item.plName),
    penaltyName: dash(loan?.penaltyName || item.penaltyName),
    category: dash(loan?.loanType || item.category),
    emiType: dash(loan?.loanType || item.emiType),
    planAmount: money(loan?.loanAmount ?? loan?.planAmount ?? item.planAmount),
    disAmount: money(loan?.loanAmount ?? loan?.planAmount ?? item.disAmount),
    disbursementDate: dash(disDate),
    disDate: dash(disDate),
    emiStartDate: dash(item.emiStartDate || disDate),
    emiEndDate: dash(emiEndDate),
    member: dash(
      member?.memberName ||
        item.member ||
        (hasValidId(item.memberId) ? `Member #${item.memberId}` : "")
    ),
    alias: dash(item.alias),
    staff: dash(
      getEmployeeLabel(staff) ||
        item.staff ||
        (hasValidId(item.staffId) ? `Staff #${item.staffId}` : "")
    ),
    branch: dash(
      branch?.branchName ||
        item.branch ||
        (hasValidId(item.branchId) ? `Branch #${item.branchId}` : "")
    ),
    branchCenter: dash(item.branchCenter),
    payMode: dash(item.payMode),
  };
};

export const enrichGroupDisbursementRow = (item, lookups = {}) => {
  const {
    branches = [],
    employees = [],
    members = [],
    groups = [],
    groupLoans = [],
  } = lookups;

  const branch = hasValidId(item.branchId)
    ? branches.find((b) => String(b.branchId ?? b.id) === String(item.branchId))
    : null;
  const staff = hasValidId(item.staffId)
    ? employees.find(
        (e) => String(e.employeeId ?? e.id) === String(item.staffId)
      )
    : null;
  const member = hasValidId(item.memberId)
    ? members.find(
        (m) => String(m.memberId ?? m.id) === String(item.memberId)
      )
    : null;
  const group = hasValidId(item.groupId)
    ? groups.find((g) => String(g.id) === String(item.groupId))
    : null;
  const loan = hasValidId(item.memberId)
    ? groupLoans.find(
        (l) =>
          String(l.memberId) === String(item.memberId) ||
          (hasValidId(item.groupId) &&
            String(l.groupId) === String(item.groupId))
      )
    : null;

  const disDate = String(item.disbursementDate || item.disDate || "").slice(0, 10);
  const emiEndDate = String(item.emiEndDate || "").slice(0, 10);

  return {
    ...item,
    applicationNo: dash(item.applicationNo || item.id),
    plName: dash(loan?.plan || loan?.planName || item.plName),
    penaltyName: dash(loan?.penaltyName || item.penaltyName),
    emiType: dash(loan?.emiType || loan?.loanType || item.emiType),
    planAmount: money(loan?.planAmount ?? item.planAmount),
    disAmount: money(loan?.planAmount ?? item.disAmount),
    disDate: dash(disDate),
    disbursementDate: dash(disDate),
    emiStartDate: dash(item.emiStartDate || disDate),
    emiEndDate: dash(emiEndDate),
    member: dash(
      member?.memberName ||
        item.member ||
        (hasValidId(item.memberId) ? `Member #${item.memberId}` : "")
    ),
    group: dash(
      group?.groupName ||
        item.group ||
        (hasValidId(item.groupId) ? `Group #${item.groupId}` : "")
    ),
    branchCenter: dash(item.branchCenter),
    branch: dash(
      branch?.branchName ||
        item.branch ||
        (hasValidId(item.branchId) ? `Branch #${item.branchId}` : "")
    ),
    staff: dash(
      getEmployeeLabel(staff) ||
        item.staff ||
        (hasValidId(item.staffId) ? `Staff #${item.staffId}` : "")
    ),
    payMode: dash(item.payMode),
  };
};

export const inDateRange = (value, from, to) => {
  const date = String(value || "").slice(0, 10);
  if (!date || date === "-") return !from && !to;
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
};
