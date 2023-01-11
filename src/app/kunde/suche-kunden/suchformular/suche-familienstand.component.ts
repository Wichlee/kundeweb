import { Component, Output } from '@angular/core';
import { type FamilienstandType } from '../../shared/kunde';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import type { MatRadioChange } from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-familienstand</code>
 */
@Component({
    selector: 'hs-suche-familienstand',
    templateUrl: './suche-familienstand.component.html',
    imports: [FormsModule, MatRadioModule, MatInputModule],
    standalone: true,
})
export class SucheFamilienstandComponent {
    protected familienstand: FamilienstandType | '' = '';

    @Output()
    protected readonly familienstand$ = new Subject<FamilienstandType | ''>();

    constructor() {
        log.debug('SucheFamilienstandComponent.constructor()');
    }

    onChange(event: MatRadioChange) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { value } = event.source;
        log.debug('SucheFamilienstandComponent.onChange: value=', value);
        this.familienstand$.next(value as FamilienstandType | '');
    }
}
