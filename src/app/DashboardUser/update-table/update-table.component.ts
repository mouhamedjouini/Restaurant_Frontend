import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-update-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-table.component.html',
  styleUrl: './update-table.component.css'
})
export class UpdateTableComponent implements OnInit {
  reservation: Reservation = new Reservation();
  private readonly staticUserId: number = 1; 
  private readonly staticRestaurantId: number = 1; 

  constructor(
    private book: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getReservation(id); // Fetch reservation data when component initializes
    }
  }

  getReservation(id: string): void {
    this.book.getReservationById(+id).subscribe({
      next: (reservation) => {
        this.reservation = reservation; // Set the reservation to the fetched data
      },
      error: (err) => {
        console.error('Error fetching reservation:', err);
      }
    });
  }

  updateReservation(form: NgForm): void {
    if (form.valid) {
      // Update reservation with static user and restaurant IDs
      this.book.updateReservation({
        ...this.reservation,
        userId: this.staticUserId,
        restaurantId: this.staticRestaurantId,
      }, this.reservation.id).subscribe({
        next: () => {
          console.log('Reservation updated successfully');
          this.router.navigate(['user/listb']); // Navigate back to the list after update
        },
        error: (err) => {
          console.error('Error updating reservation:', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }


}
