import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { SecurityQueryRepositoryInterface } from '../../../domain/security/repository/security.query-repository.interface';
import { TokenInterface, TokenModel } from '../../../domain/security/model/token.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {UserInterface, UserModel} from '../../../domain/security/model/user.model';

@Injectable()
export class SecurityQueryRepository implements SecurityQueryRepositoryInterface {
  private readonly _clientHttp: HttpClient;

  constructor(@Inject(HttpClient) clientHttp: HttpClient) {
    this._clientHttp = clientHttp;
  }

  public async getToken(email: string, password: string): Promise<TokenInterface> {
    return this._clientHttp
      .post<TokenModel>(
        '/api/login',
        { email, password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }
      )
      .pipe(
        tap((token: TokenInterface) => console.log('getToken', token.toString())),
        catchError(this.handleError<TokenInterface>('getToken', new TokenModel('')))
      )
      .toPromise();
  }

  public async getUser(email: string, token: string): Promise<UserInterface> {
    return this._clientHttp
      .get<UserInterface>(
        `/api/users`,
        {
          params: new HttpParams().set('email', email),
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`
          })
        }
      )
      .pipe(
        tap((user: UserInterface) => console.log('getUser', user.toString())),
        catchError(this.handleError<UserInterface>('getUser', new UserModel()))
      )
      .toPromise();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
