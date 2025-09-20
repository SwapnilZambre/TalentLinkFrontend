import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Job } from '../models/job.model';
import { Candidate } from '../models/candidate.model';

@Injectable({ providedIn: 'root' })
export class EmailService {
  sendReferral(toEmail: string, job: Job, candidate: Candidate): Observable<{ success: boolean }>{
    console.log('Sending referral to', toEmail, { job, candidate });
    return of({ success: true }).pipe(delay(800));
  }
}
