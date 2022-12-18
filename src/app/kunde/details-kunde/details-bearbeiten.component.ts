import { Component, Input, type OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-bearbeiten</code>
 */
@Component({
    selector: 'hs-details-bearbeiten',
    templateUrl: './details-bearbeiten.component.html',
    imports: [RouterLinkWithHref],
    standalone: true,
})
export class DetailsBearbeitenComponent implements OnInit {
    @Input()
    id: string | undefined;

    ngOnInit() {
        log.debug('DetailsBearbeitenComponent.id=', this.id);
    }
}
