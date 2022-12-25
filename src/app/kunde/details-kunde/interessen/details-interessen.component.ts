import { Component, Input, type OnInit } from '@angular/core';
import {
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
} from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-interessen</code>
 */
@Component({
    selector: 'hs-details-interessen',
    templateUrl: './details-interessen.component.html',
    imports: [NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault],
    standalone: true,
})
export class DetailsInteressenComponent implements OnInit {
    // <hs-interessen [values]="kunde.interessen">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    values!: string[];

    ngOnInit() {
        log.debug('DetailsInteressenComponent.values=', this.values);
    }
}
