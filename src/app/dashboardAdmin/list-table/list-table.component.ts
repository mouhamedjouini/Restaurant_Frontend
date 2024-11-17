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
    private authService: AuthService,
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
          status: reservation.status || 'PENDING', 
        }));
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.toastr.error('Failed to fetch reservations.', 'Error');
      },
    });
  }

  onStatusChange(reservation: Reservation): void {
    if (reservation.status === 'CANCELLED') {
      this.deleteReservationAndRefresh(reservation.id);
    } else {
      this.updateReservation(reservation);
    }
  }
  

  updateReservation(reservation: Reservation): void {
    // Ensure the status is defined
    if (!reservation.status) {
      reservation.status = 'PENDING'; // Set default status
    }
  
    const currentReservation = this.reservations.find((r) => r.id === reservation.id);
  
    // Check if status has changed
    if (currentReservation && currentReservation.status === reservation.status) {
      console.log('No status change detected. Skipping notification.');
      return;
    }
  
    this.book.updateReservation(reservation, reservation.id).subscribe({
      next: (updatedReservation) => {
        console.log('Updated Reservation:', updatedReservation);
        const index = this.reservations.findIndex(
          (r) => r.id === updatedReservation.id
        );
        if (index !== -1) {
          this.reservations[index] = updatedReservation;
        }
        this.showStatusToast(updatedReservation.status);
  
        // Notify only if the status has changed
        if (updatedReservation.status) {
          this.notificationService.addNotification({
            message: `Reservation ${updatedReservation.status.toLowerCase()}.`,
            type: updatedReservation.status,
          });
        }
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
  
  showStatusToast(status?: string): void {
    if (status === 'PENDING') {
      this.toastr.warning('Reservation is pending.', 'Pending');
    } else if (status === 'CONFIRMED') {
      this.toastr.success('Reservation confirmed.', 'Confirmed');
    } else if (status === 'CANCELLED') {
      this.toastr.error(
        'Reservation cancelled. The table is now available.',
        'Cancelled'
      );
    } else {
      this.toastr.info('Status not specified.');
    }
  }
}