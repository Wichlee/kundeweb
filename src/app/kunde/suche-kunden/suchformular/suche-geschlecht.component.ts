import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { type Geschlecht } from '../../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-geschlecht</code>
 */
@Component({
    selector: 'hs-suche-geschlecht',
    templateUrl: './suche-geschlecht.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheGeschlechtComponent {
    protected geschlecht: Geschlecht | '' = '';

    @Output()
    protected readonly geschlecht$ = new Subject<Geschlecht | ''>();

    constructor() {
        log.debug('SucheGeschlechtComponent.constructor()');
    }

    onChange(event: Event) {
        const { value } = event.target as HTMLSelectElement;
        log.debug('SucheGeschlechtComponent.onChange: value=', value);
        this.geschlecht$.next(value as Geschlecht | '');
    }
}
