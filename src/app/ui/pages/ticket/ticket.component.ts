import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketServiceInterface } from '../../../domain/ticket/service/ticket.service.interface';
import { TicketService } from '../../../infrastructure/ticket/service/ticket/ticket.service';
import { TicketInterface } from '../../../domain/ticket/model/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { StatusValueObject, statusValueObject } from '../../../infrastructure/app/value-object/status.value-object';
import { selectType } from '../../../domain/shared/type/select.type';
import { TypeValueObject } from '../../../infrastructure/ticket/value-object/type.value-object';
import { ProjectValueObject } from '../../../infrastructure/ticket/value-object/project.value-object';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../component/app/dialog/delete-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  private readonly _route: ActivatedRoute;
  private readonly _ticketService: TicketServiceInterface;
  private _isTicketLoading: boolean;
  private _ticket: TicketInterface | null;
  private _ticketSubject: FormControl;
  private _ticketDescription: FormControl;
  private _ticketType: FormControl;
  private _ticketProject: FormControl;
  private _ticketStatus: FormControl;
  private readonly _statusValues: statusValueObject[];
  private readonly _typeValues: selectType[];
  private readonly _projectValues: selectType[];
  private readonly _dialog: MatDialog;

  constructor(
    route: ActivatedRoute,
    @Inject(TicketService) ticketService: TicketServiceInterface,
    dialog: MatDialog
  ) {
    this._route = route;
    this._ticketService = ticketService;
    this._isTicketLoading = true;
    this._ticket = null;
    this._ticketSubject = new FormControl();
    this._ticketDescription = new FormControl();
    this._ticketType = new FormControl();
    this._ticketProject = new FormControl();
    this._ticketStatus = new FormControl();
    this._statusValues = StatusValueObject.getValueObject();
    this._typeValues = TypeValueObject.getValueObject();
    this._projectValues = ProjectValueObject.getValueObject();
    this._dialog = dialog;
  }

  ngOnInit(): void {
    this.getCurrentTicket();
  }

  get ticket(): TicketInterface | null {
    return this._ticket;
  }

  get ticketSubject(): FormControl {
    return this._ticketSubject;
  }

  get ticketDescription(): FormControl {
    return this._ticketDescription;
  }

  get ticketType(): FormControl {
    return this._ticketType;
  }

  get ticketProject(): FormControl {
    return this._ticketProject;
  }

  get ticketStatus(): FormControl {
    return this._ticketStatus;
  }

  get statusValues(): statusValueObject[] {
    return this._statusValues;
  }

  get typeValues(): selectType[] {
    return this._typeValues;
  }

  get projectValues(): selectType[] {
    return this._projectValues;
  }

  private getCurrentTicket(): void {
    const ticketUuid: string | null = this._route.snapshot.paramMap.get('uuid');
    if (!ticketUuid) { throw new Error('A valid ticket uuid is required'); }
    this._ticketService
      .getOneTicket(ticketUuid)
      .subscribe(
        results => {
          this._ticket = results;
          this._ticketSubject = new FormControl(this._ticket.subject, [Validators.required, Validators.maxLength(255)]);
          this._ticketDescription = new FormControl(this._ticket.description);
          this._ticketStatus = new FormControl(this._ticket.status, [Validators.required]);
          this._ticketType = new FormControl(this._ticket.type, [Validators.required]);
          this._ticketProject = new FormControl(this._ticket.project, [Validators.required]);
          this._isTicketLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
          this._isTicketLoading = false;
        }
      )
    ;
  }

  public updateTicket(): void {
    if (
      this.ticketSubject.valid
      && this.ticketDescription.valid
      && this.ticketProject.valid
      && this.ticketType.valid
      && this.ticketStatus.valid
      && this._ticket
      && this._ticket.uuid
    ) {
      this._ticketService
        .updateTicket(
          this._ticket.uuid,
          this.ticketSubject.value,
          this.ticketType.value,
          this.ticketProject.value,
          this.ticketDescription.value,
          this.ticketStatus.value
        )
        .subscribe(
          async (ticket: TicketInterface) => {
            console.log('ticket', ticket);
          },
          (error: HttpErrorResponse) => {
            console.error(error.message);
          }
        )
      ;
    }
  }

  public deleteTicket(): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent);
    dialogRef.componentInstance.deleteEvent.subscribe(() => {
      /** Todo delete ticket */
      console.log('event', true);
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
}
