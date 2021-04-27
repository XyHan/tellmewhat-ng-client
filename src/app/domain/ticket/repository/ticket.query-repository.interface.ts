export interface TicketQueryRepositoryInterface {
  listAll(page: number, size: number, sources: string[], filters: Map<string, string>): any;
}
