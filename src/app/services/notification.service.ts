import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type NotificationType = 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'UNKNOWN';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSource = new BehaviorSubject<{ message: string; type: string }[]>([]);
  notifications$ = this.notificationsSource.asObservable();

  addNotification(notification: { message: string; type: string }): void {
    const currentNotifications = this.notificationsSource.getValue();
    this.notificationsSource.next([notification, ...currentNotifications]);
  }

  clearNotifications(): void {
    this.notificationsSource.next([]);
  }
}
