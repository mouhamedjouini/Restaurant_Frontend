import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashAdminComponent } from './dashboardAdmin/dash-admin/dash-admin.component';
import { ListMenuComponent } from './Menu/list-menu/list-menu.component';
import { AddMenuComponent } from './Menu/add-menu/add-menu.component';
import { UpdateMenuComponent } from './Menu/update-menu/update-menu.component';
import { DashUserComponent } from './DashboardUser/dash-user/dash-user.component';
import { AddTableComponent } from './DashboardUser/add-table/add-table.component';
import { ListTableComponent } from './dashboardAdmin/list-table/list-table.component';
import { ListBComponent } from './DashboardUser/list-b/list-b.component';

import { ListMenuUserComponent } from './Menu/list-menu-user/list-menu-user.component';

import { UpdateTableComponent } from './DashboardUser/update-table/update-table.component';
import { ListCommandeUserComponent } from './Commande/list-commande-user/list-commande-user.component';
import { ListCommandeComponent } from './Commande/list-commande/list-commande.component';
import { PaymentComponent } from './DashboardUser/payment/payment.component';
import { AvisComponent } from './DashboardUser/avis/avis.component';
import { DashlivComponent } from './dashboardLivreur/dashliv/dashliv.component';


export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path:'register' , component:RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'Admin', component: DashAdminComponent , children:[
        {path: 'Menu',component:ListMenuComponent},
        {path: 'add',component:AddMenuComponent},
        {path: 'update/:id',component:UpdateMenuComponent},
        {path:"list", component:ListTableComponent},
        {path:'listCommande' , component:ListCommandeComponent}
    ]},
    { path: 'user', component: DashUserComponent , children:[
        {path: "addT" , component :AddTableComponent},
        {path:'listb',component:ListBComponent},

        {path: 'MenuC',component:ListMenuUserComponent},

        {path:'update/:id' , component:UpdateTableComponent},
        {path:'listCommande' , component:ListCommandeUserComponent},
        {path:'listCommande/pay' , component:PaymentComponent},
        {path:'listCommande/feed' , component:AvisComponent}

       
    ] },
    { path: 'Livreur', component: DashlivComponent , children:[]}

];
