import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

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
    MatIconModule
  ],
  templateUrl: './assessment-form.html',
  styleUrl: './assessment-form.scss'
})
export class AssessmentForm {
  @Output() assess = new EventEmitter<any>();
  form: any;
  
  constructor(private fb: FormBuilder, private http: HttpClient) {}
    
  ngOnInit() {
    this.form = this.fb.group({
      gender: ['', Validators.required],
      age: ['', Validators.required],
      hypertension: ['', Validators.required],
      heart_disease: ['', Validators.required],
      bmi: ['', Validators.required],
      HbA1c_level: ['', Validators.required],
      blood_glucose_level: ['', Validators.required],
      smoking_history: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;
      console.log('Submitting form:', payload);

      this.http.post('http://localhost:5104/predict/diabetes', payload)
        .subscribe({
          next: (res) => {
            console.log('Prediction result:', res);
            alert(`Prediction: ${JSON.stringify(res)}`);
          },
          error: (err) => {
            console.error('Prediction API error:', err);
            alert('Failed to get prediction. Please try again.');
          }
        });

    } else {
      console.log('Form is invalid');
    }
  }
}