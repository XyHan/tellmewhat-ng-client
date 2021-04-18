import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketModalComponent } from '../../ticket/modal/add-ticket/add-ticket-modal.component';

export interface User {
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly _title: string;
  private _searchPanelOpen: boolean;
  private readonly _authService: AuthServiceInterface;
  private readonly _dialog: MatDialog;

  myControl = new FormControl();
  options: User[] = [
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' }
  ];
  filteredOptions$: Observable<User[] | undefined> = new Observable<User[] | undefined>();

  constructor(
    @Inject(AuthService) authService: AuthServiceInterface,
    dialog: MatDialog
  ) {
    this._authService = authService;
    this._title = 'Tell me what !';
    this._searchPanelOpen = false;
    this._dialog = dialog;
  }

  ngOnInit(): void   {
    this.filteredOptions$ = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  get title(): string {
    return this._title;
  }

  public async logout(): Promise<void> {
    await this._authService.logout();
  }

  get searchPanelOpen(): boolean {
    return this._searchPanelOpen;
  }

  public toggleSearchPanel(): void {
    this._searchPanelOpen = !this._searchPanelOpen;
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public openAddTicketModal(): void {
    this._dialog.open(AddTicketModalComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
