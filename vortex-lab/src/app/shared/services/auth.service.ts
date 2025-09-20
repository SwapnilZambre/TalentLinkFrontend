import { Injectable, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    const raw = localStorage.getItem('tl_user');
    if (raw) {
      try { this.currentUser.set(JSON.parse(raw)); } catch {}
    }
    effect(() => {
      const u = this.currentUser();
      if (u) localStorage.setItem('tl_user', JSON.stringify(u));
      else localStorage.removeItem('tl_user');
    });
  }

  login(email: string, _password: string) {
    const user: User = { id: crypto.randomUUID(), name: email.split('@')[0], email, role: 'employer' };
    this.currentUser.set(user);
    this.router.navigateByUrl('/home');
  }

  signup(name: string, email: string, _password: string, role: 'jobseeker' | 'employer') {
    const user: User = { id: crypto.randomUUID(), name, email, role };
    this.currentUser.set(user);
    this.router.navigateByUrl('/home');
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigateByUrl('/auth/login');
  }

  isAuthenticated() { return !!this.currentUser(); }
}
