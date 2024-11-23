import { Component, OnInit, Pipe } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../models/Reservation';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent  implements OnInit{
  
  notifications: { message: string; type: 'CONFIRMED' | 'CANCELLED' }[] = [];
  reservations: Reservation[] = [];
  currentPage = 1;
  selectedStatus: string = 'PENDING';
  itemsPerPage = 10;
  statuses: string[] = ['PENDING', 'CONFIRMED', 'CANCELLED'];

  constructor(
    private book: BookingService,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.book.getAllReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations.map((reservation) => ({
          ...reservation,
          status: reservation.status || 'PENDING',  // Ensure default status
        }));
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.toastr.error('Failed to fetch reservations.', 'Error');
      },
    });
  }

  onStatusChange(reservation: Reservation): void {
    switch (reservation.status) {
      case 'CONFIRMED':
        this.updateReservationStatus(reservation.id, 'CONFIRMED');
        break;
      case 'CANCELLED':
        this.deleteReservationAndRefresh(reservation.id);
        break;
      default:
        this.updateReservationStatus(reservation.id, 'PENDING');
    }
  }
  updateReservationStatus(id: number, status: string): void {
    this.book.updateReservationStatus(id, status).subscribe({
      next: (updatedReservation) => {
        const statusMessage = status === 'CONFIRMED'
          ? `Reservation #${id} confirmed.`
          : `No place available. Reservation #${id} was cancelled.`;
        
        this.notificationService.addNotification({
          message: statusMessage,
          type: status, 
        });
  
        this.updateReservationInList(updatedReservation);
        this.showStatusToast(status);
      },
      error: (err) => {
        console.error('Error updating reservation status:', err);
        this.toastr.error('Failed to update reservation status.', 'Error');
      },
    });
  }
  
  

  deleteReservationAndRefresh(id: number): void {
    this.book.deleteReservation(id).subscribe({
      next: () => {
        this.toastr.success(
          'Reservation deleted successfully. The table is now available.',
          'Deleted'
        );
        this.notificationService.addNotification({
          message: 'Reservation cancelled and table is now free.',
          type: 'CANCELLED',
        });

        setTimeout(() => {
          this.fetchReservations();
        }, 2000);
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
        this.toastr.error('Failed to delete reservation.', 'Error');
      },
    });
  }

  showStatusToast(status: string): void {
    switch (status) {
      case 'PENDING':
        this.toastr.warning('Reservation is pending.', 'Pending');
        break;
      case 'CONFIRMED':
        this.toastr.success('Reservation confirmed.', 'Confirmed');
        break;
      case 'CANCELLED':
        this.toastr.error('Reservation cancelled. The table is now available.', 'Cancelled');
        break;
      default:
        this.toastr.info('Status not specified.');
    }
  }

  private updateReservationInList(updatedReservation: Reservation): void {
    const index = this.reservations.findIndex((r) => r.id === updatedReservation.id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
    }
  }
}