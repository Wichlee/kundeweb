import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-geburtsdatum&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
})
export class CreateGeburtsdatumComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly today = new Date();

    protected readonly geburtsdatum = new FormControl(this.today);

    ngOnInit() {
        log.debug('CreateGeburtsdatumComponent.ngOnInit');
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }

    dayClicked({ date }: { date: Date }): void {
        log.debug('CreateGeburtsdatumComponent.dayClicked(): date=', date);
        this.form.setControl('geburtsdatum', new FormControl(date));
    }
}
