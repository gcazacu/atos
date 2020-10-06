import {Component, OnInit} from '@angular/core';
import {State} from "./store/state";
import {Store} from '@ngrx/store';
import {LoadDataEmployees, LoadDataPermissions, LoadDataRoles} from "./store/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
   this.store.dispatch(new LoadDataEmployees());
   this.store.dispatch(new LoadDataRoles());
   this.store.dispatch(new LoadDataPermissions());
  }
}
