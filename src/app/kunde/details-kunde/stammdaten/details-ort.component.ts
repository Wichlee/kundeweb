import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-ort</code>
 */
@Component({
    selector: 'hs-details-ort',
    templateUrl: './details-ort.component.html',
    standalone: true,
})
export class DetailsOrtComponent implements OnInit {
    @Input()
    ort: string | undefined;

    ngOnInit() {
        log.debug('DetailsOrtComponent.ort=', this.ort);
    }
}
