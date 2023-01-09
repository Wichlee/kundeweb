import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { HOMEPAGE_REGEX } from '../shared/kunde';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-homepage&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-homepage',
    templateUrl: './create-homepage.component.html',
    imports: [
        FormsModule,
        MatIconModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateHomepageComponent implements OnInit {
    @Input()
    form!: FormGroup;

    homepage = new FormControl(undefined, [Validators.pattern(HOMEPAGE_REGEX)]);

    ngOnInit() {
        log.debug('CreateHomepageComponent.ngOnInit');
        this.form.addControl('homepage', this.homepage);
    }
}
