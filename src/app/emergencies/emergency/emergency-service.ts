import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../lib/HttpClient';
import {Response} from '@angular/http';


@Injectable()
export class EmergencyService {

  private static readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private _httpService: HttpService) {
  }

  list(): Observable <Response> {
    return this._httpService.get(`${EmergencyService.BASE_URL}/emergencies`);
  }

  listPage(url: string): Observable <Response> {
    return this._httpService.get(url);
  }

  save(data): Observable <Response> {
    return this._httpService.post(`${EmergencyService.BASE_URL}/emergencies`, JSON.stringify(data));
  }

  findById(search): Observable <Response> {
    return this._httpService.get(`${EmergencyService.BASE_URL}/maquinas/?search=${search}`);
  }

  update(data: any): Observable <Response> {
    return this._httpService.put(`${EmergencyService.BASE_URL}/emergencies/${data._id}`, JSON.stringify(data));
  }

  delete(id: number): Observable <Response> {
    return this._httpService.delete(`${EmergencyService.BASE_URL}/emergencies/${id}/`, JSON.stringify({}));
  }

  getAmbulances(): Observable <Response> {
    return this._httpService.get(`${EmergencyService.BASE_URL}/ambulances`);
  }
  getParamedics(): Observable <Response> {
    return this._httpService.get(`${EmergencyService.BASE_URL}/paramedics`);
  }
}
