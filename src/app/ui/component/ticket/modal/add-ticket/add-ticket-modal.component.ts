import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../../../../infrastructure/ticket/service/ticket/ticket.service';
import { TicketServiceInterface } from '../../../../../domain/ticket/service/ticket.service.interface';
import { TicketInterface } from '../../../../../domain/ticket/model/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-add-modal',
  templateUrl: 'add-ticket-modal.component.html',
  styleUrls: ['./add-ticket-modal.component.scss']
})
export class AddTicketModalComponent {
  private readonly _ticketForm: FormGroup;
  private _formBuilder: FormBuilder;
  private _dialogRef: MatDialogRef<AddTicketModalComponent>;
  private _ticketService: TicketServiceInterface;
  private _isLoading: boolean;
  private _errorMessage: string | undefined;
  private readonly _router: Router;

  constructor(
    formBuilder: FormBuilder,
    dialogRef: MatDialogRef<AddTicketModalComponent>,
    @Inject(TicketService) ticketService: TicketServiceInterface,
    @Inject(Router) router: Router
  ) {
    this._formBuilder = formBuilder;
    this._dialogRef = dialogRef;
    this._ticketService = ticketService;
    this._isLoading = false;
    this._ticketForm = this._formBuilder.group({
      subject: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
    });
    this._router = router;
  }

  get ticketForm(): FormGroup {
    return this._ticketForm;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  get subject(): AbstractControl | null { return this._ticketForm.get('subject'); }

  public onSubmit(): void {
    if (!this.subject?.errors) {
      try {
        this._isLoading = true;
        this._ticketService.addTicket(this._ticketForm.value.subject).subscribe(
          async (ticket: TicketInterface) => {
            this._isLoading = false;
            this._dialogRef.close();
            await this._router.navigate([`/ticket/${ticket.uuid}`]);
          },
          (error: HttpErrorResponse) => {
            this._isLoading = false;
            this._errorMessage = error.message;
            console.error(error.message);
          }
        );
      } catch (e) {
        this._isLoading = false;
        this._errorMessage = e.message;
        console.error(e.message);
      }
    }
  }
}
