import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { TicketQueryRepositoryInterface as BaseTicketQueryRepositoryInterface } from '../../../domain/ticket/repository/ticket.query-repository.interface';
import { Observable } from 'rxjs';
import { TicketInterface } from '../../../domain/ticket/model/ticket.model';
import { TokenService } from '../../security/service/token/token.service';
import { TokenServiceInterface } from '../../../domain/security/service/token.service.interface';
import { TokenInterface } from '../../../domain/security/model/token.model';
import { catchError } from 'rxjs/operators';
import { TicketRepositoryException } from './ticket.repository.exception';
import { PaginatedResponse } from '../../../domain/shared/interface/paginated-response.interface';

export interface TicketQueryRepositoryInterface extends BaseTicketQueryRepositoryInterface {
  listAll(page: number, size: number, sources: string[], filters: Map<string, string>): Observable<PaginatedResponse<TicketInterface>>;
}

@Injectable()
export class TicketQueryRepository implements TicketQueryRepositoryInterface {
  private readonly _clientHttp: HttpClient;
  private readonly _tokenService: TokenServiceInterface;

  constructor(
    @Inject(HttpClient) clientHttp: HttpClient,
    @Inject(TokenService) tokenService: TokenServiceInterface,
  ) {
    this._clientHttp = clientHttp;
    this._tokenService = tokenService;
  }

  public listAll(
    page: number,
    size: number,
    sources: string[],
    filters: Map<string, string>
  ): Observable<PaginatedResponse<TicketInterface>> {
    const token: TokenInterface | null = this._tokenService.getToken();
    if (!token || !token.token) { throw new Error('A valid token is required'); }
    const headers = new HttpHeaders({ Authorization: token.token });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', filters.get('search')?.toString() || '')
    ;
    return this._clientHttp
      .get<PaginatedResponse<TicketInterface>>('/api/tickets', { headers, params })
      .pipe(
        catchError((error) => {
          throw new TicketRepositoryException(error.message);
        })
      )
      ;
  }
}
