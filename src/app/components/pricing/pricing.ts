import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.scss']  // <-- note styleUrls (plural)
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
