import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, RequestMethod, Request, Headers, BaseRequestOptions} from '@angular/http';

@Injectable()
/**
 * Extensión personalizada de la clase HTTP
 * Permite la configuración de todas las peticiones
 * Captura los envíos y respuestas
 * */
export class HttpService {

  private authorization: string;


  constructor(private http: Http) {
    this.authorization = '';
    this.subscribeToToken();
  }

  get(url: string): Observable <Response> {
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: any) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: any) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string, body: any) {
    return this.request(url, RequestMethod.Delete, body);
  }

  private request(url: string, method: RequestMethod, body?: any): Observable <Response>{

    const headers = new Headers();
    this.setHeaders(headers);

    const options = new BaseRequestOptions();
    options.headers = headers;
    options.url = url;
    options.method = method;
    options.body = body;

    const request = new Request(options);

    return this.http.request(request);
  }

  private subscribeToToken() {
    // const jsonString: string = '';
    // const user = JSON.parse(jsonString);
    // this.authorization = `${user.token_type} ${user.access_token}`;
  }

  /**
   * Interceptor para componer las cabeceras en cada petición
   * */
  private setHeaders(headers: Headers) {
    headers.set('Content-Type', 'application/json');
  }

}
