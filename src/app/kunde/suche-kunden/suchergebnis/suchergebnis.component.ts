import { Component, Input } from '@angular/core';
import { type Kunde } from '../../shared/kunde';
import { ErrorMessageComponent } from '../../../shared/error-message.component';
import { GefundeneKundenComponent } from './gefundene-kunden.component';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suchergebnis</code>, um das Ergebnis der
 * Suche anzuzeigen, d.h. die gefundenen Kunden oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
    imports: [ErrorMessageComponent, NgIf, GefundeneKundenComponent],
    standalone: true,
})
export class SuchergebnisComponent {
    @Input()
    Kunden: Kunde[] = [];

    @Input()
    errorMsg: string | undefined;

    constructor() {
        log.debug('SuchergebnisComponent.constructor()');
    }
}
