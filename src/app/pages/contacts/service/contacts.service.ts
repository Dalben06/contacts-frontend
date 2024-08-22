import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIService } from 'src/app/core/service/api.service';
import { Contact } from '../model/contact.model';
import { AppResponse } from 'src/app/core/models/appResponse';

@Injectable()
export class ContactsService {

constructor(private _api: APIService) { }


getContacts(): Observable<Contact[]> {
  return this._api.get(`Contact/GetAll`).pipe(
      map((result: AppResponse<Contact[]>) => {
          return result.data;
      }));
}

get(uuid: string): Observable<Contact> {
  return this._api.get(`Contact/Get/${uuid}`).pipe(
      map((result: AppResponse<Contact>) => {
          return result.data;
      }));
}

create(Contact: Contact): Observable<Contact> {
  return this._api.post(`Contact/CreateContact`, Contact).pipe(
      map((result: AppResponse<Contact>) => {
          return result.data;
      }));
}

update(Contact: Contact): Observable<Contact> {
  return this._api.put(`Contact/UpdateContact`, Contact).pipe(
      map((result: AppResponse<Contact>) => {
          return result.data;
      }));
}

delete(uuid: string): Observable<any> {
  return this._api.delete(`Contact/DisableContact/${uuid}`).pipe(
      map((result: AppResponse<any>) => {
          return result;
      }));
}
}
