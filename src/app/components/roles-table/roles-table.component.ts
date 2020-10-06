import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {employeesList, permission, rolesList} from "../../store/selectors";
import {Observable} from "rxjs";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from "@angular/forms";
import {UpdateUsersRole} from "../../store/actions";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements OnInit, OnDestroy {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  isAlive = true;
  employeesList$: Observable<any>;
  defaultRoleList$: Observable<any>;
  roleList;
  permissionsList;
  roleControl = new FormControl();

  constructor(private store: Store, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initSelectorsFromStore();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  initSelectorsFromStore() {
    this.employeesList$ = this.store.select(employeesList);
    this.defaultRoleList$ = this.store.select(rolesList);

    this.store.select(rolesList).pipe(takeWhile(() => this.isAlive)).subscribe(list => {
      if (list) {
        this.roleList = list;
      }
    });
    this.store.select(permission).pipe(takeWhile(() => this.isAlive)).subscribe(list => {
      if (list) {
        this.permissionsList = list;
      }
    });
  }

  displayRoleName(role) {
    return this.roleList && this.roleList.find(roleItem => roleItem.id === role).displayName;
  }

  checkIfMultipleRole(roleList) {
    return {
      multipleRoles: (roleList.length > 1),
      rolesSize: roleList.length - 1
    }
  }

  remove(role, employee): void {
    const payload = {
      roleId: role,
      employeeId: employee.id,
      removeRole: true
    };
    this.openDialog(employee, role, payload);
  }

  selectRole(employee, event) {
    if (employee.roles && employee.roles.findIndex(item => item === event.id) !== -1) return;
    const payload = {
      roleId: event.id,
      employeeId: employee.id,
      emptyRole: !employee.roles,
      addRole: true
    };
    this.openDialog(employee, event.id, payload);
  }

  private openDialog(employee, role, payload) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        employee: employee.firstName + ' ' + employee.lastName,
        role: this.displayRoleName(role),
        addRole: payload.addRole,
        removeRole: payload.removeRole
      }
    });

    dialogRef.afterClosed().subscribe(dialogData => {
      const {event} = dialogData;
      if (event === 'YES') {
        this.store.dispatch(new UpdateUsersRole(payload));
      } else {
        this.dialog.closeAll();
        this.roleControl.reset();
        return;
      }
    });
  }

  checkPermission(permission, employeePermissions) {
    return (employeePermissions.findIndex(item => item === permission) !== -1)
  }
}
