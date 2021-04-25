import { Observable } from 'rxjs';
import { TicketInterface } from '../model/ticket.model';
import { PaginatedResponse } from '../../shared/interface/paginated-response.interface';

export interface TicketServiceInterface {
  addTicket(subject: string, type: string, project: string): Observable<TicketInterface>;
  listAllTickets(page: number, size: number, sources: string[]): Observable<PaginatedResponse<TicketInterface>>;
}
