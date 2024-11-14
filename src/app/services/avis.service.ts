import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avis } from '../models/Avis';
import { Observable } from 'rxjs';
const BASE_URL = 'http://localhost:8082/api/avis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  
  constructor(private http: HttpClient) {}

  AddAvis(avis: Avis): Observable<Avis> {
    console.log('Sending request to backend SERVICE :', avis);
    return this.http.post<Avis>(`${BASE_URL}`, avis);
  }

  UpdateAvis(id: number, avis: Avis): Observable<Avis> {
    return this.http.put<Avis>(`${BASE_URL}/${id}`, avis);
  }

  DeleteAvis(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }

  GetAvisById(id: number): Observable<Avis> {
    return this.http.get<Avis>(`${BASE_URL}/${id}`);
  }

  GetAllAvis(): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${BASE_URL}`);
  }

}
