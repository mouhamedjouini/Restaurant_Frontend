import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type NotificationType = 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'UNKNOWN';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<{ message: string; type: string }[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  addNotification(notification: { message: string; type: string }): void {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }
}
