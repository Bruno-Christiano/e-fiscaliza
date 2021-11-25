import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CongresspersonService {
  // urls
  _urlCongressperson = 'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=&ordem=ASC&ordenarPor=nome';
  _urlCongresspersonDetails = 'https://dadosabertos.camara.leg.br/api/v2/deputados/?';

  constructor(private _http: HttpClient) {}

  getAllCongressperson() {
    const url = this._urlCongressperson;
    return this._http.get<any>(url);
  }

  getOneCongressperson(id) {
    const url = this._urlCongresspersonDetails.replace('?', id);
    return this._http.get<any>(url);
  }
}
