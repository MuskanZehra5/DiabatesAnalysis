import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
