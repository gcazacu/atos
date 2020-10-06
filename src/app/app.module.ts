import {BrowserModule} from '@angular/platform-browser';
import {inject, InjectionToken, NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProjectEffects} from "./store/effects";
import {EffectsModule} from "@ngrx/effects";
import {atosProjectReducer} from "./store/reducers";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {FEATURE_NAME} from "./store/store.featurename";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatTableModule} from "@angular/material/table";
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RolesTableComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forFeature(FEATURE_NAME, atosProjectReducer),
    StoreModule.forRoot(atosProjectReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),

    EffectsModule.forRoot([ProjectEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {
}
