import { Component, Input, type OnInit } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { type WaehrungType } from '../../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-waehrung</code>
 */
@Component({
    selector: 'hs-details-waehrung',
    templateUrl: './details-waehrung.component.html',
    imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
    standalone: true,
})
export class DetailsWaehrungComponent implements OnInit {
    @Input()
    waehrung: WaehrungType | '' | undefined;

    ngOnInit() {
        log.debug('DetailsWaehrungComponent.waehrung=', this.waehrung);
    }
}
