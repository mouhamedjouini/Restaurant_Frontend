import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbarad',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbarad.component.html',
  styleUrl: './navbarad.component.css'
})
export class NavbaradComponent {
  constructor(private router: Router){}
  ngOnInit(): void {
   
  }
logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigate(["/login"]);
}
}
