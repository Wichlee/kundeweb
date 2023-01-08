import { HomeComponent } from './home/home.component';
import { type Routes } from '@angular/router';

// Route-Definitionen fuer den Root-Router
// Eine Route leitet zu einer neuen Ansicht ("View") in der SPA, wobei die
// vorherige Ansicht ueberdeckt bzw. ausgeblendet wird.
export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '',
        // redirect erfordert pathMatch full
        pathMatch: 'full',
        component: HomeComponent,
        title: 'KundeWeb - Willkommen',
    },
    {
        path: 'kunden',
        // Lazy Loading (statt Eager Loading) durch dynamische Imports (seit ES 2020)
        // loadChildren statt component wie bei '/'
        // https://angular.io/guide/lazy-loading-ngmodules
        loadChildren: () => import('./kunde/routes').then(mod => mod.ROUTES),
    },
];
