import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  AddTable(reservation:Reservation): Observable<Reservation> {
    return this.http.post<Reservation>('http://localhost:8082/api/reservations', reservation);
  }
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://localhost:8082/api/reservations/allR');
  }

  getReservationsByUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`http://localhost:8082/api/reservations/user/${userId}`);
}

}
