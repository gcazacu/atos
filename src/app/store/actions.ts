import {Action} from '@ngrx/store';

export enum ActionTypes {
  LOAD_EMPLOYEES = 'Load BE data for employees',
  LOAD_EMPLOYEES_SUCCESS = 'Load BE data for employees SUCCESS',

  LOAD_ROLES = 'Load BE data for ROLES',
  LOAD_ROLES_SUCCESS = 'Load BE data for ROLES SUCCESS',

  LOAD_PERMISSIONS = 'Load BE data for PERMISSIONS',
  LOAD_PERMISSIONS_SUCCESS = 'Load BE data for PERMISSIONS SUCCESS',

  SEND_DATA_TO_BE = 'Send data to BE',
  UPDATE_LOCAL_DATA = 'Update Local Store Data on Save',
  API_ERROR = 'API_ERROR',

  UPDATE_USERS_ROLE = 'UPDATE_USERS_ROLE'
}

export class LoadDataEmployees implements Action {
  readonly type = ActionTypes.LOAD_EMPLOYEES;

  constructor() {
  }
}

export class LoadDataEmployeesSuccess implements Action {
  readonly type = ActionTypes.LOAD_EMPLOYEES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadDataRoles implements Action {
  readonly type = ActionTypes.LOAD_ROLES;

  constructor() {
  }
}

export class LoadDataRolesSuccess implements Action {
  readonly type = ActionTypes.LOAD_ROLES_SUCCESS;

  constructor(public payload: any) {
  }

}

export class LoadDataPermissions implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS;

  constructor() {
  }
}

export class LoadDataPermissionsSuccess implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class ApiError implements Action {
  readonly type = ActionTypes.API_ERROR;
}

export class UpdateUsersRole implements Action {
  readonly type = ActionTypes.UPDATE_USERS_ROLE;
  constructor(public payload: any) {
  }
}

export type AtosProjectActions =
  | LoadDataEmployees
  | LoadDataEmployeesSuccess
  | LoadDataRoles
  | LoadDataRolesSuccess
  | LoadDataPermissions
  | LoadDataPermissionsSuccess
  | UpdateUsersRole
  | ApiError
