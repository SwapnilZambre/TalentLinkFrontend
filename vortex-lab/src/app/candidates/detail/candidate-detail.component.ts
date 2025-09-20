import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { EmailService } from '../../shared/services/email.service';

@Component({
  selector: 'app-candidate-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent {
  route = inject(ActivatedRoute);
  data = inject(DataService);
  email = inject(EmailService);

  candidate = computed(() => this.data.getCandidateById(this.route.snapshot.paramMap.get('id') || ''));
  showModal = signal(false);
  jobId = signal<string | null>(null);
  toEmail = signal('');
  sending = signal(false);
  sent = signal(false);

  openRefer() {
    this.showModal.set(true);
    this.toEmail.set('hr@example.com');
  }

  sendReferral() {
    const c = this.candidate();
    const j = this.data.getJobById(this.jobId() || '');
    if (!c || !j) return;
    this.sending.set(true);
    this.email.sendReferral(this.toEmail(), j, c).subscribe(() => {
      this.sending.set(false);
      this.sent.set(true);
      setTimeout(() => this.showModal.set(false), 900);
    });
  }
}
