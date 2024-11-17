import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/Menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvisService } from '../../services/avis.service';

@Component({
  selector: 'app-list-menu',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css'
})
export class ListMenuComponent implements OnInit{

  Menu: Menu[] = [];
  ratings: { [menuId: number]: number | undefined } = {};
  public url = 'http://localhost:8082/api/images/'
  constructor(private menuService:MenuService,
    private avisService: AvisService
  ){}
  ngOnInit(): void {
   this.allMenu()
  }

  allMenu(){
    this.menuService.GetAllMenu().subscribe({
      next: (data) => {
        this.Menu=data;
        console.log(this.Menu)
        this.Menu.forEach(item => {
          if (item.id) {  
            this.getAverageRating(item.id);  
          }
        });
      }, error: (err) => {
        console.log(err)
      }
  })}
  deleteMenu(id:any) {
    this.menuService.Delete(id).subscribe({
      next: (response) => {
        console.log('Menu deleted successfully:', response);
       this.ngOnInit()
      },
      error: (error) => {
        console.error('Error deleting menu:', error);
      }
    });
  }
  getAverageRating(menuId: number) {
    this.avisService.getAverageRatingByMenu(menuId).subscribe({
      next: (rating) => {
        this.ratings[menuId] = rating; // Store the rating for this menu item
      },
      error: (err) => {
        console.log('Error fetching rating:', err);
      }
    });
  }
}
