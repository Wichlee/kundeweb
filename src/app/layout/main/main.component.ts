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

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den Hauptteil einer Seite mit dem CSS-Selektor &lt;hs-main&gt;.
 */
@Component({
    selector: 'hs-main',
    // router-outlet: Komponente fuer das Routing, d.h.
    // Platzhalter fuer den Austausch der HTML-Templates (= Fragmente)
    // beim Routing
    template: `
        <main>
            <div class="col col-12 mt-3"><router-outlet></router-outlet></div>
        </main>
    `,
    imports: [RouterOutlet],
    standalone: true,
})
export class MainComponent {
    constructor() {
        log.debug('MainComponent.constructor()');
    }
}
