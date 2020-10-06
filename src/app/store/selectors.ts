import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FEATURE_NAME} from "./store.featurename";
import {State} from "./state";

export const state = createFeatureSelector<State>(FEATURE_NAME);

export const employeesList = createSelector(
  state,
  (state: State) => {
    return state.employees;
  }
);

export const rolesList = createSelector(
  state,
  (state: State) => {
    return state.roles;
  }
);

export const permission = createSelector(
  state,
  (state: State) => {
    return state.permissions;
  }
);
