import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommandeService } from '../../services/commande.service';
import { MenuService } from '../../services/menu.service';
import { Commande } from '../../models/Commande';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-commande-liv',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list-commande-liv.component.html',
  styleUrl: './list-commande-liv.component.css'
})
export class ListCommandeLivComponent {
  commandes: Commande[] = [];
  id:Commande['id']
  roles:any
  totalPrice: number = 0;
  ngOnInit(): void {
 this.getCurrentUser()
 

  }
  updateStatus(commandeId: Commande['id'], newStatus: Commande['status']) {
    this.commande.updateStatus(commandeId, newStatus)
      .subscribe(
        (response: any) => {
          console.log('Statut de la commande mis à jour:', response);
  
          const updatedCommande = this.commandes.find(c => c.id === commandeId);
          if (updatedCommande) {
            updatedCommande.status = newStatus;
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          Swal.fire(
            'Erreur',
            'Une erreur s\'est produite lors de la mise à jour du statut.',
            'error'
          );
        }
      );}
  confirmStatusChange(id: Commande['id'], newStatus: Commande['status']) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment changer le statut à ${newStatus} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Oui, changer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateStatus(id, newStatus);
        Swal.fire(
          'Changé !',
          `Le statut a été changé à ${newStatus}.`,
          'success'
        );
      }
    });
  } 
  constructor(private auth:AuthService,private commande:CommandeService,private menu : MenuService,
   ){}
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
 
  getCommandeByuser(id:any){
    this.commande.getCommandesByLivreurId(id).subscribe({
      next:(data)=>{
        this.commandes=data
        
        console.log(this.commandes);
  
     

      },error:(err)=>{
        console.log(err);
        
      }
    })
  
}
}
