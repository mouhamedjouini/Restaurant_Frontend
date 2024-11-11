import { Component, OnInit, Pipe } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../models/Reservation';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private book: BookingService, private toastr: ToastrService) {}

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
      }
    });
  }

  onStatusChange(reservation: Reservation) {
    if (reservation.status === 'CANCELLED') {
      this.toastr.info('Reservation will be deleted in 5 seconds.', 'Cancelled');
      setTimeout(() => {
        this.deleteReservation(reservation.id);
      }, 3000); 
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
        }
      });
    }
  }

  deleteReservation(id: number) {
    this.book.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(r => r.id !== id);
        this.toastr.info('Reservation deleted.', 'Cancelled');
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
      }
    });
  }

  showStatusToast(status?: string) {
    if (status === 'PENDING') {
      this.toastr.warning('Reservation is pending.', 'Pending');
    } else if (status === 'CONFIRMED') {
      this.toastr.success('Reservation confirmed.', 'Confirmed');
    } else if (status === 'CANCELLED') {
      this.toastr.error('Reservation cancelled.', 'Cancelled');
    } else {
      this.toastr.info('Status not specified.');
    }
  }
}