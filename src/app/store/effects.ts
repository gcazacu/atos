import {Injectable} from "@angular/core";
import {
  ActionTypes,
  ApiError,
  LoadDataEmployeesSuccess,
  LoadDataPermissionsSuccess,
  LoadDataRolesSuccess
} from "./actions";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, finalize, flatMap, tap} from "rxjs/operators";
import {ApiService} from "../services/api.service";
import {of} from "rxjs";

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect() loadEmployees = this.actions$.pipe(
    ofType(ActionTypes.LOAD_EMPLOYEES),
    flatMap(() => {
      return this.apiService.getEmployees().pipe(
        flatMap(
          (fetchedData: any) => [
            new LoadDataEmployeesSuccess(fetchedData)
          ]
        ),
        catchError(() => of(new ApiError()))
      )
    })
  );

  @Effect() loadRoles = this.actions$.pipe(
    ofType(ActionTypes.LOAD_ROLES),
    flatMap(() => {
      return this.apiService.getRoles().pipe(
        flatMap(
          (fetchedData: any) => [
            new LoadDataRolesSuccess(fetchedData)
          ]
        ),
        catchError(() => of(new ApiError()))
      )
    })
  );

  @Effect() loadPermissions = this.actions$.pipe(
    ofType(ActionTypes.LOAD_ROLES_SUCCESS),
    flatMap(() => {
      return this.apiService.getPermissions().pipe(
        flatMap(
          (fetchedData: any) => [
            new LoadDataPermissionsSuccess(fetchedData)
          ]
        ),
        catchError(() => of(new ApiError()))
      )
    })
  );

  @Effect({dispatch: false})
  onApiError$ = this.actions$.pipe(
    ofType(ActionTypes.API_ERROR),
    tap(() => {
      // here notification panel can be opened for example
    })
  );
}

