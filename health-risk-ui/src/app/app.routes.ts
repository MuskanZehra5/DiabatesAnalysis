import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard';
import { DashboardComponent } from './features/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { AssessmentForm } from './features/assessment/assessment-form/assessment-form';
import { About } from './features/about/about';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,},// canActivate: [AuthGuard] },
  { path: 'assessment', component: AssessmentForm},
  { path: 'about', component: About},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}