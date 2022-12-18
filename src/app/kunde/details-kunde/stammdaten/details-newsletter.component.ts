import { Component, Input, type OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-newsletter</code>
 */
@Component({
    selector: 'hs-details-newsletter',
    templateUrl: './details-newsletter.component.html',
    // *ngIf
    imports: [NgIf],
    standalone: true,
})
export class DetailsHasNewsletterComponent implements OnInit {
    @Input()
    hasNewsletter: boolean | undefined;

    ngOnInit() {
        log.debug(
            'DetailsHasNewsletterComponent.hasNewsletter=',
            this.hasNewsletter,
        );
    }
}
