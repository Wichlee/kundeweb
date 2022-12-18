import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-nachname</code>
 */
@Component({
    selector: 'hs-details-nachname',
    templateUrl: './details-nachname.component.html',
    standalone: true,
})
export class DetailsNachnameComponent implements OnInit {
    @Input()
    nachname!: string;

    ngOnInit() {
        log.debug('DetailsNachnameComponent.nachname=', this.nachname);
    }
}
