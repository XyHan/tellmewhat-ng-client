import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../domain/security/service/auth.service.interface';

@Component({
  selector: 'app-login',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private readonly _title: string;
  private readonly _authService: AuthServiceInterface;

  constructor(
    @Inject(AuthService) authService: AuthServiceInterface
  ) {
    this._authService = authService;
    this._title = 'Tell me what !';
  }

  get title(): string {
    return this._title;
  }

  public async logout(): Promise<void> {
    await this._authService.logout();
  }
}
