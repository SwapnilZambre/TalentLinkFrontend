import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent {
  data = inject(DataService);
  query = signal('');
  filtered = computed(()=>{
    const q = this.query().toLowerCase();
    return this.data.candidates().filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.skills.join(',').toLowerCase().includes(q)
    );
  });
}
