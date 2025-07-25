import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  texts = ['Photographer', 'Video Editor', 'Videographer', 'Director'];
  currentText = '';
  loopIndex = 0;
  isDeleting = false;
  videoSrc = 'assets/videos/video.mp4';

 
 

ngAfterViewInit() {
   this.typeEffect();
  const video = this.bgVideo.nativeElement;
  video.muted = true;
  video.play().catch(err => {
    console.warn('Autoplay prevented:', err);
  });
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
