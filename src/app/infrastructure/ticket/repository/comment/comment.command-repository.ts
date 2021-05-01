import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentCommandRepositoryInterface as BaseCommentCommandRepositoryInterface } from '../../../../domain/ticket/repository/comment/comment.command-repository.interface';
import { Observable } from 'rxjs';
import { CommentInterface } from '../../../../domain/ticket/model/comment.model';
import { TokenService } from '../../../security/service/token/token.service';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { catchError } from 'rxjs/operators';
import { CommentRepositoryException } from './comment.repository.exception';

export interface CommentCommandRepositoryInterface extends BaseCommentCommandRepositoryInterface {
  addComment(ticketUuid: string, content: string): Observable<CommentInterface>;
}

@Injectable()
export class CommentCommandRepository implements CommentCommandRepositoryInterface {
  private readonly _clientHttp: HttpClient;
  private readonly _tokenService: TokenServiceInterface;

  constructor(
    @Inject(HttpClient) clientHttp: HttpClient,
    @Inject(TokenService) tokenService: TokenServiceInterface,
  ) {
    this._clientHttp = clientHttp;
    this._tokenService = tokenService;
  }

  public addComment(ticketUuid: string, content: string): Observable<CommentInterface> {
    const token: TokenInterface | null = this._tokenService.getToken();
    if (!token || !token.token) { throw new Error(''); }
    return this._clientHttp
      .post<CommentInterface>(
        `/api/tickets/${ticketUuid}/comments`,
        { content },
        { headers: new HttpHeaders({ Authorization: token.token }) }
      )
      .pipe(
        catchError((error) => { throw new CommentRepositoryException(error.message); })
      )
    ;
  }
}
