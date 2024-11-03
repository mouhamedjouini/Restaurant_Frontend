import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-menu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent {
  constructor(private menuS:MenuService,private router:Router
  ){}
  menu:Menu = { restaurantId: 1};
  images: any
  image:any

  imageFile: File | null = null;

  // Method to handle image selection
  selectedimage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      console.log("Selected image:", this.imageFile.name);
    }
  } 
add(menu: Menu) {
console.log(this.menu)
const formData = new FormData();

formData.append('menu', JSON.stringify(this.menu));

if (this.imageFile) {
  formData.append('image', this.imageFile);
} else {
  console.log("No image file selected.");
}
formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});


this.menuS.AddMenu(formData).subscribe({
  next: (data) => {
    console.log("Menu added successfully:", data);
    this.router.navigate(['Admin/Menu'])
  },
   error: (err) => {
      console.log(err)
    }
})
    
}



}