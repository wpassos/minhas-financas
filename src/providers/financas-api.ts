import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Conta } from '../models/conta'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FinancasApi {

  baseUrl: string = "http://192.168.0.3:8080/minhas-financas-api";
  contasUrl: string = this.baseUrl + "/contas";

  constructor(public http: Http) {}

  getContas(): Promise<Conta[]> {
    return this.http.get(this.contasUrl)
      .toPromise()
      .then(response => response.json()._embedded.contas as Conta[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



}
