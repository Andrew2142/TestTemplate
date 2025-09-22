import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  showBetaPopup = false;
  mobileMenuOpen = false;

  showBetaMessage() {
    this.showBetaPopup = true;
  }

  closeBetaPopup() {
    this.showBetaPopup = false;
  }

  proceedToBeta() {
    this.showBetaPopup = false;
    window.open('https://app.slimreviews.net', '_blank');
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
