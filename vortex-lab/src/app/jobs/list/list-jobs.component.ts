import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-list-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent {
  data = inject(DataService);
  query = signal('');
  filtered = computed(() => {
    const q = this.query().toLowerCase();
    return this.data.jobs().filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.join(',').toLowerCase().includes(q)
    );
  });
}
