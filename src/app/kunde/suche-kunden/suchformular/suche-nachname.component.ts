/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
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

// Testcommit

import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-nachname</code>
 */
@Component({
    selector: 'hs-suche-nachname',
    templateUrl: './suche-nachname.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheNachnameComponent {
    protected nachname = '';

    // Event Binding: <hs-suche-nachname (suchkriterien$)="...">
    // in RxJS: Observables für Event-Streaming
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    protected readonly nachname$ = new Subject<string>();

    constructor() {
        log.debug('SucheNachnameComponent.constructor()');
    }

    onBlur() {
        log.debug(`SucheNachnameComponent.onBlur: nachname=${this.nachname}`);
        this.nachname$.next(this.nachname);
    }
}
