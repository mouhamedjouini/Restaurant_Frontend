import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbarr',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './navbarr.component.html',
  styleUrl: './navbarr.component.css'
})
export class NavbarrComponent {
  notifications: { message: string; type: string }[] = [];

  constructor(private router: Router,private notificationService: NotificationService){}
  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }


  fetchNotifications() {
    this.notifications = [
      { message: 'Reservation #123 is confirmed.', type: 'CONFIRMED' },
      { message: 'Reservation #124 was canceled. No available tables.', type: 'CANCELLED' },
    ];
  }

  clearNotifications() {
    this.notifications = [];
  }

logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigate(["/login"]);
}
}
