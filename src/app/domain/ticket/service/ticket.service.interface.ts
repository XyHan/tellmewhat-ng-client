import { Observable } from 'rxjs';
import { TicketInterface } from '../model/ticket.model';

export interface TicketServiceInterface {
  addTicket(subject: string): Observable<TicketInterface>;
}
