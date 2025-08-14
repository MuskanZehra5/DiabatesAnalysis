import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard';
import { Dashboard } from './features/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { AssessmentForm } from './features/assessment/assessment-form/assessment-form';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard,},// canActivate: [AuthGuard] },
  { path: 'assessment', component: AssessmentForm},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}