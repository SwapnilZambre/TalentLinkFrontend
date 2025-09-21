import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss'],
})
export class PostJobComponent {
  private fb = inject(FormBuilder);
  private data = inject(DataService);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    skills: ['', [Validators.required]],
    experienceMin: [1, [Validators.required, Validators.min(0)]],
    experienceMax: [3, [Validators.required, Validators.min(0)]],
    location: ['', [Validators.required]],
    salary: [80000, [Validators.required, Validators.min(0)]],
    companyName:['', [Validators.required]],
  }, { validators: this.minMaxValidator } );

  get f(){ return this.form.controls; }
  submitting = false;
  message = '';
  private minMaxValidator(control: AbstractControl): ValidationErrors | null {
    const min = control.get('experienceMin')?.value;
    const max = control.get('experienceMax')?.value;

    if (min != null && max != null && max < min) {
      return { maxLessThanMin: true };
    }
    return null;
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    const val = this.form.value;
    const job = this.data.addJob({
      title: val.title!,
      description: val.description!,
      skills: val.skills!.split(',').map(s => s.trim()).filter(Boolean),
      experienceMin: Number(val.experienceMin!),
      experienceMax: Number(val.experienceMax!),
      location: val.location!,
      salary: Number(val.salary!),
      postedBy: 'You',
    });
    setTimeout(() => {
      this.submitting = false;
      this.message = 'Job posted successfully!';
      this.router.navigate(['/jobs', job.id]);
    }, 300);
  }
}
