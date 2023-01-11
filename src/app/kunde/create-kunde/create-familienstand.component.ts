import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import type { MatSelectChange} from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-familienstand&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-familienstand',
    templateUrl: './create-familienstand.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    form!: FormGroup;

    selectedValue(event: MatSelectChange) {
        const selectedData = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value: event.value,
            text: event.source.triggerValue,
        };
        log.debug(selectedData);
    }
    
    familienstand = new FormControl(undefined);

    ngOnInit() {
        log.debug('CreateFamilienstandComponent.ngOnInit');
        this.form.addControl('familienstand', this.familienstand);
    }
}
