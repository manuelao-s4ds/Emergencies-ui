import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Token, AccessToken } from './token';

@Injectable()
export class Oauthv2TokenHandlerService {

  constructor(private http: Http) { }

  isValidToken(): boolean {
    let currentTokenStr = localStorage.getItem('oauth-token');
    if (currentTokenStr) {
      let token = JSON.parse(currentTokenStr);
      return token && token.access_token && token.access_token.value;
    } else {
      return false;
    }
  }

  getAccessCode(): string {
    let url = window.location.href;
    var regex = new RegExp("[?&]code(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  exchangeToken(accessCode: string): Observable<Token> {
    let formData = this.getAuthorizationData(accessCode);
    let token = this.http
      .post('http://localhost:3000/oauth2/token', formData, { headers: this.getHeaders() })
      .map(this.saveToken)
      .catch(this.handleError);
    return token;
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let clientId = 'TestApp';
    let clientSecret = '123456';
    headers.append('Authorization', 'Basic ' + btoa(`${clientId}:${clientSecret}`));
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return headers;
  }

  private getAuthorizationData(accessCode: string): URLSearchParams {
    let formData = new URLSearchParams();
    formData.append('code', accessCode);
    formData.append('grant_type', Oauthv2TokenHandlerService.GRANT_TYPE);
    formData.append('redirect_uri', Oauthv2TokenHandlerService.REDIRECT_URI);
    return formData;
  }

  handleError(error: any) {
    let errorMsg = error.message || 'Error no especificado tratando obtener el token'
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

  saveToken(response: Response): Token {
    let serverToken = response.json();
    localStorage.setItem(Oauthv2TokenHandlerService.TOKEN_KEY, JSON.stringify(serverToken));
    return toClientToken(serverToken);
  }

}

function toClientToken(serverToken: any): Token {
  let clientToken = <Token>({
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

