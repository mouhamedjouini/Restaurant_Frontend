import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../models/Reservation';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [FormsModule],
  providers:[DatePipe],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent implements OnInit{
  reservation: Reservation = new Reservation();
  private readonly staticRestaurantId: number = 1;

  constructor(
    private bookingS: BookingService,
    private router: Router,
    private authService: AuthService ,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.reservation.restaurantId = this.staticRestaurantId;

    this.authService.getCurrentUser().subscribe({
      next: (data) => {
        this.reservation.userId = data.id; 
      },
      error: (err) => {
        console.error('Failed to retrieve current user:', err);
      }
    });
    this.reservation.reservationDate = new Date();

  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.reservation.numberOfGuests = form.value.numberOfGuests;
  
      // Format the reservation date using DatePipe before submission
      const formattedDate = this.datePipe.transform(form.value.reservationDate, 'yyyy-MM-ddTHH:mm');
      if (formattedDate) {
        this.reservation.reservationDate = new Date(formattedDate);  // Ensure proper format
      }
  
      this.bookingS.AddTable(this.reservation).subscribe({
        next: (response) => {
          console.log('Reservation successful:', response);
          form.reset();
          this.router.navigate(['user/listb']);
        },
        error: (err) => {
          console.error('Reservation failed:', err);
          // Log more information about the error response
          console.error('Error details:', err.error);  // This will give you a deeper look at the error response
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
  
}
