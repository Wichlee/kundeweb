import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-has-newsletter&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-has-newsletter',
    templateUrl: './create-hasNewsletter.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateHasNewsletterComponent implements OnInit {
    @Input()
    form!: FormGroup;

    hasNewsletter = new FormControl(false);

    ngOnInit() {
        log.debug('CreateHasNewsletterComponent.ngOnInit');
        this.form.addControl('hasNewsletter', this.hasNewsletter);
    }
}
