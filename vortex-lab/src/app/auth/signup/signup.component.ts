import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

function match(otherCtrl: () => AbstractControl | null) {
  return (ctrl: AbstractControl) => ctrl.value === otherCtrl()?.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['jobseeker', [Validators.required]],
  });

  constructor() {
    const cp = this.form.get('confirmPassword');
    const p = this.form.get('password');
    cp?.addValidators(match(() => p));
    p?.valueChanges.subscribe(() => cp?.updateValueAndValidity());
  }

  get f() { return this.form.controls; }

  submitting = false;
  error = '';

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    setTimeout(() => {
      try {
        this.auth.signup(this.f['name'].value!, this.f['email'].value!, this.f['password'].value!, this.f['role'].value! as 'jobseeker' | 'employer');
      } catch (e) {
        this.error = 'Signup failed. Please try again.';
      } finally {
        this.submitting = false;
      }
    }, 300);
  }
}
