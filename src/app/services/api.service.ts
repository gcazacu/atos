import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urlConstants} from "../utils/contants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) {}

  getEmployees(): Observable<any> {
    const url = urlConstants.EMPLOYEES_URL;
    return this.http.get(url);
  }

  getRoles(): Observable<any> {
    const url = urlConstants.ROLES_URL;
    return this.http.get(url);
  }
  getPermissions(): Observable<any> {
    const url = urlConstants.PERMISSIONS_URL;
    return this.http.get(url);
  }
}
