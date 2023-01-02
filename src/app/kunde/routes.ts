import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { CreateKundeComponent } from './create-kunde/create-kunde.component';
import { DetailsKundeComponent } from './details-kunde/details-kunde.component';
import { HomeComponent } from '../home/home.component';
import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { type Routes } from '@angular/router';
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component';
import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
import { UpdateKundeComponent } from './update-kunde/update-kunde.component';
import { canDeactivateGuard } from './create-unde/create-deactivate.guard';
import { isAdminGuard } from '../auth/isAdmin.guard';

// Route-Definitionen fuer das Feature-Modul "Kunde":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
export const ROUTES: Routes = [
    {
        path: 'suche',
        component: SucheKundenComponent,
        title: 'Suche',
    },
    {
        path: 'create',
        component: CreateKundeComponent,
        title: 'Neuer Kunde',
        canMatch: [isAdminGuard],
        canDeactivate: [canDeactivateGuard],
    },
    {
        path: 'create',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'balkendiagramm',
        component: BalkendiagrammComponent,
        title: 'Balkendiagramm',
        canMatch: [isAdminGuard],
    },
    {
        path: 'balkendiagramm',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'liniendiagramm',
        component: LiniendiagrammComponent,
        title: 'Liniendiagramm',
        canMatch: [isAdminGuard],
    },
    {
        path: 'liniendiagramm',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: 'tortendiagramm',
        component: TortendiagrammComponent,
        title: 'Tortendiagramm',
        canMatch: [isAdminGuard],
    },
    {
        path: 'tortendiagramm',
        component: HomeComponent,
        title: 'Beispiel',
    },

    // id als Pfad-Parameter
    {
        path: 'update/:id',
        component: UpdateKundeComponent,
        canMatch: [isAdminGuard],
    },
    {
        path: 'update/:id',
        component: HomeComponent,
        title: 'Beispiel',
    },
    {
        path: ':id',
        component: DetailsKundeComponent,
    },
];
