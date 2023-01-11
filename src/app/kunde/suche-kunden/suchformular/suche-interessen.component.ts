import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { MatCheckboxChange } from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-interessen</code>
 */
@Component({
    selector: 'hs-suche-interessen',
    templateUrl: './suche-interessen.component.html',
    imports: [FormsModule, MatCheckboxModule, MatInputModule],
    standalone: true,
})
export class SucheInteressenComponent {
    protected sport = false;

    protected lesen = false;

    protected reisen = false;

    @Output()
    protected readonly sport$ = new Subject<boolean>();

    @Output()
    protected readonly lesen$ = new Subject<boolean>();

    @Output()
    protected readonly reisen$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheInteressenComponent.constructor()');
    }

    onChangeSport(event: MatCheckboxChange) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { checked } = event;
        log.debug(`SucheInteressenComponent.onChangeSport: checked=${checked}`);
        this.sport$.next(checked);
    }

    onChangeLesen(event: MatCheckboxChange) {
        const { checked } = event;
        log.debug(`SucheInteressenComponent.onChangeLesen: checked=${checked}`);
        this.lesen$.next(checked);
    }

    onChangeReisen(event: MatCheckboxChange) {
        const { checked } = event;
        log.debug(
            `SucheInteressenComponent.onChangeReisen: checked=${checked}`,
        );
        this.reisen$.next(checked);
    }
}
