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
import { LogoComponent } from './logo.component';
import { NavComponent } from './nav.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r die Kopfleiste mit dem CSS-Selektor &lt;hs-header&gt;.
 * TODO https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#decorators-are-placed-on-modifiers-on-typescripts-syntax-trees
 */
@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    // styles: [
    //     `header {
    //         background-color: #BED6F8;
    //         background-position: left top;
    //         background-repeat: repeat-x;
    //         background-image: url(/assets/img/gradientBlueSky.png);
    //      }`
    // ]
    imports: [LogoComponent, NavComponent],
    standalone: true,
})
export class HeaderComponent {
    constructor() {
        log.debug('HeaderComponent.constructor()');
    }
}
