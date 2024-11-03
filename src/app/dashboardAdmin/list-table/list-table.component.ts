import { Component, OnInit, Pipe } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../models/Reservation';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent  implements OnInit{
  reservations: Reservation[] = [];
  errorMessage: string = '';
  constructor(private bookS:BookingService,private route: ActivatedRoute){}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.fetchReservation(id);
  }
  fetchReservation(id: number): void {
    this.bookS.getAllReservations().subscribe({
      next: (reservation) => {
        this.reservations = reservation;
      },
      error: (err) => {
        this.errorMessage = 'Reservation not found.';
        console.error('Error fetching reservation:', err);
      }
    });
  }
}
