import {
  HttpBackend,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable, of, OperatorFunction, throwError} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

const XSSI_PREFIX = /^\)\]\}',?\n/;

/**
 * Heavily inspired from https://stuarttottle.medium.com/use-the-fetch-api-in-angular-1acafa67bbf2.
 */
@Injectable({
  providedIn: "root"
})
export class HttpFetchBackend implements HttpBackend {

  handle(req: HttpRequest<unknown>) {
    if (!window.fetch) {
      throw new Error('Fatal Error: no fetch implementation found')
    }

    return fromFetch(req.url, this.mapToRequestInit(req))
      .pipe(
        this.handleResponse(req),
        this.parseResponse(req),
        startWith({ type: HttpEventType.Sent } as HttpSentEvent)
      );
  }

  private mapToRequestInit = <T>(req: HttpRequest<T>): RequestInit => {
    return {
      method: req.method,
      body: req.serializeBody() as BodyInit,
      headers: this.mapFromHttpHeaders(req),
      // credentials: req.withCredentials ? 'include' : 'omit',
    };
  }

  private mapFromHttpHeaders = <T>(req: HttpRequest<T>): HeadersInit => {
    return req.headers
      .keys()
      .reduce(
        (headers, name) => ({ ...headers, [name]: req.headers.get(name) }),
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': req.detectContentTypeHeader(),
        }
      ) as HeadersInit;
  }

  private handleResponse = <T>(req: HttpRequest<T>): OperatorFunction<Response, Response> => {
    const operatorFn = (res: Observable<Response>) => {
      return res.pipe(
        catchError((error) =>
          throwError(() => new HttpErrorResponse({
            error,
            status: 0,
            statusText: 'Unknown Error',
            url: req.url,
          })),
        ),
        switchMap((res: Response) => {
          if (!res.ok) {
            return this.parseBody(res, req)
              .pipe(
                catchError((error: any) => throwError(() => new HttpErrorResponse({
                  error,
                  headers: this.mapToHttpHeaders(res.headers),
                  status: res.status,
                  statusText: res.statusText,
                  url: res.url || undefined,
                }))),
              )
          } else {
            return of(res);
          }
        }),
        map((res) => res as Response),
      );
    }

    return operatorFn;
  }

  private parseResponse = <T>(req: HttpRequest<T>): OperatorFunction<Response, HttpResponse<unknown>> => {
    return (res) =>
      res.pipe(
        switchMap((res) =>
          this.parseBody(res, req)
            .pipe(
              catchError((error) => throwError(() => new HttpErrorResponse({
                  error: {
                    error,
                    text: res.body,
                  },
                  headers: this.mapToHttpHeaders(res.headers),
                  status: res.status,
                  statusText: res.statusText,
                  url: res.url || undefined,
                })
              )),
              map((body) => this.mapToHttpResponse(body, res))
            )
        )
      );
  }

  private parseBody = <T>(res: Response, req: HttpRequest<T>): Observable<unknown> => {
    switch (req.responseType) {
      case 'json':
        return from(res.text()).pipe(
          map((body) => body.replace(XSSI_PREFIX, '')),
          map((body) => (body !== '' ? JSON.parse(body) : null))
        );
      case 'blob':
        return from(res.blob());
      case 'arraybuffer':
        return from(res.arrayBuffer());
      default:
        return from(res.text());
    }
  }

  private mapToHttpResponse(body: unknown, res: Response) {
    return new HttpResponse({
      body,
      headers: this.mapToHttpHeaders(res.headers),
      status: res.status,
      statusText: res.statusText,
      url: res.url,
    });
  }

  private mapToHttpHeaders = (res: Headers) => {
    const headers = new HttpHeaders();
    res.forEach((val, key) => headers.set(key, val));
    return headers;
  }
}
