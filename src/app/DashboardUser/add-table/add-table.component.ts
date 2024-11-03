import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../models/Reservation';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent implements OnInit{
  reservation: Reservation = new Reservation();

  private readonly staticUserId: number = 1; 
  private readonly staticRestaurantId: number = 1; 

  constructor(private bookingS: BookingService, private router:Router) {}

  ngOnInit(): void {
    this.reservation.userId = this.staticUserId;
    this.reservation.restaurantId = this.staticRestaurantId;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.reservation.numberOfGuests = form.value.numberOfGuests;
      this.reservation.reservationDate = new Date(form.value.reservationDate);
      
      this.bookingS.AddTable(this.reservation).subscribe({
        next: (response) => {
          console.log('Reservation successful:', response);
          form.reset();
          this.router.navigate(['user/listb']);
        },
        error: (err) => {
          console.error('Reservation failed:', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
