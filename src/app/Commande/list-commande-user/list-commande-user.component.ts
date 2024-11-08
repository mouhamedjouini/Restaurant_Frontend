import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/Commande';
import { MenuService } from '../../services/menu.service';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-commande-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-commande-user.component.html',
  styleUrl: './list-commande-user.component.css'
})
export class ListCommandeUserComponent implements OnInit{
  commandes: Commande[] = [];
  id:Commande['id']
  roles:any
  totalPrice: number = 0;
  ngOnInit(): void {
 this.getCurrentUser()
 

  }


  constructor(private auth:AuthService,private commande:CommandeService,private menu : MenuService){}
  getCurrentUser(){
    this.roles=this.auth.getRoles();
  console.log(this.roles);
  this.auth.getCurrentUser().subscribe({
    next:(data)=>{
      console.log(data);
      this.id=data.id
      this.getCommandeByuser(this.id)
      console.log(this.id);
      
    },
    error: (error) => {
      console.error( error);
    }

  })

  }
  calculateTotalPrice() {
    this.totalPrice = 0; // Réinitialiser le total
    for (let commande of this.commandes) {
      this.totalPrice += commande.menuPrice || 0; // Ajouter le prix de chaque menu
    }
  }
  getCommandeByuser(id:any){
    this.commande.getbyidClient(id).subscribe({
      next:(data)=>{
        this.commandes=data
        this.calculateTotalPrice()
        console.log(this.commandes);
  
     

      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
