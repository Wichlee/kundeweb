import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-geschlecht&gt;, um Erfassungsformular f&uuml;r einen neun Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    form!: FormGroup;

    geschlecht = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateGeschlechtComponent.ngOnInit');
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
