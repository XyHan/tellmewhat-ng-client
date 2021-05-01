export interface TicketCommandRepositoryInterface {
  addTicket(subject: string, type: string, project: string): any;
  updateTicket(ticketUuid: string, subject: string, type: string, project: string, description: string | null, status: number): any;
}
