import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ticketRouting } from './ticket.routing';
import { TicketCommandRepository } from './repository/ticket.command-repository';
import { TicketService } from './service/ticket/ticket.service';

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(ticketRouting)],
  providers: [TicketCommandRepository, TicketService]
})
export class TicketModule { }
