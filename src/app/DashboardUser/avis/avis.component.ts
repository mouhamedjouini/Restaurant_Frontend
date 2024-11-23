import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisService } from '../../services/avis.service';
import { Avis } from '../../models/Avis';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './avis.component.html',
  styleUrl: './avis.component.css'
})
export class AvisComponent {

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  avis: Avis = {
    comment: '',
    rating: 0,
  
    commandId: 0,
    menuId: 0
  };
  
  stars: number[] = [1, 2, 3, 4, 5]; // Array for star rating system

  constructor(
    private avisService: AvisService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.avis.commandId = params['commandeId'] ? Number(params['commandeId']) : 0;
      this.avis.menuId = params['menuId'] ? Number(params['menuId']) : 0;
    });
  }

  // Set rating when user clicks a star
  setRating(rating: number) {
    this.avis.rating = rating;
  }

  // Submit the avis
  submitAvis() {
    if (!this.avis.commandId || !this.avis.menuId) {
      console.error('Error: commandeId or menuId is missing.');
      return;
    }

    this.avisService.AddAvis(this.avis).subscribe({
      next: response => {
        console.log('Avis submitted:', response);
        this.router.navigate(['/user/listCommande']);
      },
      error: error => {
        console.error('Error submitting avis:', error);
      }
    });
  }
} 