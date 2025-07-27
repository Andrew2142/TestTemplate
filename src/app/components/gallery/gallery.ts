import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 
 

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  // ----------------------------
  // Inputs & Element References
  // ----------------------------
  @ViewChild('thumbsNav', { static: false }) thumbsNav!: ElementRef<HTMLDivElement>;

  // ----------------------------
  // Image Data & State
  // ----------------------------
  images = Array.from({ length: 31 }, (_, i) => `assets/optimized/image${i + 1}.webp`);
  selectedIndex: number | null = null;
  isMobile = false;
  rawYoutubeLinks = [
 
    'https://www.youtube.com/watch?v=QeSego_7Iek',
    'https://www.youtube.com/watch?v=yM4IYDv6mtU',
    
    'https://www.youtube.com/watch?v=UGKAQjK8FGQ'
  ];

  videoEmbeds: SafeResourceUrl[] = [];
  // ----------------------------
  // Drag Scroll State
  // ----------------------------
  isDragging = false;
  startX = 0;
  scrollLeft = 0;


  galleryModes = ['Photo Gallery', 'Video Gallery'];
  selectedMode = 'Photo Gallery';
  selectedModeIndex = 0;



  constructor(private sanitizer: DomSanitizer){
     this.videoEmbeds = this.rawYoutubeLinks.map((url) => {
      const videoId = new URL(url).searchParams.get('v');
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    });
  }

  // ----------------------------
  // Lifecycle Hooks
  // ----------------------------
  ngOnInit() {
    // Basic mobile detection (can be improved)
    this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
  }

  // ----------------------------
  // Fullscreen Navigation
  // ----------------------------
  openFullscreen(index: number) {
    this.selectedIndex = index;
    this.scrollToActiveThumbnail();
  }

  closeFullscreen() {
    this.selectedIndex = null;
  }

  nextImage() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
      this.scrollToActiveThumbnail();
    }
  }

  prevImage() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = (this.selectedIndex - 1 + this.images.length) % this.images.length;
      this.scrollToActiveThumbnail();
    }
  }

  // ----------------------------
  // Scroll Controls
  // ----------------------------
  scrollThumbs(direction: 'left' | 'right') {
    if (!this.thumbsNav) return;

    const container = this.thumbsNav.nativeElement;
    const scrollAmount = container.clientWidth / 2;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollToActiveThumbnail() {
    setTimeout(() => {
      const thumbnails = this.thumbsNav.nativeElement.querySelectorAll('img');
      const selectedThumb = thumbnails[this.selectedIndex ?? 0];
      if (selectedThumb) {
        selectedThumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }, 0);
  }

  // ----------------------------
  // Drag Scroll (Mobile Only)
  // ----------------------------
  onMouseDown(event: MouseEvent, container: HTMLElement) {
    if (!this.isMobile) return;

    this.isDragging = true;
    this.startX = event.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;

    const onMouseUpWindow = () => {
      this.isDragging = false;
      window.removeEventListener('mouseup', onMouseUpWindow);
    };
    window.addEventListener('mouseup', onMouseUpWindow);
  }

  onMouseLeave() {
    if (!this.isMobile) return;
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent, container: HTMLElement) {
    if (!this.isMobile || !this.isDragging) return;

    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = (x - this.startX) * 2;
    container.scrollLeft = this.scrollLeft - walk;
  }

  // ----------------------------
  // Utility
  // ----------------------------
  getOriginalImage(webpPath: string): string {
    return webpPath.replace('optimized', 'images').replace('.webp', '.jpeg');
  }

  
}
