import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ticketRouting } from './ticket.routing';
import { TicketCommandRepository } from './repository/ticket.command-repository';
import { TicketService } from './service/ticket/ticket.service';
import { TicketQueryRepository } from './repository/ticket.query-repository';

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(ticketRouting)],
  providers: [TicketCommandRepository, TicketQueryRepository, TicketService]
})
export class TicketModule { }
