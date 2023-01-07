import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-username</code>
 */
@Component({
    selector: 'hs-details-username',
    templateUrl: './details-username.component.html',
    standalone: true,
})
export class DetailsUsernameComponent implements OnInit {
    @Input()
    username: string | undefined;

    ngOnInit() {
        log.debug('DetailsUsernameComponent.username=', this.username);
    }
}
