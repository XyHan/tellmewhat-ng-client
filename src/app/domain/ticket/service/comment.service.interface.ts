import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../shared/interface/paginated-response.interface';
import { CommentInterface } from '../model/comment.model';

export interface CommentServiceInterface {
  listAllComments(
    ticketUuid: string,
    page: number,
    size: number,
    sources: string[],
  ): Observable<PaginatedResponse<CommentInterface>>;
}
