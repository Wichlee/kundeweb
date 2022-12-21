import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-breadcrumbs</code>
 */
@Component({
    selector: 'hs-details-breadcrumbs',
    templateUrl: './details-breadcrumbs.component.html',
    imports: [RouterLinkWithHref],
    standalone: true,
})
export class DetailsBreadcrumbsComponent {
    constructor() {
        log.debug('DetailsBreadcrumbsComponent.constructor()');
    }
}
