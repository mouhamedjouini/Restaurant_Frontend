import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private auth:AuthService,private router :Router){}
  public jwToken!: string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  err:number = 0;
  user : User={
    username:'',
    password:''
  }

  decodeJWT(){
    if (this.jwToken == undefined)
     return;
  let decodedToken = this.helper.decodeToken(this.jwToken);
  this.roles = decodedToken.roles;
  this.loggedUser = decodedToken.sub;
console.log("de"+decodedToken)
console.log("MM"+this.roles+this.loggedUser);
}
getCurrentUser(){
  this.roles=this.auth.getRoles();
console.log(this.roles);
this.auth.getCurrentUser().subscribe({
  next:(data)=>{
    console.log(data);
  }
})
}
   onLoggedin(){
this.auth.login(this.user).subscribe({
next: (data) => {
this.jwToken = data.headers.get('Authorization')!;
this.auth.saveToken(this.jwToken);
this.getCurrentUser()
if(this.roles.includes('Admin')){
  this.router.navigate(['/Admin']);
}else{
this.router.navigate(['/user']);
}
},
error: (err: any) => {
this.err = 1;
}
});
}

  ngOnInit(): void {
  }

}
