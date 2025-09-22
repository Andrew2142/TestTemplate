import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Pricing } from './components/pricing/pricing';
import { ContactComponent } from './components/contact/contact';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Slim Reviews - Home'
  },
  {
    path: 'pricing',
    component: Pricing,
    title: 'Slim Reviews - Pricing'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Slim Reviews - Contact'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
