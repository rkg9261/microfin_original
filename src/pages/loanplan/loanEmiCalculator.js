const round2 = (value) => Math.round((Number(value) || 0) * 100) / 100;

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const periodsPerYearFromRecovery = (recoveryName = "") => {
  const name = String(recoveryName).toLowerCase();
  if (name.includes("daily")) return 365;
  if (name.includes("week") && name.includes("bi")) return 26;
  if (name.includes("week")) return 52;
  if (name.includes("fortnight")) return 26;
  if (name.includes("quarter")) return 4;
  if (name.includes("year") || name.includes("annual")) return 1;
  return 12; // monthly default
};

const addRecoveryPeriod = (date, recoveryName = "") => {
  const next = new Date(date);
  const name = String(recoveryName).toLowerCase();

  if (name.includes("daily")) {
    next.setDate(next.getDate() + 1);
  } else if (name.includes("week") && name.includes("bi")) {
    next.setDate(next.getDate() + 14);
  } else if (name.includes("fortnight")) {
    next.setDate(next.getDate() + 14);
  } else if (name.includes("week")) {
    next.setDate(next.getDate() + 7);
  } else if (name.includes("quarter")) {
    next.setMonth(next.getMonth() + 3);
  } else if (name.includes("year") || name.includes("annual")) {
    next.setFullYear(next.getFullYear() + 1);
  } else {
    next.setMonth(next.getMonth() + 1);
  }

  return next;
};

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/**
 * Included charges (file / processing / insurance) when toggled on.
 */
export const getIncludedCharges = (formData = {}) => {
  const fileCharge = formData.fileChargeInclude
    ? toNumber(formData.fileCharge)
    : 0;
  const processingFee = formData.processingFeeInclude
    ? toNumber(formData.processingFeeAmount)
    : 0;
  const insurance = formData.insuranceChargeInclude
    ? toNumber(formData.insuranceAmount)
    : 0;

  return round2(fileCharge + processingFee + insurance);
};

export const getSchedulePrincipal = (formData = {}) => {
  const principal = round2(toNumber(formData.planAmount));
  const charges = getIncludedCharges(formData);
  const paidAmount = round2(toNumber(formData.paidAmount));
  const financedWithCharges = round2(principal + charges);

  // Demo style: finance charges into EMI base only when paidAmount covers them.
  // Otherwise use plan amount only (common when paidAmount === planAmount).
  if (paidAmount >= financedWithCharges && charges > 0) {
    return financedWithCharges;
  }
  return principal;
};

export const calcProcessingFeeAmount = (planAmount, percentage) =>
  round2((toNumber(planAmount) * toNumber(percentage)) / 100);

/**
 * Flat EMI schedule:
 * BASE = schedulePrincipal / n
 * INTEREST = (paidAmount - schedulePrincipal) / n
 * EMI = BASE + INTEREST
 * BALANCE reduces by BASE each row
 */
export const buildFlatEmiSchedule = ({
  planAmount,
  paidAmount,
  numberOfEMI,
  includedCharges = 0,
  recoveryTypeName = "Monthly",
  startDate = new Date(),
  preloanEmiInterest = 0,
  rateOfInterest = 0,
} = {}) => {
  const principal = round2(toNumber(planAmount));
  const charges = round2(toNumber(includedCharges));
  const emiCount = Math.max(0, Math.floor(toNumber(numberOfEMI)));
  const rate = toNumber(rateOfInterest);
  const periodsPerYear = periodsPerYearFromRecovery(recoveryTypeName);
  const financedWithCharges = round2(principal + charges);

  // Prefer Rate of Interest when provided; otherwise fall back to paidAmount spread.
  const interestFromRate =
    rate > 0
      ? round2(principal * (rate / 100) * (emiCount / periodsPerYear))
      : 0;

  const paid = round2(toNumber(paidAmount) || principal);
  const totalAmountToPay =
    rate > 0
      ? round2(principal + interestFromRate + (charges > 0 ? charges : 0))
      : paid;

  // Finance charges into base only when total repayment covers plan + charges.
  const schedulePrincipal =
    totalAmountToPay >= financedWithCharges && charges > 0
      ? financedWithCharges
      : principal;

  if (principal <= 0 || emiCount <= 0) {
    return {
      ok: false,
      error: "Please enter Plan Amount and Number Of EMI.",
    };
  }

  if (rate <= 0 && totalAmountToPay <= 0) {
    return {
      ok: false,
      error: "Please enter Rate of Interest (%) or Paid Amount.",
    };
  }

  if (rate <= 0 && totalAmountToPay < principal) {
    return {
      ok: false,
      error: `Paid Amount (₹${totalAmountToPay}) cannot be less than Plan Amount ₹${principal}.`,
    };
  }

  const totalInterest = round2(
    rate > 0
      ? Math.max(0, interestFromRate - toNumber(preloanEmiInterest))
      : Math.max(
          0,
          totalAmountToPay - schedulePrincipal - toNumber(preloanEmiInterest)
        )
  );

  const baseRaw = schedulePrincipal / emiCount;
  const interestRaw = totalInterest / emiCount;

  const rows = [];
  let balance = schedulePrincipal;
  let baseAllocated = 0;
  let interestAllocated = 0;
  let dueDate = new Date(startDate);

  for (let i = 1; i <= emiCount; i += 1) {
    const isLast = i === emiCount;
    const base = isLast
      ? round2(schedulePrincipal - baseAllocated)
      : round2(baseRaw);
    const interest = isLast
      ? round2(totalInterest - interestAllocated)
      : round2(interestRaw);
    const emi = round2(base + interest);

    baseAllocated = round2(baseAllocated + base);
    interestAllocated = round2(interestAllocated + interest);
    balance = isLast ? 0 : round2(balance - base);

    rows.push({
      index: i,
      date: formatDate(dueDate),
      base,
      interest,
      emi,
      balance,
    });

    dueDate = addRecoveryPeriod(dueDate, recoveryTypeName);
  }

  return {
    ok: true,
    numberOfPayments: emiCount,
    totalAmountToPay,
    preloanEmiInterest: round2(toNumber(preloanEmiInterest)),
    principalAmount: principal,
    schedulePrincipal,
    totalInterest,
    recoveryTypeName,
    periodsPerYear,
    rateOfInterest: rate,
    rows,
  };
};

export const buildEmiScheduleFromForm = (formData = {}, recoveryTypeName = "Monthly") =>
  buildFlatEmiSchedule({
    planAmount: formData.planAmount,
    paidAmount: formData.paidAmount || formData.planAmount,
    numberOfEMI: formData.numberOfEMI,
    includedCharges: getIncludedCharges(formData),
    recoveryTypeName,
    startDate: new Date(),
    preloanEmiInterest: 0,
    rateOfInterest: formData.rateOfInterest,
  });
