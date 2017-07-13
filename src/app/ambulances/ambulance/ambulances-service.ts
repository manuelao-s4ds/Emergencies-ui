import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../lib/HttpClient';
import {Response} from '@angular/http';


@Injectable()
export class AmbulanceService {

  private static readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private _httpService: HttpService) {
  }

  list(): Observable <Response> {
    return this._httpService.get(`${AmbulanceService.BASE_URL}/ambulances`);
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

  update(data: any): Observable <Response> {
    return this._httpService.put(`${AmbulanceService.BASE_URL}/ambulances/${data._id}`, JSON.stringify(data));
  }

  delete(id: number): Observable <Response> {
    return this._httpService.delete(`${AmbulanceService.BASE_URL}/ambulances/${id}`, JSON.stringify({}));
  }
}
