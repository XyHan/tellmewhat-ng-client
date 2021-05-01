import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../domain/shared/interface/paginated-response.interface';
import { CommentServiceInterface } from '../../../../domain/ticket/service/comment.service.interface';
import { CommentCommandRepositoryInterface } from '../../../../domain/ticket/repository/comment/comment.command-repository.interface';
import { CommentQueryRepositoryInterface } from '../../../../domain/ticket/repository/comment/comment.query-repository.interface';
import { CommentCommandRepository } from '../../repository/comment/comment.command-repository';
import { CommentQueryRepository } from '../../repository/comment/comment.query-repository';
import { CommentInterface } from '../../../../domain/ticket/model/comment.model';

@Injectable()
export class CommentService implements CommentServiceInterface {
  private readonly _commentCommandRepository: CommentCommandRepositoryInterface;
  private readonly _commentQueryRepository: CommentQueryRepositoryInterface;

  constructor(
    @Inject(CommentCommandRepository) commentCommandRepository: CommentCommandRepositoryInterface,
    @Inject(CommentQueryRepository) commentQueryRepository: CommentQueryRepositoryInterface,
  ) {
    this._commentCommandRepository = commentCommandRepository;
    this._commentQueryRepository = commentQueryRepository;
  }

  public listAllComments(ticketUuid: string, page: number, size: number, sources: string[]): Observable<PaginatedResponse<CommentInterface>>{
    return this._commentQueryRepository.listAll(ticketUuid, page, size, sources);
  }
}
