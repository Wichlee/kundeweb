import { Component, Input, type OnInit } from '@angular/core';
import { MAX_KATEGORIE } from '../shared/kunde';
import { MIN_KATEGORIE } from '../shared/kunde';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import log from 'loglevel';

@Component({
    selector: 'hs-create-kategorie',
    templateUrl: './create-kategorie.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateKategorieComponent implements OnInit {
    @Input()
    form!: FormGroup;

    kategorie = new FormControl(undefined, [
        Validators.required,
        Validators.min(MIN_KATEGORIE),
        Validators.max(MAX_KATEGORIE),
    ]);

    ngOnInit() {
        log.debug('CreateKategorieComponent.ngOnInit');
        this.form.addControl('kategorie', this.kategorie);
    }
}
