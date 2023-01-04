import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { HOMEPAGE_REGEX } from '../shared/kunde';
import log from 'loglevel';

@Component({
    selector: 'hs-create-homepage',
    templateUrl: './create-homepage.component.html',
    imports: [FormsModule, ReactiveFormsModule],
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
