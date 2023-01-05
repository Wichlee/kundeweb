import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type GeschlechtType } from '../../shared/kunde';
import { Subject } from 'rxjs';
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
    protected geschlecht: GeschlechtType | '' = '';

    @Output()
    protected readonly geschlecht$ = new Subject<GeschlechtType | ''>();

    constructor() {
        log.debug('SucheGeschlechtComponent.constructor()');
    }

    onChange(event: Event) {
        const { value } = event.target as HTMLSelectElement;
        log.debug('SucheGeschlechtComponent.onChange: value=', value);
        this.geschlecht$.next(value as GeschlechtType | '');
    }
}
