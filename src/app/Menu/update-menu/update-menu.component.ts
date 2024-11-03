import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../models/Menu';
import { MenuService } from '../../services/menu.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-menu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-menu.component.html',
  styleUrl: './update-menu.component.css'
})
export class UpdateMenuComponent implements OnInit{
  imageFile: File | null = null;

  // Method to handle image selection
  selectedimage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      console.log("Selected image:", this.imageFile.name);
    }
  } 
  constructor(private route:ActivatedRoute,private menuS: MenuService){}
  id:any
  menu!:Menu
  ngOnInit(): void {
this.id=this.route.snapshot.paramMap.get('id')
this.getbyid(this.id)
  }

getbyid(id:any){
  this.menuS.getbyid(id).subscribe({
    next: (res)=>
    {
this.menu=res
console.log(this.menu)
    }, error:(err)=>
    {
console.log(err)
    }
  })


}
update(menu: Menu) {
  const formData = new FormData();

  formData.append('menu', JSON.stringify({
    name: menu.name,
    description: menu.description,
    price: menu.price,
    restaurantId: menu.restaurantId,
  }));
  
  if (this.imageFile) {
    formData.append('image', this.imageFile);
    console.log("1");
  } else {
    // Append the existing image filename as a string
    if (this.menu.image) {
      formData.append('image', new Blob([this.menu.image], { type: 'text/plain' }), this.menu.image);
      console.log("11");
    }
  }
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.menuS.update(menu.id,formData).subscribe({
        next: (data) => {
          console.log("Menu updated successfully:", data);
         // this.router.navigate(['Admin/Menu'])
        },
         error: (err) => {
            console.log(err)
          }
      })
  }
}
