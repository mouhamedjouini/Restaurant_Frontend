import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/Reservation';
import { BookingService } from '../../services/booking.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { loadZone } from 'zone.js/lib/zone';
import Swal from 'sweetalert2';

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
    this.authService.getCurrentUser().subscribe({
      next: (data) => {
        const userId = data.id; 
        this.fetchReservationsByUser(userId); 
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
  }

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

  deleteReservation(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this reservation? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.book.deleteReservation(id).subscribe({
          next: (message: string) => {
            console.log(message);
            this.reservations = this.reservations.filter(res => res.id !== id);
            this.toastr.success('Reservation deleted successfully.', 'Deleted');
  
            this.ngOnInit();
          },
          error: (err) => {
            console.error('Error deleting reservation:', err);
            this.toastr.error('Failed to delete reservation.', 'Error');
          }
        });
      }
    });
  }
  }
