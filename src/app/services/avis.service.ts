import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avis } from '../models/Avis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private http: HttpClient) { }

  AddAvis(avis:Avis): Observable<Avis> {
    return this.http.post<Avis>('http://localhost:8082/api/avis', avis);
  }
  UpdateAvis(id: number, avis: Avis): Observable<Avis> {
    return this.http.put<Avis>(`http://localhost:8082/api/avis/${id}`, avis);
}
DeleteAvis(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8082/api/avis/${id}`);
}
GetAvisById(id: number): Observable<Avis> {
  return this.http.get<Avis>(`http://localhost:8082/api/avis/${id}`);
}
GetAllAvis(): Observable<Avis[]> {
  return this.http.get<Avis[]>('http://localhost:8082/api/avis');
}

}
