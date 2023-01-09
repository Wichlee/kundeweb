import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-betrag</code>
 */
@Component({
    selector: 'hs-details-betrag',
    templateUrl: './details-betrag.component.html',
    standalone: true,
})
export class DetailsUmsatzComponent implements OnInit {
    @Input()
    betrag: number | undefined;

    ngOnInit() {
        log.debug('DetailsBetragComponent.betrag=', this.betrag);
    }
}
