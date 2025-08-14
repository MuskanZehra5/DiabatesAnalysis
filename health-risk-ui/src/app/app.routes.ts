import { Routes } from '@angular/router';
import { AssessmentFormComponent } from './features/assessment/assessment-form/assessment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/assess', pathMatch: 'full' },
  { path: 'assess', component: AssessmentFormComponent },
  { path: 'patients', loadComponent: () => import('./features/patient/patient-profile/patient-profile.component').then(m => m.PatientProfileComponent) },
  { path: '**', redirectTo: '/assess' }
];