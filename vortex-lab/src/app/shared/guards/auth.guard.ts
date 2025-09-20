import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuardImpl {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) return true;
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}

export const AuthGuard: CanActivateFn = () => inject(AuthGuardImpl).canActivate();
