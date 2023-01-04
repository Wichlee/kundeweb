import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

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
}
