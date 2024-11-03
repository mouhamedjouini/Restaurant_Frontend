import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/Menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private httpClient: HttpClient){}
  GetAllMenu(): Observable<Menu[]> {
      return this.httpClient.get<Menu[]>('http://localhost:8082/api/menus');
    }
     getbyid(id:number) {
      return this.httpClient.get<Menu>(`http://localhost:8082/api/menu/${id}`);
    }
    
    update(id: any, formData: FormData): Observable<Menu> {
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      return this.httpClient.put<Menu>(`http://localhost:8082/api/update/menu/${id}`, formData)
    }
    AddMenu(formData: FormData): Observable<Menu> {
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      return this.httpClient.post<Menu>('http://localhost:8082/api/ajout/menu', formData);}
    
    Delete(id: number) {
      return this.httpClient.delete(`http://localhost:8082/api/delete/menu/${id}`);
    }
}
