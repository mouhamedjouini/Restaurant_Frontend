import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/Reservation';
import { BookingService } from '../../services/booking.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

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

  constructor(private book:BookingService){}
  ngOnInit(): void {
    const userId = 1; 
    this.fetchReservationsByUser(userId);
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
    this.book.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(res => res.id !== id);
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
      }
    });
  }
}
