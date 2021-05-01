import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketModalComponent } from '../../ticket/modal/add-ticket/add-ticket-modal.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from '../../../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly _authService: AuthServiceInterface;
  private readonly _title: string;
  private readonly _dialog: MatDialog;
  private readonly _location: Location;
  private _searchPanelOpen: boolean;
  private _search: FormControl;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _router: Router;

  constructor(
    @Inject(AuthService) authService: AuthServiceInterface,
    dialog: MatDialog,
    location: Location,
    activatedRoute: ActivatedRoute,
    router: Router,
  ) {
    this._authService = authService;
    this._title = 'Tell me what !';
    this._searchPanelOpen = false;
    this._dialog = dialog;
    this._search = new FormControl();
    this._location = location;
    this._activatedRoute = activatedRoute;
    this._router = router;
  }

  async ngOnInit(): Promise<void> {
    this._activatedRoute.queryParams.subscribe(async data => {
      if (data && data.search) {
        this._search = new FormControl(data.search.trim());
        await this.toggleSearchPanel();
      }
    });
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

  public async toggleSearchPanel(): Promise<void> {
    this._searchPanelOpen = !this._searchPanelOpen;
  }

  get search(): FormControl {
    return this._search;
  }

  public clearSearch(): void {
    if (this.isDashboardComponent()) {
      this._search = new FormControl();
      this._location.go('');
    }
  }

  public async updateTicketList(): Promise<void> {
    if (this.isDashboardComponent()) {
      this._location.go('', `search=${this.search.value}`);
    } else {
      await this._router.navigate(['/'], { queryParams: { search: this.search.value }});
    }
  }

  public openAddTicketModal(): void {
    this._dialog.open(AddTicketModalComponent);
  }

  public isDashboardComponent(): boolean {
    return this._activatedRoute.snapshot.routeConfig?.component?.name === DashboardComponent.prototype.constructor.name;
  }
}
