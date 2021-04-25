export interface TicketQueryRepositoryInterface {
  listAll(page: number, size: number, sources: string[]): any;
}
