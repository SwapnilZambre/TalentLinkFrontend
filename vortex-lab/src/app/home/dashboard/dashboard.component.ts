import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  auth = inject(AuthService);
  data = inject(DataService);
  userName = computed(() => this.auth.currentUser()?.name || 'there');
  jobsCount = computed(() => this.data.jobs().length);
  candidatesCount = computed(() => this.data.candidates().length);
  minCount = computed(() => Math.min(this.jobsCount(), this.candidatesCount()));
}
