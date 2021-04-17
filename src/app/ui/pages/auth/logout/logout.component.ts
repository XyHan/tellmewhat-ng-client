import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';

@Component({
  selector: 'app-logout',
  templateUrl: '',
  styleUrls: []
})
export class LogoutComponent implements OnInit {
  private readonly _authService: AuthServiceInterface;

  constructor(@Inject(AuthService) authService: AuthServiceInterface) {
    this._authService = authService;
  }

  async ngOnInit(): Promise<void> {
    await this._authService.logout();
  }
}
