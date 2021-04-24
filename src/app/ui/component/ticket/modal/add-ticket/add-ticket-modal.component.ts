import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../../../../infrastructure/ticket/service/ticket/ticket.service';
import { TicketServiceInterface } from '../../../../../domain/ticket/service/ticket.service.interface';
import { TicketInterface } from '../../../../../domain/ticket/model/ticket.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { typeValueObject } from '../../../../../infrastructure/ticket/value-object/type.value-object';
import { projectValueObject } from '../../../../../infrastructure/ticket/value-object/project.value-object';
import { selectType } from '../../../../../domain/shared/type/select.type';

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
  private readonly _errorMessages: string[];
  private readonly _router: Router;
  private readonly _types: selectType[];
  private readonly _projects: selectType[];

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
    this._ticketForm = this.setForm();
    this._router = router;
    this._types = typeValueObject;
    this._projects = projectValueObject;
    this._errorMessages = [];
  }

  get ticketForm(): FormGroup {
    return this._ticketForm;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get errorMessages(): string[] {
    return this._errorMessages;
  }

  get subject(): AbstractControl | null { return this._ticketForm.get('subject'); }

  get types(): selectType[] {
    return this._types;
  }

  get projects(): selectType[] {
    return this._projects;
  }

  public setForm(): FormGroup {
    return this._formBuilder.group({
      subject: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      types: new FormControl('', [Validators.required]),
      projects: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (this._ticketForm.valid) {
      try {
        this._isLoading = true;
        this._ticketService.addTicket(this._ticketForm.value.subject, this._ticketForm.value.types, 'a').subscribe(
          async (ticket: TicketInterface) => {
            this._isLoading = false;
            this._dialogRef.close();
            await this._router.navigate([`/ticket/${ticket.uuid}`]);
          },
          (error: HttpErrorResponse) => {
            this._isLoading = false;
            this._errorMessages.push(error.message);
            console.error(error.message);
          }
        );
      } catch (e) {
        this._isLoading = false;
        this._errorMessages.push(e.message);
        console.error(e.message);
      }
    }
    if (this._ticketForm.controls.subject.hasError('required')) {
      this._errorMessages.push('Le champ sujet est nécessaire');
    }
    if (this._ticketForm.controls.types.hasError('required')) {
      this._errorMessages.push('Un type doit être sélectionné');
    }
    if (this._ticketForm.controls.projects.hasError('required')) {
      this._errorMessages.push('Un projet doit être sélectionné');
    }
  }
}
