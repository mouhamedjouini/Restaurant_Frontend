import { Component } from '@angular/core';
import { NavlivComponent } from "../navliv/navliv.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashliv',
  standalone: true,
  imports: [NavlivComponent, FooterComponent,CommonModule, RouterOutlet],
  templateUrl: './dashliv.component.html',
  styleUrl: './dashliv.component.css'
})
export class DashlivComponent {

}
