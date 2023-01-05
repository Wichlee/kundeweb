import { Component, Output } from '@angular/core';
import { type FamilienstandType } from '../../shared/kunde';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-familienstand</code>
 */
@Component({
    selector: 'hs-suche-familienstand',
    templateUrl: './suche-familienstand.component.html',
    imports: [FormsModule],
    standalone: true,
})
export class SucheFamilienstandComponent {
    protected familienstand: FamilienstandType | '' = '';

    @Output()
    protected readonly familienstand$ = new Subject<FamilienstandType | ''>();

    constructor() {
        log.debug('SucheFamilienstandComponent.constructor()');
    }

    onChange(event: Event) {
        const { value } = event.target as HTMLSelectElement;
        log.debug('SucheFamilienstandComponent.onChange: value=', value);
        this.familienstand$.next(value as FamilienstandType | '');
    }
}
