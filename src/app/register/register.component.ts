import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  //users !: User;
  constructor(private auth:AuthService , private router:Router){}
  user: User={
    username: '',
    email: '',
    password: ''
  }
  
  ngOnInit(): void {
  }
 
  register() {
    console.log(this.user);
    this.auth.register(this.user).subscribe({
      next: (response) => {
        this.auth.AddRole(this.user.username ?? '', 'User').subscribe({
          next: () => {
            console.log('User role added successfully');
            this.router.navigateByUrl('/login');
          },
          error: (err) => console.error('Error adding role:', err)
        });
      },
      error: (err) => console.error('Registration error:', err)
    });
  }
  
}
