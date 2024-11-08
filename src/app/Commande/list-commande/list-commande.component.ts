import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommandeService } from '../../services/commande.service';
import { MenuService } from '../../services/menu.service';
import { Commande } from '../../models/Commande';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-commande.component.html',
  styleUrl: './list-commande.component.css'
})
export class ListCommandeComponent {
  constructor(private auth:AuthService,private commande:CommandeService,private menu : MenuService){}
  commandes: Commande[] = [];
  totalPrice: number = 0;
  ngOnInit(): void {
    this.getCommandes()
    
   
     }

     calculateTotalPrice() {
      this.totalPrice = 0; // Réinitialiser le total
      for (let commande of this.commandes) {
        this.totalPrice += commande.menuPrice || 0; // Ajouter le prix de chaque menu
      }
    }
   
 
  getCommandes(){
    this.commande.GetAll().subscribe({
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
