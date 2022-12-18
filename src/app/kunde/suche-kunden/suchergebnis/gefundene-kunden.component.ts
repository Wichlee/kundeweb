/* eslint-disable max-classes-per-file */

import {
    AsyncPipe,
    NgForOf,
    NgIf,
    NgLocalization,
    NgPlural,
    NgPluralCase,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
} from '@angular/common';
import { AuthService, ROLLE_ADMIN } from '../../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, Input, type OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { easeIn, easeOut } from '../../../shared/animations';
import { first, tap } from 'rxjs/operators';
import { type Kunde } from '../../shared/kunde';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { KundeWriteService } from '../../shared/kundeWrite.service';
import { RemoveError } from '../../shared/errors';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-gefundene-kunden</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * Kunden oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-gefundene-kunden',
    templateUrl: './gefundene-kunden.component.html',
    animations: [easeIn, easeOut],
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        NgPlural,
        NgPluralCase,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        RouterLinkWithHref,
    ],
    standalone: true,
})
export class GefundeneKundenComponent implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-gefundene-kunden [kunden]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunden: Kunde[] = [];

    protected isAdmin!: boolean;

    // nachtraegliches Einloggen mit der Rolle "admin" beobachten
    protected isAdmin$ = new Subject<boolean>();

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: KundeWriteService,
    ) {
        log.debug('GefundeneKundenComponent.constructor()');
    }

    ngOnInit() {
        log.debug('GefundeneKundenComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;

        this.authService.rollen$
            .pipe(
                first(),
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }

    /**
     * Den ausgew&auml;hlten bzw. angeklickten Kunden in der Detailsseite anzeigen.
     * @param kunde Der ausgew&auml;hlte Kunde
     */
    onClick(kunde: Kunde) {
        log.debug('GefundeneKundenComponent.onClick: kunde=', kunde);

        // URL mit der Kunde-ID, um ein Bookmark zu ermoeglichen
        // Gefundener Kunde als NavigationExtras im Router puffern
        const state = { kunde };
        return this.router.navigate([`/kunden/${kunde.id}`], { state });
    }

    /**
     * Den ausgew&auml;hlten bzw. angeklickten Kunden l&ouml;schen.
     * @param kunde Der ausgew&auml;hlte Kunde
     */
    onRemove(kunde: Kunde) {
        log.debug('GefundeneKundenComponent.onRemove: kunde=', kunde);

        return this.writeService
            .remove(kunde)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneKundenComponent.onRemove: statuscode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.kunden = this.kunden.filter(k => k.id !== kunde.id);
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, kunde: Kunde) {
        return kunde.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}

/* eslint-enable max-classes-per-file */
