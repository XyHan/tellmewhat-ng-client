export interface CommentQueryRepositoryInterface {
  listAll(ticketUuid: string, page: number, size: number, sources: string[]): any;
}
