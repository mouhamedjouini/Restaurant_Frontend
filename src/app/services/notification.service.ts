import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type NotificationType = 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'UNKNOWN';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<{ message: string; type: string }[]>([]);
  notifications$ = this.notificationSubject.asObservable();

  addNotification(notification: { message: string; type: string }): void {
    const currentNotifications = this.notificationSubject.value;
    this.notificationSubject.next([notification, ...currentNotifications]);
  }
}
