// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    KundeReadService,
    type Suchkriterien,
} from '../shared/kundeRead.service';
import { first, tap } from 'rxjs/operators';
import { type Kunde } from '../shared/kunde';
import { Component } from '@angular/core';
import { FindError } from '../shared/errors';
import { HttpStatusCode } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { SuchergebnisComponent } from './suchergebnis/suchergebnis.component';
import { SuchformularComponent } from './suchformular/suchformular.component';
import { WaitingComponent } from './../../shared/waiting.component';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>&lt;hs-suche-kunden&gt;</code>,
 * die aus den Kindkomponenten f&uuml;r diese CSS-Selektoren besteht:
 * <ul>
 *  <li> <code>hs-suchformular</code>
 *  <li> <code>hs-waiting</code>
 *  <li> <code>hs-suchergebnis</code>
 * </ul>
 */
@Component({
    selector: 'hs-suche-kunden',
    templateUrl: './suche-kunden.component.html',
    imports: [
        NgIf,
        SuchergebnisComponent,
        SuchformularComponent,
        WaitingComponent,
    ],
    standalone: true,
})
export class SucheKundenComponent {
    protected waiting = false;

    protected kunden: Kunde[] = [];

    protected errorMsg: string | undefined;

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    constructor(private readonly service: KundeReadService) {
        log.debug('SucheKundenComponent.constructor()');
    }

    /**
     * Das Attribut <code>suchkriterien</code> wird auf den Wert des Ereignisses
     * <code>suchkriterien</code> vom Typ Suchkriterien gesetzt. Diese Methode
     * wird aufgerufen, wenn in der Kindkomponente f&uuml;r
     * <code>hs-suchformular</code> das Ereignis ausgel&ouml;st wird.
     *
     * @param suchkriterien f&uuml;r die Suche.
     */
    suchen(suchkriterien: Suchkriterien) {
        log.debug(
            'SucheKundenComponent.suchen: suchkriterien=',
            suchkriterien,
        );

        this.kunden = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // Observable: mehrere Werte werden "lazy" bereitgestellt, statt in einem JSON-Array
        // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
        this.service
            .find(suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe();
    }

    #setProps(result: Kunde[] | FindError) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.kunden = result;
        log.debug('SucheKundenComponent.#setProps: kunden=', this.kunden);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            'SucheKundenComponent.#handleError: statuscode=',
            statuscode,
        );

        this.kunden = [];

        switch (statuscode) {
            case HttpStatusCode.NotFound: {
                this.errorMsg = 'Keine Kunden gefunden.';
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
            'SucheKundenComponent.#setErrorMsg: errorMsg=',
            this.errorMsg,
        );
    }
}
