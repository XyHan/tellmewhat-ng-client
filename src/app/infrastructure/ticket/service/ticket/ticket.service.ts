import { Inject, Injectable } from '@angular/core';
import { TicketServiceInterface as BaseTicketServiceInterface } from '../../../../domain/ticket/service/ticket.service.interface';
import { TicketCommandRepository, TicketCommandRepositoryInterface } from '../../repository/ticket/ticket.command-repository';
import { TicketQueryRepository, TicketQueryRepositoryInterface } from '../../repository/ticket/ticket.query-repository';
import { Observable, of } from 'rxjs';
import { TicketInterface } from '../../../../domain/ticket/model/ticket.model';
import { TicketServiceException } from './ticket.service.exception';
import { PaginatedResponse } from '../../../../domain/shared/interface/paginated-response.interface';

export interface TicketServiceInterface extends BaseTicketServiceInterface {
  addTicket(subject: string, type: string, project: string): Observable<TicketInterface>;
  updateTicket(
    ticketUuid: string,
    subject: string,
    type: string,
    project: string,
    description: string | null,
    status: number
  ): Observable<TicketInterface>;
  listAllTickets(
    page: number,
    size: number,
    sources: string[],
    filters: Map<string, string>
  ): Observable<PaginatedResponse<TicketInterface>>;
  getOneTicket(uuid: string): Observable<TicketInterface>;
}

@Injectable()
export class TicketService implements TicketServiceInterface {
  private readonly _ticketCommandRepository: TicketCommandRepositoryInterface;
  private readonly _ticketQueryRepository: TicketQueryRepositoryInterface;

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

  public updateTicket(
    ticketUuid: string,
    subject: string,
    type: string,
    project: string,
    description: string | null,
    status: number
  ): Observable<TicketInterface> {
    if (!subject.length) { throw new TicketServiceException('Ticket requires a subject for being created'); }
    return this._ticketCommandRepository.updateTicket(ticketUuid, subject, type, project, description, status);
  }

  public listAllTickets(
    page: number,
    size: number,
    sources: string[],
    filters: Map<string, string>
  ): Observable<PaginatedResponse<TicketInterface>>{
    return this._ticketQueryRepository.listAll(page, size, sources, filters);
  }

  public getOneTicket(uuid: string): Observable<TicketInterface> {
    return this._ticketQueryRepository.findOne(uuid);
  }
}
