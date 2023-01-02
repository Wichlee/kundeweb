import { Component, type OnInit } from '@angular/core';
import {
    type DataItem,
    type MultiSeries,
    NgxChartsModule,
} from '@swimlane/ngx-charts';
import { first, map, tap } from 'rxjs/operators';
import { FindError } from '../shared/errors';
import { KeineKundenError } from './errors';
import { type Kunde } from '../shared/kunde';
import { KundeReadService } from '../shared/kundeRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-liniendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Liniendiagramm.
 */
@Component({
    selector: 'hs-liniendiagramm',
    templateUrl: './liniendiagramm.html',
    imports: [NgxChartsModule],
    standalone: true,
})
export class LiniendiagrammComponent implements OnInit {
    protected series!: MultiSeries;

    constructor(private readonly service: KundeReadService) {
        log.debug('LiniendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Liniendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('LiniendiagrammComponent.ngOnInit()');
        this.#setSeries();
    }

    #setSeries() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineKundenError();
                    }

                    return result.filter(kunde => kunde.kategorie);
                }),
                tap(kundeItems => {
                    const kategorieItems = this.#getKategorieItems(kundeItems);
                    const umsatzItems = this.#getUmsatzItems(kundeItems);
                    this.#initSeries(kategorieItems, umsatzItems);
                }),
            )
            .subscribe();
    }

    // https://swimlane.gitbook.io/ngx-charts/examples/line-area-charts/line-chart
    #getKategorieItems(kunden: Kunde[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return kunden.map(kunde => {
            return {
                name: kunde.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: kunde.kategorie,
            };
        });
    }

    #getUmsatzItems(kunden: Kunde[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return kunden.map(kunde => {
            return {
                name: kunde.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: kunde.umsatz,
            };
        });
    }

    #initSeries(kategorieItems: DataItem[], umsatzItems: DataItem[]) {
        const series: MultiSeries = [
            {
                name: 'Kategorien',
                series: kategorieItems,
            },
            {
                name: 'Umsaetze',
                series: umsatzItems,
            },
        ];

        this.series = series;
    }
}
