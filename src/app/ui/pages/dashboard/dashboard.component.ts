import { Component, Inject } from '@angular/core';
import { TicketService } from '../../../infrastructure/ticket/service/ticket/ticket.service';
import { TicketServiceInterface } from '../../../domain/ticket/service/ticket.service.interface';
import { PageEvent } from '@angular/material/paginator';
import { TicketInterface } from '../../../domain/ticket/model/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeValueObject } from '../../../infrastructure/ticket/value-object/type.value-object';
import { ProjectValueObject } from '../../../infrastructure/ticket/value-object/project.value-object';
import { StatusValueObject } from '../../../infrastructure/app/value-object/status.value-object';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private readonly _ticketService: TicketServiceInterface;
  private readonly _ticketsTableColumns: string[];
  private _ticketsTableData: TicketInterface[];
  private _ticketsTableTotal: number;
  private _ticketsTablePageEvent: PageEvent | undefined;

  constructor(@Inject(TicketService) ticketService: TicketServiceInterface) {
    this._ticketsTableColumns = ['status', 'type', 'subject', 'project', 'createdBy', 'updatedAt'];
    this._ticketsTableData = [];
    this._ticketsTableTotal = 0;
    this._ticketService = ticketService;
    this.listAllTickets(0, 10);
  }

  get ticketsTableColumns(): string[] {
    return this._ticketsTableColumns;
  }

  get ticketsTableData(): TicketInterface[] {
    return this._ticketsTableData;
  }

  get ticketsTableTotal(): number {
    return this._ticketsTableTotal;
  }

  getCurrentPageEvent($event: PageEvent): void {
    this._ticketsTablePageEvent = $event;
    this.listAllTickets($event.pageIndex + 1, $event.pageSize);
  }

  private listAllTickets(page: number, size: number): void {
    this._ticketService
      .listAllTickets(page, size, this._ticketsTableColumns)
      .subscribe(
        results => {
          this._ticketsTableData = results.collection.map((ticket: TicketInterface) => {
            ticket.status = ticket.status && typeof ticket.status === 'number' ? StatusValueObject.getLabelFromValue(ticket.status) : 'no-data';
            ticket.type = ticket.type ? TypeValueObject.getLabelFromValue(ticket.type) : 'no data';
            ticket.project = ticket.project ? ProjectValueObject.getLabelFromValue(ticket.project) : 'no data';
            return ticket;
          });
          this._ticketsTableTotal = results.total;
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      )
    ;
  }
}
