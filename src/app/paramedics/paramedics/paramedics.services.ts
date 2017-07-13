import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../lib/HttpClient';
import {Response} from '@angular/http';


@Injectable()
export class ParamedicsService {

  private static readonly BASE_URL: string = 'http://localhost:3000';

  constructor(private _httpService: HttpService) {
  }

  list(): Observable <Response> {
    return this._httpService.get(`${ParamedicsService.BASE_URL}/paramedics`);
  }

  save(data): Observable <Response> {
    return this._httpService.post(`${ParamedicsService.BASE_URL}/paramedics`, JSON.stringify(data));
  }

  update(data: any): Observable <Response> {
    return this._httpService.put(`${ParamedicsService.BASE_URL}/paramedics/${data._id}`, JSON.stringify(data));
  }

  delete(id: number): Observable <Response> {
    return this._httpService.delete(`${ParamedicsService.BASE_URL}/paramedics/${id}/`, JSON.stringify({}));
  }
}
