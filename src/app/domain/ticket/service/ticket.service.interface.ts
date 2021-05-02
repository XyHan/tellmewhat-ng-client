export interface TicketServiceInterface {
  addTicket(subject: string, type: string, project: string): any;
  updateTicket(ticketUuid: string, subject: string, type: string, project: string, description: string | null, status: number): any;
  listAllTickets(page: number, size: number, sources: string[], filters: Map<string, string>): any;
  getOneTicket(uuid: string): any;
}
