import {INITIAL_STATE, State} from "./state";
import {ActionTypes, AtosProjectActions} from "./actions";
import {addPermissionsBasedOnRoles, updateRoles} from "../services/utils.mapper";

export function atosProjectReducer(state: State = INITIAL_STATE, action: AtosProjectActions) {

  switch (action.type) {
    case ActionTypes.LOAD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload
      };

    case ActionTypes.LOAD_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload
      };

    case ActionTypes.LOAD_PERMISSIONS_SUCCESS:
      const employees = state.employees;
      const roles = state.roles;

      employees.forEach(employee => {
        employee.permissions = addPermissionsBasedOnRoles(employee.roles, roles)
      });

      return {
        ...state,
        permissions: action.payload,
        employees: employees
      };

    case ActionTypes.UPDATE_USERS_ROLE:
      const employeesList = updateRoles(action.payload, state.employees);
      const rolesList = state.roles;
      return {
        ...state,
        employees: employeesList.map(employee => {
          employee.permissions = addPermissionsBasedOnRoles(employee.roles, rolesList);
          return employee;
        })
      };

    default:
      return state;
  }
}
