import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { securityRouting } from './security.routing';
import { AuthService } from './service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SecurityQueryRepository } from './repository/security.query-repository';
import { TokenService } from './service/token/token.service';
import { UserService } from './service/user/user.service';

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(securityRouting)],
  providers: [SecurityQueryRepository, AuthService, TokenService, UserService],
})
export class SecurityModule { }
