import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/Reservation';
import { BookingService } from '../../services/booking.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-b',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxPaginationModule,RouterLink],
  templateUrl: './list-b.component.html',
  styleUrl: './list-b.component.css'
})
export class ListBComponent implements OnInit{
  reservations: Reservation[] = []; 
  currentPage = 1; 

  constructor(
    private book: BookingService, 
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Fetch current user and their reservations
    this.authService.getCurrentUser().subscribe({
      next: (data) => {
        const userId = data.id; // Get the current user's ID
        this.fetchReservationsByUser(userId); // Fetch reservations for the current user
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
  }

  // Fetch reservations by user ID
  fetchReservationsByUser(userId: number): void {
    this.book.getReservationsByUser(userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations; 
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
      }
    });
  }

  // Delete a reservation
  deleteReservation(id: number): void {
    this.book.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(res => res.id !== id);
        this.toastr.success('Reservation deleted successfully.', 'Deleted'); 
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
        this.toastr.error('Failed to delete reservation.', 'Error');
      }
    });
  }}
