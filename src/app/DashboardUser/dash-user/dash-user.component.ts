import { Component } from '@angular/core';
import { NavbarrComponent } from '../navbarr/navbarr.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-user',
  standalone: true,
  imports: [NavbarrComponent,RouterOutlet,FooterComponent,CommonModule],
  templateUrl: './dash-user.component.html',
  styleUrl: './dash-user.component.css'
})
export class DashUserComponent {

}
