import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { EmailService } from '../../shared/services/email.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
  route = inject(ActivatedRoute);
  data = inject(DataService);
  email = inject(EmailService);

  job = computed(() => this.data.getJobById(this.route.snapshot.paramMap.get('id') || ''));
  matches = signal(this.job() ? this.data.matchCandidates(this.job()!) : []);

  showModal = signal(false);
  selectedCandidateId = signal<string | null>(null);
  toEmail = signal('');
  sending = signal(false);
  sent = signal(false);

  openMatch() {
    const j = this.job();
    if (!j) return; 
    this.matches.set(this.data.matchCandidates(j));
  }

  openRefer(candId: string) {
    this.selectedCandidateId.set(candId);
    this.toEmail.set('hr@example.com');
    this.showModal.set(true);
  }

  sendReferral() {
    const j = this.job();
    const cid = this.selectedCandidateId();
    if (!j || !cid) return;
    const c = this.data.getCandidateById(cid)!;
    this.sending.set(true);
    this.email.sendReferral(this.toEmail(), j, c).subscribe(() => {
      this.sending.set(false);
      this.sent.set(true);
      setTimeout(() => this.showModal.set(false), 900);
    });
  }
}
