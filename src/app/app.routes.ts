import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path:'register' , component:RegisterComponent},
    { path: 'login', component: LoginComponent },
];
