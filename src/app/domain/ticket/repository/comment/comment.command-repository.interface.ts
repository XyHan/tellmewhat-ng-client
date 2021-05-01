export interface CommentCommandRepositoryInterface {
  addComment(ticketUuid: string, content: string): any;
}
