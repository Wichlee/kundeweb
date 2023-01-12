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

import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginLogoutComponent } from './login-logout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import log from 'loglevel';
import { tap } from 'rxjs/operators';

/**
 * Komponente f&uuml;r die Navigationsleiste mit dem CSS-Selektor &lt;hs-nav&gt;.
 */
@Component({
    selector: 'hs-nav',
    templateUrl: './nav.component.html',
    imports: [
        AsyncPipe,
        LoginLogoutComponent,
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        NgIf,
        RouterLinkActive,
        RouterLinkWithHref,
    ],
    standalone: true,
})
export class NavComponent implements OnInit {
    protected isAdmin$ = new BehaviorSubject(false);

    constructor(private readonly authService: AuthService) {
        log.debug('NavComponent.constructor()');
    }

    ngOnInit() {
        if (this.authService.isAdmin) {
            log.debug('NavComponent.ngOnInit: bereits als admin eingeloggt');
            this.isAdmin$.next(true);
        }

        this.authService.rollen$
            .pipe(
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            .subscribe();
    }
}
