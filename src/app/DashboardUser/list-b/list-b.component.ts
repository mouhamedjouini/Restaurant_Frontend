import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/Reservation';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-list-b',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-b.component.html',
  styleUrl: './list-b.component.css'
})
export class ListBComponent implements OnInit{
  reservations: Reservation[] = []; 
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
}
