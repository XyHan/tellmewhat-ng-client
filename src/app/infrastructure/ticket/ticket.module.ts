import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ticketRouting } from './ticket.routing';
import { TicketCommandRepository } from './repository/ticket/ticket.command-repository';
import { TicketService } from './service/ticket/ticket.service';
import { TicketQueryRepository } from './repository/ticket/ticket.query-repository';
import { CommentCommandRepository } from './repository/comment/comment.command-repository';
import { CommentQueryRepository } from './repository/comment/comment.query-repository';
import { CommentService } from './service/comment/comment.service';

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(ticketRouting)],
  providers: [
    TicketCommandRepository,
    TicketQueryRepository,
    TicketService,
    CommentCommandRepository,
    CommentQueryRepository,
    CommentService,
  ]
})
export class TicketModule { }
