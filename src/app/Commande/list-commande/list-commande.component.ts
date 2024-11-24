import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommandeService } from '../../services/commande.service';
import { MenuService } from '../../services/menu.service';
import { Commande } from '../../models/Commande';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-commande',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list-commande.component.html',
  styleUrl: './list-commande.component.css'
})
export class ListCommandeComponent {
  constructor(private auth:AuthService,private commande:CommandeService,private menu : MenuService){}
  commandes: Commande[] = [];
  livreurs:any;
  li="gggg"
  totalPrice: number = 0;
  ngOnInit(): void {
    this.getCommandes()
    this.getAllLivreurs()
   
     }
     getAllLivreurs() {
      this.auth.getallLivreur().subscribe({
        next: (data) => {
          console.log('Liste des livreurs récupérée avec succès:', data);
          this.livreurs = data; // Stocker les livreurs dans une variable pour utilisation dans le template
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des livreurs:', err);
        }
      });
    }
    onAssignLivreur(commandeId: Commande['id'], livreurId: Commande['livreurId']) {
      if (!livreurId) {
        console.warn('Livreur non sélectionné.');
        return;
      }
    
      this.commande.assignLivreurToCommande(commandeId, livreurId).subscribe({
        next: (response) => {
          console.log('Livreur assigné avec succès', response);
          alert('Livreur assigné avec succès !');
        },
        error: (err) => {
          console.error('Erreur lors de l\'attribution du livreur :', err);
          alert('Erreur lors de l\'attribution du livreur.');
        }
      });
    }
    

     calculateTotalPrice() {
      this.totalPrice = 0; // Réinitialiser le total
      for (let commande of this.commandes) {
        this.totalPrice += commande.menuPrice || 0; // Ajouter le prix de chaque menu
      }
    }
    getStatusClass(status: Commande['status']): string {
      switch (status) {
        case 'PENDING':
          return 'status-pending';
        case 'PROCESSING':
          return 'status-processing';
        case 'COMPLETED':
          return 'status-completed';
        case 'CANCELLED':
          return 'status-cancelled';
        default:
          return 'status-unknown';
      }
      
      
    }
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
