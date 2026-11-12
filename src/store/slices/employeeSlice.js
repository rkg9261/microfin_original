import { createCrudSlice } from "../createCrudSlice";
import {
  getEmployees,
  createEmployee as createEmployeeApi,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
} from "../../api/employeeApi";

const { reducer, actions } = createCrudSlice({
  name: "employee",
  api: {
    getAll: getEmployees,
    create: createEmployeeApi,
    update: updateEmployeeApi,
    remove: deleteEmployeeApi,
  },
});

export const fetchEmployees = actions.fetchAll;
export const createEmployee = actions.createItem;
export const updateEmployee = actions.updateItem;
export const deleteEmployee = actions.deleteItem;

export default reducer;
