import { Component, Input, type OnInit } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { type GeschlechtType } from '../../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-geschlecht</code>
 */
@Component({
    selector: 'hs-details-geschlecht',
    templateUrl: './details-geschlecht.component.html',
    imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
    standalone: true,
})
export class DetailsGeschlechtComponent implements OnInit {
    @Input()
    geschlecht: GeschlechtType | '' | undefined;

    ngOnInit() {
        log.debug('DetailsGeschlechtComponent.geschlecht=', this.geschlecht);
    }
}
