import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio');
}
