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

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent  implements OnInit{
  reservations: Reservation[] = [];
  currentPage = 1;
  selectedStatus: string = 'PENDING';
  itemsPerPage = 10;
  statuses: string[] = ['PENDING', 'CONFIRMED', 'CANCELLED'];

  constructor(
    private book: BookingService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.book.getAllReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations.map(reservation => ({
          ...reservation,
          status: reservation.status || 'PENDING'  
        }));
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.toastr.error('Failed to fetch reservations.', 'Error');
      }
    });
  }

  onStatusChange(reservation: Reservation) {
    if (reservation.status === 'CANCELLED') {
      this.toastr.info('Reservation status will be changed to cancelled, and it will be deleted shortly.', 'Cancelled');
      
      this.deleteReservation(reservation.id);
    } else {
      this.book.updateReservation(reservation, reservation.id).subscribe({
        next: (updatedReservation) => {
          const index = this.reservations.findIndex(r => r.id === updatedReservation.id);
          if (index !== -1) {
            this.reservations[index] = updatedReservation;  
          }
          this.showStatusToast(updatedReservation.status);  
        },
        error: (err) => {
          console.error('Error updating reservation status:', err);
          this.toastr.error('Failed to update reservation status.', 'Error');
        }
      });
    }
  }

  deleteReservation(id: number): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user.role === 'Admin') {
          this.book.deleteReservation(id).subscribe({
            next: () => {
              this.reservations = this.reservations.filter(res => res.id !== id);
              this.toastr.success('Reservation deleted successfully. The table is now available.', 'Deleted');
            },
            error: (err) => {
              console.error('Error deleting reservation:', err);
              this.toastr.error('Failed to delete reservation.', 'Error');
            }
          });
        } else {
          this.toastr.error('You do not have permission to delete this reservation.', 'Permission Denied');
        }
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
        this.toastr.error('Failed to fetch user data.', 'Error');
      }
    });
  }

  showStatusToast(status?: string) {
    if (status === 'PENDING') {
      this.toastr.warning('Reservation is pending.', 'Pending');
    } else if (status === 'CONFIRMED') {
      this.toastr.success('Reservation confirmed.', 'Confirmed');
    } else if (status === 'CANCELLED') {
      this.toastr.error('Reservation cancelled. The table is now available.', 'Cancelled');
    } else {
      this.toastr.info('Status not specified.');
    }
  }
}