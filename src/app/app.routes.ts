import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashAdminComponent } from './dashboardAdmin/dash-admin/dash-admin.component';
import { ListMenuComponent } from './Menu/list-menu/list-menu.component';
import { AddMenuComponent } from './Menu/add-menu/add-menu.component';
import { UpdateMenuComponent } from './Menu/update-menu/update-menu.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path:'register' , component:RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'Admin', component: DashAdminComponent , children:[
        {path: 'Menu',component:ListMenuComponent},
        {path: 'add',component:AddMenuComponent},
        {path: 'update/:id',component:UpdateMenuComponent}
    ]},
];
