import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { NavbaradComponent } from "../navbarad/navbarad.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NavbaradComponent,CommonModule, RouterOutlet],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.css'
})
export class DashAdminComponent {

}
