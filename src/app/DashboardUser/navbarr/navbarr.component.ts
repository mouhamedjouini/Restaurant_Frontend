import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbarr',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './navbarr.component.html',
  styleUrl: './navbarr.component.css'
})
export class NavbarrComponent {
  constructor(private router: Router){}
  ngOnInit(): void {
   
  }
logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigate(["/login"]);
}
}
