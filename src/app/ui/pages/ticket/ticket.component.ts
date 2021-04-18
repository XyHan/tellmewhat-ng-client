import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  private _route: ActivatedRoute;

  constructor(route: ActivatedRoute) {
    this._route = route;
  }

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(): string {
    const ticketUuid: string | null = this._route.snapshot.paramMap.get('uuid');
    if (!ticketUuid) return '';
    console.log('ticketUuid', ticketUuid);
    return ticketUuid;
  }
}
