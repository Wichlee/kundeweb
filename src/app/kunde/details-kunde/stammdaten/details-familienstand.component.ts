import { Component, Input, type OnInit } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { type FamilienstandType } from '../../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-familienstand</code>
 */
@Component({
    selector: 'hs-details-familienstand',
    templateUrl: './details-familienstand.component.html',
    imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
    standalone: true,
})
export class DetailsFamilienstandComponent implements OnInit {
    @Input()
    familienstand: FamilienstandType | '' | undefined;

    ngOnInit() {
        log.debug(
            'DetailsFamilienstandComponent.familienstand=',
            this.familienstand,
        );
    }
}
