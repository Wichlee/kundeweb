import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { type Kunde } from '../shared/kunde';
import { KundeReadService } from '../shared/kundeRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { DetailsBearbeitenComponent } from './details-bearbeiten.component';
import { DetailsBreadcrumbsComponent } from './details-breadcrumbs.component';
import { DetailsInteressenComponent } from './interessen/details-interessen.component';
import { DetailsStammdatenComponent } from './stammdaten/details-stammdaten.component';
import { ErrorMessageComponent } from '../../shared/error-message.component';
import { FindError } from '../shared/errors';
import { HttpStatusCode } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { WaitingComponent } from '../../shared/waiting.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-kunde</code>
 */
@Component({
    selector: 'hs-details-kunde',
    templateUrl: './details-kunde.component.html',
    imports: [
        DetailsBearbeitenComponent,
        DetailsBreadcrumbsComponent,
        DetailsInteressenComponent,
        DetailsStammdatenComponent,
        ErrorMessageComponent,
        NgIf,
        WaitingComponent,
    ],
    standalone: true,
})
export class DetailsKundeComponent implements OnInit {
    protected waiting = true;

    protected kunde: Kunde | undefined;

    protected errorMsg: string | undefined;

    protected isAdmin!: boolean;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: KundeReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
    ) {
        log.debug('DetailsKundeComponent.constructor()');

        // getCurrentNavigation() liefert undefined innerhalb von ngOnInit
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as { kunde: Kunde } | undefined;
        this.kunde = state?.kunde;
        log.debug('DetailsKundeComponent.constructor: this.kunde=', this.kunde);
    }

    ngOnInit() {
        if (this.kunde === undefined) {
            log.debug(
                'DetailsKundeComponent.ngOnInit: this.kunde === undefined',
            );

            // Pfad-Parameter aus /kunden/:id beobachten, ohne dass bisher ein
            // JavaScript-Ereignis, wie z.B. click, eingetreten ist.
            // Mongo-ID ist ein String
            const id = this.route.snapshot.paramMap.get('id') ?? undefined;
            log.debug('DetailsKundeComponent.ngOnInit: id=', id);

            this.service
                .findById(id)
                .pipe(
                    first(),
                    tap(result => this.#setProps(result)),
                )
                .subscribe();
        } else {
            this.waiting = false;
        }

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin;
    }

    #setProps(result: Kunde | FindError) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleError(result);
            return;
        }

        this.kunde = result;
        this.errorMsg = undefined;

        const titel = `Details ${this.kunde.id}`;
        this.titleService.setTitle(titel);
    }

    #handleError(err: FindError) {
        const { statuscode } = err;
        log.debug('DetailsComponent.handleError: statuscode=', statuscode);

        this.kunde = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound: {
                this.errorMsg = 'Kein Kunde gefunden.';
                break;
            }
            case HttpStatusCode.TooManyRequests: {
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            }
            case HttpStatusCode.GatewayTimeout: {
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            }
            default: {
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
            }
        }

        this.titleService.setTitle('Fehler');
    }
}
