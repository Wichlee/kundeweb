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
        NgIf,
        RouterLinkActive,
        RouterLinkWithHref,
    ],
    standalone: true,
})
export class NavComponent implements OnInit {
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    // BehaviorSubject stellt den letzten Wert bereit https://stackoverflow.com/questions/41667580/subject-next-not-firing-in-ngoninit
    protected isAdmin$ = new BehaviorSubject(false);

    constructor(private readonly authService: AuthService) {
        log.debug('NavComponent.constructor()');
    }

    ngOnInit() {
        if (this.authService.isAdmin) {
            log.debug('NavComponent.ngOnInit: bereits als admin eingeloggt');
            this.isAdmin$.next(true);
        }

        // beobachten, ob es Informationen zur Rolle "admin" gibt
        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request auch abbrechen ("cancel") kann
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b

        this.authService.rollen$
            .pipe(
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }
}
