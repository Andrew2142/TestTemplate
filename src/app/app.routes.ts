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
    title: 'SlimReviews - Home'
  },
  {
    path: 'plans',
    component: Pricing,
    title: 'SlimReviews - Plans'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'SlimReviews - Contact'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
