import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-nachname</code>
 */
@Component({
    selector: 'hs-suche-nachname',
    templateUrl: './suche-nachname.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheNachnameComponent {
    protected nachname = '';

    // Event Binding: <hs-suche-nachname (suchkriterien$)="...">
    // in RxJS: Observables für Event-Streaming
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    protected readonly nachname$ = new Subject<string>();

    constructor() {
        log.debug('SucheNachnameComponent.constructor()');
    }

    onBlur() {
        log.debug(`SucheNachnameComponent.onBlur: nachname=${this.nachname}`);
        this.nachname$.next(this.nachname);
    }
}
