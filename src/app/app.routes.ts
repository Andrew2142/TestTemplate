import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Pricing } from './components/pricing/pricing';

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
    path: 'about',
    component: About,
    title: 'Slim Reviews - About'
  },
 
  {
    path: 'pricing',
    component: Pricing,
    title: 'Slim Reviews - Pricing'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
