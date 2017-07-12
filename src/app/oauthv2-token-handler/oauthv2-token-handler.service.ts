import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Token, AccessToken } from './token';

@Injectable()
export class Oauthv2TokenHandlerService {

  static readonly GRANT_TYPE = 'Authorization_code';
  static readonly REDIRECT_URI = 'http://localhost:3000';
  static readonly TOKEN_KEY = 'token';
  constructor(private http: Http) {
  }

  isValidToken(): boolean {
    const currentTokenStr = localStorage.getItem('oauth-token');
    if (currentTokenStr) {
      const token = JSON.parse(currentTokenStr);
      console.log(token)
      return token && token.access_token && token.access_token.value;
    } else {
      return false;
    }
  }

  getAccessCode(): string {
    const url = window.location.href;
    const regex = new RegExp('[?&]code(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) { return null};
    if (!results[2]) { return ''};
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  exchangeToken(accessCode: string): Observable<Token> {
    const formData = this.getAuthorizationData(accessCode);
    const token = this.http
      .post('http://localhost:3000/oauth2/token', formData, { headers: this.getHeaders() })
      .map(this.saveToken)
      .catch(this.handleError);
    return token;
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const clientId = 'emergency';
    const clientSecret = 'emergency';
    headers.append('Authorization', 'Basic ' + btoa(`${clientId}:${clientSecret}`));
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return headers;
  }

  private getAuthorizationData(accessCode: string): URLSearchParams {
    const formData = new URLSearchParams();
    formData.append('code', accessCode);
    formData.append('grant_type', Oauthv2TokenHandlerService.GRANT_TYPE);
    formData.append('redirect_uri', Oauthv2TokenHandlerService.REDIRECT_URI);
    return formData;
  }

  handleError(error: any) {
    const errorMsg = error.message || 'Error no especificado tratando obtener el token'
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

  saveToken(response: Response): Token {
    const serverToken = response.json();
    localStorage.setItem(Oauthv2TokenHandlerService.TOKEN_KEY, JSON.stringify(serverToken));
    return toClientToken(serverToken);
  }

}

function toClientToken(serverToken: any): Token {
  const clientToken = <Token>({
    access_token: <AccessToken>({
      __v: serverToken.access_token.__v,
      value: serverToken.access_token.value,
      clientId: serverToken.access_token.clientId,
      userId: serverToken.access_token.userId,
      _id: serverToken.access_token._id
    }),
    token_type: serverToken.serverToken
  });
  return clientToken;
}

