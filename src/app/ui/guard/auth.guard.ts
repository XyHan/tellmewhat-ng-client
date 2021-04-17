import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../domain/security/service/auth.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly _authService: AuthServiceInterface;
  private readonly _router: Router;

  constructor(
    @Inject(AuthService) authService: AuthServiceInterface,
    @Inject(Router) router: Router,
  ) {
    this._authService = authService;
    this._router = router;
  }

  async canActivate(): Promise<boolean> {
    try {
      if (!this._authService.isAuthenticated()) {
        await this._router.navigate(['/login']);
        return false;
      }
      return true;
    } catch (e) {
      throw new Error('[AuthGuard] Bad credentials');
    }
  }
}
