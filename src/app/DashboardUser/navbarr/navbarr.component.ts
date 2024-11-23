import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-navbarr',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './navbarr.component.html',
  styleUrl: './navbarr.component.css'
})
export class NavbarrComponent {
  notifications: { message: string; type: string }[] = [];

  constructor(private notificationService: NotificationService,private router:Router) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
  }


logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigate(["/login"]);
}
}
