/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// "core" enthaelt Funktionalitaet, damit die Webanwendung im Browser laeuft
import { Component } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import log from 'loglevel';

/**
 * Wurzelkomponente mit dem Tag &lt;hs-root&gt;
 */
@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    imports: [FooterComponent, HeaderComponent, MainComponent],
    standalone: true,
})

// Definitionsklasse ~ Controller: Eingabedaten entgegennehmen, Model fuer die
// View aktualisieren, Funktionen fuer die Benutzer-Interaktion bereitstellen,
// z.B. onClick oder onSubmit
export class AppComponent {
    constructor() {
        log.debug('AppComponent.constructor()');
    }
}
