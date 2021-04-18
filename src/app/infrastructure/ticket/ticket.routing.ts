import { Routes } from '@angular/router';
import { TicketComponent } from '../../ui/pages/ticket/ticket.component';

export const ticketRouting: Routes = [
  { path: 'ticket/:uuid', component: TicketComponent },
];
