import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    MatToolbarModule, 
    MatIconModule,
    MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
