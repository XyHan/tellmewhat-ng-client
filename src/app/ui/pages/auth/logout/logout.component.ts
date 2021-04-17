import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  private readonly _authService: AuthServiceInterface;
  private readonly _title: string;

  constructor(@Inject(AuthService) authService: AuthServiceInterface) {
    this._authService = authService;
    this._title = 'Signing out ...';
  }

  get title(): string {
    return this._title;
  }

  async ngOnInit(): Promise<void> {
    await this._authService.logout();
  }
}
