import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementServiceService {

  private apiUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<any> {
    const requestBody = { amount };
    return this.http.post(`${this.apiUrl}/create-payment-intent`, requestBody);
  }
}
