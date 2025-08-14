import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-assessment-results',
  imports: [MatCardModule, ],
  templateUrl: './assessment-results.html',
  styleUrl: './assessment-results.scss'
})
export class AssessmentResults {
result:any;
}
