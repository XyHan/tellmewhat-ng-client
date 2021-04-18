import { Inject, Injectable } from '@angular/core';
import { TicketServiceInterface } from '../../../../domain/ticket/service/ticket.service.interface';
import { TicketCommandRepository, TicketCommandRepositoryInterface } from '../../repository/ticket.command-repository';
import { Observable } from 'rxjs';
import { TicketInterface } from '../../../../domain/ticket/model/ticket.model';
import { TicketServiceException } from './ticket.service.exception';

@Injectable()
export class TicketService implements TicketServiceInterface {
  private readonly _ticketCommandRepository: TicketCommandRepositoryInterface;

  constructor(@Inject(TicketCommandRepository) ticketCommandRepository: TicketCommandRepositoryInterface) {
    this._ticketCommandRepository = ticketCommandRepository;
  }

  public addTicket(subject: string): Observable<TicketInterface> {
    if (!subject.length) { throw new TicketServiceException('Ticket requires a subject for being created'); }
    return this._ticketCommandRepository.addTicket(subject);
  }
}
