import { createCrudSlice } from "../createCrudSlice";
import {
  getLoanPlans,
  createLoanPlan as createLoanPlanApi,
  updateLoanPlan as updateLoanPlanApi,
  deleteLoanPlan as deleteLoanPlanApi,
} from "../../api/loanplanApi";

const { reducer, actions } = createCrudSlice({
  name: "loanPlan",
  api: {
    getAll: getLoanPlans,
    create: createLoanPlanApi,
    update: updateLoanPlanApi,
    remove: deleteLoanPlanApi,
  },
});

export const fetchLoanPlans = actions.fetchAll;
export const createLoanPlan = actions.createItem;
export const updateLoanPlan = actions.updateItem;
export const deleteLoanPlan = actions.deleteItem;
export const { clearError, setItems } = actions;

export default reducer;
