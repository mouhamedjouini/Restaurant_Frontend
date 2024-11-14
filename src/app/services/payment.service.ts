import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  
  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/create-payment-intent`, { amount });
  }
  
  createCheckoutSession(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/create-checkout-session`, { amount });
  }



}
