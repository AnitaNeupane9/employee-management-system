import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {APIResponseModel} from '../model/interface/role';
import {DesignationComponent} from '../components/designation/designation.component';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  // getDesignations():Observable<APIResponseModel>{
  //   return this.http
  //     .get<APIResponseModel>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllDesignation')
  // }

  getDesignations(): Observable<any> {
    return this.http.get<APIResponseModel>('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllDesignation').pipe(
      map((result) => result.data),
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => new Error('API error.'));
      })
    );
  }


}
