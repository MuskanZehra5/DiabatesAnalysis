import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
