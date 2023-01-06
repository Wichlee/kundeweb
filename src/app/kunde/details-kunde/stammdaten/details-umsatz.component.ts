import { Component, Input, type OnInit } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-umsatz</code>
 */
@Component({
    selector: 'hs-details-umsatz',
    templateUrl: './details-umsatz.component.html',
    imports: [CurrencyPipe, DecimalPipe],
    standalone: true,
})
export class DetailsUmsatzComponent implements OnInit {
    @Input()
    umsatz: number | undefined;

    ngOnInit() {
        log.debug('DetailsUmsatzComponent.umsatz=', this.umsatz);
    }
}
