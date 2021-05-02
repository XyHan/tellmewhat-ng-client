import { Routes } from '@angular/router';
import { TicketComponent } from '../../ui/pages/ticket/ticket.component';
import { AuthGuard } from '../../ui/guard/auth.guard';

export const ticketRouting: Routes = [
  { path: 'ticket/:uuid', component: TicketComponent, canActivate: [AuthGuard] },
];
