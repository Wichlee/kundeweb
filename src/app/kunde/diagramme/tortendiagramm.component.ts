import { Component, type OnInit } from '@angular/core';
import { type DataItem, NgxChartsModule } from '@swimlane/ngx-charts';
import { first, map, tap } from 'rxjs/operators';
import { FindError } from '../shared/errors';
import { KeineKundenError } from './errors';
import { type Kunde } from '../shared/kunde';
import { KundeReadService } from '../shared/kundeRead.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-tortendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Tortendiagramm.
 */
@Component({
    selector: 'hs-tortendiagramm',
    templateUrl: './tortendiagramm.html',
    imports: [NgxChartsModule],
    standalone: true,
})
export class TortendiagrammComponent implements OnInit {
    protected dataItems!: DataItem[];

    constructor(private readonly service: KundeReadService) {
        log.debug('TortendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Tortendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('TortendiagrammComponent.ngOnInit()');
        this.#setDataItems();
    }

    #setDataItems() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineKundenError();
                    }

                    return result
                        .filter(kunde => kunde.kategorie)
                        .map(kunde => this.#toDataItem(kunde));
                }),
                tap(dataItems => {
                    this.dataItems = dataItems;
                }),
            )
            .subscribe();
    }

    // https://stackblitz.com/edit/swimlane-pie-chart?embed=1&file=app/app.component.ts
    #toDataItem(kunde: Kunde): DataItem {
        return {
            name: kunde.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            value: kunde.kategorie,
        };
    }
}
