import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  private readonly _authService: AuthServiceInterface;
  private readonly _title: string;
  private readonly _router: Router;

  constructor(@Inject(AuthService) authService: AuthServiceInterface, router: Router) {
    this._authService = authService;
    this._title = 'Signing out ...';
    this._router = router;
  }

  get title(): string {
    return this._title;
  }

  async ngOnInit(): Promise<void> {
    await this._authService.logout();
    await this._router.navigate(['/login']);
  }
}
