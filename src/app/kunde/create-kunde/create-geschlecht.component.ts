import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-geschlecht&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
    imports: [FormsModule, MatInputModule, MatRadioModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    form!: FormGroup;

    geschlecht = new FormControl('D');

    ngOnInit() {
        log.debug('CreateGeschlechtComponent.ngOnInit');
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
