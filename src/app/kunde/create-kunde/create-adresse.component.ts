import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { PLZ_REGEX } from '../shared/kunde';
import log from 'loglevel';

@Component({
    selector: 'hs-create-adresse',
    templateUrl: './create-adresse.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class CreateAdresseComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly plz = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(PLZ_REGEX),
    ]);

    protected readonly ort = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateAdresseComponent.ngOnInit');
        this.form.addControl('plz', this.plz);
        this.form.addControl('ort', this.ort);
    }
}
