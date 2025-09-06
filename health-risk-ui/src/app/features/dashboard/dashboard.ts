import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIcon,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  recentAssessments = [
    { date: new Date('2023-11-10'), type: 'Diabetes', riskLevel: 'Low' },
    { date: new Date('2023-11-05'), type: 'Diabetes', riskLevel: 'Medium' },
    { date: new Date('2023-10-28'), type: 'Diabetes', riskLevel: 'Low' }
  ];

  chartData = [
    { month: 'Jul', value: 35 },
    { month: 'Aug', value: 28 },
    { month: 'Sep', value: 22 },
    { month: 'Oct', value: 19 },
    { month: 'Nov', value: 15 }
  ];
}