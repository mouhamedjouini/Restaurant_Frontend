import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token!: string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  constructor(private http:HttpClient) { }
  private  url = 'http://localhost:8082/';
 
  register(user:User){
      return this.http.post(this.url+'register', user,{ responseType: 'text' })
  }
  login(user: User) {
    return this.http.post(`${this.url}login`, user, { observe: 'response' });
  }
  
  AddRole(username: string, role: string): Observable<any> {
    const url = `${this.url}addRole/${username}/${role}`; 
    return this.http.post<any>(url, null, { observe: 'response' });
  }
  
  getall(){
    return this.http.get<any[]>(this.url+"all")
  }
  getallLivreur(){
    return this.http.get<any[]>(this.url+"livreurs")
  }
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  
    }
    getCurrentUser():Observable<any>{
      const tokenj=localStorage.getItem('jwt')
      if (tokenj !== null) {
       this.token = tokenj; // Cela fonctionnera car tokenFromStorage est de type string ici
     
         const decodedToken = this.helper.decodeToken(tokenj);
         console.log("token"+this.token)
         this.loggedUser = decodedToken.sub;
         return this.http.get(this.url+''+this.loggedUser)
      }
      return new Observable();
       }
       public isLoggedIn(): boolean {
        let tokenj = localStorage.getItem('token');
    
        if (tokenj) {
          return true;
        }
    
        return false;
      }
    
        getToken():string {
        //return this.token;
        return"";
        }
        getRoles():string[] {
          return this.roles;
          }
          decodeJWT(){
            if (this.token == undefined)
             return;
          const decodedToken = this.helper.decodeToken(this.token);
          this.roles = decodedToken.roles;
          this.loggedUser = decodedToken.sub;
         
       console.log(""+this.roles+this.loggedUser);
   }
}
