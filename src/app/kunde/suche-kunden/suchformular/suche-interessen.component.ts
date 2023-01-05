import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-suche-interessen</code>
 */
@Component({
    selector: 'hs-suche-interessen',
    templateUrl: './suche-interessen.component.html',
    imports: [FormsModule],
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

    onChangeSport(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { checked } = event.target as HTMLInputElement;
        log.debug(`SucheInteressenComponent.onChangeSport: checked=${checked}`);
        this.sport$.next(checked);
    }

    onChangeLesen(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(`SucheInteressenComponent.onChangeLesen: checked=${checked}`);
        this.lesen$.next(checked);
    }

    onChangeReisen(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheInteressenComponent.onChangeReisen: checked=${checked}`,
        );
        this.reisen$.next(checked);
    }
}
