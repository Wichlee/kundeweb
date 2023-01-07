import { Component, Input, type OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-details-kategorie</code>
 */
@Component({
    selector: 'hs-details-kategorie',
    templateUrl: './details-kategorie.component.html',
    styleUrls: ['./details-kategorie.component.scss'],
    imports: [MatIconModule, NgForOf],
    standalone: true,
})
export class DetailsKategorieComponent implements OnInit {
    @Input()
    kategorie: number | undefined;

    protected counter: boolean[] = [];

    ngOnInit() {
        if (this.kategorie !== undefined) {
            for (let i = 0; i < this.kategorie; i++) {
                this.counter.push(true);
            }
        }
        log.debug('DetailsKategorieComponent.kategorie=', this.kategorie);
    }
}
