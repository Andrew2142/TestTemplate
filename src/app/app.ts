import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Gallery } from './components/gallery/gallery';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  
  styleUrl: './app.scss',
  imports: [Home, Gallery, Footer],
  template: `
    <app-home />
    <app-gallery />
    <app-footer />
  `,
})
export class App {
  protected readonly title = signal('portfolio');
}
