import { Component, Inject } from '@angular/core';
import { TicketService } from '../../../infrastructure/ticket/service/ticket/ticket.service';
import { TicketServiceInterface } from '../../../domain/ticket/service/ticket.service.interface';
import { PageEvent } from '@angular/material/paginator';
import { TicketInterface } from '../../../domain/ticket/model/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';

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
    this._ticketsTableColumns = ['status', 'subject', 'createdBy', 'updatedAt'];
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
    this._ticketService.listAllTickets(page, size).subscribe(
      results => {
        this._ticketsTableData = results.collection;
        this._ticketsTableTotal = results.total;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
}
