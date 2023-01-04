import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import log from 'loglevel';

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
