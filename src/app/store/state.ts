export interface State {
  employees: any;
  roles: any
  permissions: any;
}

export const INITIAL_STATE: State = {
  employees: null,
  roles: null,
  permissions: null
};
