import { Component } from '@angular/core';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { Commande, Status } from '../../models/Commande';
import { CommandeService } from '../../services/commande.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-menu-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-menu-user.component.html',
  styleUrl: './list-menu-user.component.css'
})
export class ListMenuUserComponent {
 
  commande: Commande = {
    date: new Date(),
    status: Status.PENDING,
    userId: 1, // ID de l'utilisateur par défaut
   
  };
      Menu: Menu[] = [];
      public url = 'http://localhost:8082/api/images/'
      constructor(private menuService:MenuService,private commandeService:CommandeService,private router:Router){}
      ngOnInit(): void {
       this.allMenu()
      }
      AjouterCommande(menuId: Commande["menuId"]) {
        this.commande.menuId = menuId;

    // Envoyer la commande directement au service sans utiliser formData
    this.commandeService.Add(this.commande).subscribe({
      next: (data) => {
        console.log("Commande ajoutée avec succès :", data);
        Swal.fire({
          icon: 'success',
          title: 'Commande ajoutée!',
          text: `Le menu  a été ajouté avec succès.`,
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['user/MenuC']);
        });
      
      },
      error: (err) => {
        console.log("Erreur lors de l'ajout de la commande :", err);
      }
        })
        
        }
      allMenu(){
        this.menuService.GetAllMenu().subscribe({
          next: (data) => {
            this.Menu=data;
            console.log(this.Menu)
            
          }, error: (err) => {
            console.log(err)
          }
      })}
     
}
