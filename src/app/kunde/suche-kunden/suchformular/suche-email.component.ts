import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-email</code>
 */
@Component({
    selector: 'hs-suche-email',
    templateUrl: './suche-email.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheEmailComponent {
    protected email = '';

    // Event Binding: <hs-suche-email (suchkriterien$)="...">
    // in RxJS: Observables für Event-Streaming
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    protected readonly email$ = new Subject<string>();

    constructor() {
        log.debug('SucheEmailComponent.constructor()');
    }

    onBlur() {
        log.debug(`SucheEmailComponent.onBlur: email=${this.email}`);
        this.email$.next(this.email);
    }
}
