import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  listAll(page: number, size: number): Observable<PaginatedResponse<TicketInterface>>;
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

  public listAll(page: number = 0, size: number = 10): Observable<PaginatedResponse<TicketInterface>> {
    const token: TokenInterface | null = this._tokenService.getToken();
    if (!token || !token.token) { throw new Error(''); }
    return this._clientHttp
      .get<PaginatedResponse<TicketInterface>>(
        `/api/tickets?page=${page}&size=${size}`,
        { headers: new HttpHeaders({ Authorization: token.token })
      })
      .pipe(
        catchError((error) => { throw new TicketRepositoryException(error.message); })
      )
    ;
  }
}
