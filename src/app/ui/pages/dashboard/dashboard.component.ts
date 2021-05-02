import { Component, Inject, OnInit } from '@angular/core';
import { TicketService } from '../../../infrastructure/ticket/service/ticket/ticket.service';
import { TicketServiceInterface } from '../../../domain/ticket/service/ticket.service.interface';
import { PageEvent } from '@angular/material/paginator';
import { TicketInterface } from '../../../domain/ticket/model/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeValueObject } from '../../../infrastructure/ticket/value-object/type.value-object';
import { ProjectValueObject } from '../../../infrastructure/ticket/value-object/project.value-object';
import { StatusValueObject } from '../../../infrastructure/app/value-object/status.value-object';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaginatedResponse } from '../../../domain/shared/interface/paginated-response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private readonly _ticketService: TicketServiceInterface;
  private readonly _ticketsTableColumns: string[];
  private _ticketsTableData: TicketInterface[];
  private _ticketsTableTotal: number;
  private _ticketsTablePageEvent: PageEvent | undefined;
  private _isTicketsTableLoading: boolean;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _location: Location;
  private readonly _router: Router;

  constructor(
    @Inject(TicketService) ticketService: TicketServiceInterface,
    activatedRoute: ActivatedRoute,
    location: Location,
    router: Router
  ) {
    this._ticketsTableColumns = ['status', 'type', 'subject', 'project', 'createdBy', 'updatedAt'];
    this._ticketsTableData = [];
    this._ticketsTableTotal = 0;
    this._ticketService = ticketService;
    this._isTicketsTableLoading = true;
    this._activatedRoute = activatedRoute;
    this._location = location;
    this._router = router;
  }

  ngOnInit(): void {
    this.listAllTickets(0, 10, this._activatedRoute.snapshot.queryParams.search || '');
  }

  public search($event: string): void {
    this.listAllTickets(0, 10, $event || '');
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

  get isTicketsTableLoading(): boolean {
    return this._isTicketsTableLoading;
  }

  public getCurrentPageEvent($event: PageEvent): void {
    this._ticketsTablePageEvent = $event;
    this.listAllTickets($event.pageIndex + 1, $event.pageSize, '');
  }

  public async redirectTo(ticket: TicketInterface): Promise<void> {
    await this._router.navigate([`/ticket/${ticket.uuid}`]);
  }

  private listAllTickets(page: number, size: number, search: string): void {
    this._ticketService
      .listAllTickets(page, size, this._ticketsTableColumns, new Map([['search', search.trim()]]))
      .subscribe(
        (results: PaginatedResponse<TicketInterface>) => {
          this._ticketsTableData = results.collection.map((ticket: TicketInterface) => {
            ticket.status = StatusValueObject.getLabelFromValue(Number(ticket.status));
            ticket.type = ticket.type ? TypeValueObject.getLabelFromValue(ticket.type) : 'no data';
            ticket.project = ticket.project ? ProjectValueObject.getLabelFromValue(ticket.project) : 'no data';
            return ticket;
          });
          this._ticketsTableTotal = results.total;
          this._isTicketsTableLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
          this._isTicketsTableLoading = false;
        }
      )
    ;
  }
}
