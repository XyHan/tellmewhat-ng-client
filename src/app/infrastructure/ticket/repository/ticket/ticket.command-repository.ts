import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TicketCommandRepositoryInterface as BaseTicketCommandRepositoryInterface } from '../../../../domain/ticket/repository/ticket/ticket.command-repository.interface';
import { Observable } from 'rxjs';
import { TicketInterface } from '../../../../domain/ticket/model/ticket.model';
import { TokenService } from '../../../security/service/token/token.service';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { catchError } from 'rxjs/operators';
import { TicketRepositoryException } from './ticket.repository.exception';

export interface TicketCommandRepositoryInterface extends BaseTicketCommandRepositoryInterface {
  addTicket(subject: string, type: string, project: string): Observable<TicketInterface>;
  updateTicket(
    ticketUuid: string,
    subject: string,
    type: string,
    project: string,
    description: string | null,
    status: number
  ): Observable<TicketInterface>;
}

@Injectable()
export class TicketCommandRepository implements TicketCommandRepositoryInterface {
  private readonly _clientHttp: HttpClient;
  private readonly _tokenService: TokenServiceInterface;

  constructor(
    @Inject(HttpClient) clientHttp: HttpClient,
    @Inject(TokenService) tokenService: TokenServiceInterface,
  ) {
    this._clientHttp = clientHttp;
    this._tokenService = tokenService;
  }

  public addTicket(subject: string, type: string, project: string): Observable<TicketInterface> {
    const token: TokenInterface | null = this._tokenService.getToken();
    if (!token || !token.token) { throw new Error(''); }
    return this._clientHttp
      .post<TicketInterface>('/api/tickets', { subject, type, project }, { headers: new HttpHeaders({ Authorization: token.token }) })
      .pipe(
        catchError((error) => { throw new TicketRepositoryException(error.message); })
      )
    ;
  }

  public updateTicket(
    ticketUuid: string,
    subject: string,
    type: string,
    project: string,
    description: string | null,
    status: number
  ): Observable<TicketInterface> {
    const token: TokenInterface | null = this._tokenService.getToken();
    if (!token || !token.token) { throw new Error(''); }
    return this._clientHttp
      .put<TicketInterface>(
        `/api/tickets/${ticketUuid}`,
        { subject, type, project, description, status },
        { headers: new HttpHeaders({ Authorization: token.token }) }
      )
      .pipe(
        catchError((error) => { throw new TicketRepositoryException(error.message); })
      )
    ;
  }
}
