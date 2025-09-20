import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ListJobsComponent } from './jobs/list/list-jobs.component';
import { PostJobComponent } from './jobs/post/post-job.component';
import { JobDetailComponent } from './jobs/detail/job-detail.component';
import { CandidatesListComponent } from './candidates/list/candidates-list.component';
import { CandidateDetailComponent } from './candidates/detail/candidate-detail.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      {
        path: 'jobs',
        children: [
          { path: '', component: ListJobsComponent },
          { path: 'post', component: PostJobComponent },
          { path: ':id', component: JobDetailComponent },
        ],
      },
      {
        path: 'candidates',
        children: [
          { path: '', component: CandidatesListComponent },
          { path: ':id', component: CandidateDetailComponent },
        ],
      },
      { path: 'profile', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
