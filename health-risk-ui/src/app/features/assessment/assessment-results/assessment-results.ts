import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-assessment-results',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIcon, MatDividerModule
  ],
  templateUrl: './assessment-results.html',
  styleUrl: './assessment-results.scss'
})
export class AssessmentResults {
  @Input() resultData: any;
  // Map API response to display properties
  get result() {

    if (!this.resultData) return null;
        console.log('resultData', this.resultData);

    return {
      prediction: this.resultData.atRisk ? 'High Risk of Diabetes' : 'Low Risk of Diabetes',
      probability: this.resultData.riskProbability,
      advice: this.resultData.recommendation,
      riskLevel: this.resultData.riskLevel
    };
  }
}