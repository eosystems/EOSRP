import {Injectable} from '@angular/core';
import {
  Http, ConnectionBackend, RequestOptions, RequestOptionsArgs,
  Response, Headers, Request
} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenAuthHttp extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions
  ) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let newOptions = this.appendAuthHeader(options);
    return super.get(url, newOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.request(url, this.appendAuthHeader(options));
    return request;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.get(url, this.appendAuthHeader(options));
    return request;
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.post(url, body, this.appendAuthHeader(options));
    return request;
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.put(url, body, this.appendAuthHeader(options));
    return request;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const request = super.delete(url, this.appendAuthHeader(options));
    return request;
  }

  private appendAuthHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
    let mergedOptions: RequestOptionsArgs;
    if (!options) {
      mergedOptions = { headers: new Headers() };
    } else {
      mergedOptions = options;
    }
    if (!mergedOptions.headers) {
      mergedOptions.headers = new Headers();
    }

    let authHeaderParams = this.getAuthDataFromLocalStorage();
    if (authHeaderParams.accessToken) {
      mergedOptions.headers.append('access-token', authHeaderParams.accessToken);
      mergedOptions.headers.append('token-type',   authHeaderParams.tokenType);
      mergedOptions.headers.append('client',       authHeaderParams.client);
      mergedOptions.headers.append('expiry',       authHeaderParams.expiry);
      mergedOptions.headers.append('uid',          authHeaderParams.uid);
    }
    return mergedOptions;
  }

  private getAuthDataFromLocalStorage(): any {
    let params = {
      accessToken: localStorage.getItem('accessToken'),
      tokenType: localStorage.getItem('tokenType'),
      client: localStorage.getItem('client'),
      expiry: localStorage.getItem('expiry'),
      config: localStorage.getItem('config'),
      uid: localStorage.getItem('uid'),
      userData: localStorage.getItem('userData'),
    };
    return params;
  }
}
