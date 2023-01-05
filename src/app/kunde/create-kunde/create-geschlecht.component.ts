import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-geschlecht&gt;, um Erfassungsformular f&uuml;r einen neun Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    form!: FormGroup;

    geschlecht = new FormControl('DIVERS');

    ngOnInit() {
        log.debug('CreateGeschlechtComponent.ngOnInit');
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
