import { Component } from '@angular/core';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-list-menu-user',
  standalone: true,
  imports: [],
  templateUrl: './list-menu-user.component.html',
  styleUrl: './list-menu-user.component.css'
})
export class ListMenuUserComponent {
      Menu: Menu[] = [];
      public url = 'http://localhost:8082/api/images/'
      constructor(private menuService:MenuService){}
      ngOnInit(): void {
       this.allMenu()
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
