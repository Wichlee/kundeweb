import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { PLZ_REGEX } from '../shared/kunde';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-plz&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-plz',
    templateUrl: './create-plz.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreatePlzComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly plz = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(PLZ_REGEX),
    ]);

    ngOnInit() {
        log.debug('CreatePlzComponent.ngOnInit');
        this.form.addControl('plz', this.plz);
    }
}
