import { Component, OnInit, Pipe } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../models/Reservation';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

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

  constructor(private book: BookingService) {}

  ngOnInit(): void {
    this.book.getAllReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations; 
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
      }
    });
  }

}