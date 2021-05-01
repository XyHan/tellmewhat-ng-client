import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommentQueryRepositoryInterface as BaseCommentQueryRepositoryInterface } from '../../../../domain/ticket/repository/comment/comment.query-repository.interface';
import { Observable } from 'rxjs';
import { TokenService } from '../../../security/service/token/token.service';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { catchError } from 'rxjs/operators';
import { CommentRepositoryException } from './comment.repository.exception';
import { PaginatedResponse } from '../../../../domain/shared/interface/paginated-response.interface';
import { CommentInterface } from '../../../../domain/ticket/model/comment.model';

export interface CommentQueryRepositoryInterface extends BaseCommentQueryRepositoryInterface {
  listAll(ticketUuid: string, page: number, size: number, sources: string[]): Observable<PaginatedResponse<CommentInterface>>;
}

@Injectable()
export class CommentQueryRepository implements CommentQueryRepositoryInterface {
  private readonly _clientHttp: HttpClient;
  private readonly _tokenService: TokenServiceInterface;

  constructor(
    @Inject(HttpClient) clientHttp: HttpClient,
    @Inject(TokenService) tokenService: TokenServiceInterface,
  ) {
    this._clientHttp = clientHttp;
    this._tokenService = tokenService;
  }

  public listAll(ticketUuid: string, page: number, size: number, sources: string[]): Observable<PaginatedResponse<CommentInterface>> {
    const token: TokenInterface | null = this._tokenService.getToken();
    if (!token || !token.token) { throw new Error('A valid token is required'); }
    const headers = new HttpHeaders({ Authorization: token.token });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
    ;
    return this._clientHttp
      .get<PaginatedResponse<CommentInterface>>(`/api/tickets/${ticketUuid}/comments`, { headers, params })
      .pipe(
        catchError((error) => {
          throw new CommentRepositoryException(error.message);
        })
      )
    ;
  }
}
