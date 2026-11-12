import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import loanPlanReducer from "./slices/loanPlanSlice";
import stateReducer from "./slices/stateSlice";
import districtReducer from "./slices/districtSlice";
import bankReducer from "./slices/bankSlice";
import branchReducer from "./slices/branchSlice";
import employeeReducer from "./slices/employeeSlice";
import designationReducer from "./slices/designationSlice";
import leaveReducer from "./slices/leaveSlice";
import penaltySchemeReducer from "./slices/penaltySchemeSlice";
import sessionMasterReducer from "./slices/sessionMasterSlice";
import productCategoryReducer from "./slices/productCategorySlice";
import productBrandReducer from "./slices/productBrandSlice";
import relationReducer from "./slices/relationSlice";
import regionReducer from "./slices/regionSlice";
import purposeReducer from "./slices/purposeSlice";
import identityProofReducer from "./slices/identityProofSlice";
import { swaggerReducers } from "./swaggerSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    loanPlan: loanPlanReducer,
    stateMaster: stateReducer,
    districtMaster: districtReducer,
    bank: bankReducer,
    branch: branchReducer,
    employee: employeeReducer,
    designation: designationReducer,
    leave: leaveReducer,
    penaltyScheme: penaltySchemeReducer,
    sessionMaster: sessionMasterReducer,
    productCategory: productCategoryReducer,
    productBrand: productBrandReducer,
    relation: relationReducer,
    region: regionReducer,
    purpose: purposeReducer,
    identityProof: identityProofReducer,
    ...swaggerReducers,
  },
});

export default store;
