import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Good {
  name: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class GoodService {
  public API = environment.apiUrl;
  private upload_options = { headers: new HttpHeaders({ 'Content-Type':  'application/json' })};

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/goods');
  }

  get(id: string): Observable<any> {
    return this.http.get(this.API + '/goods/' + id);
  }

  save(good: any): Observable<any> {
    let result: Observable<Object>;
    if (good.id) {
      result = this.http.put<Good>(this.API + '/goods/' + good.id, good, this.upload_options)
        .pipe(
          catchError(this.handleError)
        );
    } else {
      result = this.http.post<Good>(this.API + '/goods', good, this.upload_options)
        .pipe(
          catchError(this.handleError)
        );
    }
    return result;
  }

  gen_sample_data(): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.API + '/gen-sample-data', null).pipe(catchError(this.handleError));
    return result;
  }

  delete(id: number): Observable<any> {
    let result: Observable<Object>;
    result = this.http.delete(this.API + '/goods/'+ id).pipe(catchError(this.handleError));
    return result;
  }

  clear(): Observable<any> {
    let result: Observable<Object>;
    result = this.http.delete(this.API + '/goods').pipe(catchError(this.handleError));
    return result;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
