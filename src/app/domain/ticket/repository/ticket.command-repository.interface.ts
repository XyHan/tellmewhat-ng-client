export interface TicketCommandRepositoryInterface {
  addTicket(subject: string, type: string, project: string): any;
}
