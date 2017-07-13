import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../lib/HttpClient';
import {Response} from '@angular/http';


@Injectable()
export class AmbulanceService {

  private static readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private _httpService: HttpService) {
  }

  listPage(url: string): Observable <Response> {
    return this._httpService.get(url);
  }

  save(data): Observable <Response> {
    return this._httpService.post(`${AmbulanceService.BASE_URL}/ambulances`, JSON.stringify(data));
  }

  getAmbulances(): Observable <Response> {
    return this._httpService.get(`${AmbulanceService.BASE_URL}/ambulances`);
  }
}
