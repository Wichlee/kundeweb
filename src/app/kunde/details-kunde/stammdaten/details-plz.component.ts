import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-plz</code>
 */
@Component({
    selector: 'hs-details-plz',
    templateUrl: './details-plz.component.html',
    standalone: true,
})
export class DetailsPlzComponent implements OnInit {
    @Input()
    plz: string | undefined;

    ngOnInit() {
        log.debug('DetailsPlzComponent.plz=', this.plz);
    }
}
