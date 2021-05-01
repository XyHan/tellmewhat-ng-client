import { Observable } from 'rxjs';
import { TicketInterface } from '../model/ticket.model';
import { PaginatedResponse } from '../../shared/interface/paginated-response.interface';

export interface TicketServiceInterface {
  addTicket(subject: string, type: string, project: string): Observable<TicketInterface>;
  updateTicket(
    ticketUuid: string,
    subject: string,
    type: string,
    project: string,
    description: string | null,
    status: number
  ): Observable<TicketInterface>;
  listAllTickets(
    page: number,
    size: number,
    sources: string[],
    filters: Map<string, string>
  ): Observable<PaginatedResponse<TicketInterface>>;
  getOneTicket(uuid: string): Observable<TicketInterface>;
}
