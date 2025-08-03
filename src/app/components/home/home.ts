import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Matrix } from '../matrix/matrix';
import { Navigation } from '../navigation/navigation';
import { Pricing } from '../pricing/pricing';
import { About } from '../about/about';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Matrix, Navigation, Pricing, About],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  texts = [
    'Welcome to Slim Reviews',
    'Collect reviews without friction',
    'Embed with a single line of code',
    'Built for speed, privacy, and simplicity',
    'No logins. No bloat. Just feedback',
    'Perfect for SaaS, products, and portfolios',
  ];
  currentText = '\u00A0';
  loopIndex = 0;
  isDeleting = false;
  videoSrc = 'assets/videos/video.mp4';

 
 
ngOnInit(){
   
}


ngAfterViewInit() {
   this.typeEffect();
}


 




  typeEffect(): void {
    const fullText = this.texts[this.loopIndex % this.texts.length];
    this.currentText = this.isDeleting
      ? fullText.substring(0, this.currentText.length - 1)
      : fullText.substring(0, this.currentText.length + 1);

    const delay = this.isDeleting ? 60 : 120;

    setTimeout(() => {
      if (!this.isDeleting && this.currentText === fullText) {
        this.isDeleting = true;
        setTimeout(() => this.typeEffect(), 1500);
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.loopIndex++;
        this.typeEffect();
      } else {
        this.typeEffect();
      }
    }, delay);
  }



  
}
