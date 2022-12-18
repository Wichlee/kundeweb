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
    protected javascript = false;

    protected typescript = false;

    @Output()
    protected readonly javascript$ = new Subject<boolean>();

    @Output()
    protected readonly typescript$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheInteressenComponent.constructor()');
    }

    onChangeJavascript(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheInteressenComponent.onChangeJavascript: checked=${checked}`,
        );
        this.javascript$.next(checked);
    }

    onChangeTypescript(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheInteressenComponent.onChangeTypescript: checked=${checked}`,
        );
        this.typescript$.next(checked);
    }
}
