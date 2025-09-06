import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { AssessmentResults } from '../assessment-results/assessment-results';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-assessment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    AssessmentResults,
  ],
  templateUrl: './assessment-form.html',
  styleUrl: './assessment-form.scss'
})
export class AssessmentForm {
  @Output() assess = new EventEmitter<any>();
  form: any;
  resultData: any = null;
  loading = false;
  private apiUrl = '/predict/diabetes';

  constructor(private fb: FormBuilder, private http: HttpClient) {}
      
  ngOnInit() {
      this.form = this.fb.group({
        gender: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
        hypertension: ['', Validators.required],
        heart_disease: ['', Validators.required],
        bmi: ['', [Validators.required]],
        HbA1c_level: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
        blood_glucose_level: ['', [Validators.required, Validators.min(50), Validators.max(300)]],
        smoking_history: ['', Validators.required],
      });
    }


  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      
      // Convert form values to proper types for the API
      const payload = {
        gender: this.form.value.gender,
        age: Number(this.form.value.age),
        hypertension: this.form.value.hypertension === 'Yes' ? 1 : 0,
        heart_disease: this.form.value.heart_disease === 'Yes' ? 1 : 0,
        bmi: Number(this.form.value.bmi),
        HbA1c_level: Number(this.form.value.HbA1c_level),
        blood_glucose_level: Number(this.form.value.blood_glucose_level),
        smoking_history: this.form.value.smoking_history
      };
      
      console.log('Submitting form:', payload);

      // Set proper headers for JSON content
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(this.apiUrl, payload, { headers })
        .subscribe({
          next: (res: any) => {
            console.log('Prediction result:', res);
            this.resultData = res;
            this.loading = false;
            
            // Emit the result to parent component if needed
            this.assess.emit(res);
          },
          error: (err) => {
            console.error('Prediction API error:', err);
            this.resultData = { error: true, message: err.message };

            // More detailed error message
            if (err.status === 405) {
              alert('Method Not Allowed. Please check if the API endpoint is correct and supports POST requests.');
            } else {
              alert('Failed to get prediction. Please try again. Error: ' + err.message);
            }
            
            this.loading = false;
          }
        });
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsTouched();
      });
    }
  }

  resetForm() {
    this.form.reset();
    this.resultData = null;
  }

}