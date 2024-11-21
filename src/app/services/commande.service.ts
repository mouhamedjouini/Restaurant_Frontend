import { Injectable } from '@angular/core';
import { Commande } from '../models/Commande';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  constructor(private httpClient: HttpClient){}
  GetAll(): Observable<Commande[]> {
      return this.httpClient.get<Commande[]>('http://localhost:8082/allc');
    }
     getbyidClient(id:number) :Observable<Commande[]> {
      return this.httpClient.get<Commande[]>(`http://localhost:8082/user/${id}`);
    }
    
    
    update(id: any, formData: FormData): Observable<Commande> {
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      return this.httpClient.put<Commande>(`http://localhost:8082/api/update/menu/${id}`, formData)
    }
    Add(commande: Commande): Observable<Commande> {
      
      return this.httpClient.post<Commande>('http://localhost:8082/addCommande', commande);}
    
    Delete(id: number) {
      return this.httpClient.delete(`http://localhost:8082/api/delete/menu/${id}`);
    }

    getTop5UsersWithMostOrders(): Observable<any[]> {
      return this.httpClient.get<any[]>('http://localhost:8082/top-5-users');
    }

}
