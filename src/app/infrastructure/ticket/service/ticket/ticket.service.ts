import { Inject, Injectable } from '@angular/core';
import { TicketServiceInterface } from '../../../../domain/ticket/service/ticket.service.interface';
import { TicketCommandRepository, TicketCommandRepositoryInterface } from '../../repository/ticket.command-repository';
import { TicketQueryRepository, TicketQueryRepositoryInterface } from '../../repository/ticket.query-repository';
import { Observable } from 'rxjs';
import { TicketInterface } from '../../../../domain/ticket/model/ticket.model';
import { TicketServiceException } from './ticket.service.exception';
import { PaginatedResponse } from '../../../../domain/shared/interface/paginated-response.interface';

@Injectable()
export class TicketService implements TicketServiceInterface {
  private readonly _ticketCommandRepository: TicketCommandRepositoryInterface;
  private readonly _ticketQueryRepository: TicketQueryRepositoryInterface;
  private _search: string | undefined;

  constructor(
    @Inject(TicketCommandRepository) ticketCommandRepository: TicketCommandRepositoryInterface,
    @Inject(TicketQueryRepository) ticketQueryRepository: TicketQueryRepositoryInterface,
  ) {
    this._ticketCommandRepository = ticketCommandRepository;
    this._ticketQueryRepository = ticketQueryRepository;
  }

  public addTicket(subject: string, type: string, project: string): Observable<TicketInterface> {
    if (!subject.length) { throw new TicketServiceException('Ticket requires a subject for being created'); }
    return this._ticketCommandRepository.addTicket(subject, type, project);
  }

  public listAllTickets(
    page: number,
    size: number,
    sources: string[],
    filters: Map<string, string>
  ): Observable<PaginatedResponse<TicketInterface>>{
    return this._ticketQueryRepository.listAll(page, size, sources, filters);
  }
}
