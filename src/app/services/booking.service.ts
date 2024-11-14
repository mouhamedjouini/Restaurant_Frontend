import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); 
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  AddTable(reservation:Reservation): Observable<Reservation> {
    const headers = this.getAuthHeaders();
    return this.http.post<Reservation>('http://localhost:8082/api/reservations', reservation);
  }
  getAllReservations(): Observable<Reservation[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reservation[]>('http://localhost:8082/api/reservations/allR');
  }

  getReservationsByUser(userId: number): Observable<Reservation[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reservation[]>(`http://localhost:8082/api/reservations/user/${userId}`);
}
deleteReservation(id: number): Observable<void> {
  const headers = this.getAuthHeaders();
  return this.http.delete<void>(`http://localhost:8082/api/reservations/deletRc/${id}`);
}
updateReservation(reservation: Reservation, id: number): Observable<Reservation> {
  const headers = this.getAuthHeaders();
  return this.http.put<Reservation>(`http://localhost:8082/api/reservations/updateR/${id}`, reservation);
}
getReservationById(id: number): Observable<Reservation> {
  const headers = this.getAuthHeaders();
  return this.http.get<Reservation>(`http://localhost:8082/api/reservations/reservation/${id}`);
}
getReservationsByStatus(status: string): Observable<Reservation[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Reservation[]>(`http://localhost:8082/api/reservations/status/${status}`);
}
}
