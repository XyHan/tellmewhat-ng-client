import { Observable } from 'rxjs';
import { TicketInterface } from '../model/ticket.model';

export interface TicketServiceInterface {
  addTicket(subject: string, type: string, project: string): Observable<TicketInterface>;
}
