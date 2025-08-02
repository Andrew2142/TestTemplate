import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class Pricing {
  basePrice = 5;
  domainPrice = 3;
  projectPrice = 1;

  // Bind these to inputs
  extraDomains = 0;
  extraProjects = 0;

  user = {
    domains: 1,
    projects: 5,
    extraDomains: 0,
    extraProjects: 0
  };

  get totalCombined(): number {
    return this.basePrice + (this.extraDomains * this.domainPrice) + (this.extraProjects * this.projectPrice);
  }



  
}
