import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../../models/Reservation';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-table.component.html',
  styleUrl: './update-table.component.css'
})
export class UpdateTableComponent implements OnInit {
  reservation: Reservation = new Reservation();
  private readonly staticRestaurantId: number = 1; 

  constructor(
    private book: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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
      this.authService.getCurrentUser().subscribe({
        next: (data) => {
          const userId = data.id;
          this.book.updateReservation({
            ...this.reservation,
            userId: userId,
            restaurantId: this.staticRestaurantId,
          }, this.reservation.id).subscribe({
            next: () => {
              console.log('Reservation updated successfully');
              this.router.navigate(['user/listb']); 
            },
            error: (err) => {
              console.error('Error updating reservation:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching current user:', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }


}
