import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _http = inject(HttpClient)
  private urlBase = 'http://localhost:3002/reg-client'

  public register(clientData: { email: string, password: string, sendEmailValue: boolean, idToken: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post(`${this.urlBase}`, clientData, { headers });
  }

}

