import { Component } from '@angular/core';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { Commande, Status } from '../../models/Commande';
import { CommandeService } from '../../services/commande.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AvisService } from '../../services/avis.service';


@Component({
  selector: 'app-list-menu-user',
  standalone: true,
  imports: [CommonModule],
  
  templateUrl: './list-menu-user.component.html',
  styleUrl: './list-menu-user.component.css'
})
export class ListMenuUserComponent {
 roles:any

  commande: Commande = {
    date: new Date(),
    status: Status.PENDING,
   
   
  };
  id:Commande['menuId']

      Menu: Menu[] = [];
    //  avisMap: { [key: number]: Avis[] } = {};
      public url = 'http://localhost:8082/api/images/'
      constructor(private menuService:MenuService,private commandeService:CommandeService,private router:Router

        , private avisService: AvisService,private auth:AuthService
      ){}

      ngOnInit(): void {
       this.allMenu()
       this.getCurrentUser()
      }
      
  getCurrentUser(){
    this.roles=this.auth.getRoles();
  console.log(this.roles);
  this.auth.getCurrentUser().subscribe({
    next:(data)=>{
      console.log(data);
      this.commande.userId=data.id
   
     
      
    },
    error: (error) => {
      console.error( error);
    }

  })

  }
      AjouterCommande(menuId: Commande["menuId"]) {
        this.commande.menuId = menuId;
console.log(this.commande.userId);

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
        getMenuByid(){

        }
      allMenu(){
        this.menuService.GetAllMenu().subscribe({
          next: (data) => {
            this.Menu=data;
            // this.Menu.forEach(menuItem => {
            //   this.loadAvisForMenu(menuItem.id); // Load avis for each menu item
            // });
            console.log(this.Menu)
            
          }, error: (err) => {
            console.log(err)
          }
      })}
      
//       loadAvisForMenu(menuId: number) {
//         this.avisService.GetAllAvis().subscribe({
//           next: (avisList) => {
//             // Filter avis by menu ID and assign to avisMap
//         //    this.avisMap[menuId] = avisList.filter(avis => avis.menuId === menuId);
//           },
//           error: (err) => console.log("Error loading avis:", err)
//         });
//       }   
// 
}
