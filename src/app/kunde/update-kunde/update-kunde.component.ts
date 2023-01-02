import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { type FamilienstandType, type Kunde } from '../shared/kunde';
import { Component, type OnInit } from '@angular/core';
import { FindError, UpdateError } from '../shared/errors';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, map, tap } from 'rxjs/operators';
import { KundeReadService } from '../shared/kundeRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { KundeWriteService } from '../shared/kundeWrite.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { ErrorMessageComponent } from '../../shared/error-message.component';
import { NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { UpdateEmailComponent } from './update-email.component';
import { UpdateFamilienstandComponent } from './update-familienstand.component';
import { UpdateKategorieComponent } from './update-kategorie.component';
import { UpdateNachnameComponent } from './update-nachname.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-kunde</code>
 */
@Component({
    selector: 'hs-update-kunde',
    templateUrl: './update-kunde.component.html',
    imports: [
        ErrorMessageComponent,
        NgIf,
        ReactiveFormsModule,
        UpdateEmailComponent,
        UpdateFamilienstandComponent,
        UpdateKategorieComponent,
        UpdateNachnameComponent,
    ],
    standalone: true,
})
export class UpdateKundeComponent implements OnInit {
    protected kunde: Kunde | undefined;

    protected readonly form = new FormGroup({});

    protected errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: KundeWriteService,
        private readonly readService: KundeReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateKundeComponent.constructor()');
    }

    ngOnInit() {
        // Pfad-Parameter aus /kunden/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug(
                        'UpdateKundeComponent.ngOnInit: kunde=',
                        this.kunde,
                    );
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Kunde-Objekt
     * zur&uuml;ckschreiben.
     */
    onSubmit() {
        if (this.form.pristine || this.kunde === undefined) {
            log.debug('UpdateKundeComponent.onSubmit: keine Aenderungen');
            return;
        }

        const { nachname } = this.form.value as { nachname: string };
        const { familienstand } = this.form.value as {
            familienstand: FamilienstandType;
        };
        const { kategorie } = this.form.value as { kategorie: number };
        const { email } = this.form.value as { email: string };

        const { kunde, service } = this;

        // datum, preis und rabatt koennen im Formular nicht geaendert werden
        kunde.nachname = nachname;
        kunde.familienstand = familienstand;
        kunde.kategorie = kategorie;
        kunde.email = email;
        log.debug('UpdateKundeComponent.onSubmit: kunde=', kunde);

        service
            .update(kunde)
            .pipe(
                first(),
                map(result => this.#handleUpdateResult(result)),
            )
            /* eslint-disable object-curly-newline */
            .subscribe({
                next: (k: Kunde | undefined) => this.#navigateDetails(k),
            });
        /* eslint-enable object-curly-newline */
    }

    #setProps(result: FindError | Kunde) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.kunde = result;
        this.errorMsg = undefined;

        const nachname = `Aktualisieren ${this.kunde.id}`;
        this.titleService.setTitle(nachname);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug('UpdateKundeComponent.#handleError: statuscode=', statuscode);

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
    }

    #handleUpdateResult(result: Kunde | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return result;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateStammdatenComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
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

        log.debug(
            'UpdateStammdatenComponent.#handleError: errorMsg=',
            this.errorMsg,
        );
        // eslint-disable-next-line no-useless-return
        return;
    }

    async #navigateDetails(kunde: Kunde | undefined) {
        if (kunde === undefined) {
            return;
        }

        // Gefundenen Kunden als NavigationExtras im Router puffern
        const state = { kunde };
        await this.router.navigate([`/kunden/${kunde.id}`], { state });
    }
}
