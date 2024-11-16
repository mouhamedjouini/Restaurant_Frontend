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

  fetchReservations(): void {
    this.book.getAllReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations.map((reservation) => ({
          ...reservation,
          status: reservation.status || 'PENDING', // Default status if not set
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
      this.authService.getCurrentUser().subscribe({
        next: (user) => {
          if (user.role === 'Admin') {
            this.deleteReservationAndRefresh(reservation.id); // Supprime et recharge
          } else {
            this.toastr.error(
              'You do not have permission to cancel this reservation.',
              'Permission Denied'
            );
          }
        },
        error: (err) => {
          console.error('Error fetching current user:', err);
          this.toastr.error('Failed to fetch user data.', 'Error');
        },
      });
    } else {
      this.updateReservation(reservation); // Gère les autres statuts
    }
  }
  

  updateReservation(reservation: Reservation): void {
    this.book.updateReservation(reservation, reservation.id).subscribe({
      next: (updatedReservation) => {
        console.log('Updated Reservation:', updatedReservation);  // Vérifiez la réponse ici
        const index = this.reservations.findIndex(
          (r) => r.id === updatedReservation.id
        );
        if (index !== -1) {
          this.reservations[index] = updatedReservation;
        }
        this.showStatusToast(updatedReservation.status);
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
  
        // Ajoute un délai avant le rafraîchissement
        setTimeout(() => {
          this.fetchReservations();
        }, 2000); // Rafraîchir après 2 secondes
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