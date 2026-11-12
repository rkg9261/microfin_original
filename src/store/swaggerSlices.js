import { createCrudSlice } from "./createCrudSlice";
import { createResourceApi } from "../api/createResourceApi";
import { entityMappers } from "../api/entityMappers";

export const swaggerEntities = [
  { key: "advanceSecurity", path: "/AdvanceSecurities" },
  { key: "branchCenter", path: "/BranchCenters" },
  { key: "staffBranch", path: "/StaffBranchAssignments" },
  { key: "group", path: "/Groups" },
  { key: "groupMember", path: "/GroupMembers" },
  { key: "member", path: "/Members" },
  { key: "memberCgt", path: "/MemberCgtGrts" },
  { key: "product", path: "/Products" },
  { key: "productVariant", path: "/ProductVariants" },
  { key: "productSupplier", path: "/ProductSuppliers" },
  { key: "productLoan", path: "/ProductLoans" },
  { key: "insuranceParty", path: "/InsuranceParties" },
  { key: "individualLoan", path: "/IndividualLoans" },
  { key: "groupLoan", path: "/GroupLoans" },
  { key: "loanTopup", path: "/LoanTopups" },
  { key: "loanSummary", path: "/LoanSummaries" },
  { key: "disbursement", path: "/Disbursements" },
  { key: "groupMemberDisbursement", path: "/GroupMemberDisbursements" },
  { key: "paidEmi", path: "/PaidEmis" },
  { key: "dueEmi", path: "/DueEmis" },
  { key: "futureDueEmi", path: "/FutureDueEmis" },
  { key: "promiseToPay", path: "/PromiseToPays" },
  { key: "groupEmiCollection", path: "/GroupEmiCollections" },
  { key: "duePenalty", path: "/DuePenalties" },
  { key: "country", path: "/Countries" },
  { key: "district", path: "/Districts" },
];

export const swaggerReducers = {};
export const swaggerActions = {};

// BranchCenters list currently returns 204 even when rows exist.
// Fall back to probing GET /BranchCenters/{id} so the UI can list saved records.
const fetchBranchCentersByIdProbe = async (resource, mapper) => {
  const items = [];
  let misses = 0;

  for (let id = 1; id <= 300 && misses < 8; id += 1) {
    try {
      const item = await resource.getById(id);
      if (item && item.isDeleted !== true) {
        items.push(mapper ? mapper(item) : item);
        misses = 0;
      } else {
        misses += 1;
      }
    } catch {
      misses += 1;
    }
  }

  return items;
};

swaggerEntities.forEach(({ key, path }) => {
  const resource = createResourceApi(path);
  const mapper = entityMappers[key];

  const api = {
    getAll: async () => {
      const data = await resource.getAll();
      const list = Array.isArray(data) ? data : [];

      if (list.length > 0) {
        return mapper ? list.map(mapper) : list;
      }

      if (key === "branchCenter") {
        return fetchBranchCentersByIdProbe(resource, mapper);
      }

      return [];
    },
    create: async (payload) => {
      const created = await resource.create(payload);
      return mapper && created ? mapper(created) : created;
    },
    update: async (id, payload) => {
      const updated = await resource.update(id, payload);
      return mapper && updated ? mapper(updated) : updated;
    },
    remove: resource.remove,
  };

  const { reducer, actions } = createCrudSlice({ name: key, api });

  swaggerReducers[key] = reducer;
  swaggerActions[key] = {
    fetchAll: actions.fetchAll,
    createItem: actions.createItem,
    updateItem: actions.updateItem,
    deleteItem: actions.deleteItem,
    clearError: actions.clearError,
  };
});
